---
title: "Uses"
shader: ./uses.wgsl
---

Since constant-expressions are evaluated at shader creation time,
they can be used anywhere you might use a literal.

Constant-expressions can also be used by a `const_assert` statement.
The shader will not compile if the expression evaluates to `false`.
