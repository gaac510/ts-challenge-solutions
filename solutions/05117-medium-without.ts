// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Without<[1, 2], 1>, [2]>>,
  Expect<Equal<Without<[1, 2, 4, 1, 5], [1, 2]>, [4, 5]>>,
  Expect<Equal<Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>, []>>
];

// ============= Your Code Here =============
type Without<T, U> = T extends [infer First, ...infer Remainder]
  ? [
      ...(First extends (U extends unknown[] ? U[number] : U) ? [] : [First]),
      ...Without<Remainder, U>
    ]
  : T;

type Ta = Without<[1, 2], 1>;
