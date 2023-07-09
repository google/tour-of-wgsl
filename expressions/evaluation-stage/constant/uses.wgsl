// Declare a 'const'
const my_constant = 4;

// Assert at shader creation time that my_constant is even
const_assert (my_constant & 1) == 0;

// Use my_constant to declare an array size
alias my_array = array<i32, my_constant*2>;

// Use my_constant to specify the workgroup size of a compute entry point
@compute @workgroup_size(my_constant)
fn compute_main() {}

// Use my_constant as the argument to a @location attribute
struct VertexInput {
    @location(my_constant) texcoords : vec2f,
};

@vertex
fn vertex_main(input : VertexInput) -> @builtin(position) vec4f {
    return vec4f();
}
