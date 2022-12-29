// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<GetMiddleElement<[]>, []>>,
  Expect<Equal<GetMiddleElement<[1, 2, 3, 4, 5]>, [3]>>,
  Expect<Equal<GetMiddleElement<[1, 2, 3, 4, 5, 6]>, [3, 4]>>,
  Expect<Equal<GetMiddleElement<[() => string]>, [() => string]>>,
  Expect<Equal<GetMiddleElement<[() => number, '3', [3, 4], 5]>, ['3', [3, 4]]>>,
  Expect<Equal<GetMiddleElement<[() => string, () => number]>, [() => string, () => number]>>,
  Expect<Equal<GetMiddleElement<[never]>, [never]>>,
]
// @ts-expect-error
type error = GetMiddleElement<1, 2, 3>


// ============= Your Code Here =============
type GetMiddleElement<T extends unknown[]> = T extends [infer Head, ...infer Body, infer Tail]
? Body extends [] ? [Head, Tail] : GetMiddleElement<Body>
: T

type TediousGetMiddleElement<
  T extends unknown[],
  Tape extends unknown[] = [],
  LongTape extends unknown[] = [unknown, ...Tape]
> = T extends [] ? [] :
  [...Tape, ...LongTape]["length"] extends T["length"]
    ? T extends [...Tape, infer A, ...any] ? [A] : never
    : [...LongTape, ...LongTape]["length"] extends T["length"]
      ? T extends [...Tape, infer A, infer B, ...any] ? [A, B] : never
      : TediousGetMiddleElement<T, [unknown, ...Tape]>;

type Ta = GetMiddleElement<[1, 2, 3, 4, 5]>
type Tb = GetMiddleElement<[1, 2, 3, 4, 5, 6]>
type Tc = GetMiddleElement<[() => string]>
type Td = GetMiddleElement<[() => number, '3', [3, 4], 5]>
type Te = GetMiddleElement<[() => string, () => number]>
type Tf = GetMiddleElement<[never]>