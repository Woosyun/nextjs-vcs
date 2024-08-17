import { Commit, Hash, HeadType } from "@woosy2207/tsgit/dist/types";
import VCS from '@woosy2207/tsgit';

type Node = Commit;

export default class VCSGraph extends VCS{
  edges: Map<Hash, Set<Hash>> = new Map();
  nodes: Map<Hash, Node> = new Map();


  constructor() {
    super();
  }

  public clear() {
    this.nodes.clear();
    this.edges.clear();
  }

  public create(localOrRemote: HeadType) {
    // this.mapHeads(localOrRemote, this.ascendBranch);
    const headNames = this.getHeadNames(localOrRemote);
    headNames.forEach((headName: string) => {
      const head: Hash = this.readHead(localOrRemote, headName);
      this.ascendBranch(head, headName)
    })
  }

  private ascendBranch(hash: Hash, branch: string) {
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

  public setEdge(from: Hash, to: Hash) {
    if (!this.edges.has(from)) {
      this.edges.set(from, new Set());
    }
    this.edges.get(from)!.add(to);
  }
  public getOutgoingEdges(id: Hash): Set<Hash> {
    if (!this.edges.has(id)) {
      throw new Error(`Node with id ${id} not found`);
    }
    return this.edges.get(id)!
  }
}