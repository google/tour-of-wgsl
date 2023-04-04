@must_use
fn a() -> i32 {
  return 10;
}

fn b() -> i32 {
  return 10;
}

fn c() {
  let d = a();  // Ok, result is used
  b();          // Ok, not marked @must_use

  if a() < 5 {  // Ok, used to manage control flow.

  }

  // a();       // Error, result not used
}
