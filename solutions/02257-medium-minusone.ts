// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<MinusOne<1>, 0>>,
  Expect<Equal<MinusOne<55>, 54>>,
  Expect<Equal<MinusOne<3>, 2>>,
  Expect<Equal<MinusOne<100>, 99>>,
  Expect<Equal<MinusOne<1101>, 1100>>,
  Expect<Equal<MinusOne<0>, -1>>,
  Expect<Equal<MinusOne<9_007_199_254_740_992>, 9_007_199_254_740_991>>
];

// ============= Your Code Here =============
// type TimesTen<T extends 1[]> = [...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T];

// type MinusOne<
//   T extends number | string,
//   Digits extends number[] = [], // For holding split digits for processing
//   TotalCount extends 1[] = [], // For counting total digit
//   CurrentCount extends 1[] = [], // For counting each digit
// > = `${T}` extends `${infer First extends number}${infer Remainder}`
//   ? // Stage 1: Split digits
//     MinusOne<Remainder, [...Digits, First]>
//   : // Stage 2: Build the required length
//   Digits extends [infer First, ...infer Remainder extends number[]]
//   ? CurrentCount["length"] extends First
//     ? // Multiply total count by 10, then add current count to total count.
//       MinusOne<"", Remainder, [...CurrentCount, ...TimesTen<TotalCount>]>
//     : // Increase current count by 1
//       MinusOne<"", Digits, TotalCount, [1, ...CurrentCount]>
//   : // Stage 3: Calculate one less.
//   TotalCount extends [1, ...infer OneLess]
//   ? OneLess["length"]
//   : -1;

type OneLess = {
  readonly "9": "8";
  readonly "8": "7";
  readonly "7": "6";
  readonly "6": "5";
  readonly "5": "4";
  readonly "4": "3";
  readonly "3": "2";
  readonly "2": "1";
  readonly "1": "0";
};

type MinusOne<
  T extends number | string,
  Digits extends string[] = [],
  Processed extends string[] = [],
  Rejoined extends string = ""
> = `${T}` extends `${infer First}${infer Remainder}`
  ? // STAGE 1: split the digits
    MinusOne<Remainder, [...Digits, First]>
  : // STAGE 2: process each digits
  Digits extends [...infer OtherDigits extends string[], infer RightMostDigit]
  ? RightMostDigit extends keyof OneLess
    ? // When not 0
      MinusOne<"", [], [...OtherDigits, OneLess[RightMostDigit], ...Processed]>
    : // When 0
      MinusOne<"", OtherDigits, ["9", ...Processed]>
  : // STAGE 3: Join digits into a string.
  Processed extends [infer First extends string, ...infer Remainder extends string[]]
  ? MinusOne<"", [], Remainder, `${Rejoined}${First}`>
  : // STAGE 4: Handle edge cases and return result
  Rejoined extends "9"
  ? // When it was 0 turned into 9
    -1
  : Rejoined extends `0${infer Answer extends number}`
  ? // When the left most digit is 0
    Answer
  : Rejoined extends `${infer Answer extends number}`
  ? // Convert to number
  Answer
  : never;

type ta = MinusOne<1>;
type ts = MinusOne<55>;
type td = MinusOne<3>;
type tf = MinusOne<100>;
type tg = MinusOne<1101>;
type tq = MinusOne<0>;
type ti = MinusOne<9999>;
type tu = MinusOne<9007199254740992>;