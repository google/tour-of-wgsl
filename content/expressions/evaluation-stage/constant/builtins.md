---
title: "@const built-ins"
shader: ./builtins.wgsl
visualizer: /ts/value_visualizer.ts
visualizerOptions: '{"fields": [{"expr": "angle_rad", "type": "f32"}]}'
---

All the [WGSL built-in functions](https://www.w3.org/TR/WGSL/#builtin-functions)
annotated with `@const` can be evaluated at
[shader creation time](https://www.w3.org/TR/webgpu/#dom-gpudevice-createshadermodule).

When a call to such a function has only constant-expression arguments, then the call
itself is a constant-expression.
