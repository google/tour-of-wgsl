---
title: "Overview"
---

### The coordination problem

Shaders execute with a high degree of parallelism (and concurrency).
A lot of *invocations* collectively do the work of a single shader, with
overlapping but generally uncoordinated schedules.

Invocations share variables in the `workgroup`, `storage`, and `uniform` address spaces.
Uniform buffers are read-only, but `storage` buffers (with `read_write` access mode), and `workgroup`
variables can both be read and written.

When invocations access shared variables, by default they will *race*:
generally it's impossible to control or to detect when
one invocation accesses a particular memory word in relation
to when another invocation accesses that word.
Accesses *conflict* if at least one of them is a write.

### Data races

Unless we do something special, conflicting concurrent accesses to the same memory word
cause a *data race*.

**Data races are bad.**
Data races are a [dynamic error](https://w3.org/TR/WGSL#dynamic-error) in WGSL,
leading to **unpredictable results with non-local effects.**

### Doing "something special", via atomic types

To avoid data races:
* Mark those memory words as special, by giving them an `atomic` type.
* Only use atomic memory operations to access those memory words.
    * In WGSL, atomic operations are embodied by
        [atomic builtin functions](https://www.w3.org/TR/WGSL/#atomic-builtin-functions).

The accesses will still occur in an unpredictable schedule.
However, the system guarantees that, from the perspective of all invocations,
atomic accesses to a single memory word will occur as if they happened in *some*
order, one after the other.

> **Beware:** The ordering is only consistent with respect to a single word.
When comparing the orderings for *different* words, it may appear that causality is violated.
Fun. (Not fun.)
