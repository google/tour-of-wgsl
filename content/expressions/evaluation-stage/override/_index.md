---
title: "Override expressions"
---

Override-expressions are value expressions that are evaluated at
[pipeline creation](https://www.w3.org/TR/webgpu/#pipelines) time, or earlier.

>Formally, every constant-expression is an override-expression.
>
>When an override-expression is evaluated before pipeline-creation time, that's because
>it's also a constant-expression.
