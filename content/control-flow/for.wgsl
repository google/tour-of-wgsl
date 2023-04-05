fn for_loop() -> u32 {
  var counter = 0u;
  // Parenthesis are required.
  for (var i = 0; i < 10; i++) {
    counter += 1;
  }

  // Condition, initializer and continue are optional.
  var exit = false;
  const a = 2;
  for (;;) {
    if a == 4 {
      // Go to the next iteration of the loop.
      continue;
    }
    if exit {
      // Break out of the for loop
      break;
    }
    exit = true;
  }

  return counter;
}
