// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<AnyOf<[1, "test", true, [1], { name: "test" }, { 1: "test" }]>, true>>,
  Expect<Equal<AnyOf<[1, "", false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, "test", false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, "", true, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, "", false, [1], {}]>, true>>,
  Expect<Equal<AnyOf<[0, "", false, [], { name: "test" }]>, true>>,
  Expect<Equal<AnyOf<[0, "", false, [], { 1: "test" }]>, true>>,
  Expect<Equal<AnyOf<[0, "", false, [], { name: "test" }, { 1: "test" }]>, true>>,
  Expect<Equal<AnyOf<[0, "", false, [], {}, undefined, null]>, false>>,
  Expect<Equal<AnyOf<[0]>, false>>,
  Expect<Equal<AnyOf<[""]>, false>>,
  Expect<Equal<AnyOf<[false]>, false>>,
  Expect<Equal<AnyOf<[[]]>, false>>,
  Expect<Equal<AnyOf<[{}]>, false>>,
  Expect<Equal<AnyOf<[undefined]>, false>>,
  Expect<Equal<AnyOf<[null]>, false>>,
  Expect<Equal<AnyOf<[]>, false>>
];

// ============= Your Code Here =============
type Falsy = 0 | "" | false | [] | undefined | null | { [Key in any]: never };

type AnyOf<T extends readonly any[]> = T extends [infer First, ...infer Remainder]
  ? First extends Falsy
    ? AnyOf<Remainder>
    : true
  : false;

/**
 * Use `{ [K in any]: never }` to represent an empty object.
 */
