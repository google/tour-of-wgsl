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
below the editor.

The editor provides:
* Automatic execution of the entered shader.
* Inline error messages for shader compilation errors.
  Note, errors also appear in the developer console, so it maybe handle
  to also keep that open.
* Pressing `ctrl-o` when the cursor is on an attribute (e.g. `@builtin`)
  a builtin value (e.g. `vertex_index`) or many of the builtin functions
  (e.g. `sin`) to show documentation on selected element.

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
