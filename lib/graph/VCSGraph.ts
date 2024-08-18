import { Commit, Hash, HeadType } from "@woosy2207/tsgit/dist/types";
import VCS from '@woosy2207/tsgit';

type Node = {
  x: number, y: number
};

export default class VCSGraph extends VCS{
  edges: Map<Hash, Set<Hash>> = new Map();
  commits: Map<Hash, Commit> = new Map();
  nodes: Map<Hash, Node> = new Map();
  
  gap: number = 50;
  radius: number = 10;
  root: Hash = 'root';

  constructor() {
    super();
  }

  public clear() {
    this.commits.clear();
    this.edges.clear();
    this.nodes.clear();
  }

  public create(localOrRemote: HeadType) {
    this.mapHeads(localOrRemote, this.addBranchToGraph);

    //allocate location
    const rootHash: Hash = this.getOutgoingEdges(this.root)[0];
    this.createNode(rootHash);
  }

  private createNode(hash: Hash) {
    const commit = this.readObject(hash) as Commit;
    const {x, y} = this.setNewPosition(commit);
    const node: Node = {
      x, y
    };
    this.setNode(hash, node);

    this.getOutgoingEdges(hash).forEach((childHash: Hash) => {
      this.createNode(childHash);
    })
  }

  private setNewPosition(commit: Commit): { x: number, y: number } {
    if (!commit.parentHash)
      return { x: 0, y: 0 };

    const parentNode = this.getNode(commit.parentHash);
    const parentCommit = this.getCommit(commit.parentHash);
    const x = commit.branch === parentCommit.branch ? parentNode.x : parentNode.x + 1;
    const y = parentNode.y + 1;
    return { x, y };
  }

  private addBranchToGraph(hash: Hash) {
    const rootCommit = this.readObject(hash) as Commit;
    const branch = rootCommit.branch;
    
    const f = (hash: Hash) => {
      const commit = this.readObject(hash) as Commit;
      if (commit.branch !== branch)
        return;
  
      this.setCommit(hash, commit);
      if (commit.parentHash) {
        this.addEdge(commit.parentHash, hash);
        f(commit.parentHash);
      } else {
        this.addEdge(this.root, hash);
      }
    }

    f(hash);
  }

  public setNode(id: Hash, node: Node) {
    this.nodes.set(id, node);
  }
  public getNode(id: Hash): Node {
    if (!this.nodes.has(id)) {
      throw new Error(`Node with id ${id} not found`);
    }
    return this.nodes.get(id)!;
  }

  public setCommit(id: Hash, commit: Commit) {
    this.commits.set(id, commit);
  }
  public getCommit(id: Hash): Commit {
    if (!this.commits.has(id)) {
      throw new Error(`Node with id ${id} not found`);
    }
    return this.commits.get(id)!;
  }

  public addEdge(from: Hash, to: Hash) {
    if (!this.edges.has(from)) {
      this.edges.set(from, new Set());
    }
    this.edges.get(from)!.add(to);
  }
  public getOutgoingEdges(id: Hash): Hash[] {
    if (!this.edges.has(id)) {
      throw new Error(`Node with id ${id} not found`);
    }
    return Array.from(this.edges.get(id)!);
  }

  public setGapPixel(gap: number) {
    this.gap = gap;
  }
  public setRadiusPixel(radius: number) {
    this.radius = radius;
  }
}