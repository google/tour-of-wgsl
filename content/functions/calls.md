---
title: "Function Calls"
shader: ./calls.wgsl
---

Functions can be declared in any order.

Function calls cannot be recursive, either directly:
```rust
fn a() {
  a(); // error
}
```

or indirectly:

```rust
fn a() {
  b(); // error
}
fn b() {
  a(); // error
}
```
