---
title: "Matrix multiplication"
shader: ./multiplication.wgsl
visualizer: /ts/value_visualizer.ts
visualizerOptions: '{"fields": [
    {"expr": "m2x3",             "type": "mat2x3f"},
    {"expr": "mul_s_by_m2x3",    "type": "mat2x3f"},
    {"expr": "mul_m2x3_by_s",    "type": "mat2x3f"},
    {"expr": "mul_v3_by_m2x3",   "type": "vec2f"},
    {"expr": "mul_m2x3_by_v2",   "type": "vec3f"},
    {"expr": "mul_m2x3_by_m4x2", "type": "mat4x3f"}
]}'
---

Matrices support multiplcation with matrices, vectors and scalars.
