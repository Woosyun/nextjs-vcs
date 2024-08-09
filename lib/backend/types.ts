type Index = {
  name: string;
  type: 'blob' | 'tree';
  entries: Index[];
};

type Entry = {
  name: string;
  type: 'blob' | 'tree';
  hash: string;
};
type Blob = {
  content: string;
};
type Tree = {
  entries: Entry[];
};

type Commit = {
  message: string;
  hash: string; //pointer to root tree
  parentHash: string;
}

export type { Index, Entry, Blob, Tree, Commit};