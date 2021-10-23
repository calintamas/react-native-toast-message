export function mergeIfDefined(
  obj1: Record<string, unknown>,
  obj2: Record<string, unknown>
) {
  const newObj = {
    ...obj1
  };
  Object.entries(obj2).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      newObj[key] = value;
    }
  });
  return newObj;
}
