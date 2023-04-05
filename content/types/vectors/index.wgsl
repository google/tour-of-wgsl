fn a(v : vec2<f32>) {}

fn b(v : vec2f) {
    a(v); // vec2<f32> is equivalent to vec2f
}
