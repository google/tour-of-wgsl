---
title: "@must_use"
url: functions/must-use
shader: ./must-use.wgsl
---

Functions may be marked with a `@must_use` attribute which makes it a
compile time error to not assign the result of the function.

Many of the builtin functions are marked as `@must_use`.
