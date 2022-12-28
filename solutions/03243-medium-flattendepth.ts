// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<FlattenDepth<[]>, []>>,
  Expect<Equal<FlattenDepth<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<FlattenDepth<[1, [2]]>, [1, 2]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, [[5]]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 3>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817>, [1, 2, 3, 4, 5]>>
];

// ============= Your Code Here =============
type FlattenDepth<
  T extends unknown[],
  D extends number = 1,
  Flattened extends unknown[] = [],
  HasFlattened extends boolean = false,
  Counter extends 1[] = [1]
> = T extends [infer Current, ...infer Remainder]
  ? // STAGE 1: Flatten by one layer.
    Current extends unknown[]
    ? // If the current element is an array.
      FlattenDepth<Remainder, D, [...Flattened, ...Current], true, Counter>
    : // If the current element is not an array.
      FlattenDepth<Remainder, D, [...Flattened, Current], HasFlattened, Counter>
  : // STAGE 2: Check if result should be returned, or continue to the next layer.
  HasFlattened extends true
  ? // If any element was flattened.
    Counter["length"] extends D
    ? // If has reached the specified depth, return result.
      Flattened
    : // If has not reached the specified depth, flatten next layer.
      FlattenDepth<Flattened, D, [], false, [1, ...Counter]>
  : // If no element was flattened, return result.
    Flattened;

/**
 * The above is easy to read and understand. Also:
 * - Here's a pretty neat solution: https://github.com/type-challenges/type-challenges/issues/20398
 * - Divide and conquer--noice: https://github.com/type-challenges/type-challenges/issues/19696
 */

type Ta = FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>;
type Tb = FlattenDepth<[1, 2, [3, 4], [[[5]]]]>;
type Tc = FlattenDepth<[1, [2, [3, [4, [5]]]]], 3>;
type Td = FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817>;
