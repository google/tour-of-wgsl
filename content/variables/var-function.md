---
title: "var<function>"
shader: ./var-function.wgsl
visualizer: /ts/value_visualizer.ts
visualizerOptions: '{"fields": [{"expr": "f()", "type": "i32"}]}'
---

`var<function>` declares a mutable variable in the `function` address-space.

A `var<function>` can only be declared within a function.

A `var<function>` declaration must have an explicit type, an initializer,
or both type and initializer:

```rust
var<function> var_with_explicit_type : i32;
var<function> var_with_type_inferred_from_initializer = 42;
var<function> var_with_explicit_type_and_initializer : i32 = 42;
```

A `var<function>` with no initializer will be automatically initialized with
the zero value for the variable's type.

There are no restrictions for the
[evaluation stage]({{< ref "/expressions/evaluation-stage" >}})
of the initializer of a `var<function>`.

A `var` declared within a function has the default address-space of `function`,
and so most developers will simply omit the `<function>` and just type `var`:

```rust
var this_is_more_common : i32;
```

Each shader invocation will have a unique instance of a `var` in function address-space.

Uses of a `var<function>` will always result in a
[runtime]({{< ref "/expressions/evaluation-stage/runtime" >}}) expression.
