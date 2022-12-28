// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<GreaterThan<1, 0>, true>>,
  Expect<Equal<GreaterThan<5, 4>, true>>,
  Expect<Equal<GreaterThan<4, 5>, false>>,
  Expect<Equal<GreaterThan<0, 0>, false>>,
  Expect<Equal<GreaterThan<20, 20>, false>>,
  Expect<Equal<GreaterThan<10, 100>, false>>,
  Expect<Equal<GreaterThan<111, 11>, true>>,
  Expect<Equal<GreaterThan<9_007_199_254_740_991, 9_007_199_254_740_992>, false>>,
  Expect<Equal<GreaterThan<9_007_199_254_740_992, 9_007_199_254_740_992>, false>>,
  Expect<Equal<GreaterThan<9_007_199_254_740_992, 9_007_199_254_740_991>, true>>,
];

// ============= Your Code Here =============
type LargerDigits = {
  "9": never;
  "8": "9";
  "7": "8" | "9";
  "6": "7" | "8" | "9";
  "5": "6" | "7" | "8" | "9";
  "4": "5" | "6" | "7" | "8" | "9";
  "3": "4" | "5" | "6" | "7" | "8" | "9";
  "2": "3" | "4" | "5" | "6" | "7" | "8" | "9";
  "1": "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
  "0": "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
};

type GreaterThan<
  T extends number | string, U extends number | string, PossibleAnswer extends boolean = false
> =
`${T}` extends `${infer TFirst}${infer TRemainder}`
? `${U}` extends `${infer UFirst extends keyof LargerDigits}${infer URemainder}`
  ? GreaterThan<
      TRemainder, URemainder, TFirst extends LargerDigits[UFirst] ? true : PossibleAnswer
    > : true
: `${U}` extends "" ? PossibleAnswer : false;

// type GreaterThan<
//   T extends number,
//   U extends number,
//   Counter extends 1[] = []
// > = Counter["length"] extends T
//   ? false
//   : Counter["length"] extends U
//   ? true
//   : GreaterThan<T, U, [1, ...Counter]>;

type Ta = GreaterThan<1, 0>;
type Tb = GreaterThan<5, 4>;
type Tc = GreaterThan<4, 5>;
type Td = GreaterThan<0, 0>;
type Te = GreaterThan<20, 20>;
type Tf = GreaterThan<10, 100>;
type Tg = GreaterThan<111, 11>;
