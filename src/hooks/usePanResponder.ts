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
  onStart: () => void;
  onEnd: () => void;
  disable?: boolean;
};

export function usePanResponder({
  animatedValue,
  computeNewAnimatedValueForGesture,
  onDismiss,
  onRestore,
  onStart,
  onEnd,
  disable
}: UsePanResponderParams) {
  const onGrant = React.useCallback(() => {
      if (disable) return;
      onStart();
    },
    [onStart, disable]
  );

  const onMove = React.useCallback(
    (_event: GestureResponderEvent, gesture: PanResponderGestureState) => {
      if (disable) return;

      const newAnimatedValue = computeNewAnimatedValueForGesture(gesture);

      animatedValue.current?.setValue(newAnimatedValue);
    },
    [animatedValue, computeNewAnimatedValueForGesture, disable]
  );

  const onRelease = React.useCallback(
    (_event: GestureResponderEvent, gesture: PanResponderGestureState) => {
      if (disable) return;

      const newAnimatedValue = computeNewAnimatedValueForGesture(gesture);
      onEnd();
      if (shouldDismissView(newAnimatedValue, gesture)) {
        onDismiss();
      } else {
        onRestore();
      }
    },
    [computeNewAnimatedValueForGesture, onEnd, onDismiss, onRestore, disable]
  );

  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: onGrant,
        onMoveShouldSetPanResponder: shouldSetPanResponder,
        onMoveShouldSetPanResponderCapture: shouldSetPanResponder,
        onPanResponderMove: onMove,
        onPanResponderRelease: onRelease
      }),
    [onMove, onRelease, onGrant]
  );

  return {
    panResponder,
    onGrant,
    onMove,
    onRelease,
  };
}
