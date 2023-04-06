---
title: "Switch Statements"
shader: ./switch.wgsl
visualizer: /ts/value_visualizer.ts
visualizerOptions: '{"fields": [
    {"expr": "switch_case()",  "type": "u32"},
    {"expr": "switch_default()",  "type": "u32"}
]}'
---

Similar to `if` statements, a `switch` statement can be used to branch
over multiple blocks.

A switch has a condition, the condition must be a [concrete integer
scalar]({{< ref "/types/basic-scalars" >}}) type. The `case`
selectors must have the same type as the condition.

Like with `if`, the parentheses around the condition are
optional.

A switch can have zero or more `case` blocks.

A `default` block is required. Multiple `default` blocks are not
permitted

`case` and `default` blocks require braces.

There is no `fallthrough` in WGSL, but cases can have multiple
selectors. `default` may be included in the multi-selector list.

<details class='example'>
<summary>Example</summary>

```
let a = 4;
switch a {
  case 1, 2, 3: {
  }
  default: {
  }
}

// Default can be included in the selector list
switch a {
  case 1, 2, default: {
  }
}
```

</details>

