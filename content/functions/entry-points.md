---
title: "Entry Points"
shader: ./entry-points.wgsl
---

Functions annotated with `@vertex`, `@fragment` or `@compute` are shader entry points.

Entry point names are not special, but must match the
[`entryPoint`](https://www.w3.org/TR/webgpu/#dom-gpuprogrammablestage-entrypoint)
name specified at pipeline creation time.

A WGSL module can contain multiple shader entry points.
