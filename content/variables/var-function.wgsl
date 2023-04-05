fn f() -> i32 {
    // var 'i' of type 'i32' is initialized with a value of 10
    var i : i32 = 10;

    // var 'j' of type 'i32' is automatically zero initialized
    var j : i32;

    // var 'k' of inferred type 'i32' is initialized with the value of 'i + j'
    var k = i + j;

    // vars are mutable, so they can be reassigned with new values
    k = k + 1;

    return k;
}
