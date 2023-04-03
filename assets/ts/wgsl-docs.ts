/**
 * Copyright 2023 The Tour of WGSL Authors
 *
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file or at
 * https://developers.google.com/open-source/licenses/bsd
 */

export default class WGSLDocs {
  static callbacks = {
    intrinsic: this.intrinsicDocs.bind(this),
    'variable-3': this.var3.bind(this),
    meta: this.meta.bind(this),
  };

  static getDocsFor(name: string, type: string) {
    if (this.callbacks.hasOwnProperty(type)) {
      return this.callbacks[type](name);
    }
    return undefined;
  }

  static intrinsics = {
    bitcast: `@const @must_use
fn bitcast&ltT&gt;(e : S) -&gt; T

Reinterpretation of bits as T.
Component-wise when T is a vector.`,

    all: `@const @must_use
fn all(e: vecN&ltbool&gt;) -&gt; bool
<b>Returns</b> true if each component of e is true.

<hr />
@const @must_use
fn all(e: bool) -&gt; bool
<b>Returns</b> e.`,

    any: `@const @must_use
fn any(e: vecN&ltbool&gt;) -&gt; bool
<b>Returns</b> true if any component of e is true.

<hr />
@const @must_use
fn any(e: bool) -&gt; bool
<b>Returns</b> e.`,

    select: `@const @must_use
fn select(f: T, t: T, cond: bool) -&gt; T
T is scalar or vector
<b>Returns</b> t when cond is true, and f otherwise.

<hr />
@const @must_use
fn select(f: vecN&ltT&gt;, t: vecN&ltT&gt;, cond: vecN&ltbool&gt;) -&gt; vecN&ltT&gt;
T is scalar
Result component i is evaluated as select(f[i], t[i], cond[i]).
Component-wise selection.`,

    arrayLength: `@must_use
fn arrayLength(p: ptr&ltstorage, array&ltE&gt;, AM&gt;) -&gt; u32
E is an element type for a runtime-sized array,
access mode AM is read or read_write
<b>Returns</b> NRuntime, the number of elements in the runtime-sized array.`,

    abs: `@const @must_use
fn abs(e: T ) -&gt; T
S is AbstractInt, AbstractFloat, i32, u32, f32, or f16
T is S, or vecN&ltS&gt;
<b>Returns</b> the absolute value of e. Component-wise when T is a vector.
If e is a floating-point type, then the result is e with a positive sign bit.
If e is an unsigned integer scalar type, then the result is e.
If e is a signed integer scalar type and evaluates to the largest
negative value, then the result is e.`,

    acos: `@const @must_use
fn acos(e: T) -&gt; T
S is AbstractFloat, f32, or f16
T is S or vecN&ltS&gt;
<b>Returns</b> the principal value, in radians, of the inverse cosine (cos-1) of e.
That is, approximates x with 0 ≤ x ≤ π, such that cos(x) = e.
Component-wise when T is a vector.`,

    acosh: `@const @must_use
fn acosh(e: T) -&gt; T
S is AbstractFloat, f32, or f16
T is S or vecN&ltS&gt;
<b>Returns</b> the inverse hyperbolic cosine (cosh-1) of e, as a hyperbolic angle in radians.
That is, approximates x with 0 ≤ x ≤ ∞, such that cosh(x) = e.
Component-wise when T is a vector.`,

    asin: `@const @must_use
fn asin(e: T) -&gt; T
S is AbstractFloat, f32, or f16
T is S or vecN&ltS&gt;
<b>Returns</b> the principal value, in radians, of the inverse sine (sin-1) of e.
That is, approximates x with -π/2 ≤ x ≤ π/2, such that sin(x) = e.
Component-wise when T is a vector.`,

    asinh: `@const @must_use
fn asinh(e: T) -&gt; T
S is AbstractFloat, f32, or f16
T is S or vecN&ltS&gt;
<b>Returns</b> the inverse hyperbolic sine (sinh-1) of e, as a hyperbolic angle in radians.
That is, approximates x such that sinh(x) = e.
Component-wise when T is a vector.`,

    atan: `@const @must_use
fn atan(e: T) -&gt; T
S is AbstractFloat, f32, or f16
T is S or vecN&ltS&gt;
<b>Returns</b> the principal value, in radians, of the inverse tangent (tan-1) of e.
That is, approximates x with π/2 ≤ x ≤ π/2, such that tan(x) = e.
Component-wise when T is a vector.`,

    atanh: `@const @must_use
fn atanh(e: T) -&gt; T
S is AbstractFloat, f32, or f16
T is S or vecN&ltS&gt;
<b>Returns</b> the inverse hyperbolic tangent (tanh-1) of e, as a hyperbolic angle in radians.
That is, approximates x such that tanh(x) = e.
Component-wise when T is a vector.`,

    atan2: `@const @must_use
fn atan2(y: T, x: T) -&gt; T
Parameterization	S is AbstractFloat, f32, or f16
T is S or vecN&ltS&gt;
Description	<b>Returns</b> an angle, in radians, in the interval
[-π, π] whose tangent is y÷x.

The quadrant selected by the result depends on the signs of y and
x. For example, the function may be implemented as:
  atan(y/x) when x &gt; 0
  atan(y/x) + π when (x &lt 0) and (y &gt; 0)
  atan(y/x) - π when (x &lt 0) and (y &lt 0)

Component-wise when T is a vector.`,

    ceil: `@const @must_use
fn ceil(e: T) -&gt; T
S is AbstractFloat, f32, or f16
T is S or vecN&ltS&gt;
<b>Returns</b> the ceiling of e. Component-wise when T is a vector.`,

    clamp: `@const @must_use
fn clamp(e: T, low: T, high: T) -&gt; T
S is AbstractInt, AbstractFloat, i32, u32, f32, or f16
T is S, or vecN&ltS&gt;
Restricts the value of e within a range.

If T is an integer type, then the result is min(max(e, low), high).

If T is a floating-point type, then the result is either
min(max(e, low), high), or the median of the three values e, low, high.

Component-wise when T is a vector.

If low is greater than high, then:
  It is a shader-creation error if low and high are const-expressions.
  It is a pipeline-creation error if low and high are override-expressions.`,

    cos: `@const @must_use
fn cos(e: T) -&gt; T
S is AbstractFloat, f32, or f16
T is S or vecN&ltS&gt;
<b>Returns</b> the cosine of e, where e is in radians.
Component-wise when T is a vector.`,

    cosh: `@const @must_use
fn cosh(arg: T) -&gt; T
S is AbstractFloat, f32, or f16
T is S or vecN&ltS&gt;
<b>Returns</b> the hyperbolic cosine of arg, where arg is a hyperbolic
angle in radians. Approximates the pure mathematical function
(e<sup>arg</sup> + e<sup>−arg</sup>)÷2, but not necessarily computed that way.
Component-wise when T is a vector`,

    countLeadingZeros: `@const @must_use
fn countLeadingZeros(e: T) -&gt; T
T is i32, u32, vecN&lti32&gt;, or vecN&ltu32&gt;
The number of consecutive 0 bits starting from the most significant
bit of e, when T is a scalar type.
Component-wise when T is a vector.

Also known as "clz" in some languages.`,

    countOneBits: `@const @must_use
fn countOneBits(e: T) -&gt; T
T is i32, u32, vecN&lti32&gt;, or vecN&ltu32&gt;
The number of 1 bits in the representation of e.
Component-wise when T is a vector.

Also known as "population count".`,

    countTrailingZeros: `@const @must_use
fn countTrailingZeros(e: T) -&gt; T
T is i32, u32, vecN&lti32&gt;, or vecN&ltu32&gt;
The number of consecutive 0 bits starting from the least significant
bit of e, when T is a scalar type.
Component-wise when T is a vector.

    Also known as "ctz" in some languages.`,

    cross: `@const @must_use
fn cross(e1: vec3&ltT&gt;, e2: vec3&ltT&gt;) -&gt; vec3&ltT&gt;
T is AbstractFloat, f32, or f16
<b>Returns</b> the cross product of e1 and e2.`,

    degrees: `@const @must_use
fn degrees(e1: T) -&gt; T
S is AbstractFloat, f32, or f16
T is S or vecN&ltS&gt;
Converts radians to degrees, approximating e1 × 180 ÷ π.
Component-wise when T is a vector`,

    determinant: `@const @must_use
fn determinant(e: matCxC&ltT&gt;) -&gt; T
T is AbstractFloat, f32, or f16
<b>Returns</b> the determinant of e.`,

    distance: `@const @must_use
fn distance(e1: T,
S is AbstractFloat, f32, or f16
T is S or vecN&ltS&gt;
<b>Returns</b> the distance between e1 and e2 (e.g. length(e1 - e2)).`,

    dot: `@const @must_use
fn dot(e1: vecN&ltT&gt;, e2: vecN&ltT&gt;) -&gt; T
T is AbstractInt, AbstractFloat, i32, u32, f32, or f16
<b>Returns</b> the dot product of e1 and e2.`,

    exp: `@const @must_use
fn exp(e1: T) -&gt; T
S is AbstractFloat, f32, or f16
T is S or vecN&ltS&gt;
<b>Returns</b> the natural exponentiation of e1 (e.g. ee1).
Component-wise when T is a vector.`,

    exp2: `@const @must_use
fn exp2(e: T) -&gt; T
S is AbstractFloat, f32, or f16
T is S or vecN&ltS&gt;
<b>Returns</b> 2 raised to the power e (e.g. 2e).
Component-wise when T is a vector.`,

    extractBits: `@const @must_use
fn extractBits(e: T, offset: u32, count: u32) -&gt; T
T is i32 or vecN&lti32&gt;
Reads bits from an integer, with sign extension.

When T is a scalar type, then:
  w is the bit width of T
  o = min(offset, w)
  c = min(count, w - o)
  The result is 0 if c is 0.
  Otherwise, bits 0..c - 1 of the result are copied from
             bits o..o + c - 1 of e. Other bits of the
             result are the same as bit c - 1 of the result.

Component-wise when T is a vector.

If count + offset is greater than w, then:
  It is a shader-creation error if count and offset are const-expressions.
  It is a pipeline-creation error if count and offset are override-expressions.

<hr />
@const @must_use
fn extractBits(e: T, offset: u32, count: u32) -&gt; T
T is u32 or vecN&ltu32&gt;
Reads bits from an integer, without sign extension.

When T is a scalar type, then:
  w is the bit width of T
  o = min(offset, w)
  c = min(count, w - o)
  The result is 0 if c is 0.
  Otherwise, bits 0..c - 1 of the result are copied from
             bits o..o + c - 1 of e. Other bits of the result are 0.

Component-wise when T is a vector.

If count + offset is greater than w, then:
  It is a shader-creation error if count and offset are const-expressions.
  It is a pipeline-creation error if count and offset are override-expressions.`,

    faceForward: `@const @must_use
fn faceForward(e1: T, e2: T, e3: T) -&gt; T
T is vecN&ltAbstractFloat&gt;, vecN&ltf32&gt;, or vecN&ltf16&gt;
<b>Returns</b> e1 if dot(e2, e3) is negative, and -e1 otherwise.`,

    firstLeadingBit: `@const @must_use
fn firstLeadingBit(e: T) -&gt; T
T is i32 or vecN&lti32&gt;
For scalar T, the result is:
  -1 if e is 0 or -1.
  Otherwise the position of the most significant bit in e that is
  different from e's sign bit.

Component-wise when T is a vector.

<hr />
@const @must_use
fn firstLeadingBit(e: T) -&gt; T
T is u32 or vecN&ltu32&gt;
For scalar T, the result is:
  T(-1) if e is zero.
  Otherwise the position of the most significant 1 bit in e.

Component-wise when T is a vector.`,

    firstTrailingBit: `@const @must_use
fn firstTrailingBit(e: T) -&gt; T
T is i32, u32, vecN&lti32&gt;, or vecN&ltu32&gt;
For scalar T, the result is:
  T(-1) if e is zero.
  Otherwise the position of the least significant 1 bit in e.

Component-wise when T is a vector.`,

    floor: `@const @must_use
fn floor(e: T) -&gt; T
S is AbstractFloat, f32, or f16
T is S or vecN&ltS&gt;
<b>Returns</b> the floor of e. Component-wise when T is a vector.`,

    fma: `@const @must_use
fn fma(e1: T, e2: T, e3: T) -&gt; T
S is AbstractFloat, f32, or f16
T is S or vecN&ltS&gt;
<b>Returns</b> e1 * e2 + e3.

Component-wise when T is a vector.`,

    fract: `@const @must_use
fn fract(e: T) -&gt; T
S is AbstractFloat, f32, or f16
T is S or vecN&ltS&gt;
<b>Returns</b> the fractional part of e, computed as e - floor(e).

Component-wise when T is a vector.`,

    frexp: `@const @must_use
fn frexp(e: T) -&gt; __frexp_result_f32
T is f32
Splits e into a fraction and an exponent.
  When e is zero, the fraction is zero.
  When e is non-zero and normal, e = fraction * 2<sup>exponent</sup>, where the
       fraction is in the range [0.5, 1.0) or (-1.0, -0.5].
  Otherwise, e is NaN or infinite. The result fraction and exponent
       are indeterminate values.

<b>Returns</b> the __frexp_result_f32 built-in structure, defined as follows:

struct __frexp_result_f32 {
  fract : f32, // fraction part
  exp : i32    // exponent part
}

<hr />
@const @must_use
fn frexp(e: T) -&gt; __frexp_result_f16
T is f16
Splits e into a fraction and an exponent.
  When e is zero, the fraction is zero.
  When e is non-zero and normal, e = fraction * 2<sup>exponent</sup>, where the
       fraction is in the range [0.5, 1.0) or (-1.0, -0.5].
  Otherwise, e is NaN or infinite. The result fraction and exponent
       are indeterminate values.

<b>Returns</b> the __frexp_result_f16 built-in structure, defined as if as follows:

struct __frexp_result_f16 {
  fract : f16, // fraction part
  exp : i32    // exponent part
}

<hr />
@const @must_use
fn frexp(e: T) -&gt; __frexp_result_abstract
T is AbstractFloat
Splits e into a fraction and an exponent.
  When e is zero, the fraction is zero.
  When e is non-zero and normal, e = fraction * 2<sup>exponent</sup>, where the
       fraction is in the range [0.5, 1.0) or (-1.0, -0.5].

NOTE: AbstractFloat expressions resulting in infinity or NaN cause a shader-creation error.

<b>Returns</b> the __frexp_result_abstract built-in structure, defined as follows:

struct __frexp_result_abstract {
  fract : AbstractFloat, // fraction part
  exp : AbstractInt      // exponent part
}

<hr />
@const @must_use
fn frexp(e: T) -&gt; __frexp_result_vecN_f32
T is vecN&ltf32&gt;
Splits components ei of e into a fraction and an exponent.
  When ei is zero, the fraction is zero.
  When ei is non-zero and normal, ei = fraction * 2<sup>exponent</sup>, where the
       fraction is in the range [0.5, 1.0) or (-1.0, -0.5].
  Otherwise, ei is NaN or infinite. The result fraction and exponent
       are indeterminate values.

<b>Returns</b> the __frexp_result_vecN_f32 built-in structure, defined as follows:

<hr />
@const @must_use
fn frexp(e: T) -&gt; __frexp_result_vecN_f16
T is vecN&ltf16&gt;
Splits components ei of e into a fraction and an exponent.
  When ei is zero, the fraction is zero.
  When ei is non-zero and normal, ei = fraction * 2<sup>exponent</sup>, where the
       fraction is in the range [0.5, 1.0) or (-1.0, -0.5].
  Otherwise, ei is NaN or infinite. The result fraction and exponent
       are indeterminate values.

<b>Returns</b> the __frexp_result_vecN_f16 built-in structure, defined as if as follows:

struct __frexp_result_vecN_f16 {
  fract : vecN&ltf16&gt;, // fraction part
  exp : vecN&lti32&gt;    // exponent part
}

<hr />
@const @must_use
fn frexp(e: T) -&gt; __frexp_result_vecN_abstract
T is vecN&ltAbstractFloat&gt;
Splits components ei of e into a fraction and an exponent.
  When ei is zero, the fraction is zero.
  When ei is non-zero and normal, ei = fraction * 2<sup>exponent</sup>, where the
       fraction is in the range [0.5, 1.0) or (-1.0, -0.5].

NOTE: AbstractFloat expressions resulting in infinity or NaN cause a shader-creation error.

<b>Returns</b> the __frexp_result_vecN_abstract built-in structure, defined as follows:

struct __frexp_result_vecN_abstract {
  fract : vecN&ltAbstractFloat&gt;, // fraction part
  exp : vecN&ltAbstractInt&gt;      // exponent part
}`,

    inverseBits: `@const @must_use
fn insertBits(e: T, newbits: T, offset: u32, count: u32) -&gt; T
T is i32, u32, vecN&lti32&gt;, or vecN&ltu32&gt;
Sets bits in an integer.
When T is a scalar type, then:
  w is the bit width of T
  o = min(offset, w)
  c = min(count, w - o)
  The result is e if c is 0.
  Otherwise, bits o..o + c - 1 of the result are copied from
             bits 0..c - 1 of newbits. Other bits of the result
             are copied from e.

Component-wise when T is a vector.

If count + offset is greater than w, then:
  It is a shader-creation error if count and offset are const-expressions.
  It is a pipeline-creation error if count and offset are override-expressions.`,

    inverseSqrt: `@const @must_use
fn inverseSqrt(e: T) -&gt; T
S is AbstractFloat, f32, or f16
T is S or vecN&ltS&gt;
<b>Returns</b> the reciprocal of sqrt(e). Component-wise when T is a vector.`,

    ldexp: `@const @must_use
fn ldexp(e1: T, e2: I) -&gt; T
S is AbstractFloat, f32, or f16
T is S or vecN&ltS&gt;
I is AbstractInt, i32, vecN&ltAbstractInt&gt;, or vecN&lti32&gt;
I is a vector if and only if T is a vector
I is concrete if and only if T is a concrete
<b>Returns</b> e1 * 2e2, except:
  The result may be zero if e2 + bias ≤ 0.
  If e2 &gt; bias + 1
    It is a shader-creation error if e2 is a const-expression.
    It is a pipeline-creation error if e2 is an override-expression.
    Otherwise the result is an indeterminate value for T.

Here, bias is the exponent bias of the floating point format:
  15 for f16
  127 for f32
  1023 for AbstractFloat, when AbstractFloat is IEEE-754 binary64

If x is zero or a finite normal value for its type, then:
  x = ldexp(frexp(x).fract, frexp(x).exp)

Component-wise when T is a vector.`,

    length: `@const @must_use
fn length(e: T) -&gt; S
S is AbstractFloat, f32, or f16
T is S or vecN&ltS&gt;
<b>Returns</b> the length of e.
Evaluates to the absolute value of e if T is scalar.
Evaluates to sqrt(e[0]<sup>2</sup> + e[1]<sup>2</sup> + ...) if T is a vector type.`,

    log: `@const @must_use
fn log(e: T) -&gt; T
S is AbstractFloat, f32, or f16
T is S or vecN&ltS&gt;
<b>Returns</b> the natural logarithm of e.
Component-wise when T is a vector.`,

    log2: `@const @must_use
fn log2(e: T) -&gt; T
S is AbstractFloat, f32, or f16
T is S or vecN&ltS&gt;
<b>Returns</b> the base-2 logarithm of e.
Component-wise when T is a vector.`,

    max: `@const @must_use
fn max(e1: T, e2: T) -&gt; T
S is AbstractInt, AbstractFloat, i32, u32, f32, or f16
T is S, or vecN&ltS&gt;
<b>Returns</b> e2 if e1 is less than e2, and e1 otherwise.
If e1 and e2 are floating-point values, then:
  If both e1 and e2 are denormalized, then the result may be either value.
  If one operand is a NaN, the other is returned.
  If both operands are NaNs, a NaN is returned.

Component-wise when T is a vector.`,

    min: `@const @must_use
fn min(e1: T, e2: T) -&gt; T
S is AbstractInt, AbstractFloat, i32, u32, f32, or f16
T is S, or vecN&ltS&gt;
<b>Returns</b> e2 if e2 is less than e1, and e1 otherwise.
If e1 and e2 are floating-point values, then:
  If both e1 and e2 are denormalized, then the result may be either value.
  If one operand is a NaN, the other is returned.
  If both operands are NaNs, a NaN is returned.

Component-wise when T is a vector.`,

    mix: `@const @must_use
fn mix(e1: T, e2: T, e3: T) -&gt; T
S is AbstractFloat, f32, or f16
T is S or vecN&ltS&gt;
<b>Returns</b> the linear blend of e1 and e2 (e.g. e1 * (1 - e3) + e2 * e3).
Component-wise when T is a vector.

<hr />
@const @must_use
fn mix(e1: T2, e2: T2, e3: T) -&gt; T2
T is AbstractFloat, f32, or f16
T2 is vecN&ltT&gt;
<b>Returns</b> the component-wise linear blend of e1 and e2, using scalar
blending factor e3 for each component.
Same as mix(e1, e2, T2(e3)).`,

    modf: `@const @must_use
fn modf(e: T) -&gt; __modf_result_f32
T is f32
Splits e into fractional and whole number parts.
The whole part is trunc(e), and the fractional part is e - trunc(e).

<b>Returns</b> the __modf_result_f32 built-in structure, defined as follows:

struct __modf_result_f32 {
  fract : f32, // fractional part
  whole : f32  // whole part
}

<hr />
@const @must_use
fn modf(e: T) -&gt; __modf_result_f16
T is f16
Splits e into fractional and whole number parts.
The whole part is trunc(e), and the fractional part is e - trunc(e).

<b>Returns</b> the __modf_result_f16 built-in structure, defined as if as follows:

struct __modf_result_f16 {
  fract : f16, // fractional part
  whole : f16  // whole part
}

<hr />
@const @must_use
fn modf(e: T) -&gt; __modf_result_abstract
T is AbstractFloat
Splits e into fractional and whole number parts.
The whole part is trunc(e), and the fractional part is e - trunc(e).

<b>Returns</b> the __modf_result_abstract built-in structure, defined as follows:

struct __modf_result_abstract {
  fract : AbstractFloat, // fractional part
  whole : AbstractFloat  // whole part
}

<hr />
@const @must_use
fn modf(e: T) -&gt; __modf_result_vecN_f32
T is vecN&ltf32&gt;
Splits the components of e into fractional and whole number parts.
The i'th component of the whole and fractional parts equal the whole and
fractional parts of modf(e[i]).

<b>Returns</b> the __modf_result_vecN_f32 built-in structure, defined as follows:

struct __modf_result_vecN_f32 {
  fract : vecN&ltf32&gt;, // fractional part
  whole : vecN&ltf32&gt;  // whole part
}

<hr />
@const @must_use
fn modf(e: T) -&gt; __modf_result_vecN_f16
T is vecN&ltf16&gt;
Splits the components of e into fractional and whole number parts.
The i'th component of the whole and fractional parts equal the whole and
fractional parts of modf(e[i]).

<b>Returns</b> the __modf_result_vecN_f16 built-in structure, defined as if as follows:

struct __modf_result_vecN_f16 {
  fract : vecN&ltf16&gt;, // fractional part
  whole : vecN&ltf16&gt;  // whole part
}

<hr />
@const @must_use
fn modf(e: T) -&gt; __modf_result_vecN_abstract
T is vecN&ltAbstractFloat&gt;
Splits the components of e into fractional and whole number parts.
The i'th component of the whole and fractional parts equal the whole
and fractional parts of modf(e[i]).

<b>Returns</b> the __modf_result_vecN_abstract built-in structure, defined as follows:

struct __modf_result_vecN_abstract {
  fract : vecN&ltAbstractFloat&gt;, // fractional part
  whole : vecN&ltAbstractFloat&gt;  // whole part
}`,

    normalize: `@const @must_use
fn normalize(e: vecN&ltT&gt; ) -&gt; vecN&ltT&gt;
T is AbstractFloat, f32, or f16
<b>Returns</b> a unit vector in the same direction as e.`,

    pow: `@const @must_use
fn pow(e1: T, e2: T) -&gt; T
S is AbstractFloat, f32, or f16
T is S or vecN&ltS&gt;
<b>Returns</b> e1 raised to the power e2.
Component-wise when T is a vector.`,

    quantizeToF16: `@const @must_use
fn quantizeToF16(e: T) -&gt; T
T is f32 or vecN&ltf32&gt;
Quantizes a 32-bit floating point value e as if e were converted to a
IEEE 754 binary16 value, and then converted back to a IEEE 754 binary32 value.

If e is outside the finite range of binary16, then:
  It is a shader-creation error if e is a const-expression.
  It is a pipeline-creation error if e is an override-expression.
  Otherwise the result is an indeterminate value for T.

The intermediate binary16 value may be flushed to zero, i.e. the final result
may be zero if the intermediate binary16 value is denormalized.

Component-wise when T is a vector.`,

    radians: `@const @must_use
fn radians(e1: T) -&gt; T
S is AbstractFloat, f32, or f16
T is S or vecN&ltS&gt;
Converts degrees to radians, approximating e1 × π ÷ 180.

Component-wise when T is a vector`,

    reflect: `@const @must_use
fn reflect(e1: T, e2: T) -&gt; T
T is vecN&ltAbstractFloat&gt;, vecN&ltf32&gt;, or vecN&ltf16&gt;
For the incident vector e1 and surface orientation e2, returns the
reflection direction e1 - 2 * dot(e2, e1) * e2.`,

    refract: `@const @must_use
fn refract(e1: T, e2: T, e3: I) -&gt; T
T is vecN&ltI&gt;
I is AbstractFloat, f32, or f16
For the incident vector e1 and surface normal e2, and the ratio of indices
of refraction e3, let k = 1.0 - e3 * e3 * (1.0 - dot(e2, e1) * dot(e2, e1)).
If k &lt 0.0, returns the refraction vector 0.0, otherwise return the
refraction vector e3 * e1 - (e3 * dot(e2, e1) + sqrt(k)) * e2.`,

    reverseBits: `@const @must_use
fn reverseBits(e: T) -&gt; T
T is i32, u32, vecN&lti32&gt;, or vecN&ltu32&gt;
Reverses the bits in e: The bit at position k of the result equals the
bit at position 31 -k of e.
Component-wise when T is a vector.`,

    round: `@const @must_use
fn round(e: T) -&gt; T
S is AbstractFloat, f32, or f16
T is S or vecN&ltS&gt;
Result is the integer k nearest to e, as a floating point value.
When e lies halfway between integers k and k + 1, the result is k
when k is even, and k + 1 when k is odd.
Component-wise when T is a vector.`,

    saturate: `@const @must_use
fn saturate(e: T) -&gt; T
S is AbstractFloat, f32, or f16
T is S or vecN&ltS&gt;
<b>Returns</b> clamp(e, 0.0, 1.0).
Component-wise when T is a vector.`,

    sign: `@const @must_use
fn sign(e: T) -&gt; T
S is AbstractInt, AbstractFloat, i32, f32, or f16
T is S, or vecN&ltS&gt;
Result is:
  1 when e &gt; 0
  0 when e = 0
  -1 when e &lt 0

Component-wise when T is a vector.`,

    sin: `@const @must_use
fn sin(e: T) -&gt; T
<b>Returns</b> the sine of e, where e is in radians.
Component-wise when T is a vector.`,

    sinh: `@const @must_use
fn sinh(e: T) -&gt; T
S is AbstractFloat, f32, or f16
T is S or vecN&ltS&gt;
<b>Returns</b> the hyperbolic sine of e, where e is a hyperbolic angle in
radians. Approximates the pure mathematical function (e<sup>arg</sup> − e<sup>−arg</sup>)÷2,
but not necessarily computed that way.
Component-wise when T is a vector.`,

    smoothstep: `@const @must_use
fn smoothstep(low: T, high: T, x: T) -&gt; T
S is AbstractFloat, f32, or f16
T is S or vecN&ltS&gt;
<b>Returns</b> the smooth Hermite interpolation between 0 and 1.

Component-wise when T is a vector.

For scalar T, the result is t * t * (3.0 - 2.0 * t), where
t = clamp((x - low) / (high - low), 0.0, 1.0).`,

    sqrt: `@const @must_use
fn sqrt(e: T) -&gt; T
S is AbstractFloat, f32, or f16
T is S or vecN&ltS&gt;
<b>Returns</b> the square root of e.
Component-wise when T is a vector.`,

    step: `@const @must_use
fn step(edge: T, x: T) -&gt; T
S is AbstractFloat, f32, or f16
T is S or vecN&ltS&gt;
<b>Returns</b> 1.0 if edge ≤ x, and 0.0 otherwise.
Component-wise when T is a vector.`,

    tan: `@const @must_use
fn tan(e: T) -&gt; T
S is AbstractFloat, f32, or f16
T is S or vecN&ltS&gt;
<b>Returns</b> the tangent of e, where e is in radians.
Component-wise when T is a vector.`,

    tanh: `@const @must_use
fn tanh(e: T) -&gt; T
S is AbstractFloat, f32, or f16
T is S or vecN&ltS&gt;
<b>Returns</b> the hyperbolic tangent of e, where e is a hyperbolic angle in
radians. Approximates the pure mathematical function
(e<sup>arg</sup> − e<sup>−arg</sup>) ÷ (e<sup>arg</sup> + e<sup>−arg</sup>)
but not necessarily computed that way.
Component-wise when T is a vector.`,

    transpose: `@const @must_use
fn transpose(e: matRxC&ltT&gt;) -&gt; matCxR&ltT&gt;
T is AbstractFloat, f32, or f16
<b>Returns</b> the transpose of e.`,

    trunc: `@const @must_use
fn trunc(e: T) -&gt; T
S is AbstractFloat, f32, or f16
T is S or vecN&ltS&gt;
<b>Returns</b> truncate(e), the nearest whole number whose absolute value is
less than or equal to the absolute value of e.
Component-wise when T is a vector.`,

    dpdx: `@must_use fn
dpdx(e: T) -> T
T is f32 or vecN<f32>
<b>Returns</b> the partial derivative of e with respect to window x coordinates.
The result is the same as either dpdxFine(e) or dpdxCoarse(e).
Returns an indeterminate value if called in non-uniform control flow.`,

    dpdxCoarse: `@must_use
fn dpdxCoarse(e: T) -> T
T is f32 or vecN<f32>
<b>Returns</b> the partial derivative of e with respect to window x coordinates
using local differences. This may result in fewer unique positions that dpdxFine(e).
Returns an indeterminate value if called in non-uniform control flow.`,

    dpdxFine: `@must_use
fn dpdxFine(e: T) -> T
T is f32 or vecN<f32>
<b>Returns</b> the partial derivative of e with respect to window x coordinates.
Returns an indeterminate value if called in non-uniform control flow.`,

    dpdy: `@must_use
fn dpdy(e: T) -> T
T is f32 or vecN<f32>
<b>Returns</b> the partial derivative of e with respect to window y coordinates.
The result is the same as either dpdyFine(e) or dpdyCoarse(e).
Returns an indeterminate value if called in non-uniform control flow.`,

    dpdyCoarse: `@must_use
fn dpdyCoarse(e: T) -> T
T is f32 or vecN<f32>
<b>Returns</b> the partial derivative of e with respect to window y coordinates
using local differences. This may result in fewer unique positions that dpdyFine(e).
Returns an indeterminate value if called in non-uniform control flow.`,

    dpdyFine: `@must_use
fn dpdyFine(e: T) -> T
T is f32 or vecN<f32>
<b>Returns</b> the partial derivative of e with respect to window y coordinates.
Returns an indeterminate value if called in non-uniform control flow.`,

    fwidth: `@must_use
fn fwidth(e: T) -> T
T is f32 or vecN<f32>
<b>Returns</b> abs(dpdx(e)) + abs(dpdy(e)).
Returns an indeterminate value if called in non-uniform control flow.`,

    fwidthCoarse: `@must_use
fn fwidthCoarse(e: T) -> T
T is f32 or vecN<f32>
<b>Returns</b> abs(dpdxCoarse(e)) + abs(dpdyCoarse(e)).
Returns an indeterminate value if called in non-uniform control flow.`,

    fwidthFine: `@must_use
fn fwidthFine(e: T) -> T
T is f32 or vecN<f32>
<b>Returns</b> abs(dpdxFine(e)) + abs(dpdyFine(e)).
Returns an indeterminate value if called in non-uniform control flow.`,

    textureDimensions: `<b>Returns</b> The coordinate dimensions of the texture.

That is, the result provides the integer bounds on the coordinates of the logical texel address, excluding the mip level count, array size, and sample count.

For textures based on cubes, the results are the dimensions of each face of the cube. Cube faces are square, so the x and y components of the result are equal.

If level is outside the range [0, textureNumLevels(t)) then an indeterminate value for the return type may be returned.`,

    textureGather: `<b>Returns</b> A four component vector with components extracted from the specified channel from the selected texels, as described above.`,

    textureGatherCompare: `<b>Returns</b> A four component vector with comparison result for the selected texels, as described above.`,

    textureLoad: `The unfiltered texel data.
The logical texel address is invalid if:
  any element of coords is outside the range [0, textureDimensions(t, level))
      for the corresponding element, or
  array_index is outside the range [0, textureNumLayers(t)), or
  level is outside the range [0, textureNumLevels(t)), or
  sample_index is outside the range [0, textureNumSamples(s))

If the logical texel addresss is invalid, the built-in function returns one of:
  The data for some texel within bounds of the texture
  A vector (0,0,0,0) or (0,0,0,1) of the appropriate type for non-depth textures
  0.0 for depth textures`,

    textureNumLayers: `<b>Returns</b> If the texture is based on cubes, returns the number of
cubes in the cube arrayed texture.

Otherwise returns the number of layers (homogeneous grids of texels) in the arrayed texture.`,

    textureNumLevels: `<b>Returns</b> The mip level count for the texture.`,

    textureNumSamples: `<b>Returns</b> The sample count for the multisampled texture.`,

    textureSample: `<b>Returns</b> The sampled value.

An indeterminate value results if called in non-uniform control flow.`,

    textureSampleBias: `<b>Returns</b> The sampled value.

An indeterminate value results if called in non-uniform control flow.`,

    textureSampleCompare: `<b>Returns</b>

A value in the range [0.0..1.0].

Each sampled texel is compared against the reference value using the comparison
operator defined by the sampler_comparison, resulting in either a 0 or 1 value for each texel.

If the sampler uses bilinear filtering then the returned value is the filtered
average of these values, otherwise the comparison result of a single texel is returned.

An indeterminate value results if called in non-uniform control flow.`,

    textureSampleCompareLevel: `<b>Returns</b>

A value in the range [0.0..1.0].

The textureSampleCompareLevel function is the same as textureSampleCompare, except that:
  textureSampleCompareLevel always samples texels from mip level 0.
    The function does not compute derivatives.
    There is no requirement for textureSampleCompareLevel to be invoked in uniform control flow.
  textureSampleCompareLevel may be invoked in any shader stage.`,

    textureSampleGrad: `<b>Returns</b> The sampled value.`,

    textureSampleLevel: `<b>Returns</b> The sampled value.`,

    textureSampleBaseClampToEdge: `<b>Returns</b> The sampled value.`,

    textureStore: `Writes a single texel to a texture.`,

    atomicLoad: `fn atomicLoad(atomic_ptr: ptr<AS, atomic<T>, read_write>) -> T
<b>Returns</b> the atomically loaded the value pointed to by atomic_ptr. It does not modify the object.`,

    atomicStore: `fn atomicStore(atomic_ptr: ptr<AS, atomic<T>, read_write>, v: T)
Atomically stores the value v in the atomic object pointed to by atomic_ptr.`,

    atomicAdd: `fn atomicAdd(atomic_ptr: ptr<AS, atomic<T>, read_write>, v: T) -> T
Performs the following steps atomically:
  Load the original value pointed to by atomic_ptr.
  Obtains a new value by performing the operation (e.g. max) from the function
      name with the value v.
  Store the new value using atomic_ptr.
<b>Returns</b> the original value stored in the atomic object.`,

    atomicSub: `fn atomicSub(atomic_ptr: ptr<AS, atomic<T>, read_write>, v: T) -> T
Performs the following steps atomically:
  Load the original value pointed to by atomic_ptr.
  Obtains a new value by performing the operation (e.g. max) from the function
      name with the value v.
  Store the new value using atomic_ptr.
<b>Returns</b> the original value stored in the atomic object.`,

    atomicMax: `fn atomicMax(atomic_ptr: ptr<AS, atomic<T>, read_write>, v: T) -> T
Performs the following steps atomically:
  Load the original value pointed to by atomic_ptr.
  Obtains a new value by performing the operation (e.g. max) from the function
      name with the value v.
  Store the new value using atomic_ptr.
<b>Returns</b> the original value stored in the atomic object.`,

    atomicMin: `fn atomicMin(atomic_ptr: ptr<AS, atomic<T>, read_write>, v: T) -> T
Performs the following steps atomically:
  Load the original value pointed to by atomic_ptr.
  Obtains a new value by performing the operation (e.g. max) from the function
      name with the value v.
  Store the new value using atomic_ptr.
<b>Returns</b> the original value stored in the atomic object.`,

    atomicAnd: `fn atomicAnd(atomic_ptr: ptr<AS, atomic<T>, read_write>, v: T) -> T
Performs the following steps atomically:
  Load the original value pointed to by atomic_ptr.
  Obtains a new value by performing the operation (e.g. max) from the function
      name with the value v.
  Store the new value using atomic_ptr.
<b>Returns</b> the original value stored in the atomic object.`,

    atomicOr: `fn atomicOr(atomic_ptr: ptr<AS, atomic<T>, read_write>, v: T) -> T
Performs the following steps atomically:
  Load the original value pointed to by atomic_ptr.
  Obtains a new value by performing the operation (e.g. max) from the function
      name with the value v.
  Store the new value using atomic_ptr.
<b>Returns</b> the original value stored in the atomic object.`,

    atomicXor: `fn atomicXor(atomic_ptr: ptr<AS, atomic<T>, read_write>, v: T) -> T
Performs the following steps atomically:
  Load the original value pointed to by atomic_ptr.
  Obtains a new value by performing the operation (e.g. max) from the function
      name with the value v.
  Store the new value using atomic_ptr.
<b>Returns</b> the original value stored in the atomic object.`,

    atomicExchange: `fn atomicExchange(atomic_ptr: ptr<AS, atomic<T>, read_write>, v: T) -> T
Atomically stores the value v in the atomic object pointed to atomic_ptr.
<b>Returns</b> the original value stored in the atomic object.`,

    atomicCompareExchangeWeak: `fn atomicCompareExchangeWeak(
      atomic_ptr: ptr<AS, atomic<T>, read_write>,
      cmp: T,
      v: T) -> __atomic_compare_exchange_result<T>

struct __atomic_compare_exchange_result<T> {
  old_value : T; // old value stored in the atomic
  exchanged : bool; // true if the exchange was done
}

Performs the following steps atomically:
  Load the original value pointed to by atomic_ptr.
  Compare the original value to the value cmp using an equality operation.
  Store the value v only if the result of the equality comparison was true.

<b>Returns</b> a two member structure, where the first member, old_value, is the original
value of the atomic object and the second member, exchanged, is whether or not the
comparison succeeded.`,

    pack4x8snorm: `@const @must_use
fn pack4x8snorm(e: vec4<f32>) -> u32
Converts four normalized floating point values to 8-bit signed integers, and then combines
them into one u32 value.
Component e[i] of the input is converted to an 8-bit twos complement integer value
⌊ 0.5 + 127 × min(1, max(-1, e[i])) ⌋ which is then placed in bits 8 × i
through 8 × i + 7 of the result.`,

    pack4x8unorm: `@const @must_use
fn pack4x8unorm(e: vec4<f32>) -> u32
Converts four normalized floating point values to 8-bit unsigned integers, and then
combines them into one u32 value.
Component e[i] of the input is converted to an 8-bit unsigned integer value
⌊ 0.5 + 255 × min(1, max(0, e[i])) ⌋ which is then placed in bits 8 × i through
8 × i + 7 of the result.`,

    pack2x16snorm: `@const @must_use
fn pack2x16snorm(e: vec2<f32>) -> u32
Converts two normalized floating point values to 16-bit signed integers, and then
combines them into one u32 value.
Component e[i] of the input is converted to a 16-bit twos complement integer value
⌊ 0.5 + 32767 × min(1, max(-1, e[i])) ⌋ which is then placed in bits 16 × i through
16 × i + 15 of the result.`,

    pack2x16unorm: `@const @must_use
fn pack2x16unorm(e: vec2<f32>) -> u32
Converts two normalized floating point values to 16-bit unsigned integers, and
then combines them into one u32 value.
Component e[i] of the input is converted to a 16-bit unsigned integer value
⌊ 0.5 + 65535 × min(1, max(0, e[i])) ⌋ which is then placed in bits
16 × i through 16 × i + 15 of the result.`,

    pack2x16float: `@const @must_use
fn pack2x16float(e: vec2<f32>) -> u32
Converts two floating point values to half-precision floating point numbers,
and then combines them into one u32 value.
Component e[i] of the input is converted to a IEEE-754 binary16 value, which is
then placed in bits 16 × i through 16 × i + 15 of the result.

If either e[0] or e[1] is outside the finite range of binary16 then:
  It is a shader-creation error if e is a const-expression.
  It is a pipeline-creation error if e is an override-expression.
  Otherwise the result is an indeterminate value for u32.`,

    unpack4x8snorm: `@const @must_use
fn unpack4x8snorm(e: u32) -> vec4<f32>
Decomposes a 32-bit value into four 8-bit chunks, then reinterprets each chunk as
a signed normalized floating point value.
Component i of the result is max(v ÷ 127, -1), where v is the interpretation of bits
8×i through 8×i + 7 of e as a twos-complement signed integer.`,

    unpack4x8unorm: `@const @must_use
fn unpack4x8unorm(e: u32) -> vec4<f32>
Decomposes a 32-bit value into four 8-bit chunks, then reinterprets each chunk
as an unsigned normalized floating point value.
Component i of the result is v ÷ 255, where v is the interpretation of bits 8×i
through 8×i + 7 of e as an unsigned integer.`,

    unpack2x16snorm: `@const @must_use
fn unpack2x16snorm(e: u32) -> vec2<f32>
Decomposes a 32-bit value into two 16-bit chunks, then reinterprets each chunk as
a signed normalized floating point value.
Component i of the result is max(v ÷ 32767, -1), where v is the interpretation of
bits 16×i through 16×i + 15 of e as a twos-complement signed integer.`,

    unpack2x16unorm: `@const @must_use
fn unpack2x16unorm(e: u32) -> vec2<f32>
Decomposes a 32-bit value into two 16-bit chunks, then reinterprets each chunk as
an unsigned normalized floating point value.
Component i of the result is v ÷ 65535, where v is the interpretation of bits 16×i
through 16×i + 15 of e as an unsigned integer.`,

    unpack2x16float: `@const @must_use
fn unpack2x16float(e: u32) -> vec2<f32>
Decomposes a 32-bit value into two 16-bit chunks, and reinterpets each chunk as a
floating point value.
Component i of the result is the f32 representation of v, where v is the
interpretation of bits 16×i through 16×i + 15 of e as an IEEE-754 binary16 value.`,

    storageBarrier: `fn storageBarrier()
Executes a control barrier synchronization function that affects memory and
atomic operations in the storage address space.`,

    workgroupBarrier: `fn workgroupBarrier()
Executes a control barrier synchronization function that affects memory and atomic
operations in the workgroup address space.`,

    workgroupUniformLoad: `@must_use
fn workgroupUniformLoad(p : ptr<workgroup, T>) -> T
T is a concrete plain type with a fixed footprint that does not contain any
atomic types
<b>Returns</b> the value pointed to by p to all invocations in the workgroup. The
return value is uniform. p must be a uniform value.

Executes a control barrier synchronization function that affects memory and atomic
operations in the workgroup address space.`,
  };

  static intrinsicDocs(name: string) {
    if (this.intrinsics.hasOwnProperty(name)) {
      return this.intrinsics[name];
    }
    return undefined;
  }

  static predeclared_names = {
    read: `Supports read accesses, but not writes.`,
    write: `Supports write accesses, but not reads.`,
    read_write: `Supports both read and write accesses.`,

    function: `Function address space`,
    private: `Private address space`,
    workgroup: `Workgroup address space.`,
    uniform: `Uniform address space. For uniform buffer variables.`,
    storage: `Storage address space. For storage buffer variables.`,

    perspective: `Values are interpolated in a perspective correct manner.`,

    linear: `Values are interpolated in a linear, non-perspective correct manner.`,

    flat: `Values are not interpolated. Interpolation sampling is not used
with flat interpolation. `,

    center: `Interpolation is performed at the center of the pixel.`,

    centroid: `Interpolation is performed at a point that lies within all the
samples covered by the fragment within the current primitive. This value
is the same for all samples in the primitive.`,

    sample: `Interpolation is performed per sample. The fragment shader is
invoked once per sample when this attribute is applied.`,

    vertex_index: `Vertex input type <code>u32</code>

Index of the current vertex within the current API-level draw command,
independent of draw instancing. For a non-indexed draw, the first vertex
has an index equal to the <code>firstVertex</code> argument of the draw,
whether provided directly or indirectly. The index is incremented by one
for each additional vertex in the draw instance.

For an indexed draw, the index is equal to the index buffer entry for the
vertex, plus the <code>baseVertex</code> argument of the draw, whether provided
directly or indirectly.`,

    instance_index: `Vertex input type <code>u32</code>
Instance index of the current vertex within the current API-level draw command.
The first instance has an index equal to the <code>firstInstance</code> argument of
the draw, whether provided directly or indirectly. The index is incremented
by one for each additional instance in the draw.`,

    position: `Vertex output type <code>vec4&lt;f32&gt;</code>
Output position of the current vertex, using homogeneous coordinates.
After homogeneous normalization (where each of the x, y, and z components
are divided by the w component), the position is in the WebGPU normalized device
coordinate space.

Fragment input type <code>vec4&lt;f32&gt;</code>
Framebuffer position of the current fragment in framebuffer space.
(The x, y, and z components have already been scaled such that w is now 1.)`,

    front_facing: `Fragment input type <code>bool</code>
True when the current fragment is on a front-facing primitive. False otherwise.`,

    frag_depth: `Fragment output type <code>f32</code>
Updated depth of the fragment, in the viewport depth range.`,

    local_invocation_id: `Compute input type <code>vec3&lt;u32&gt;</code>
The current invocation’s local invocation ID, i.e. its position in the workgroup grid.`,

    local_invocation_index: `Compute input type <code>u32</code>
The current invocation’s local invocation index, a linearized index of the
invocation’s position within the workgroup grid.`,

    global_invocation_id: `Compute input type <code>vec3&lt;u32&gtl;</code>
The current invocation’s global invocation ID, i.e. its position in the
compute shader grid.`,

    workgroup_id: `Compute input <code>vec3&lt;u32&gt;</code>
The current invocation’s workgroup ID, i.e. the position of the workgroup
in the workgroup grid.`,

    num_workgroups: `Compute input <code>vec3&lt;u32&gt;</code>
The dispatch size, vec&lt;u32&gt;(group_count_x, group_count_y, group_count_z),
of the compute shader dispatched by the API.`,

    sample_index: `Fragment input <code>u32</code>
Sample index for the current fragment. The value is least 0 and at most
sampleCount-1, where sampleCount is the MSAA sample count specified for the
GPU render pipeline.`,

    sample_mask: `Fragment input type <code>u32</code>
Fragment output type <code>u32</code>
Sample coverage mask control for the current fragment. The last value
written to this variable becomes the shader-output mask. Zero bits in the
written value will cause corresponding samples in the color attachments
to be discarded.`,

    rgba8unorm: `Format 8-bit unsigned normalized integer
Order in memory (r, g, b, a)`,

    rgba8snorm: `Format 8-bit signed normalized integer
Order in memory (r, g, b, a)`,

    rgba8uint: `Format 8-bit unsigned integer
Order in memory (r, g, b, a)`,

    rgba8sint: `Format 8-bit signed integer
Order in memory (r, g, b, a)`,

    rgba16uint: `Format 16-bit unsigned integer
Order in memory (r, g, b, a)`,

    rgba16sint: `Format 16-bt signed integer
Order in memory (r, g, b, a)`,

    rgba16float: `Format 16-bit float
Order in memory (r, g, b, a)`,

    r32uint: `Format 32-bit unsigned integer
Order in memory (r)`,

    r32sint: `Format 32-bit signed integer
Order in memory (r)`,

    r32float: `Format 32-bit float
Order in memory (r)`,

    rg32uint: `Format 32-bit unsigned integer
Order in memory (r, g)`,

    rg32sint: `Format 32-bit signed integer
Order in memory (r, g)`,

    rg32float: `Format 32-bit float
Order in memory (r, g)`,

    rgba32uint: `Format 32-bit unsigned integer
Order in memory (r, g, b, a)`,

    rgba32sint: `Format 32-bit signed integer
Order in memory (r, g, b, a)`,

    rgba32float: `Format 32-bit float
Order in memory (r, g, b, a)`,

    bgra8unorm: `Format 8-bit unsigned normalized integer
Order in memory (b, g, r, a)`,
  };

  static var3(name: string) {
    if (this.predeclared_names.hasOwnProperty(name)) {
      return this.predeclared_names[name];
    }
    return undefined;
  }

  static attributes = {
    align: `Specifies the byte alignment requirement for the structure member`,
    binding: `Specifies the binding number of the resource in a bind group.`,
    builtin: `Specifies that the associated object is a built-in value, as denoted
by the specified enumerant.`,
    compute: `Declares the function to be an entry point for the compute shader
stage of a compute pipeline.`,
    const: `Specifies that the function can be used as a const-function.
This attribute must not be applied to a user-defined function.`,
    fragment: `Declares the function to be an entry point for the fragment shader
stage of a render pipeline.`,
    group: `Specifies the binding group of the resource.`,
    id: `Specifies a numeric identifier as an alternate name for a
pipeline-overridable constant.`,
    interpolate: `Specifies how the user-defined IO must be interpolated.
The attribute is only significant on user-defined vertex outputs and fragment inputs.`,
    invariant: `When applied to the position built-in output value of a vertex shader,
the computation of the result is invariant across different programs and different
invocations of the same entry point. That is, if the data and control flow match
for two position outputs in different entry points, then the result values are
guaranteed to be the same. There is no affect on a position built-in input value.`,
    location: `Specifies a part of the user-defined IO of an entry point.`,
    size: `Specifies that a call to this function must be used as an expression.
That is, a call to this function must not be the entirety of a function call statement.`,
    vertex: `Declares the function to be an entry point for the vertex shader
stage of a render pipeline.`,
    workgroup_size: `Specifies the (x, y, z) dimensions of the workgroup grid
for the compute shader.

The x value is required, y, z are optional, defaulting to 1.`,
  };

  static meta(name: string) {
    if (this.attributes.hasOwnProperty(name)) {
      return this.attributes[name];
    }
    return undefined;
  }
}
