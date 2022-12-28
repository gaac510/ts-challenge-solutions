// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Fibonacci<1>, 1>>,
  Expect<Equal<Fibonacci<2>, 1>>,
  Expect<Equal<Fibonacci<3>, 2>>,
  Expect<Equal<Fibonacci<8>, 21>>
];

// ============= Your Code Here =============
type Fibonacci<
  T extends number,
  Counter extends 1[] = [1],
  PreviousNumber extends 1[] = [],
  PossibleAnswer extends 1[] = [1]
> = Counter["length"] extends T
  ? PossibleAnswer["length"]
  : Fibonacci<T, [1, ...Counter], PossibleAnswer, [...PreviousNumber, ...PossibleAnswer]>;

/**
 * Use tuples to do basic arithmetics.
 */
