---
title: "If Statements"
url: control-flow/if-statements
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

<pre><code>if a {
} else if (b) {
}</code></pre>

</details>

An `if` can be followed by zero or more `else if` blocks and a
single optional `else` block.

<details class='example'>
<summary>Example</summary>

<pre><code>if a {
} else if b {
} else if c {
} else {
}</code></pre>

</details>

The `else` must come last.
