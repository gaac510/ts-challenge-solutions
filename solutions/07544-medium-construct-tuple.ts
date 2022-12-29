// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<ConstructTuple<0>, []>>,
  Expect<Equal<ConstructTuple<2>, [unknown, unknown]>>,
  Expect<Equal<ConstructTuple<999>["length"], 999>>,
  Expect<Equal<ConstructTuple<9999>["length"], 9999>>,
  // @ts-expect-error
  Expect<Equal<ConstructTuple<10000>["length"], 10000>>
];

// ============= Your Code Here =============
type TimesTen<T extends unknown[]> = [...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T];

type ConstructTuple<
  L extends number,
  Answer extends unknown[] = []
> = `${L}` extends `${Answer["length"]}${infer Remainder}`
  ? Remainder extends "" ? Answer : ConstructTuple<L, TimesTen<Answer>>
  : ConstructTuple<L, [unknown, ...Answer]>;
