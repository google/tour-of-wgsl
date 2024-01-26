---
title: "Pointers As Function Parameters"
shader: ./passing_pointers.wgsl
---

Pointers can be passed into functions.

A few builtin functions take pointer parameters, such as
[arrayLength](https://w3.org/TR/wgsl/#arrayLength-builtin) and
the [atomic builtins](https://w3.org/TR/wgsl/#atomic-builtin-functions).

Pointer aliases are not allowed when there is a potential write through one of them.
We'll explain more on the [next page]({{< ref "types/pointers/no_aliasing" >}}).

{{< check_wgsl_feature "unrestricted_pointer_parameters" >}}

Without the [`unrestricted_pointer_parameters`](https://www.w3.org/TR/WGSL/#language-extensions-sec) language extension, pointer parameters to **user-declared** functions have two additional restrictions:

1. Only pointers into `function` or `private` address spaces are allowed.
2. Only pointers to whole variables can be used.
    * You can't pass the address of only part of a composite variable.

> These constraints make it safe to translate WGSL pointer parameters as `inout` parameters
> in HLSL and GLSL.

The rules for passing pointers into builtin functions are less strict,
and are not covered by this tour.
