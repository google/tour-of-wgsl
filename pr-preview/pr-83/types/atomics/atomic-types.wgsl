var<workgroup> item_sum: atomic<i32>;

fn what_is_the_sum_now() -> i32 {
  return atomicLoad(&item_sum);
}
fn reset_sum() {
  atomicStore(&item_sum, 0);
}

struct Queue {
  read_count: atomic<u32>,
  write_count: atomic<u32>,
  items: array<i32>,
}
@group(0) @binding(0)
var<storage,read_write> work: Queue;

//var<private> bad_private: atomic<u32>; // Error: wrong address space

fn helper() {
  //var bad: atomic<u32>; // Error: wrong address space
}

