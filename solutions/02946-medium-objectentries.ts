// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

interface Model {
  name: string;
  age: number;
  locations: string[] | null;
}

type ModelEntries = ["name", string] | ["age", number] | ["locations", string[] | null];

type cases = [
  Expect<Equal<ObjectEntries<Model>, ModelEntries>>,
  Expect<Equal<ObjectEntries<Partial<Model>>, ModelEntries>>,
  Expect<Equal<ObjectEntries<{ key?: undefined }>, ["key", undefined]>>,
  Expect<Equal<ObjectEntries<{ key: undefined }>, ["key", undefined]>>
];

// ============= Your Code Here =============
type ObjectEntries<T, Key extends keyof T = keyof T> = Key extends unknown
  ? [Key, T[Key] extends infer Required | undefined ? Required : undefined]
  : never;

type AnotherObjectEntries<T, R = Required<T>> = {
  [Key in keyof R]: [Key, R[Key] extends never ? undefined : R[Key]];
}[keyof R];

type TediousObjectEntries<T> = {
  [Key in keyof T]: [Key, T[Key] extends infer Required | undefined ? Required : undefined];
}[keyof T] extends infer Result | undefined
  ? Result
  : undefined;

/**
 * `infer` can also be used to infer part of a union.
 */

type Ta = ObjectEntries<Model>;
type Tb = ObjectEntries<Partial<Model>>;
type Tc = ObjectEntries<{ key?: undefined }>;
type Td = ObjectEntries<{ key: undefined }>;
