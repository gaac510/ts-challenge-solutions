// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Expected1, MyOmit<Todo, "description">>>,
  Expect<Equal<Expected2, MyOmit<Todo, "description" | "completed">>>
];

type cases2 = [
  Expect<Equal<Expected1, MyOmit2<Todo, "description">>>,
  Expect<Equal<Expected2, MyOmit2<Todo, "description" | "completed">>>
];

// @ts-expect-error
type error = MyOmit<Todo, "description" | "invalid">;

// @ts-expect-error
type error2 = MyOmit2<Todo, "description" | "invalid">;

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

interface Expected1 {
  title: string;
  completed: boolean;
}

interface Expected2 {
  title: string;
}

// ============= Your Code Here =============
type MyOmit<T, K extends keyof T> = {
  [O in {
    [I in keyof T]: I extends K ? never : I;
  }[keyof T]]: T[O];
};

/**
 * `in` works with union types which cannot contain `never`.
 */

type MyOmit2<T, K extends keyof T> = {
  [I in keyof T as I extends K ? never : I]: T[I]
};

/**
 * `as` allowing further using an extracted type.
 */
