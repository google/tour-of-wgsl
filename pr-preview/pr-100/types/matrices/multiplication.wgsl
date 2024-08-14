const m2x3 = mat2x3f(1, 2, 3, 4, 5, 6);

const mul_s_by_m2x3 : mat2x3f = 10 * m2x3;

const mul_m2x3_by_s : mat2x3f = m2x3 * 10;

//             ╭      ╮   ╭                 ╮
//             │ 1  4 │   │ 1×9 + 2×8 + 3×7 │
// [9, 8, 7] × │ 2  5 │ = │ 4×9 + 5×8 + 6×7 │
//             │ 3  6 │   ╰                 ╯
//             ╰      ╯
const mul_v3_by_m2x3 : vec2f = vec3(9, 8, 7) * m2x3;

// ╭      ╮   ╭   ╮   ╭           ╮
// │ 1  4 │   │ 9 │   │ 1×9 + 4×8 │
// │ 2  5 │ × │ 8 │ = │ 2×9 + 5×8 │
// │ 3  6 │   ╰   ╯   │ 3×9 + 6×8 │
// ╰      ╯           ╰           ╯
const mul_m2x3_by_v2 : vec3f = m2x3 * vec2(9, 8);

const mul_m2x3_by_m4x2 : mat4x3f = m2x3 * mat4x2f(7, 8, 9, 10, 11, 12, 13, 14);
