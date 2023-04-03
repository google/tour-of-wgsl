---
IsHome: true
title: WGSL
shader: ./index.wgsl
visualizer: /ts/graphics_visualizer.ts
---

# Welcome to the tour of WGSL

This site is a quick introduction to the [WebGPU Shading
Language](https://w3.org/TR/WGSL). The tour provides an overview
of the syntax and features of WGSL, but assumes a familiarity with
programming.

The tour provides the WGSL shaders for each example. The shaders can be
edited in the text view on the right, and the resulting output is displayed
below the editor. The examples should run automatically when edited, and
compilation errors will be displayed in the editor pane. Compilation errors
will also appear in the JavaScript console, so it may be handy to keep
that open too.

Each of these shaders can serve as the starting point for your own
exploration.

> As a warmup, edit the `frag_main` function on the right. Change its return
> value from `vec4(1, 0, 0, 1)` to `vec4(0, 1, 0, 1)`. What happens?

The tour is organized into sections:

{{< sections >}}

Each section has several sub-pages, and you can navigate forward
and backward using the buttons on the bottom of each page.
You can quickly get back to a higher level page using the breadcrumb
links at the top of this pane.
