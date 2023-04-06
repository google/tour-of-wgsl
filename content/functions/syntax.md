---
title: "Syntax"
shader: ./syntax.wgsl
---

Functions are declared with `fn`.

A function `f` with no parameters and no return type has the form:

```rust
fn f() {
  // function body
}
```

Function parameters are comma-separated, and declared between the `()`.
They have the form `name : type`.

```rust
fn f(a : vec4f, b : i32) {
  // function body
}
```

Functions that return a value declare the function's return type between the parameter list and the function body.
The return type of this function is `vec3f`:

```rust
fn negate(v : vec3f) -> vec3f {
  return -v;
}
```
