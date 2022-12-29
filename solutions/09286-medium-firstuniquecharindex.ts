// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<FirstUniqueCharIndex<"leetcode">, 0>>,
  Expect<Equal<FirstUniqueCharIndex<"loveleetcode">, 2>>,
  Expect<Equal<FirstUniqueCharIndex<"aabb">, -1>>,
  Expect<Equal<FirstUniqueCharIndex<"">, -1>>
];

// ============= Your Code Here =============
type FirstUniqueCharIndex<
  T extends string,
  Unchecked extends string = T,
  Counter extends 1[] = []
> = Unchecked extends `${infer Head}${infer Remainder}`
? T extends `${infer Before}${Head}${infer After}`
  ? `${Before}${After}` extends `${any}${Head}${any}`
    ? FirstUniqueCharIndex<T, Remainder, [1, ...Counter]>
    : Counter["length"]
  : never
: -1;
