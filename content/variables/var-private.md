---
title: "var<private>"
shader: ./var-private.wgsl
visualizer: /ts/value_visualizer.ts
visualizerOptions: '{"fields": [{"expr": "f()", "type": "i32"}]}'
---

`var<private>` declares a mutable variable in the `private` address-space.

`var<private>` is almost identical to `var<function>`, except that
`var<private>` can only be declared at module-scope (global) and is visible
to all functions in the module.

Like `var<function>`, a `var<private>` declaration must have an explicit type,
an initializer, or both type and initializer:

```rust
var<private> var_with_explicit_type : i32;
var<private> var_with_type_inferred_from_initializer = 42;
var<private> var_with_explicit_type_and_initializer : i32 = 42;
```

A `var<private>` with no initializer will be automatically initialized with
the zero value for the variable's type.

The initializer for `var<private>` must be a
[constant]({{< ref "/expressions/evaluation-stage/constant" >}}) expression.

Each shader invocation will have a unique instance of a `var` in private address-space.

Uses of a `var<private>` will always result in a
[runtime]({{< ref "/expressions/evaluation-stage/runtime" >}}) expression.
