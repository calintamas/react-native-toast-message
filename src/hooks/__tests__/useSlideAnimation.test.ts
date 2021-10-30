/* eslint-env jest */

import { renderHook } from '@testing-library/react-hooks';
import { Animated } from 'react-native';

import {
  translateYOutputRangeFor,
  useSlideAnimation
} from '../useSlideAnimation';

const defaultOffsets = {
  topOffset: 40,
  bottomOffset: 60,
  keyboardOffset: 5
};

const setup = () => {
  const utils = renderHook(() =>
    useSlideAnimation({
      position: 'top',
      height: 20,
      ...defaultOffsets
    })
  );
  return {
    ...utils
  };
};

describe('test useSlideAnimation hook', () => {
  it('returns defaults', () => {
    const { result } = setup();
    const { animatedValue, animate, animationStyles } = result.current;

    expect(animatedValue.current).toBeDefined();
    expect(animate).toBeDefined();
    expect(animationStyles.opacity).toBeDefined();
    expect(animationStyles.transform).toBeDefined();
  });

  it('animates to a new value', async () => {
    const spy = jest.spyOn(Animated, 'spring').mockImplementation(() => ({
      start: jest.fn(),
      stop: jest.fn(),
      reset: jest.fn()
    }));
    const { result } = setup();
    result.current.animate(1);
    expect(spy).toHaveBeenCalled();
  });
});

describe('test translateYOutputRangeFor function', () => {
  it('returns output range for position: top', () => {
    expect(
      translateYOutputRangeFor({
        position: 'top',
        height: 20,
        keyboardHeight: 0,
        ...defaultOffsets
      })
    ).toEqual([-40, 40]);
  });

  it('returns output range for position: bottom', () => {
    expect(
      translateYOutputRangeFor({
        position: 'bottom',
        height: 20,
        keyboardHeight: 0,
        ...defaultOffsets
      })
    ).toEqual([40, -60]);
  });

  it('returns output range for position: bottom, with keyboard offset', () => {
    expect(
      translateYOutputRangeFor({
        position: 'bottom',
        height: 20,
        keyboardHeight: 400,
        ...defaultOffsets
      })
    ).toEqual([40, -405]);
  });
});
