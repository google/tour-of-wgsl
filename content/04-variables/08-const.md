---
title: "const"
url: variables/const
---

A `const` declaration gives a name to a
[constant]({{< ref"/03-expressions/01-evaluation-stage/01-constant" >}}) immutable value.

A `const` can be declared at module-scope or within a function.

A `const` declaration must have an initializer, and can have an optional type:

```rust
const const_with_explicit_type : i32 = 42;
const const_with_type_inferred_from_initializer = 42;
```

The initializer of a `const` must be a
[runtime]({{< ref "/03-expressions/01-evaluation-stage/03-runtime" >}}) expression.
