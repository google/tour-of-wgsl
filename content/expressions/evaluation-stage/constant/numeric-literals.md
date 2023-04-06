---
title: "Numeric Literals"
---

A WGSL numeric literal is a constant-expression representing a number.
It can optionally have a suffix.

If it does not have a suffix, then its value is of an abstract-numeric type:

* An unsuffixed literal with a decimal point (`1.2`) or exponent (`1e2`) is of type `abstract-float`.
* Otherwise the literal is an `abstract-int`.

Adding a suffix to a numeric literal forces the value to be in a specific type:

<div class='suffix-table'>

| Suffix | Type  |
|--------|-------|
| `i`    | `i32` |
| `u`    | `u32` |
| `f`    | `f32` |

</div>
