---
title: "Vectors"
shader: ./index.wgsl
---

WGSL supports 2-element, 3-element and 4-element vectors of scalar types.

Vectors are declared with the form {{< vec "vec(N)<(T)>" >}}, where {{< vec "(N)" >}} is the number of elements in the vector, and {{< vec "(T)" >}} is the element type.

<details class='example'>
<summary>Example</summary>

|              |                                  |
|--------------|----------------------------------|
| `vec2<f32>`  | A two-element vector of `f32`.   |
| `vec3<u32>`  | A three-element vector of `u32`. |
| `vec4<bool>` | A four-element vector of `bool`. |

</details>

WGSL also predeclares the aliases {{< vec "vec(N)(S)" >}}, where {{< vec "(S)" >}} is one of `i`, `u` or `f`:

* {{< vec "vec(N)i" >}} is an alias to {{< vec "vec(N)<i32>" >}}
* {{< vec "vec(N)u" >}} is an alias to {{< vec "vec(N)<u32>" >}}
* {{< vec "vec(N)f" >}} is an alias to {{< vec "vec(N)<f32>" >}}

<details class='example'>
<summary>Example</summary>

|         |                             |
|---------|-----------------------------|
| `vec2f` | is an alias to `vec2<f32>`. |
| `vec3u` | is an alias to `vec3<u32>`. |
| `vec4i` | is an alias to `vec4<i32>`. |

</details>
