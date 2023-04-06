---
title: "For Statements"
shader: ./for.wgsl
visualizer: /ts/value_visualizer.ts
visualizerOptions: '{"fields": [
    {"expr": "for_loop()",  "type": "u32"}
]}'
---

A `for` statement is made up of:
 * optional initializer
 * optional condition
 * optional continuing
 * body

The initializer, condition and continuing are each separated by a `;`.

<details class='example'>
<summary>Example</summary>

```groovy
for (var i = 0; i < 10; i += 1) {
}
```

</details>

Unlike `if` and `switch`, a `for` statement requires parentheses.

Braces are required around the `for` body.

All loops in WGSL **must** terminate.

As with other statement conditions, if provided, the condition must be a
boolean expression.

The condition is evaluated before executing the body on each iteration.
If the condition is `false` the loop will end.

A `break` statement can be used to break out of the closest enclosing
statement.

<details class='example'>
<summary>Example</summary>

```groovy
for (;;) {
  break;
}
```

```groovy
for (;;) {
  const a = 1;
  switch (a) {
    case 1, default: {
      // Breaks the switch, but not the for
      break;
    }
  }
}
```

</details>

A `continue` statement can be used to go to the next iteration
of the enclosing loop.

<details class='example'>
<summary>Example</summary>

```groovy
for (var i = 0; i < 10; i++) {
  if (i == 1) {
    continue;
  }
}
```

</details>
