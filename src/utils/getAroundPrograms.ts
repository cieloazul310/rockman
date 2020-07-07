export default function getAroundPrograms<T>(edges: T[], id: string, limit = 5): T[] {
  const index = edges.map((d) => d.node.id).indexOf(id);
  const { length } = edges;
  const [begin, end] = getAroundCore(length, index, limit);

  return [...edges].slice(begin, end);
}

export function getAroundCore(length: number, index: number, limit: number) {
  const lim = Math.min(limit, length);
  const threshould = Math.floor(lim / 2);

  return index < threshould
    ? [0, lim]
    : index >= length - threshould
    ? [length - lim, length]
    : [index - threshould, index + threshould + 1];
}
