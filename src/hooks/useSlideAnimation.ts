import React from 'react';
import { Animated, Platform } from 'react-native';

import { ToastPosition } from '../types';
import { additiveInverseArray } from '../utils/array';
import { useKeyboard } from './useKeyboard';

type UseSlideAnimationParams = {
  position: ToastPosition;
  height: number;
  topOffset: number;
  bottomOffset: number;
  keyboardOffset: number;
  avoidKeyboard: boolean;
};

export function translateYOutputRangeFor({
  position,
  height,
  topOffset,
  bottomOffset,
  keyboardHeight,
  keyboardOffset,
  avoidKeyboard
}: UseSlideAnimationParams & {
  keyboardHeight: number;
}) {
  const offset = position === 'bottom' ? bottomOffset : topOffset;
  const keyboardAwareOffset =
    position === 'bottom' && avoidKeyboard ? keyboardHeight + keyboardOffset : 0;

  const range = [-(height * 2), Math.max(offset, keyboardAwareOffset)];
  const outputRange =
    position === 'bottom' ? additiveInverseArray(range) : range;

  return outputRange;
}

const useNativeDriver = Platform.select({
  ios: true,
  default: false
});

export function useSlideAnimation({
  position,
  height,
  topOffset,
  bottomOffset,
  keyboardOffset,
  avoidKeyboard
}: UseSlideAnimationParams) {
  const animatedValue = React.useRef(new Animated.Value(0));
  const { keyboardHeight } = useKeyboard();

  const animate = React.useCallback((toValue: number) => {
    Animated.spring(animatedValue.current, {
      toValue,
      useNativeDriver,
      friction: 8
    }).start();
  }, []);

  const translateY = React.useMemo(() => animatedValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: translateYOutputRangeFor({
      position,
      height,
      topOffset,
      bottomOffset,
      keyboardHeight,
      keyboardOffset,
      avoidKeyboard
    })
  }), [position, height, topOffset, bottomOffset, keyboardHeight, keyboardOffset, avoidKeyboard]);

  const opacity = animatedValue.current.interpolate({
    inputRange: [0, 0.7, 1],
    outputRange: [0, 1, 1]
  });

  return {
    animatedValue,
    animate,
    animationStyles: {
      opacity,
      transform: [
        {
          translateY
        }
      ]
    }
  };
}
