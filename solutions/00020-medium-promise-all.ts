// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

const promiseAllTest1 = PromiseAll([1, 2, 3] as const);
const promiseAllTest2 = PromiseAll([1, 2, Promise.resolve(3)] as const);
const promiseAllTest3 = PromiseAll([1, 2, Promise.resolve(3)]);
const promiseAllTest4 = PromiseAll<Array<number | Promise<number>>>([1, 2, 3]);

type cases = [
  Expect<Equal<typeof promiseAllTest1, Promise<[1, 2, 3]>>>,
  Expect<Equal<typeof promiseAllTest2, Promise<[1, 2, number]>>>,
  Expect<Equal<typeof promiseAllTest3, Promise<[number, number, number]>>>,
  Expect<Equal<typeof promiseAllTest4, Promise<number[]>>>
];

// ============= Your Code Here =============
type ResolvedPromise<T> = T extends Promise<infer R> ? R : T;

declare function PromiseAll<T extends unknown[]>(
  values: readonly [...T]
): Promise<{ [I in keyof T]: ResolvedPromise<T[I]> }>;
// ): Promise<{ [I in keyof T]: T[I] extends Promise<infer R> ? R : T[I] }>;

/**
 * - `readonly` only works on tuples/arrays expression (or properties of objects
 *   ), in other words, merely a generic type that extends the array/tuple type
 *   isn't enough.
 * - Union of the same type is merged into that same type.
 * - Object with numbers as keys are the same as an array.
 * - [TBC'd] Conditional typing isn't distributive when acting on object values
 *   that have union types.
 */

// Also tried this, which doesn't work on the last test case. Why
type FlattenPromises<T extends readonly unknown[], R extends unknown[] = []> = T extends [
  infer A,
  ...infer B
]
  ? A extends Promise<infer I>
    ? FlattenPromises<[I, ...B], [...R]>
    : FlattenPromises<B, [...R, A]>
  : R;

type Test = FlattenPromises<[number | Promise<number>]>;
