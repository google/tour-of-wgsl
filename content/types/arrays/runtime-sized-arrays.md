---
title: "Runtime-Sized Arrays"
shader: ./runtime-sized-arrays.wgsl
---

Runtime-sized arrays can only be used with storage buffer resources.

The runtime-sized array either covers the whole buffer,
or is the last member of a struct that describes the whole buffer.

The element count is determined at runtime: it's as large as it can be while still fitting
within size of the [buffer binding](https://w3.org/TR/WebGPU/#dictdef-gpubufferbinding)
associated with the variable.

Use the `arrayLength` builtin function to get the element count.

Runtime-sized arrays can be indexed, but can't be passed around like other ordinary values.
