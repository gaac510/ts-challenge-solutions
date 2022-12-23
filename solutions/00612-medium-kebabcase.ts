// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<KebabCase<"FooBarBaz">, "foo-bar-baz">>,
  Expect<Equal<KebabCase<"fooBarBaz">, "foo-bar-baz">>,
  Expect<Equal<KebabCase<"foo-bar">, "foo-bar">>,
  Expect<Equal<KebabCase<"foo_bar">, "foo_bar">>,
  Expect<Equal<KebabCase<"Foo-Bar">, "foo--bar">>,
  Expect<Equal<KebabCase<"ABC">, "a-b-c">>,
  Expect<Equal<KebabCase<"-">, "-">>,
  Expect<Equal<KebabCase<"">, "">>,
  Expect<Equal<KebabCase<"😎">, "😎">>
];

// ============= Your Code Here =============
type Mapping = {
  // Need to add the remaining letters to cover all cases.
  // `-` can also be prepended to the start of each value, then a two-step
  // solution is required: first replace all capital letters, then remove the
  // starting dash if present.
  A: "a";
  B: "b";
  C: "c";
  F: "f";
};

type KebabCase<S, IsStart = true> = S extends `${infer First}${infer Remainder}`
  ? First extends keyof Mapping
    ? `${IsStart extends true ? "" : "-"}${Mapping[First]}${KebabCase<Remainder, false>}`
    : `${First}${KebabCase<Remainder, false>}`
  : "";

// This also works.
// type KebabCase<S, Processed extends string = ""> = S extends `${infer First}${infer Remainder}`
//   ? First extends keyof Mapping
//     ? Processed extends ""
//       ? KebabCase<Remainder, `${Mapping[First]}`>
//       : KebabCase<Remainder, `${Processed}-${Mapping[First]}`>
//     : KebabCase<Remainder, `${Processed}${First}`>
//   : `${Processed}`;

type ta = KebabCase<"FooBarBaz">;
type ts = KebabCase<"fooBarBaz">;
type td = KebabCase<"foo-bar">;
type tf = KebabCase<"foo_bar">;
type tq = KebabCase<"Foo-Bar">;
type te = KebabCase<"ABC">;
type tw = KebabCase<"-">;
type tr = KebabCase<"">;
type tz = KebabCase<"😎">;
