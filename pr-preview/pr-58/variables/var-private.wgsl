// var 'i' of type 'i32' is initialized with a value of 10
var<private> i : i32 = 10;

// var 'j' of type 'i32' is automatically zero initialized
var<private> j : i32;

// var<private> variables are visible to all functions
fn assign_j(value : i32) {
    j = value;
}

fn f() -> i32 {
    // initial state: i = 10, j = 0
    assign_j(32); //  i = 10, j = 32
    return i + j;
}
