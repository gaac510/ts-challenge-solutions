// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Zip<[], []>, []>>,
  Expect<Equal<Zip<[1, 2], [true, false]>, [[1, true], [2, false]]>>,
  Expect<Equal<Zip<[1, 2, 3], ["1", "2"]>, [[1, "1"], [2, "2"]]>>,
  Expect<Equal<Zip<[], [1, 2, 3]>, []>>,
  Expect<Equal<Zip<[[1, 2]], [3]>, [[[1, 2], 3]]>>
];

// ============= Your Code Here =============
type Zip<T, U> = [T, U] extends [
  [infer TFirst, ...infer TRemainder],
  [infer UFirst, ...infer URemainder]
]
  ? [[TFirst, UFirst], ...Zip<TRemainder, URemainder>]
  : [];

type Ta = Zip<[], []>;
type Tb = Zip<[1, 2], [true, false]>;
type Tc = Zip<[1, 2, 3], ["1", "2"]>;
type Td = Zip<[], [1, 2, 3]>;
type Te = Zip<[[1, 2]], [3]>;
