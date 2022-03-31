export const objectHasStrings = (
  obj: { [s: string]: unknown } | ArrayLike<unknown>
): boolean => Object.values(obj).some(i => i !== "");
