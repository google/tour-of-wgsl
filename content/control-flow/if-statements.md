---
title: "If Statements"
shader: ./if.wgsl
visualizer: /ts/value_visualizer.ts
visualizerOptions: '{"fields": [
    {"expr": "executed_block()",  "type": "u32"},
    {"expr": "else_block()",  "type": "u32"},
    {"expr": "casted_block()",  "type": "u32"}
]}'
---

For simple branching, the `if` statement is provided for control flow.

An `if` statement requires a condition, which must be a boolean.

The parenthesis are optional around the condition, the braces are
required around the body.

<details class='example'>
<summary>Example</summary>

```
if a {
} else if (b) {
}
```

</details>

An `if` can be followed by zero or more `else if` blocks and a
single optional `else` block.

<details class='example'>
<summary>Example</summary>

```
if a {
} else if b {
} else if c {
} else {
}
```

</details>

The `else` must come last.
