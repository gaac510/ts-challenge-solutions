// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Subsequence<[1, 2]>, [] | [1] | [2] | [1, 2]>>,
  Expect<Equal<Subsequence<[1, 2, 3]>, [] | [1] | [2] | [1, 2] | [3] | [1, 3] | [2, 3] | [1, 2, 3] >>,
]


// ============= Your Code Here =============
type Subsequence<T extends any[]> = T extends [infer Head, ...infer Remainder]
? [Head, ...Subsequence<Remainder>] | Subsequence<Remainder>
: [];

type Ta = Subsequence<[1, 2, 3]>
type Tb = Subsequence<[]>
