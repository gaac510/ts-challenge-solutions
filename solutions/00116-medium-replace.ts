// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Replace<"foobar", "bar", "foo">, "foofoo">>,
  Expect<Equal<Replace<"foobarbar", "bar", "foo">, "foofoobar">>,
  Expect<Equal<Replace<"foobarbar", "", "foo">, "foobarbar">>,
  Expect<Equal<Replace<"foobarbar", "bar", "">, "foobar">>,
  Expect<Equal<Replace<"foobarbar", "bra", "foo">, "foobarbar">>,
  Expect<Equal<Replace<"", "", "">, "">>
];

// ============= Your Code Here =============
type Replace<S extends string, From extends string, To extends string> = From extends ""
  ? S
  : S extends `${infer Start}${From}${infer End}`
  ? `${Start}${To}${End}`
  : S;

type TediousReplace<
  S extends string,
  From extends string,
  To extends string,
  Removed extends string = ""
> = S extends `${infer C}${infer R}`
  ? From extends `${infer B}${infer E}`
    ? C extends B
      ? E extends ""
        ? `${To}${R}`
        : TediousReplace<R, E, To, `${Removed}${C}`>
      : `${Removed}${C}${TediousReplace<R, `${Removed}${From}`, To>}`
    : S
  : S;

/**
 * Within `<>` additional generics can be declared to serve as variables.
 */
