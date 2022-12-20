// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Includes<["Kars", "Esidisi", "Wamuu", "Santana"], "Kars">, true>>,
  Expect<Equal<Includes<["Kars", "Esidisi", "Wamuu", "Santana"], "Dio">, false>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 7>, true>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 4>, false>>,
  Expect<Equal<Includes<[1, 2, 3], 2>, true>>,
  Expect<Equal<Includes<[1, 2, 3], 1>, true>>,
  Expect<Equal<Includes<[{}], { a: "A" }>, false>>,
  Expect<Equal<Includes<[boolean, 2, 3, 5, 6, 7], false>, false>>,
  Expect<Equal<Includes<[true, 2, 3, 5, 6, 7], boolean>, false>>,
  Expect<Equal<Includes<[false, 2, 3, 5, 6, 7], false>, true>>,
  Expect<Equal<Includes<[{ a: "A" }], { readonly a: "A" }>, false>>,
  Expect<Equal<Includes<[{ readonly a: "A" }], { a: "A" }>, false>>,
  Expect<Equal<Includes<[1], 1 | 2>, false>>,
  Expect<Equal<Includes<[1 | 2], 1>, false>>,
  Expect<Equal<Includes<[null], undefined>, false>>,
  Expect<Equal<Includes<[undefined], null>, false>>
];

// ============= Your Code Here =============
// your answers
type Includes<T extends readonly unknown[], U> = true extends {
  [K in keyof T]: (<N>() => N extends U ? 1 : 0) extends <N>() => N extends T[K] ? 1 : 0
    ? true
    : false;
}[number]
  ? true
  : false;

/**
 * - `keyof` also works on the index of arrays.
 * - Mapped types makes each element of an array or each property of an object accessible.
 * - A imperfect, hacky but sufficient way to check if two types are identical is to trick
 *   TypeScript into using its internal `isTypeIdenticalTo` check to compare two types. See:
 *   https://github.com/Microsoft/TypeScript/issues/27024#issuecomment-421529650
 *   https://github.com/Microsoft/TypeScript/issues/27024#issuecomment-510924206
 *   https://stackoverflow.com/a/53808212
 *   https://stackoverflow.com/a/68963796
 */

/**
 * The below solution, recommended at
 * https://github.com/type-challenges/type-challenges/issues/1568#issue-906163748 uses rest operator
 * and recursion to check each element of the array one by one and terminate at the first one that
 * can determine the result, as opposed to my solution where an interim outcome is calculated for
 * each element and all evaluated at the end, which is less efficient.
 */

type IsEqual<T, U> = (<G>() => G extends T ? 1 : 2) extends <G>() => G extends U ? 1 : 2
  ? true
  : false;

type RecommendedIncludes<Value extends any[], Item> = IsEqual<Value[0], Item> extends true
  ? true
  : Value extends [Value[0], ...infer rest]
  ? RecommendedIncludes<rest, Item>
  : false;
