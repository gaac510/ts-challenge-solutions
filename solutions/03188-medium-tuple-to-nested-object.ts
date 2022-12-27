// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<TupleToNestedObject<["a"], string>, { a: string }>>,
  Expect<Equal<TupleToNestedObject<["a", "b"], number>, { a: { b: number } }>>,
  Expect<Equal<TupleToNestedObject<["a", "b", "c"], boolean>, { a: { b: { c: boolean } } }>>,
  Expect<Equal<TupleToNestedObject<[], boolean>, boolean>>
];

// ============= Your Code Here =============
type TupleToNestedObject<T extends string[], U> = T extends [
  infer first extends string,
  ...infer Remainder extends string[]
]
  ? {
      [Key in first]: TupleToNestedObject<Remainder, U>;
    }
  : U;
