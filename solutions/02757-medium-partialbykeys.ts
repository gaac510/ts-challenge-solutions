// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

interface User {
  name: string;
  age: number;
  address: string;
}

interface UserPartialName {
  name?: string;
  age: number;
  address: string;
}

interface UserPartialNameAndAge {
  name?: string;
  age?: number;
  address: string;
}

type cases = [
  Expect<Equal<PartialByKeys<User, "name">, UserPartialName>>,
  Expect<Equal<PartialByKeys<User, "name" | "age">, UserPartialNameAndAge>>,
  Expect<Equal<PartialByKeys<User>, Partial<User>>>,
  // @ts-expect-error
  Expect<Equal<PartialByKeys<User, "name" | "unknown">, UserPartialName>>
];

// ============= Your Code Here =============
type MergeIntersection<T> = {
  [Key in keyof T]: T[Key];
};

type PartialByKeys<T, K extends keyof T = any> = MergeIntersection<
  {
    [Key in keyof T as Key extends K ? never : Key]: T[Key];
  } & {
    [Key in keyof T as Key extends K ? Key : never]?: T[Key];
  }
>;

/**
 * - An intersection type can be merged by iterating through it.
 *
 * - `never` is the empty union.
 * - `unknown` is the union of EVERYTHING.
 * - `any` can be anything except `never`.
 */

type Test<A, B> = [A] extends [B] ? true : false;

type tt = Test<any, unknown>; // true
type ta = Test<unknown, any>; // true
type tb = Test<unknown, "">; // false
type tb2 = Test<"", unknown>; // true
type tc = Test<any, "">; // true
type tc2 = Test<"", any>; // true
type te = Test<never, any>; // true
type tf = Test<never, unknown>; // true
type tg = Test<any, never>; // false
type tg2 = any extends never? true : false; // false
type th = Test<unknown, never>; // false
type ti = Test<never, never>; // true
