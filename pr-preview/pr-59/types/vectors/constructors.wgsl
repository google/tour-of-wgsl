const zero_init = vec2f();

const splat = vec2u(9);

const construct_with_scalars = vec3f(4, 3, 2);

const construct_mix_of_scalar_and_vec = vec4i(10, vec2i(20, 30), 40);

const convert_vec3f_to_vec3u = vec3u(vec3f(5, 7.5, 10));

// 'infer_type' is a vec3 of abstract-float.
// The abstract-int arguments are implicitly converted to abstract-float.
const infer_type = vec3(1, 2.5, 4);

// Vectors of abstract-numerics can implictly convert to a concrete type.
const implict_abstract_convert : vec3f = infer_type;
