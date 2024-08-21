import { NextRequest, NextResponse } from "next/server";
import { Node, Commit, Hash, LocalOrRemote, GraphPrimitive } from '@/lib/types';
import vcs from "@/lib/vcs/vcs";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const { localOrRemote } = await req.json();

  if (localOrRemote === 1) {
    throw new Error('(get-graph)remote graph is not supported yet');
  } else if (localOrRemote !== 0) {
    throw new Error('(get-graph)localOrRemote must be 0 or 1, localOrRemote: ', localOrRemote);
  }

  vcs.init(cookies().get('directory')!.value);
  const graph: GraphPrimitive | null = getGraphPrimitive(localOrRemote);
  // console.log('(api/get-graph)graph: ', JSON.stringify(graph, null, 2));
  
  return NextResponse.json({ graph: graph });
}

function getGraphPrimitive(localOrRemote: LocalOrRemote): GraphPrimitive | null {
  try {
    let nodes: Map<Hash, Node> = new Map();
    let edges: Map<Hash, Set<Hash>> = new Map();

    const ascendBranch = (head: Hash): void => {
      const rootCommit = vcs.readObject(head) as Commit;
      const branch = rootCommit.branch;
  
      const ascendCommit = (hash: Hash): void => {
        const commit = vcs.readObject(hash) as Commit;
        if (commit.branch !== branch)
          return;
  
        if (commit.parentHash) {
          addEdge(edges, commit.parentHash, hash);
          ascendCommit(commit.parentHash);
          
          const parentNode: Node = nodes.get(commit.parentHash)!;
          const node = {
            ...commit,
            x: parentNode.branch === commit.branch ? parentNode.x : parentNode.x + 1,
            y: parentNode.y + 1
          };
          nodes.set(hash, node);
        } else {
          //root commit
          addEdge(edges, 'root', hash);
          const rootNode: Node = {
            ...commit,
            x: 1, y: 1
          };
          nodes.set(hash, rootNode);
        }
      };
  
      ascendCommit(head);
    };
    vcs.mapHeads(localOrRemote, ascendBranch);

    return {
      nodes: Array.from(nodes),
      edges: Array.from(edges).map(([from, toSet]) => [from, Array.from(toSet)])
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