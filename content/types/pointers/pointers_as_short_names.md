---
title: "Pointers As Short Names"
shader: ./pointers_as_short_names.wgsl
---

Inside a function, combine `&` with a [let-declaration]({{< ref "variables/let" >}})
to create a short name for something in a larger structure, as in the example.

You may have to use parentheses around the dereference, because
member access and array indexing bind more tightly.

```rust
struct Particle {
  pos: vec3f
}
var<private> particles: array<Particle,10>;

fn f(i: i32) {
  let p = &particles[i];

  // This works.
  (*p).pos = vec3f();

  // This left hand side is an error, because it means
  // *(p.pos), and you can't do member access on a pointer.
  *p.pos = vec3f();
}
```


