var<private> x: i32;
var<private> y: i32;

fn set_from_x(p : ptr<private, i32>) {
  *p = x;  // Writes via p, reads via module-scoped x.
}

// Alias analysis ignores control flow, so the analysis thinks this
// function writes via p, and reads via module-scoped x.
fn dont_set_from_x(p : ptr<private, i32>) {
  if (false) {
    *p = x; // Still counts as a potential write.
  }
}

fn main() {
  // set_from_x(&x);      // Error: set_from_x would have two views of x.
                          // There would be a write x through *p
  // dont_set_from_x(&x); // Still an error.

  // But this is fine, since x and y don't alias.
  set_from_x(&y);
}
