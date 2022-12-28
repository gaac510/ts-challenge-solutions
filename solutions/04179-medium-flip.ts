// ============= Test Cases =============
import type { Equal, Expect, NotEqual } from "./test-utils";

type cases = [
  Expect<Equal<{ a: "pi" }, Flip<{ pi: "a" }>>>,
  Expect<NotEqual<{ b: "pi" }, Flip<{ pi: "a" }>>>,
  Expect<Equal<{ 3.14: "pi"; true: "bool" }, Flip<{ pi: 3.14; bool: true }>>>,
  Expect<Equal<{ val2: "prop2"; val: "prop" }, Flip<{ prop: "val"; prop2: "val2" }>>>
];

// ============= Your Code Here =============
type Flip<
  T extends {
    [Key in any]: any;
  }
> = {
  [Key in keyof T as `${T[Key]}`]: Key;
};

/**
 * Any is the auto-fit type.
 */

type Ta = Flip<{ pi: "a" }>;
type Tb = Flip<{ pi: "a" }>;
type Tc = Flip<{ pi: 3.14; bool: true }>;
type Td = Flip<{ prop: "val"; prop2: "val2" }>;
