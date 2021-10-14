import React, { RefObject } from 'react';
import {
  Animated,
  GestureResponderEvent,
  PanResponder,
  PanResponderGestureState
} from 'react-native';

function shouldSetPanResponder(
  _event: GestureResponderEvent,
  gesture: PanResponderGestureState
) {
  const { dx, dy } = gesture;
  // Fixes onPress handler
  // https://github.com/calintamas/react-native-toast-message/issues/113
  const offset = 2;
  return Math.abs(dx) > offset || Math.abs(dy) > offset;
}

type UsePanResponderParams = {
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
      const { dy, vy } = gesture;
      const newAnimatedValue = computeNewAnimatedValueForGesture(gesture);

      const dismissThreshold = 0.65;
      if (
        newAnimatedValue <= dismissThreshold ||
        (Math.abs(vy) >= dismissThreshold && dy < 0)
      ) {
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
    panResponder
  };
}
