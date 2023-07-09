---
title: "Specifying a pointer type"
shader: ./specifying.wgsl
---

A pointer refers to the memory associated with all or part of a
[variable]({{< ref "/variables" >}}).

In more detail, a pointer refers to:
* a set of memory locations,
* an interpretation of those memory locations as a WGSL type, consistent with
   the variable's type,
* an access mode matching the variable's access mode, and
* a [memory model reference](https://w3.org/TR/WGSL#memory-model-reference), matching that of the variable.

A pointer type is written as
{{< ptr "ptr<(AS),(T),(AM)>" >}} or {{< ptr "ptr<(AS),(T)>" >}}, where
* {{< ptr "(AS)" >}} is an address space,
* {{< ptr "(T)" >}} is a type, known as the store type, and
* {{< ptr "(AM)" >}} is an access mode. Only write this when {{< ptr "(AS)" >}} is `storage`.

Pointers into `storage` address space can use `read` or `read_write` access modes,
with the default being `read`.

Don't write the access mode in other cases.
They always use the [default for the address space](https://w3.org/TR/WGSL#address-space).
