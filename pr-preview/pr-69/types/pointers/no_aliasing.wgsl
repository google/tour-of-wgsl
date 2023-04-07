fn f1(p1 : ptr<function, i32>, p2 : ptr<function, i32>) { *p1 = *p2; }
fn f2(p1 : ptr<function, i32>, p2 : ptr<function, i32>) { f1(p1, p2); }

fn f3() {
  var a : i32 = 0;
  //f2(&a, &a);  // Error: Cannot pass two pointer parameters
                 // with the same root identifier when one or
                 // more are written (even by a subfunction).
}

var<private> x : i32 = 0;
fn set_from_x(p : ptr<private, i32>) { *p = x; }
fn dont_set_from_x(p : ptr<private, i32>) {
  if (false) {
    *p = x; // Still counts as a potential write.
  }
}

fn main() {
  // set_from_x(&x);      // Error: set_from_x would have two views of x.
                          // There would be a write x through *p
  // dont_set_from_x(&x); // Still an error.
}
