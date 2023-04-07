---
title: "Vector constructors"
shader: ./constructors.wgsl
visualizer: /ts/value_visualizer.ts
visualizerOptions: '{"fields": [
   {"expr": "zero_init",                       "type": "vec2f"},
   {"expr": "splat",                           "type": "vec2u"},
   {"expr": "construct_with_scalars",          "type": "vec3f"},
   {"expr": "construct_mix_of_scalar_and_vec", "type": "vec4i"},
   {"expr": "convert_vec3f_to_vec3u",          "type": "vec3u"},
   {"expr": "infer_type",                      "type": "vec3f"},
   {"expr": "implict_abstract_convert",        "type": "vec3f"}
]}'
---

Vectors have three kinds of constructors:

1. Zero-value constructor: {{< vec "vec(N)(S)()" >}} or {{< vec "vec(N)<(T)>()" >}}

   This constructs a vector with the zero-value for all elements.

   <details class='example'>
     <summary>Example</summary>

     `vec2f()` constructs a `vec2f` with zero-values for each of the elements.

     `vec3<bool>()` constructs a `vec3<bool>` with `false` for each of the elements.

   </details>

1. 'Splat' constructor: {{< vec "vec(N)(S)(value)" >}} or {{< vec "vec(N)<(T)>(value)" >}}

   This constructs a vector with the same value for all elements.

   <details class='example'>
     <summary>Example</summary>

    `vec4i(5)` constructs a `vec4<i32>` with `5` replicated in all 4 elements of the vector.

    `vec2<bool>(true)` constructs a `vec2<bool>` with `true` for both of the elements.

   </details>

1. Element-wise constructor: {{< vec "vec(N)(S)(x, y, ...)" >}} or {{< vec "vec(N)<(T)>(x, y, ...)" >}}

   This constructs a vector with the elements assigned the respective argument value.

   <details class='example'>
     <summary>Example</summary>

     `vec3u(1, 2, 3)` constructs a `vec3<u32>` with the `.x`, `.y`, and `.z` elements initialized with `1`, `2`, and `3`, respectively.

     `vec2<bool>(true, false)` constructs a `vec2<bool>` with `.x`, and `.y` elements initialized with `true` and `false`, respectively.

   </details>

   If an constructor argument is a vector, then the elements of that vector are used as if they were passed separately.

   <details class='example'>
     <summary>Example</summary>

     `vec4f(1, vec2(2, 3), 4)` constructs a `vec4<f32>` with the `.x`, `.y`, `.z` and `.w` elements initialized with `1`, `2`, `3`, and `4`, respectively.

   </details>

The short-hand vector constructors {{< vec "vec(N)(value)" >}} and {{< vec "vec(N)(x, y, ...)" >}} infer the element type from the arguments:

<details class='example'>
<summary>Example</summary>

   `vec4(1i)` constructs a `vec4<i32>` with `1` replicated in all four elements of the vector.

   `vec2(1, 2)` constructs a two-element vector of type `abstract-int`, with `.x` and `.y` elements initialized with `1`, `2`, respectively.

   `vec2(1, 2.5)` constructs a two-element vector of type `abstract-float`, with `.x` and `.y` elements initialized with `1.0`, `2.5`, respectively.

</details>

Vectors with a different element type but the same number of elements can be element-wise converted, with {{< vec "vec(N)<(T)>(vector_expr)" >}}.
