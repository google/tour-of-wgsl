---
title: "Matrix constructors"
shader: ./constructors.wgsl
visualizer: /ts/value_visualizer.ts
visualizerOptions: '{"fields": [
    {"expr": "zero_init",  "type": "mat3x4f"},
    {"expr": "column_wise",  "type": "mat3x2f"},
    {"expr": "scalar_wise",  "type": "mat2x3f"}
]}'
---

Matrices have three kinds of constructors:

1. Zero-value constructor: {{< mat "mat(C)x(R)f()" >}} or {{< mat "mat(C)x(R)<f32>()" >}}

   <details class='example'>
     <summary>Example</summary>

   `mat3x2f()` constructs a `mat3x2f` with zero-values for each of the elements.

   </details>

1. Column-wise constructor: {{< mat "mat(C)x(R)<f32>(column_0, column_1, ...)" >}}

   <details class='example'>
     <summary>Example</summary>

   `mat2x4f(c0, c1)` constructs a `mat2x4<f32>`, when both `c0` and `c1` are
   of type `vec4<f32>`. \
   The first column is `c0`, and the second column is `c1`.

   </details>

1. Scalar-wise constructor: {{< mat "mat(C)x(R)<f32>(column_0_row_0, column_0_row_1, ...)" >}}

   <details class='example'>
     <summary>Example</summary>

   `mat2x3f(a, b, c, d, e, f)` constructs a `mat2x3<f32>` with the given elements:

   <div class='ascii'>

   ```ascii
   ╭      ╮
   │ a  d │
   │ b  e │
   │ c  f │
   ╰      ╯
   ```

   </div>
   </details>
