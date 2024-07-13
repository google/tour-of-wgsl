// WGSL does not require functions to be declared before usage

fn a() {
  b(); // 'a' can call 'b' ...
}

fn b() {
  // ...even when 'b' is declared after 'a'
}
