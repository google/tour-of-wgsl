---
title: "Structures"
shader: ./index.wgsl
visualizer: /ts/value_visualizer.ts
visualizerOptions: '{"fields": [
    {"expr": "a_bicycle.num_wheels",  "type": "u32"},
    {"expr": "a_bicycle.mass_kg",  "type": "f32"},
    {"expr": "bike_num_wheels",  "type": "u32"},
    {"expr": "all_zeros_vehicle.num_wheels",  "type": "u32"},
    {"expr": "all_zeros_vehicle.mass_kg",  "type": "f32"}
]}'
---

A structure type is a named grouping of member values.
Each member has a name and a data type.

Declare structures at module scope, separating their member-specifiers with commas.

Use dot-member notation to get at a member of a structure:
* `chair.height` is the `height` member of the `chair` structure value.

Use a functional form to create a structure value:
* `MyStruct(a,b,c)` creates a `MyStruct` structure value with members being the values of expressions
   `a`,`b`,`c`.
   The expressions must match the member types.
* `MyStruct()` creates a `MyStruct` value with all zero members.
    This works if `MyStruct` is [constructible](http://w3.org/TR/WGSL#constructible).
