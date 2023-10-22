// f1 writes via p1, reads via p2
fn f1(p1 : ptr<function, i32>, p2 : ptr<function, i32>) {
  *p1 = *p2; // Writes via p1, reads via p2
}

// f2 delegates to f1.
fn f2(p1 : ptr<function, i32>, p2 : ptr<function, i32>) {
  f1(p1, p2);
}

fn f3() {
  var a: i32;
  // f1(&a,&a);  // Error: Cannot pass two pointer parameters
                 // with the same root identifier.
                 // The conflicting accesses are in the directly called
                 // function, f1.

  // f2(&a,&a);  // Error: This time the conflict is in f1, called by f2.
                 // The analysis looks through the whole call stack.

  var b: i32;
  f2(&a, &b);    // This is ok, since a and b don't alias.
}
