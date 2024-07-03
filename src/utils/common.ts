export function getTotalCountOfNumbersInObject(obj: {
  [key in string]: number[];
}): number {
  return Object.keys(obj).reduce(
    (previous, key) => previous + obj[key].length,
    0,
  );
}
