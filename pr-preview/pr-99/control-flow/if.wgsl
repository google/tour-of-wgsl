const a = true;

fn executed_block() -> u32 {
  if a {
    // Will be executed.
    return 1;
  }
  return 0;
}

fn else_block() -> u32 {
  // Parenthesis are optional.
  if (!a) {
    // Will not be executed.
    return 0;
  } else {
    return 1;
  }
}

fn casted_block() -> u32 {
  if bool(1) {
    // Will be executed.
    return 1;
  }
  return 0;
}
