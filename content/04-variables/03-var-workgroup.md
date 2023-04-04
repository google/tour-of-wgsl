---
title: "var<workgroup>"
url: variables/var-workgroup
shader: ./var-workgroup.wgsl
---

`var<workgroup>` declares a mutable variable in the `workgroup` address-space.

The memory of a `var<workgroup>` variable is shared between all the invocations
of the workgroup, but cross-invocation accesses must be synchronised with the use of
[atomics]({{< ref "/02-types/07-atomics" >}}) or
[`workgroupBarrier()`](https://www.w3.org/TR/WGSL/#workgroupBarrier-builtin).

`var<workgroup>` can only be declared at module-scope (global) and is visible to all functions in the module.

A `var<workgroup>` declaration must have an explicit type, and no initializer expression.

The value of the `var<workgroup>` variable will be automatically zero initialized before execution of the workgroup.

Uses of a `var<workgroup>` will always result in a
[runtime]({{< ref "/03-expressions/01-evaluation-stage/03-runtime" >}}) expression.
