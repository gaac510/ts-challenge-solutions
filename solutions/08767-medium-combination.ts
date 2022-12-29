// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Combination<['foo', 'bar', 'baz']>,
  'foo' | 'bar' | 'baz' | 'foo bar' | 'foo bar baz' | 'foo baz' | 'foo baz bar' | 'bar foo' | 'bar foo baz' | 'bar baz' | 'bar baz foo' | 'baz foo' | 'baz foo bar' | 'baz bar' | 'baz bar foo'>>,
]


// ============= Your Code Here =============
type Combination<
  T extends string[],
  Element extends string = T[number],
  ElementUnion extends string = Element
> = Element extends string
? Element | `${Element} ${Combination<[], ElementUnion extends Element ? never : ElementUnion>}`
: never;

type Tt = Combination<['']>
type Ta = Combination<['foo']>
type Tb = Combination<['foo', 'bar']>
type Tc = Combination<['foo', 'bar', 'baz']>