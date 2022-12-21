// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Pop<[3, 2, 1]>, [3, 2]>>,
  Expect<Equal<Pop<['a', 'b', 'c', 'd']>, ['a', 'b', 'c']>>,
  Expect<Equal<Pop<[]>, []>>,
]


// ============= Your Code Here =============
type Pop<T extends any[]> = T extends [...infer K, infer _] ? K : [];

/**
 * I'm guessing this works because when T is [], K and _ ends up being never and
 * [] isn't assignable to the right side of extends, which cause the false arm
 * of the expression being returned.
 */

/**
 * The rest operator results in an array instead of a union.
 */