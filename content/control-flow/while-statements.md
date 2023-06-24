---
title: 'While Statements'
shader: ./while.wgsl
visualizer: /ts/value_visualizer.ts
visualizerOptions: '{"fields": [
    {"expr": "while_loop()",  "type": "u32"}
]}'
---

A `while` statement is a control flow statement used to repeatedly execute a block of code as long as a specified condition is true.

Condition must be of type `bool`.

<details class='example'>
<summary>Example</summary>

```groovy
while condition {
  // code
}
```

</details>

> condition in a "while" loop can also be written within parentheses

The condition is evaluated initially. If the condition is false from the beginning, the code block is skipped, and the program continues executing the next line of code after the "while" loop.

After executing the code block, the condition is re-evaluated. If the condition is still true, the code block is executed again. This process continues until the condition becomes false.

Once the condition becomes false, the program exits the "while" loop, and execution continues with the next line of code after the "while" statement.
