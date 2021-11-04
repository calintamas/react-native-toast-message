/* eslint-env jest */

import { bound, lowerBound, upperBound } from '../number';

describe('test bound functions', () => {
  it('ensures lower bound', () => {
    expect(lowerBound(10, 2)).toBe(10);
    expect(lowerBound(0, 2)).toBe(2);
  });

  it('ensures upper bound', () => {
    expect(upperBound(10, 2)).toBe(2);
    expect(upperBound(0, 2)).toBe(0);
  });

  it('ensures both bounds', () => {
    expect(bound(10, 2, 5)).toBe(5);
  });
});
