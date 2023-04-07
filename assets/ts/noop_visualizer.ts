/**
 * Copyright 2023 The Tour of WGSL Authors
 *
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file or at
 * https://developers.google.com/open-source/licenses/bsd
 */

/// <reference types="@webgpu/types" />

import VisualizerBuilder, { VisualizerError, CompilationFailure, Visualizer } from './visualizer';

export class NoopVizualizer implements Visualizer {
  readonly executeFrequency = 'once';

  readonly output: 'none';

  execute() {}
}

export default class NoopVizualizationBuilder implements VisualizerBuilder {
  device: GPUDevice | null = null;

  /**
   * @inheritDoc VisualizationBuilder.configure
   */
  async configure() {
    const adapter = await navigator.gpu.requestAdapter();
    if (adapter === null) {
      throw new VisualizerError('Unable to request webgpu adapter');
    }

    this.device = await adapter.requestDevice();
    if (this.device === null) {
      throw new VisualizerError('Unable to get WebGPU device');
    }
  }

  /**
   * @inheritDoc VisualizationBuilder.build
   */
  async build(shader: string): Promise<Visualizer> {
    if (this.device === null) {
      throw new VisualizerError('Device missing in visualizer');
    }

    this.device.pushErrorScope('validation');
    const shaderModule = this.device.createShaderModule({
      code: shader,
    });

    // getCompilationInfo() was previously called compilationInfo().
    // TODO: Just use shaderModule.getCompilationInfo() after May 2023.
    const compilationInfo = shaderModule.getCompilationInfo
      ? await shaderModule.getCompilationInfo()
      : await (shaderModule as any).compilationInfo();
    if (compilationInfo.messages.length !== 0) {
      throw new CompilationFailure(
        compilationInfo.messages.map((m) => ({
          line: m.lineNum,
          column: m.linePos,
          length: m.length,
          msg: m.message,
          kind: m.type,
        }))
      );
    }
    return new NoopVizualizer();
  }
}
