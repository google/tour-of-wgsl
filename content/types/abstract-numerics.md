---
title: "Abstract-numerics"
shader: ./abstract-numerics.wgsl
---

An abstract-numeric type is one of:

* `abstract-float`: a 64-bit floating point type.
* `abstract-int`: a 64-bit signed integer type.

Abstract-numerics allow high-precision values to be computed for constant-expressions.
These computations occur at compile time on the CPU ---
just like your JavaScript or WASM --- and not on the GPU.

Abstract-numerics have some special properties:

* **Abstract-numeric types can't be spelled in WGSL source code**

  You cannot explicitly *name* an abstract-numeric type, but they exist as the type
  of unsuffixed [numeric literals]({{< ref "/expressions/evaluation-stage/constant/numeric-literals" >}}),
  and some constant-expressions.

* **Only constant-expressions can be of abstract-numeric type**

  Abstract-numeric values must first be converted to a concrete (non-abstract) type
  for use as an [override-expression]({{< ref "/expressions/evaluation-stage/override" >}})
  or as a [runtime-expression]({{< ref "/expressions/evaluation-stage/runtime" >}}).

* **Abstract-numeric expressions must be finite**

  Compilation fails if an abstract-numeric expression
  overflows, wraps, or produces an infinity or a NaN.

* **Unlike other types in WGSL, abstract-numerics support implicit type conversion**

  An `abstract-int` can implicitly convert to a `i32`, `u32`, `f32` or `abstract-float`.

  An `abstract-float` can implicitly convert to a `f32`.

  Abstract-numeric values can also be explicitly converted using the standard conversion syntax.

  Sometimes no explicit target type is specified to receive an abstract-numeric expression.
  For example, this occurs when an abstract-numeric expression is the initializer for
  a `var`, `let`, or `override` declaration.
  In this situation, a default conversion is performed:

   * An `abstract-int` value will convert to `i32`.
   * An `abstract-float` value will convert to `f32`.

