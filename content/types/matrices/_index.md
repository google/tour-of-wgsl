---
title: "Matrices"
shader: ./index.wgsl
---

WGSL supports matrices between 2x2 and 4x4 `f32` elements.

WGSL matrices are column-major.

Matrices are declared with the form {{< mat "mat(C)x(R)<f32>" >}}, where {{< mat "(C)" >}} is the number of columns in the matrix, {{< mat "(R)" >}} is the number of rows in the matrix.

<details class='example'>
  <summary>Example</summary>

|                |                                                    |
|----------------|----------------------------------------------------|
| `mat2x3<f32>`  | A matrix with two columns and three rows of `f32`. |
| `mat4x2<f32>`  | A matrix with four columns and two rows of `f32`.  |

</details>

{{< mat "mat(C)x(R)<(T)>" >}} can be thought as {{< mat "(C)" >}} column vectors of {{< mat "vec(R)<(T)>" >}}.

WGSL also predeclares the alias {{< mat "mat(C)x(R)f" >}} to {{< mat "mat(C)x(R)<f32>" >}}.
