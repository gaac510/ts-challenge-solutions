// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Chunk<[], 1>, []>>,
  Expect<Equal<Chunk<[1, 2, 3], 1>, [[1], [2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3], 2>, [[1, 2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 2>, [[1, 2], [3, 4]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 5>, [[1, 2, 3, 4]]>>,
  Expect<Equal<Chunk<[1, true, 2, false], 2>, [[1, true], [2, false]]>>
];

// ============= Your Code Here =============
type Chunk<
  T extends unknown[],
  N extends number,
  CurrentChunk extends unknown[] = []
> = CurrentChunk["length"] extends N
  ? [CurrentChunk, ...Chunk<T, N, []>]
  : T extends [infer First, ...infer Remainder]
  ? Chunk<Remainder, N, [...CurrentChunk, First]>
  : CurrentChunk extends []
  ? []
  : [CurrentChunk];
