interface IntQueryOperatorInput {
  eq?: number | null;
  ne?: number | null;
  gt?: number | null;
  gte?: number | null;
  lt?: number | null;
  lte?: number | null;
  in?: number[] | null;
  nin?: number[] | null;
}

export function intQueryFilter(arg: unknown | IntQueryOperatorInput): (input: number) => boolean {
  if (!arg) return () => true;
  if (!argIsArg(arg)) return () => true;

  const { eq, ne, gt, gte, lt, lte, nin } = arg;
  const filterIn = arg['in'];

  return (input: number) =>
    (!eq || input === eq) &&
    (!ne || input !== ne) &&
    (!gt || input > gt) &&
    (!gte || input >= gte) &&
    (!lt || input < lt) &&
    (!lte || input <= lte) &&
    (!filterIn || filterIn.includes(input)) &&
    (!nin || !nin.includes(input));
}

function argIsArg(arg: unknown | IntQueryOperatorInput): arg is IntQueryOperatorInput {
  return true;
}
