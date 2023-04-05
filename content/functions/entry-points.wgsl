@compute @workgroup_size(32)
fn my_awesome_compute_shader() {
}

@vertex
fn vertex_entry_point(@builtin(vertex_index) idx : u32) -> @builtin(position) vec4f {
    return vec4f(f32(idx%2-1), f32(idx/2-1), 1, 1);
}

@fragment
fn fragment_main(@builtin(position) pos : vec4f) -> @location(0) vec4f {
    return vec4(0, 1, 0, 1);
}

@compute @workgroup_size(16)
fn another_compute_entry_point() {
}
