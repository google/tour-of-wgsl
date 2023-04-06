---
title: "Fixed-Size Arrays"
shader: ./fixed-size-arrays.wgsl
visualizer: /ts/value_visualizer.ts
visualizerOptions: '{"fields": [
    {"expr": "ith_fib",  "type": "i32"},
    {"expr": "ith_zero", "type": "u32"}
]}'
---

A fixed-size array type is declared as {{< array "array<(T),(N)>" >}}, where
{{< array "(T)" >}} is the element type (with some restrictions), and 
{{< array "(N)" >}} is the element count.

In most cases {{< array "(N)" >}} is a
[const-expression]({{< ref "expressions/evaluation-stage/constant" >}}).

> There is one exception to this rule:
> When the array is used as the type of a workgroup variable, 
> {{< array "(N)" >}} can be an [override-expression]({{< ref "expressions/evaluation-stage/override" >}}).
> That means the array size can be adjusted at
> [pipeline-creation time]({{< ref "expressions/evaluation-stage/overview" >}}).
> It's still "fixed" before the shader executes.

<details class='example'>
<summary>Examples:</summary>

|                          |                                                                     |
|--------------------------|---------------------------------------------------------------------|
| `array<f32,5>`           | A 5-element array of `f32`.                                         |
| `array<array<f32,4>,8>`  | An array of 8 arrays of 4 f32's.                                    |
| `array<S,c>`             | An array of `c` elements of type `S`. Here `c` must be const-declared. |
| `array<i32,4*blockSize>` | An array of i32 with 4 * `blockSize` elements. Here `blockSize` must be const-declared. |

</details>

With the one exception above, fixed-size array values can be used like other plain values, for example:
* in an expression,
* passed as a function argument,
* returned from a function,
* assigned to a variable, or
* used as the initializer for a variable or declared value.

