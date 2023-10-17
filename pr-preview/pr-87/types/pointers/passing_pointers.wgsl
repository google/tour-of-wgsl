var<private> first_count: u32;
var<private> second_count: u32;
fn reset_counter(p: ptr<private,u32>) { *p = 0; }
fn reset_function_counter(p: ptr<function,u32>) { *p = 0; }

fn init_counters() {
  reset_counter(&first_count);
  reset_counter(&second_count);
  var i: u32 = 12;
  reset_function_counter(&i);
  // Now i is 0;
}

// fn bad_address_space(p: ptr<workgroup,u32>) { } // Error: invalid address space

struct Cursor {
  read_at: u32,
  write_at: u32,
}
var<private> cursor: Cursor;
fn bad_pass_ptr_to_part_of_composite() {
  //reset_counter(&cursor.read_at); // Error: Can't pass pointer to part of composite
}
