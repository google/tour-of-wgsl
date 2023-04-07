---
title: "No Aliasing In Any Nested Call"
shader: ./no_aliasing_nested_calls.wgsl
---

The no-aliasing rule for pointer parameters checks for
conflicting accesses in **any nested function call**.

This is the rule again, but with particular emphasis:
* a pointer is passed as an argument to user-declared function, and
* the called function, **or one of the stack of functions it may call**, 
       has two views (pointer, reference, or both) into the same original variable, and
* there is a potential write via one of those views.

The code sample shows valid and invalid cases where a helper function writes
via a pointer parameter `p1`, and reads from a pointer parameter `p2`.
It is an error for `p1` to alias `p2`.

The analysis checks for a conflict in the directly called function, or any
deeply nested call.

