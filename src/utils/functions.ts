export const add = (a: number, b: number): number => {
  return a + b;
};
export const objectHasStrings = (
  obj: { [s: string]: unknown } | ArrayLike<unknown>
): boolean => Object.values(obj).some(i => i !== "");
