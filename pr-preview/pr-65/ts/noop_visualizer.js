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
var NoopVizualizer = class {
  executeFrequency = "once";
  output;
  execute() {
  }
};
var NoopVizualizationBuilder = class {
  device = null;
  /**
   * @inheritDoc VisualizationBuilder.configure
   */
  async configure() {
    const adapter = await navigator.gpu.requestAdapter();
    if (adapter === null) {
      throw new VisualizerError("Unable to request webgpu adapter");
    }
    this.device = await adapter.requestDevice();
    if (this.device === null) {
      throw new VisualizerError("Unable to get WebGPU device");
    }
  }
  /**
   * @inheritDoc VisualizationBuilder.build
   */
  async build(shader) {
    if (this.device === null) {
      throw new VisualizerError("Device missing in visualizer");
    }
    this.device.pushErrorScope("validation");
    const shaderModule = this.device.createShaderModule({
      code: shader
    });
    const compilationInfo = await shaderModule.getCompilationInfo();
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
    return new NoopVizualizer();
  }
};
export {
  NoopVizualizer,
  NoopVizualizationBuilder as default
};
