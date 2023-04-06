---
title: "Atomic types"
shader: ./atomic-types.wgsl
---

Atomic operations only work on 32-bit integers.

An atomic type is specified as {{< atomic "atomic<(T)>" >}}, where {{< atomic "(T)" >}} is i32 or u32.

An atomic type can only appear in the store type for a variable in the
`workgroup` or `storage` address space.

Atomic types are not [constructible](https://w3.org/TR/WGSL#constructible),
and so they **cannot** *directly* be used:
* in an expression,
* passed as a function argument,
* returned from a function,
* *assigned* to a variable, or
* used as an initializer expression.

Remember, only [atomic builtin functions](https://www.w3.org/TR/WGSL/#atomic-builtin-functions)
operate on atomic types, and only when accessed from memory.
Pass a *pointer* to the memory to the builtin function.
