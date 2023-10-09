type Cluster<T, K extends string | number> = {
  value: K;
  items: T[];
};

export function clusterByValue<T, K extends string | number>(
  arr: T[],
  getValue: (item: T) => K,
): Cluster<T, K>[] {
  const set = new Set(arr.map(getValue));
  const data = Array.from(set).map((value) => {
    return { value, items: arr.filter((item) => getValue(item) === value) };
  });
  return data;
}

export function getDividedYears<T>(
  arr: T[],
  divYear: number,
  getYear: (item: T) => number,
): Cluster<Cluster<T, number>, number>[] {
  const data = clusterByValue(arr, getYear).sort((a, b) => a.value - b.value);
  return clusterByValue(
    data,
    (item) => Math.floor(item.value / divYear) * divYear,
  );
}

export function getFiveYearString(year: number): string {
  const str = year.toString();
  const char = str.slice(-1) === "0" ? "前期" : "後期";
  return `${str.slice(0, -1)}0s${char}`;
}

export function getClusteredLength<T>(
  item: Cluster<Cluster<T, number>, number>,
): number {
  return item.items.reduce<number>(
    (accum, curr) => accum + curr.items.length,
    0,
  );
}
