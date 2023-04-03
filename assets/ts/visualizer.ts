/**
 * Copyright 2023 The Tour of WGSL Authors
 *
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file or at
 * https://developers.google.com/open-source/licenses/bsd
 */

/// <reference types="@webgpu/types" />

export class VisualizerError extends Error {
  visualizer_error: boolean = true;
}

export interface Diagnostic {
  line: number;
  column: number;
  length: number;
  msg: string;
  kind: GPUCompilationMessageType;
}

/** The error type used by VisualizerBuilder.build() when the shader fails to compile */
export class CompilationFailure extends Error {
  public readonly diagnostics: Diagnostic[];

  constructor(diagnostics: Diagnostic[]) {
    super(
      'compilation failure:\n' +
        diagnostics.map((d) => `:${d.line}:${d.column}: ${d.kind}: ${d.msg}`).join('\n')
    );
    this.diagnostics = diagnostics;
  }
}

export interface Visualizer {
  /**
   * Renders a frame.
   * @param frame_number the number of the current frame
   */
  execute(frame_number: number): void;

  readonly executeFrequency: 'once' | 'repeat';

  readonly output: 'canvas' | 'text' | 'none';
}

/**
 * Intefact to a shader visualization which is responsible for creating and executing the shader pipelines.
 */
export default interface VisualizerBuilder {
  /**
   * Sets up the visualization builder
   * @param output the DOM element to present the output to
   */
  configure(output: HTMLElement): void;

  /**
   * Initalize the runner
   * @param src the shader source
   * @returns the Visualizer promise
   * @throws CompilationFailure on compilation failure
   */
  build(src: string): Promise<Visualizer>;
}
