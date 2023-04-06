/**
 * Copyright 2023 The Tour of WGSL Authors
 *
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file or at
 * https://developers.google.com/open-source/licenses/bsd
 */

/**
 * The WGSL-Tour web component is responsible for displaying the UI for a the shaders, and result
 * canvas. The tour contains the `Runner` and will call the runner to initialize and
 * generate frames
 *
 * @module wgsl-tour
 */

/// <reference types="@types/codemirror" />

import VisualizerBuilder, { CompilationFailure, VisualizerError, Visualizer } from './visualizer';

import CodeMirror from 'codemirror';
import '../third_party/codemirror/wgsl-mode';
import WGSLDocs from './wgsl-docs';

/**
 * Primary component for the WGSL Tour. Renders the editor, and results
 */
export class WGSLTour extends HTMLElement {
  /** The `Visualization` which renders the frames */
  visualization: Visualizer | undefined = undefined;

  /** The `VisualizationBuilder` which builds the visualization */
  visualizationBuilder: VisualizerBuilder | undefined = undefined;

  /**
   * Non-visible, non-editable shader source that combined with user shader code
   * before compiling the shader
   */
  bootstrap: string = '';

  /** The code editor */
  editor: CodeMirror.Editor;

  /** The diagnostic messages in the editor */
  diagnostics: Array<CodeMirror.LineWidget>;

  /** The visualization output HTML elements */
  output: HTMLElement;

  /** The current frame number to be rendered */
  frame_number: number = 0;

  /** The keyboard callback delay timer */
  key_timer: ReturnType<typeof setTimeout> | undefined = undefined;

  /** Creates the wgsl-tour */
  constructor() {
    super();
  }

  connectedCallback() {
    const tmplNode = document.getElementById('wgsl-tour-tmpl') as HTMLTemplateElement;
    const tmpl = tmplNode.content.cloneNode(true);
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(tmpl);

    const textarea = shadow.getElementById('wgsl-shader') as HTMLTextAreaElement;
    textarea.value = this.textContent || '';

    this.diagnostics = [];

    let rebuild = () => {
      this.frame_number = 0;
      if (this.visualizationBuilder) {
        this.buildVisualization();
      }
    };

    this.editor = CodeMirror.fromTextArea(textarea, {
      autofocus: false,
      lineNumbers: true,
      mode: 'wgsl',
      dragDrop: false,
      spellcheck: false,
      autocorrect: false,
      autocapitalize: false,
    });
    this.editor.setOption('extraKeys', {
      'Ctrl-O': function (cm) {
        let cursor = cm.getCursor();
        var token = cm.getTokenAt(cursor);
        let docs = WGSLDocs.getDocsFor(token.string, token.type);

        if (docs === undefined) {
          return;
        }
        var msg = document.createElement('pre');
        msg.innerHTML = docs;
        msg.className = 'wgsl-tooltip';
        let tooltip = this.editor.addLineWidget(cursor.line, msg, {
          coverGutter: false,
          noHScroll: false,
        });

        let listener = () => {
          tooltip.clear();
          document.removeEventListener('keydown', listener);
        };
        setTimeout(() => {
          document.addEventListener('keydown', listener);
        }, 100);
      }.bind(this),
    });

    this.editor.on('changes', () => {
      if (this.key_timer !== undefined) {
        clearTimeout(this.key_timer);
      }
      this.key_timer = setTimeout(rebuild, 1000);
    });

    this.output = shadow.getElementById('output');
  }

  setBootstrap(src: string) {
    this.bootstrap = src;
  }

  /**
   * Sets the runner for the tour
   * @param val the runner to set
   **/
  async setVisualizationBuilder(val: VisualizerBuilder) {
    this.visualizationBuilder = val;
    try {
      if (!navigator.gpu) {
        throw new VisualizerError('WebGPU is not supported in this browser');
      }
      await this.visualizationBuilder.configure(this.output);
    } catch (e) {
      this.onPipelineFailure({ message: e } as VisualizerError);
      return false;
    }

    this.buildVisualization();
  }

  /**
   * Initializes the runner and starts generating frames
   */
  buildVisualization() {
    if (!this.visualizationBuilder) {
      return;
    }
    this.editor.getAllMarks().forEach((m) => m.clear());
    this.diagnostics.forEach((d) => d.clear());

    this.visualization = undefined;
    this.visualizationBuilder
      .build(this.editor.getValue() + this.bootstrap)
      .then((visualization) => {
        this.visualization = visualization;
        requestAnimationFrame(this.frame.bind(this));
      })
      .catch((err: Error) => {
        if (err.hasOwnProperty('diagnostics')) {
          this.onCompilationFailure(err as CompilationFailure);
        } else if (err.hasOwnProperty('visualizer_error')) {
          this.onPipelineFailure(err as VisualizerError);
        } else {
          console.log(err);
        }
      });
  }

  /**
   * Renders a single frame
   */
  frame() {
    if (this.visualization === undefined) {
      return;
    }

    this.frame_number++;
    this.visualization.execute(this.frame_number);

    if (this.visualization.executeFrequency === 'repeat') {
      requestAnimationFrame(this.frame.bind(this));
    }
  }

  /**
   * Shader compilation failure handler.
   */
  onCompilationFailure(failure: CompilationFailure) {
    for (const diag of failure.diagnostics) {
      if (diag.kind === 'error') {
        this.editor.markText(
          { line: diag.line - 1, ch: diag.column - 1 },
          { line: diag.line - 1, ch: diag.column - 1 + diag.length },
          { startStyle: 'wgsl-inline-error' }
        );
      }

      var msg = document.createElement('pre');
      msg.appendChild(document.createTextNode(diag.msg));
      msg.className = 'wgsl-compile wgsl-' + diag.kind;

      this.diagnostics.push(
        this.editor.addLineWidget(diag.line - 1, msg, {
          coverGutter: false,
          noHScroll: true,
        })
      );
    }
  }

  /**
   * Shader pipeline compilation faiure handler
   */
  onPipelineFailure(failure: VisualizerError) {
    var msg = document.createElement('pre');
    msg.appendChild(document.createTextNode(failure.message));
    msg.className = 'wgsl-compile wgsl-error';

    this.diagnostics.push(
      this.editor.addLineWidget(0, msg, { coverGutter: false, above: true, noHScroll: true })
    );
  }
}
customElements.define('wgsl-tour', WGSLTour);
