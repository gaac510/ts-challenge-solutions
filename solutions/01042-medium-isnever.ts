// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<IsNever<never>, true>>,
  Expect<Equal<IsNever<never | string>, false>>,
  Expect<Equal<IsNever<"">, false>>,
  Expect<Equal<IsNever<undefined>, false>>,
  Expect<Equal<IsNever<null>, false>>,
  Expect<Equal<IsNever<[]>, false>>,
  Expect<Equal<IsNever<{}>, false>>
];

// ============= Your Code Here =============
type IsNever<T> = [T] extends [never] ? true : false;

/**
 * `never` represents an empty union and when supplied through a generics as the LHS of `extends`,
 * which becomes distributive, nothing is distributed and the expression resolves to `never`. To
 * prevent this, we need to disable the distributivity, either by supplying `never` directly, i.e.
 * without going through a generic, or by enclosing both sides of `extends` in `[]`.
 *
 * See:
 * https://github.com/microsoft/TypeScript/issues/31751#issuecomment-498526919
 */
