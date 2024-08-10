---
title: "Overview"
---

### The coordination problem

Shaders execute with a high degree of parallelism (and concurrency).
Many invocations collectively do the work of a single shader, with
overlapping but generally uncoordinated schedules.

Invocations share variables in the `workgroup`, `storage`, and `uniform` address spaces.
`uniform` buffers are read-only, but `storage` buffers with `read_write` access mode, and `workgroup`
variables can both be read and written.

When invocations access shared variables, by default they will *race*:
at a fine granularity it's impossible to control when
one invocation accesses a particular memory word in relation
to when another invocation accesses that word.
Accesses *conflict* if at least one of them is a write.

### Data races

Ordinarily, conflicting concurrent accesses to the same memory word cause a *data race*.

**Data races are bad.** Data races can have **unpredictable results with non-local effects.**

### Avoiding data races with atomic types

To avoid data races:
* Only use atomic memory operations to access those memory words.
    * In WGSL, atomic operations are embodied by
        [atomic builtin functions](https://www.w3.org/TR/WGSL/#atomic-builtin-functions).
* Give those words an `atomic` type.  The WGSL type system prevents ordinary (i.e. non-atomic)
    accesses on atomic locations.

The accesses will still occur in an unpredictable schedule.
However, the system guarantees that, from the perspective of all invocations,
atomic accesses to a single memory word will occur as if they happened in *some*
order, one after the other.

> **Beware:** The ordering is only consistent with respect to a single word.
When comparing the orderings for *different* words, it may appear that causality is violated.
