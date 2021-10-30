/* eslint-env jest */

import { mergeIfDefined } from '../obj';

describe('test mergeIfDefined function', () => {
  it('merges defined values from obj2', () => {
    const obj1 = {
      foo: 1,
      bar: 2,
      baz: 3
    };
    const obj2 = {
      foo: null,
      bar: 20,
      baz: undefined
    };
    expect(mergeIfDefined(obj1, obj2)).toEqual({
      foo: 1,
      bar: 20,
      baz: 3
    });
  });
});
