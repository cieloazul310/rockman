export function isNonNullable<T>(value: T | NonNullable<T>): value is NonNullable<T> {
  return !!value;
}

export default function nonNullable<T>(value: T | NonNullable<T>): NonNullable<T> {
  if (!isNonNullable(value)) throw new Error('Error');
  return value;
}
