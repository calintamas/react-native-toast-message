/* eslint-env jest */

import { renderHook } from '@testing-library/react-hooks';
import { Animated, GestureResponderEvent } from 'react-native';

import { mockGestureValues } from '../../__helpers__/PanResponder';
import { usePanResponder } from '../usePanResponder';
import { moveShouldSetPanResponder, startShouldSetPanResponder } from '..';

const setup = ({ newAnimatedValueForGesture = 0, disable = false } = {}) => {
  const animatedValue = {
    current: new Animated.Value(0)
  };
  const computeNewAnimatedValueForGesture = jest.fn(
    () => newAnimatedValueForGesture
  );
  const onDismiss = jest.fn();
  const onRestore = jest.fn();
  const onStart = jest.fn();
  const onEnd = jest.fn();

  const utils = renderHook(() =>
    usePanResponder({
      animatedValue,
      computeNewAnimatedValueForGesture,
      onDismiss,
      onRestore,
      onStart,
      onEnd,
      disable
    })
  );
  return {
    animatedValue,
    computeNewAnimatedValueForGesture,
    onDismiss,
    onRestore,
    ...utils
  };
};

describe('test usePanResponder hook', () => {
  it('returns defaults', () => {
    const { result } = setup();
    expect(result.current.panResponder.panHandlers).toBeDefined();
    expect(result.current.onGrant).toBeDefined();
    expect(result.current.onMove).toBeDefined();
    expect(result.current.onRelease).toBeDefined();
  });

  it('computes new animated value on move gesture', () => {
    const { result, computeNewAnimatedValueForGesture } = setup({
      newAnimatedValueForGesture: 1
    });
    result.current.onGrant();
    result.current.onMove({} as GestureResponderEvent, mockGestureValues);
    expect(computeNewAnimatedValueForGesture).toBeCalledWith(mockGestureValues);
  });

  it('computes new animated value on release gesture', () => {
    const { result, computeNewAnimatedValueForGesture } = setup({
      newAnimatedValueForGesture: 1
    });
    result.current.onRelease({} as GestureResponderEvent, mockGestureValues);
    expect(computeNewAnimatedValueForGesture).toBeCalledWith(mockGestureValues);
  });

  it('should NOT compute new animated value on move/release, if disable: true', () => {
    const { result, computeNewAnimatedValueForGesture } = setup({
      newAnimatedValueForGesture: 1,
      disable: true
    });

    result.current.onGrant();
    result.current.onMove({} as GestureResponderEvent, mockGestureValues);
    expect(computeNewAnimatedValueForGesture).not.toBeCalledWith(
      mockGestureValues
    );

    result.current.onRelease({} as GestureResponderEvent, mockGestureValues);
    expect(computeNewAnimatedValueForGesture).not.toBeCalledWith(
      mockGestureValues
    );
  });

  it('calls onDismiss when swipe gesture value is below dismiss threshold', () => {
    const { result, computeNewAnimatedValueForGesture, onDismiss } = setup({
      newAnimatedValueForGesture: 0.65
    });
    result.current.onRelease({} as GestureResponderEvent, mockGestureValues);
    expect(computeNewAnimatedValueForGesture).toBeCalledWith(mockGestureValues);
    expect(onDismiss).toHaveBeenCalled();
  });

  it('calls onDismiss when swipe gesture vy (velocity) is over dismiss threshold', () => {
    const { result, computeNewAnimatedValueForGesture, onDismiss } = setup({
      newAnimatedValueForGesture: 1
    });
    const gesture = {
      ...mockGestureValues,
      vy: -0.8,
      dy: -1
    };
    result.current.onRelease({} as GestureResponderEvent, gesture);
    expect(computeNewAnimatedValueForGesture).toBeCalledWith(gesture);
    expect(onDismiss).toHaveBeenCalled();
  });

  it('calls onRestore when swipe gesture value is not below dismiss threshold', () => {
    const { result, computeNewAnimatedValueForGesture, onRestore } = setup({
      newAnimatedValueForGesture: 0.66
    });
    result.current.onRelease({} as GestureResponderEvent, mockGestureValues);
    expect(computeNewAnimatedValueForGesture).toBeCalledWith(mockGestureValues);
    expect(onRestore).toHaveBeenCalled();
  });
});

describe('test shouldSetPanResponder function', () => {
  it('is set pan start always true', () => {
    expect(startShouldSetPanResponder()).toBe(true);
  });

  it('is set when dx > offset', () => {
    const gesture = {
      ...mockGestureValues,
      dx: 2.1,
      dy: 0
    };
    expect(moveShouldSetPanResponder({} as GestureResponderEvent, gesture)).toBe(
      true
    );
  });

  it('is set when dy > offset', () => {
    const gesture = {
      ...mockGestureValues,
      dx: 0,
      dy: 2.1
    };
    expect(moveShouldSetPanResponder({} as GestureResponderEvent, gesture)).toBe(
      true
    );
  });

  it('is not set when dx <= offset', () => {
    const gesture = {
      ...mockGestureValues,
      dx: 2,
      dy: 0
    };
    expect(moveShouldSetPanResponder({} as GestureResponderEvent, gesture)).toBe(
      false
    );
  });

  it('is not set when dy <= offset', () => {
    const gesture = {
      ...mockGestureValues,
      dx: 0,
      dy: 2
    };
    expect(moveShouldSetPanResponder({} as GestureResponderEvent, gesture)).toBe(
      false
    );
  });
});
