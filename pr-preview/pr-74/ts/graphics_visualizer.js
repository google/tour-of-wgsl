// ns-hugo:/home/runner/work/tour-of-wgsl/tour-of-wgsl/assets/ts/visualizer.ts
var VisualizerError = class extends Error {
  visualizer_error = true;
};
var CompilationFailure = class extends Error {
  diagnostics;
  constructor(diagnostics) {
    super(
      "compilation failure:\n" + diagnostics.map((d) => `:${d.line}:${d.column}: ${d.kind}: ${d.msg}`).join("\n")
    );
    this.diagnostics = diagnostics;
  }
};

// <stdin>
var GraphicsVizualizer = class {
  device;
  context;
  pipeline;
  uniformBuffer;
  uniformBindGroup;
  executeFrequency = "repeat";
  output;
  constructor(device, context, pipeline, uniformBuffer, uniformBindGroup) {
    this.device = device;
    this.context = context;
    this.pipeline = pipeline;
    this.uniformBuffer = uniformBuffer;
    this.uniformBindGroup = uniformBindGroup;
  }
  execute(frame_number) {
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
          clearValue: { r: 0, g: 0, b: 0, a: 0 },
          loadOp: "clear",
          storeOp: "store"
        }
      ]
    };
    const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
    passEncoder.setPipeline(this.pipeline);
    passEncoder.setBindGroup(0, this.uniformBindGroup);
    passEncoder.draw(3, 1, 0, 0);
    passEncoder.end();
    this.device.queue.submit([commandEncoder.finish()]);
  }
};
var GraphicsVizualizerBuilder = class {
  device = null;
  context = null;
  /**
   * @inheritDoc VisualizationBuilder.configure
   */
  async configure(output) {
    const canvas = document.createElement("canvas");
    canvas.setAttribute("id", "wgsl-tour-output-canvas");
    const div = document.createElement("div");
    div.setAttribute("id", "canvas");
    div.appendChild(canvas);
    output.appendChild(div);
    const devicePixelRatio = window.devicePixelRatio || 1;
    canvas.width = canvas.clientWidth * devicePixelRatio;
    canvas.height = canvas.clientHeight * devicePixelRatio;
    const adapter = await navigator.gpu.requestAdapter();
    if (adapter === null) {
      throw new VisualizerError("unable to request webgpu adapter");
    }
    this.device = await adapter.requestDevice();
    if (this.device === null) {
      throw new VisualizerError("unable to get WebGPU device");
    }
    this.context = canvas.getContext("webgpu");
    if (this.context === null) {
      throw new VisualizerError("unable to get WebGPU context from canvas");
    }
    const presentationFormat = navigator.gpu.getPreferredCanvasFormat();
    this.context.configure({
      device: this.device,
      format: presentationFormat,
      alphaMode: "premultiplied"
    });
  }
  /**
   * @inheritDoc VisualizationBuilder.build
   */
  async build(shader) {
    if (this.device === null || this.context === null) {
      throw new VisualizerError("visualizer not configured");
    }
    this.device.pushErrorScope("validation");
    const shaderModule = this.device.createShaderModule({
      code: shader
    });
    const getCompilationInfo = shaderModule.getCompilationInfo || shaderModule.compilationInfo;
    const compilationInfo = await getCompilationInfo();
    if (compilationInfo.messages.length != 0) {
      throw new CompilationFailure(
        compilationInfo.messages.map((m) => ({
          line: m.lineNum,
          column: m.linePos,
          length: m.length,
          msg: m.message,
          kind: m.type
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
                buffer: { type: "uniform" }
              }
            ]
          })
        ]
      }),
      vertex: {
        module: shaderModule,
        entryPoint: "vtx_main"
      },
      fragment: {
        module: shaderModule,
        entryPoint: "frag_main",
        targets: [
          {
            format: presentationFormat
          }
        ]
      },
      primitive: {
        topology: "triangle-list"
      }
    });
    const err = await this.device.popErrorScope();
    if (err !== null) {
      throw new VisualizerError(err.message);
    }
    const uniformBufferSize = 4 * 1;
    const uniformBuffer = this.device.createBuffer({
      size: uniformBufferSize,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
    });
    const uniformBindGroup = this.device.createBindGroup({
      layout: pipeline.getBindGroupLayout(0),
      entries: [
        {
          binding: 0,
          resource: {
            buffer: uniformBuffer
          }
        }
      ]
    });
    return new GraphicsVizualizer(
      this.device,
      this.context,
      pipeline,
      uniformBuffer,
      uniformBindGroup
    );
  }
};
export {
  GraphicsVizualizer,
  GraphicsVizualizerBuilder as default
};
