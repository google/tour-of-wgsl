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
function align(value, multiple) {
  return Math.round(value / multiple) * multiple;
}
function range(n, f) {
  const out = new Array(n);
  for (let i = 0; i < n; i++) {
    out[i] = f(i);
  }
  return out;
}
function isScalar(ty) {
  switch (ty) {
    case "i32":
    case "u32":
    case "f32":
      return true;
  }
  return false;
}
function isVector(ty) {
  switch (ty) {
    case "vec2i":
    case "vec2u":
    case "vec2f":
    case "vec3i":
    case "vec3u":
    case "vec3f":
    case "vec4i":
    case "vec4u":
    case "vec4f":
      return true;
  }
  return false;
}
function isMatrix(ty) {
  switch (ty) {
    case "mat2x2f":
    case "mat2x3f":
    case "mat2x4f":
    case "mat3x2f":
    case "mat3x3f":
    case "mat3x4f":
    case "mat4x2f":
    case "mat4x3f":
    case "mat4x4f":
      return true;
  }
  return false;
}
function suffixToScalar(suffix) {
  switch (suffix) {
    case "i":
      return "i32";
    case "u":
      return "u32";
    case "f":
      return "f32";
  }
  throw new Error(`unknown suffix ${suffix}`);
}
function vectorInfo(vec) {
  const width = vec.charCodeAt(3) - "0".charCodeAt(0);
  const alignment = width == 2 ? 8 : 16;
  const size = width * 4;
  const el = suffixToScalar(vec[4]);
  return { width, alignment, size, el };
}
function matrixInfo(mat) {
  const columns = mat.charCodeAt(3) - "0".charCodeAt(0);
  const rows = mat.charCodeAt(5) - "0".charCodeAt(0);
  const alignment = rows == 2 ? 8 : 16;
  const columnStride = alignment;
  const size = columnStride * (columns - 1) + rows * 4;
  const el = suffixToScalar(mat[6]);
  return { columns, rows, alignment, size, columnStride, el };
}
function pad(str, width) {
  return `${str}${" ".repeat(width - str.length)}`;
}
function layoutColumns(lhs, rhs) {
  const lhsWidth = Math.max(...lhs.map((l) => l.length));
  const numLines = Math.max(lhs.length, rhs.length);
  return range(numLines, (line) => {
    const lhsLine = lhs[line - Math.floor((numLines - lhs.length) / 2)] ?? "";
    const rhsLine = rhs[line - Math.floor((numLines - rhs.length) / 2)] ?? "";
    return `${pad(lhsLine, lhsWidth)}${rhsLine}`;
  });
}
var ValueVizualizer = class {
  device;
  outputText;
  outputFields;
  pipeline;
  storageBuffer;
  storageBindGroup;
  executeFrequency = "once";
  output = "text";
  constructor(device, outputText, outputFields, pipeline, storageBuffer, storageBindGroup) {
    this.device = device;
    this.outputText = outputText;
    this.outputFields = outputFields;
    this.storageBuffer = storageBuffer;
    this.pipeline = pipeline;
    this.storageBuffer = storageBuffer;
    this.storageBindGroup = storageBindGroup;
  }
  async execute() {
    const outputBuffer = this.device.createBuffer({
      size: this.storageBuffer.size,
      usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ
    });
    const commandEncoder = this.device.createCommandEncoder();
    const passEncoder = commandEncoder.beginComputePass();
    passEncoder.setPipeline(this.pipeline);
    passEncoder.setBindGroup(0, this.storageBindGroup);
    passEncoder.dispatchWorkgroups(1);
    passEncoder.end();
    commandEncoder.copyBufferToBuffer(
      this.storageBuffer,
      0,
      outputBuffer,
      0,
      this.storageBuffer.size
    );
    this.device.queue.submit([commandEncoder.finish()]);
    await outputBuffer.mapAsync(GPUMapMode.READ);
    const buffer = outputBuffer.getMappedRange();
    const i32s = new Int32Array(buffer);
    const u32s = new Uint32Array(buffer);
    const f32s = new Float32Array(buffer);
    let offset = 0;
    const scalar = (ty) => {
      const index = offset / 4;
      offset += 4;
      switch (ty) {
        case "i32":
          return `${i32s[index]}`;
        case "u32":
          return `${u32s[index]}`;
        case "f32":
          return `${f32s[index]}`;
      }
    };
    const vec = (ty) => {
      const vec2 = vectorInfo(ty);
      offset = align(offset, vec2.alignment);
      return `(${range(vec2.width, (i) => scalar(vec2.el)).join(", ")})`;
    };
    const mat = (ty) => {
      const mat2 = matrixInfo(ty);
      const baseOffset = align(offset, mat2.alignment);
      let cellWidth = 1;
      const lines = range(mat2.rows, (row) => {
        return range(mat2.columns, (column) => {
          offset = baseOffset + mat2.columnStride * column + row * 4;
          const cell = scalar(mat2.el);
          cellWidth = Math.max(cellWidth, cell.length);
          return cell;
        });
      });
      offset = baseOffset + mat2.size;
      const headerFooterPadding = pad("", (cellWidth + 1) * mat2.columns + 1);
      return [
        `\u256D${headerFooterPadding}\u256E`,
        ...lines.map((row) => `\u2502 ${row.map((cell) => `${pad(cell, cellWidth)}`).join(" ")} \u2502`),
        `\u2570${headerFooterPadding}\u256F`
      ];
    };
    const results = [];
    for (const f of this.outputFields) {
      if (isScalar(f.type)) {
        results.push(`${f.expr}: ${scalar(f.type)}`);
        continue;
      }
      if (isVector(f.type)) {
        results.push(`${f.expr}: ${f.type}${vec(f.type)}`);
        continue;
      }
      if (isMatrix(f.type)) {
        results.push(layoutColumns([`${f.expr}: ${f.type}`], mat(f.type)).join("\n"));
        continue;
      }
    }
    this.outputText.innerText = results.join("\n\n");
  }
};
var ValueVizualizerBuilder = class {
  outputFields;
  outputText = null;
  device = null;
  constructor(options) {
    if (options === null) {
      throw new VisualizerError(
        "ValueVizualizerBuilder requires the JSON options: {'fields': [{'expr': 'value', 'type': 'i32'}, ...]}'"
      );
    }
    const config = JSON.parse(options);
    this.outputFields = config.fields;
  }
  /**
   * @inheritDoc VisualizationBuilder.configure
   */
  async configure(output) {
    const adapter = await navigator.gpu.requestAdapter();
    if (adapter === null) {
      throw new VisualizerError("unable to request webgpu adapter");
    }
    this.device = await adapter.requestDevice();
    if (this.device === null) {
      throw new VisualizerError("unable to get WebGPU device");
    }
    let h = document.createElement("h2");
    h.innerText = "Results";
    output.appendChild(h);
    const text = document.createElement("pre");
    text.setAttribute("id", "wgsl-tour-output-text");
    output.appendChild(text);
    this.outputText = text;
  }
  /**
   * @inheritDoc VisualizationBuilder.build
   */
  async build(shader) {
    if (this.device === null || this.outputText === null) {
      throw new VisualizerError("visualizer not configured");
    }
    let storageBufferSize = 0;
    for (const field of this.outputFields) {
      if (isScalar(field.type)) {
        storageBufferSize += 4;
        continue;
      }
      if (isVector(field.type)) {
        const vec = vectorInfo(field.type);
        storageBufferSize += align(storageBufferSize, vec.alignment) + vec.size;
        continue;
      }
      if (isMatrix(field.type)) {
        const mat = matrixInfo(field.type);
        storageBufferSize += align(storageBufferSize, mat.alignment) + mat.size;
        continue;
      }
    }
    shader += `
@group(0) @binding(0) var<storage, read_write> wgsl_tour_output : WGSLTourOutput;

struct WGSLTourOutput {
  ${this.outputFields.map((field, i) => `v${i} : ${field.type},`).join("\n  ")}
}

@compute @workgroup_size(1)
fn main() {
  ${this.outputFields.map((field, i) => `wgsl_tour_output.v${i} = ${field.expr};`).join("\n  ")}
}
`;
    this.device.pushErrorScope("validation");
    const shaderModule = this.device.createShaderModule({
      code: shader
    });
    const compilationInfo = shaderModule.getCompilationInfo ? await shaderModule.getCompilationInfo() : await shaderModule.compilationInfo();
    if (compilationInfo.messages.length !== 0) {
      this.outputText.innerHTML = "";
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
    const pipeline = this.device.createComputePipeline({
      layout: "auto",
      compute: {
        module: shaderModule,
        entryPoint: "main"
      }
    });
    const err = await this.device.popErrorScope();
    if (err !== null) {
      this.outputText.innerHTML = "";
      throw new VisualizerError(err.message);
    }
    const storageBuffer = this.device.createBuffer({
      size: storageBufferSize,
      usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC
    });
    const storageBindGroup = this.device.createBindGroup({
      layout: pipeline.getBindGroupLayout(0),
      entries: [
        {
          binding: 0,
          resource: {
            buffer: storageBuffer
          }
        }
      ]
    });
    return new ValueVizualizer(
      this.device,
      this.outputText,
      this.outputFields,
      pipeline,
      storageBuffer,
      storageBindGroup
    );
  }
};
export {
  ValueVizualizer,
  ValueVizualizerBuilder as default
};
