// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Unique<[1, 1, 2, 2, 3, 3]>, [1, 2, 3]>>,
  Expect<Equal<Unique<[1, 2, 3, 4, 4, 5, 6, 7]>, [1, 2, 3, 4, 5, 6, 7]>>,
  Expect<Equal<Unique<[1, "a", 2, "b", 2, "a"]>, [1, "a", 2, "b"]>>,
  Expect<
    Equal<
      Unique<[string, number, 1, "a", 1, string, 2, "b", 2, number]>,
      [string, number, 1, "a", 2, "b"]
    >
  >,
  Expect<Equal<Unique<[unknown, unknown, any, any, never, never]>, [unknown, any, never]>>
];

// ============= Your Code Here =============
type In<T, U extends unknown[]> = U extends [infer Head, ...infer Remainder]
  ? (<_>() => _ extends T ? 1 : 0) extends <_>() => _ extends Head ? 1 : 0
    ? true
    : In<T, Remainder>
  : false;

type Unique<T> = T extends [...infer Remainder, infer Tail]
  ? [...Unique<Remainder>, ...(In<Tail, Remainder> extends true ? [] : [Tail])]
  : [];

type Ta = Unique<[1, 1, 2, 2, 3, 3]>;
type Tb = Unique<[1, 2, 3, 4, 4, 5, 6, 7]>;
type Tc = Unique<[1, "a", 2, "b", 2, "a"]>;
type Td = Unique<[string, number, 1, "a", 1, string, 2, "b", 2, number]>;
type Te = Unique<[unknown, unknown, any, any, never, never]>;
