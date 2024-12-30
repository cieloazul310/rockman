export default function removeMultiple<T>(
  arr: T[],
  getVal: (item: T) => unknown,
): T[] {
  const vals = arr.map(getVal);
  const set = new Set(vals);
  return Array.from(set).map((val) => arr[vals.indexOf(val)]);
}
