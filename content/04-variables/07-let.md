---
title: "let"
url: variables/let
---

A `let` declaration gives a name to a
[runtime]({{< ref "/03-expressions/01-evaluation-stage/03-runtime" >}}) immutable value.

A `let` can only be declared within a function.

A `let` declaration must have an initializer, and can have an optional type:

```rust
let let_with_explicit_type : i32 = 42;
let let_with_type_inferred_from_initializer = 42;
```

There are no restrictions for the
[evaluation stage]({{< ref "/03-expressions/01-evaluation-stage" >}}) of
the initializer of a `let`.

Unlike `var`, a `let` can be of a pointer type.
