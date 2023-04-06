---
title: "Structures"
shader: ./index.wgsl
visualizer: /ts/value_visualizer.ts
visualizerOptions: '{"fields": [
    {"expr": "an_average_infant.age_years",  "type": "u32"},
    {"expr": "an_average_infant.height_m",  "type": "f32"},
    {"expr": "an_average_infant.mass_kg",  "type": "f32"},
    {"expr": "average_infant_height",  "type": "f32"},
    {"expr": "all_zeros_person.age_years",  "type": "u32"},
    {"expr": "all_zeros_person.height_m",  "type": "f32"},
    {"expr": "all_zeros_person.mass_kg",  "type": "f32"}
]}'
---

A structure type is a named grouping of named data members.

Declare structures at module scope, separating their field-specifiers with commas.

To get at a member, follow the structure expression with a dot, then the name of the member.

Use a functional form to create a structure:
* `MyStruct(a,b,c)` creates a `MyStruct` structure value with members being the values of expressions
   `a`,`b`,`c`.
   The expressions must match the member types.
* `MyStruct()` creates a `MyStruct` value with all zero members, when `MyStruct` is [constructible](http://w3.org/TR/WGSL#constructible).
