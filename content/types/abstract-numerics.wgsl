const pi = 3.14159265359; // 'pi' is of type abstract-float
const two = 2;            // 'two' is of type abstract-int

// 'two_pi' is an abstract-float
// 'two' was implicitly converted from an abstract-int to abstract-float for the
// multiplication, which is performed with 64-bit floating point precision.
const two_pi = pi * two;

// Abstract-ints can implicitly convert to i32, u32, f32
const implicitly_convert_abstract_int_to_i32 : i32 = 100;
const implicitly_convert_abstract_int_to_u32 : u32 = 100;
const implicitly_convert_abstract_int_to_f32 : f32 = 100;

// Abstract-float can implicitly convert to f32
const implicitly_convert_abstract_float_to_f32 : f32 = 100.0 + 1e2;

fn f() {
    // If you use an abstract-numeric to initialize a var, let or override
    // without an explicit type, then the abstract-numeric will implicitly
    // convert to its default concrete type.
    var default_concrete_type_for_abstract_int = 12;     // abstract-int will default to i32
    var default_concrete_type_for_abstract_float = 12.3; // abstract-float will default to f32

    var check_is_i32 : i32 = default_concrete_type_for_abstract_int;
    var check_is_f32 : f32 = default_concrete_type_for_abstract_float;
}
