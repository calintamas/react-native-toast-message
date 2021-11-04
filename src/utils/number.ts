export function upperBound(n: number, max: number) {
  return n > max ? max : n;
}

export function lowerBound(n: number, min: number) {
  return n < min ? min : n;
}

export function bound(n: number, min: number, max: number) {
  return upperBound(lowerBound(n, min), max);
}
