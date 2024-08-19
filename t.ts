const edges: Map<string, Set<string>> = new Map();

edges.set('a', new Set(['b', 'c']));

const a = Array.from(edges).map(([from, toS]) => [from, Array.from(toS)]);

console.log(a);