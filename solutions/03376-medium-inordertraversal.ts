// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

const tree1 = {
  val: 1,
  left: null,
  right: {
    val: 2,
    left: {
      val: 3,
      left: null,
      right: null,
    },
    right: null,
  },
} as const;

const tree2 = {
  val: 1,
  left: null,
  right: null,
} as const;

const tree3 = {
  val: 1,
  left: {
    val: 2,
    left: null,
    right: null,
  },
  right: null,
} as const;

const tree4 = {
  val: 1,
  left: null,
  right: {
    val: 2,
    left: null,
    right: null,
  },
} as const;

type cases = [
  Expect<Equal<InorderTraversal<null>, []>>,
  Expect<Equal<InorderTraversal<typeof tree1>, [1, 3, 2]>>,
  Expect<Equal<InorderTraversal<typeof tree2>, [1]>>,
  Expect<Equal<InorderTraversal<typeof tree3>, [2, 1]>>,
  Expect<Equal<InorderTraversal<typeof tree4>, [1, 2]>>
];

// ============= Your Code Here =============
interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

type InorderTraversal<T extends TreeNode | null> = [T] extends [TreeNode]
  ? [...InorderTraversal<T["left"]>, T["val"], ...InorderTraversal<T["right"]>]
  : [];

/**
 * Without the square brackets in `[T] extends [TreeNode]` to turn off
 * distributivity, the compiler would try to resolve `TreeNode extends TreeNode`
 * which causes infinite recursion, whereas `(TreeNode | null) extends TreeNode`
 * will make the compiler to defer the resolution of the conditional type.
 */

type Ta = InorderTraversal<null>;
type Tb = InorderTraversal<typeof tree1>;
type Tc = InorderTraversal<typeof tree2>;
type Td = InorderTraversal<typeof tree3>;
type Te = InorderTraversal<typeof tree4>;
