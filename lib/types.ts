import { Commit, Hash } from "@woosy2207/tsgit/dist/types";

export type GraphPrimitive = {
  commits: [Hash, Commit][];
  edges: [Hash, Hash[]][];
};
export type Graph = {
  commits: Map<Hash, Commit>;
  edges: Map<Hash, Hash[]>
}
export type { Commit, Hash };

export type DrawLine = ({from, to}: {from: {x: number, y: number}, to: {x: number, y: number}}) => void

export type DrawCircle = (x: number, y: number, hash: Hash) => void