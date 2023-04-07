/**
 * Copyright 2023 The Tour of WGSL Authors
 *
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file or at
 * https://developers.google.com/open-source/licenses/bsd
 */

/// <reference types="@webgpu/types" />

import VisualizerBuilder, { VisualizerError, CompilationFailure, Visualizer } from './visualizer';

export class GraphicsVizualizer implements Visualizer {
  device: GPUDevice;
  context: GPUCanvasContext;
  pipeline: GPURenderPipeline;
  uniformBuffer: GPUBuffer;
  uniformBindGroup: GPUBindGroup;

  readonly executeFrequency = 'repeat';

  readonly output: 'canvas';

  constructor(
    device: GPUDevice,
    context: GPUCanvasContext,
    pipeline: GPURenderPipeline,
    uniformBuffer: GPUBuffer,
    uniformBindGroup: GPUBindGroup
  ) {
    this.device = device;
    this.context = context;
    this.pipeline = pipeline;
    this.uniformBuffer = uniformBuffer;
    this.uniformBindGroup = uniformBindGroup;
  }

  execute(frame_number: number) {
    const uniformData = new Uint32Array([frame_number]);

    this.device.queue.writeBuffer(
      this.uniformBuffer,
      0,
      uniformData.buffer,
      uniformData.byteOffset,
      uniformData.byteLength
    );

    const commandEncoder = this.device.createCommandEncoder();
    const textureView = this.context.getCurrentTexture().createView();

    const renderPassDescriptor = {
      colorAttachments: [
        {
          view: textureView,
          clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 0.0 },
          loadOp: 'clear' as GPULoadOp,
          storeOp: 'store' as GPUStoreOp,
        },
      ],
    };

    const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
    passEncoder.setPipeline(this.pipeline);
    passEncoder.setBindGroup(0, this.uniformBindGroup);
    passEncoder.draw(3, 1, 0, 0);
    passEncoder.end();

    this.device.queue.submit([commandEncoder.finish()]);
  }
}

export default class GraphicsVizualizerBuilder implements VisualizerBuilder {
  device: GPUDevice | null = null;
  context: GPUCanvasContext | null = null;

  /**
   * @inheritDoc VisualizationBuilder.configure
   */
  async configure(output: HTMLElement) {
    const canvas = document.createElement('canvas');
    canvas.setAttribute('id', 'wgsl-tour-output-canvas');
    const div = document.createElement('div');
    div.setAttribute('id', 'canvas');
    div.appendChild(canvas);
    output.appendChild(div);

    const devicePixelRatio = window.devicePixelRatio || 1;
    canvas.width = canvas.clientWidth * devicePixelRatio;
    canvas.height = canvas.clientHeight * devicePixelRatio;

    const adapter = await navigator.gpu.requestAdapter();
    if (adapter === null) {
      throw new VisualizerError('unable to request webgpu adapter');
    }

    this.device = await adapter.requestDevice();
    if (this.device === null) {
      throw new VisualizerError('unable to get WebGPU device');
    }

    this.context = canvas.getContext('webgpu');
    if (this.context === null) {
      throw new VisualizerError('unable to get WebGPU context from canvas');
    }

    const presentationFormat = navigator.gpu.getPreferredCanvasFormat();
    this.context.configure({
      device: this.device,
      format: presentationFormat,
      alphaMode: 'premultiplied',
    });
  }

  /**
   * @inheritDoc VisualizationBuilder.build
   */
  async build(shader: string): Promise<Visualizer> {
    if (this.device === null || this.context === null) {
      throw new VisualizerError('visualizer not configured');
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

    const presentationFormat = navigator.gpu.getPreferredCanvasFormat();

    const pipeline = this.device.createRenderPipeline({
      layout: this.device.createPipelineLayout({
        bindGroupLayouts: [
          this.device.createBindGroupLayout({
            entries: [
              {
                binding: 0,
                visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT,
                buffer: { type: 'uniform' },
              },
            ],
          }),
        ],
      }),
      vertex: {
        module: shaderModule,
        entryPoint: 'vtx_main',
      },
      fragment: {
        module: shaderModule,
        entryPoint: 'frag_main',
        targets: [
          {
            format: presentationFormat,
          },
        ],
      },
      primitive: {
        topology: 'triangle-list',
      },
    });
    const err = await this.device.popErrorScope();
    if (err !== null) {
      throw new VisualizerError(err.message);
    }

    const uniformBufferSize = 4 * 1; // 1 u32
    const uniformBuffer = this.device.createBuffer({
      size: uniformBufferSize,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });

    const uniformBindGroup = this.device.createBindGroup({
      layout: pipeline.getBindGroupLayout(0),
      entries: [
        {
          binding: 0,
          resource: {
            buffer: uniformBuffer,
          },
        },
      ],
    });

    return new GraphicsVizualizer(
      this.device,
      this.context,
      pipeline,
      uniformBuffer,
      uniformBindGroup
    );
  }
}
