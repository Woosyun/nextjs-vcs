const m: Map<string, number> = new Map();
m.set('a', 1);
m.set('b', 2);

m.forEach((value: number, key: string) => {
  console.log(key, value);
});