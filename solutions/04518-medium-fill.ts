// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Fill<[], 0>, []>>,
  Expect<Equal<Fill<[], 0, 0, 3>, []>>,
  Expect<Equal<Fill<[1, 2, 3], 0, 0, 0>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], 0, 2, 2>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], 0>, [0, 0, 0]>>,
  Expect<Equal<Fill<[1, 2, 3], true>, [true, true, true]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 0, 1>, [true, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 1, 3>, [1, true, true]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 10, 0>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 0, 10>, [true, true, true]>>
];

// ============= Your Code Here =============
type Fill<
  T extends unknown[],
  N,
  Start extends number = 0,
  End extends number = T["length"],
  Previous extends unknown[] = []
> = Start extends End ? T : // If `Start` equals `End`, just return `T`.
  T extends [infer First, ...infer Remainder]
  ? Previous["length"] extends End ? [...Previous, ...T] : // If reached `End`, return `Previous` joined with `T`.
    Previous["length"] extends Start
    ? Fill<Remainder, N, number, End, [...Previous, N]> // If reached `Start`, start filling and ignore `Start` from now on.
    : Fill<Remainder, N, Start, End, [...Previous, First]> // Otherwise, keep checking the next element of `T`.
  : Previous; // If `T` is empty, return `Previous`.

type Ta = Fill<[], 0>;
type Tb = Fill<[], 0, 0, 3>;
type Tc = Fill<[1, 2, 3], 0, 0, 0>;
type Td = Fill<[1, 2, 3], 0, 2, 2>;
type Te = Fill<[1, 2, 3], 0>;
type Tf = Fill<[1, 2, 3], true>;
type Tg = Fill<[1, 2, 3], true, 0, 1>;
type Th = Fill<[1, 2, 3], true, 1, 3>;
type Ti = Fill<[1, 2, 3], true, 10, 0>;
type Tj = Fill<[1, 2, 3], true, 0, 10>;
