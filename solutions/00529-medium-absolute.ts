// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Absolute<0>, "0">>,
  Expect<Equal<Absolute<-0>, "0">>,
  Expect<Equal<Absolute<10>, "10">>,
  Expect<Equal<Absolute<-5>, "5">>,
  Expect<Equal<Absolute<"0">, "0">>,
  Expect<Equal<Absolute<"-0">, "0">>,
  Expect<Equal<Absolute<"10">, "10">>,
  Expect<Equal<Absolute<"-5">, "5">>,
  Expect<Equal<Absolute<-1_000_000n>, "1000000">>,
  Expect<Equal<Absolute<9_999n>, "9999">>
];

// ============= Your Code Here =============

type Absolute<T extends number | string | bigint> = `${T}` extends `-${infer R}` ? R : `${T}`;

/**
 * - `_` in a number or bigint is automatically removed always.
 * - `n` at the end of a bigint is automatically removed when converted to a
 *   string literal.
 */

type TediousAbsolute<T extends number | string | bigint> = `${T}` extends `${infer Before}${
  | "-"
  | "_"
  | "n"}${infer After}`
  ? TediousAbsolute<`${Before}${After}`>
  : `${T}`;