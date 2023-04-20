---
title: "Creating and Using Pointers"
shader: ./using.wgsl
---

Get a pointer from a variable with the `&` operator:
* If `v` is a variable, then `&v` is a pointer referring to **all the memory** for `v`.

Get a pointer to part of a composite variable by writing an expression to access that part,
then use the `&` operator.
* If `chair` is a structure with member `legs` that is an array of 4 values, then `&chair.legs[3]`
   is a pointer to the last leg in the chair.

To access the memory a pointer refers to, use the `*` operator to turn the pointer into a reference.
* If `p` is a pointer then `*p` is a reference to the same memory.

Assignments write to the reference appearing on their left hand side.
Otherwise, a reference will be read from.

* `*p = 12;` writes 12 to the memory locations `p` points to.
* `x = *p;` reads the value pointed to by `p` and writes it to x.
