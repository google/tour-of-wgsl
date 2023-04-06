const first_fibs = array<i32, 7>(1,1,2,3,5,8,13);

const i = 4;
const ith_fib = first_fibs[i];

// The element count can be a constant expression.
// array<i32,7> and array<i32, 2 * three + 1 > are the same type.
const three = 3;
const fibs_copy: array<i32, 2 * three + 1> = first_fibs;

// A no-argument array constructor fills the array with zeros.
const nine_zero_array = array<u32, 9>();
const ith_zero = nine_zero_array[i];

// A function that returns a fixed-size array.
fn get_two_fibs(i: u32, j: u32) -> array<i32,2> {
   // This constructor infers the element type and element count.
   return array(first_fibs[i], first_fibs[j]);
}
