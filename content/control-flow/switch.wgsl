const a = 4;

fn switch_case() -> u32 {
  switch a {
    case 1: {
      return 1;
    }
    // Multiple selectors for one block
    case 2, 3: {
      return 6;
    }
    case 4: {
      return 4;
    }
    // Lone default
    default: {
      return 5;
    }
  }
}

fn switch_default() -> u32 {
  // Parenthesis are optional.
  switch (a) {
    case 1, 2, 3: {
      return 1;
    }
    // Default mixed with other selectors
    case 5, default, 6: {
      return 4;
    }
  }
}
