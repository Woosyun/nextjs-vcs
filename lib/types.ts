import { Commit, Hash } from '@/lib/vcs/src/types';

export type LocalOrRemote = 0 | 1;
export type GraphPrimitive = {
  nodes: [Hash, Node][];
  edges: [Hash, Hash[]][];
};
export type Node = Commit & {
  x: number, y: number
};
export type Graph = {
  nodes: Map<Hash, Node>;
  edges: Map<Hash, Hash[]>
};
export type { Commit, Hash };

export type DrawLine = ({ from, to }: { from: { x: number, y: number }, to: { x: number, y: number } }) => void;
export type DrawCircle = (x: number, y: number, hash: Hash) => void;
