// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<TrimLeft<"str">, "str">>,
  Expect<Equal<TrimLeft<" str">, "str">>,
  Expect<Equal<TrimLeft<"     str">, "str">>,
  Expect<Equal<TrimLeft<"     str     ">, "str     ">>,
  Expect<Equal<TrimLeft<"   \n\t foo bar ">, "foo bar ">>,
  Expect<Equal<TrimLeft<"">, "">>,
  Expect<Equal<TrimLeft<" \n\t">, "">>
];

// ============= Your Code Here =============
type TrimLeft<S extends string> = S extends `${" " | "\n" | "\t"}${infer R}` ? TrimLeft<R> : S;

/**
 * Template literal types:
 * https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html#template-literal-types
 */
