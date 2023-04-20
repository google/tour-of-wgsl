---
title: "No Aliasing Allowed With Pointer Paramters"
shader: ./no_aliasing.wgsl
---

Pointer parameters to user-declared functions are not allowed to alias
when there is a potential write via the pointer or its alias.

In more detail, shader creation fails if:
* a pointer is passed as an argument to user-declared function, and
* the called function, or one of the stack of functions it may call, 
       has two views (pointer, reference, or both) into the same original variable, and
* there is a potential write via one of those views.

The check for a potential write is a static analysis, ignoring control flow.

The code sample shows valid and invalid cases where a helper function writes
via a pointer parameter `p`, but reads from a module-scope variable `x`.
It is an error for `p` to alias `x`.
