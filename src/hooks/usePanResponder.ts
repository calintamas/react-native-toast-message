import React, { RefObject } from 'react';
import {
  Animated,
  GestureResponderEvent,
  PanResponder,
  PanResponderGestureState
} from 'react-native';

export function shouldSetPanResponder(
  _event: GestureResponderEvent,
  gesture: PanResponderGestureState
) {
  const { dx, dy } = gesture;
  // Fixes onPress handler
  // https://github.com/calintamas/react-native-toast-message/issues/113
  const offset = 2;
  return Math.abs(dx) > offset || Math.abs(dy) > offset;
}

export function shouldDismissView(
  newAnimatedValue: number,
  gesture: PanResponderGestureState
) {
  const dismissThreshold = 0.65;
  const { vy, dy } = gesture;
  return (
    newAnimatedValue <= dismissThreshold ||
    (Math.abs(vy) >= dismissThreshold && dy < 0)
  );
}

export type UsePanResponderParams = {
  animatedValue: RefObject<Animated.Value>;
  computeNewAnimatedValueForGesture: (
    gesture: PanResponderGestureState
  ) => number;
  onDismiss: () => void;
  onRestore: () => void;
};

export function usePanResponder({
  animatedValue,
  computeNewAnimatedValueForGesture,
  onDismiss,
  onRestore
}: UsePanResponderParams) {
  const onMove = React.useCallback(
    (_event: GestureResponderEvent, gesture: PanResponderGestureState) => {
      const newAnimatedValue = computeNewAnimatedValueForGesture(gesture);
      animatedValue.current?.setValue(newAnimatedValue);
    },
    [animatedValue, computeNewAnimatedValueForGesture]
  );

  const onRelease = React.useCallback(
    (_event: GestureResponderEvent, gesture: PanResponderGestureState) => {
      const newAnimatedValue = computeNewAnimatedValueForGesture(gesture);
      if (shouldDismissView(newAnimatedValue, gesture)) {
        onDismiss();
      } else {
        onRestore();
      }
    },
    [computeNewAnimatedValueForGesture, onDismiss, onRestore]
  );

  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: shouldSetPanResponder,
        onMoveShouldSetPanResponderCapture: shouldSetPanResponder,
        onPanResponderMove: onMove,
        onPanResponderRelease: onRelease
      }),
    [onMove, onRelease]
  );

  return {
    panResponder,
    onMove,
    onRelease
  };
}
