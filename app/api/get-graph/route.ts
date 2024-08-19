import { NextRequest, NextResponse } from "next/server";
import { Commit, Hash, GraphPrimitive } from '@/lib/types';
import vcs from "@/lib/vcs/vcs";

export async function POST(req: NextRequest) {
  const { localOrRemote } = await req.json();

  if (localOrRemote === 1) {
    throw new Error('(get-graph)remote graph is not supported yet');
  } else if (localOrRemote !== 0) {
    throw new Error('(get-graph)localOrRemote must be 0 or 1, localOrRemote: ', localOrRemote);
  }

  const graph: GraphPrimitive | null = getGraph(localOrRemote);
  console.log('graph: ', graph);
  
  return NextResponse.json({ graph: graph });
}

function getGraph(localOrRemote: 0 | 1): GraphPrimitive | null {
  try {
    let commits: Map<Hash, Commit> = new Map();
    let edges: Map<Hash, Set<Hash>> = new Map();
    
    const ascendBranch = (head: Hash): void => {
      const rootCommit = vcs.readObject(head) as Commit;
      const branch = rootCommit.branch;
  
      const ascendCommit = (hash: Hash): void => {
        const commit = vcs.readObject(hash) as Commit;
        if (commit.branch !== branch)
          return;
  
        commits.set(hash, commit);
        if (commit.parentHash) {
          addEdge(edges, commit.parentHash, hash);
          ascendCommit(commit.parentHash);
        }
      };
  
      ascendCommit(head);
    }
  
    vcs.mapHeads(localOrRemote, ascendBranch);
  
    return {
      commits: Array.from(commits),
      edges: Array.from(edges).map(([from, toS]) => [from, Array.from(toS)]),
    };
  } catch (error: any) {
    console.log('(getGraph) error: ', error.message);
    return null;
  }

}

function addEdge(m: Map<Hash, Set<Hash>>, from: Hash, to: Hash) {
  if (!m.has(from))
    m.set(from, new Set());
  m.get(from)!.add(to);
}