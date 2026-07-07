/* eslint-env jest */

import { renderHook } from '@testing-library/react-hooks';
import { Animated, Easing } from 'react-native';

import { ToastAnimationConfig } from '../../types';
import {
  translateYOutputRangeFor,
  useSlideAnimation
} from '../useSlideAnimation';

const defaultParams = {
  topOffset: 40,
  bottomOffset: 60,
  keyboardOffset: 5,
  avoidKeyboard: true
};

const setup = (animationConfig?: ToastAnimationConfig) => {
  const utils = renderHook(() =>
    useSlideAnimation({
      position: 'top',
      height: 20,
      animationConfig,
      ...defaultParams
    })
  );
  return {
    ...utils
  };
};

const mockAnimation = () => ({
  start: jest.fn(),
  stop: jest.fn(),
  reset: jest.fn()
});

describe('test useSlideAnimation hook', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('returns defaults', () => {
    const { result } = setup();
    const { animatedValue, animate, animationStyles } = result.current;

    expect(animatedValue.current).toBeDefined();
    expect(animate).toBeDefined();
    expect(animationStyles.opacity).toBeDefined();
    expect(animationStyles.transform).toBeDefined();
  });

  it('uses Animated.spring by default', () => {
    const springSpy = jest
      .spyOn(Animated, 'spring')
      .mockImplementation(mockAnimation);
    const timingSpy = jest
      .spyOn(Animated, 'timing')
      .mockImplementation(mockAnimation);

    const { result } = setup();
    result.current.animate(1);

    expect(springSpy).toHaveBeenCalled();
    expect(timingSpy).not.toHaveBeenCalled();
    expect(springSpy.mock.calls[0][1]).toEqual(
      expect.objectContaining({ friction: 8, toValue: 1 })
    );
  });

  it('uses Animated.timing when animationConfig.type is "timing"', () => {
    const timingSpy = jest
      .spyOn(Animated, 'timing')
      .mockImplementation(mockAnimation);

    const { result } = setup({
      type: 'timing',
      duration: 200,
      easing: Easing.linear
    });
    result.current.animate(1);

    expect(timingSpy).toHaveBeenCalled();
    expect(timingSpy.mock.calls[0][1]).toEqual(
      expect.objectContaining({
        duration: 200,
        easing: Easing.linear,
        toValue: 1
      })
    );
  });

  it('forwards spring config (friction, tension) to Animated.spring', () => {
    const springSpy = jest
      .spyOn(Animated, 'spring')
      .mockImplementation(mockAnimation);

    const { result } = setup({ type: 'spring', friction: 6, tension: 40 });
    result.current.animate(1);

    expect(springSpy.mock.calls[0][1]).toEqual(
      expect.objectContaining({ friction: 6, tension: 40, toValue: 1 })
    );
  });

  it('uses separate configs for enter and exit when provided', () => {
    const springSpy = jest
      .spyOn(Animated, 'spring')
      .mockImplementation(mockAnimation);
    const timingSpy = jest
      .spyOn(Animated, 'timing')
      .mockImplementation(mockAnimation);

    const { result } = setup({
      enter: { type: 'timing', duration: 150 },
      exit: { type: 'spring', friction: 12 }
    });

    result.current.animate(1);
    expect(timingSpy).toHaveBeenCalledTimes(1);
    expect(timingSpy.mock.calls[0][1]).toEqual(
      expect.objectContaining({ duration: 150, toValue: 1 })
    );

    result.current.animate(0);
    expect(springSpy).toHaveBeenCalledTimes(1);
    expect(springSpy.mock.calls[0][1]).toEqual(
      expect.objectContaining({ friction: 12, toValue: 0 })
    );
  });
});

describe('test translateYOutputRangeFor function', () => {
  it('returns output range for position: top', () => {
    expect(
      translateYOutputRangeFor({
        position: 'top',
        height: 20,
        keyboardHeight: 0,
        ...defaultParams
      })
    ).toEqual([-40, 40]);
  });

  it('returns output range for position: bottom', () => {
    expect(
      translateYOutputRangeFor({
        position: 'bottom',
        height: 20,
        keyboardHeight: 0,
        ...defaultParams
      })
    ).toEqual([40, -60]);
  });

  it('returns output range for position: bottom, with keyboard offset', () => {
    expect(
      translateYOutputRangeFor({
        position: 'bottom',
        height: 20,
        keyboardHeight: 400,
        ...defaultParams
      })
    ).toEqual([40, -405]);
  });
});
