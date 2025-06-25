import React from 'react';
import { Animated, Dimensions, PanResponderGestureState } from 'react-native';

import { useLogger, useGesture } from '../contexts';
import {
  usePanResponder,
  useSlideAnimation,
  useViewDimensions
} from '../hooks';
import { ReactChildren, ToastPosition } from '../types';
import { noop } from '../utils/func';
import { bound } from '../utils/number';
import { getTestId } from '../utils/test-id';
import { styles } from './AnimatedContainer.styles';

export type AnimatedContainerProps = {
  children: ReactChildren;
  isVisible: boolean;
  position: ToastPosition;
  topOffset: number;
  swipeable: boolean;
  bottomOffset: number;
  keyboardOffset: number;
  avoidKeyboard: boolean;
  onHide: () => void;
  onRestorePosition?: () => void;
};

/**
 * Produces a positive damping value.
 *
 * To note: `moveY` becomes negative when going off-screen. By making sure the value
 * produced is always positive, we avoid issues like: https://github.com/calintamas/react-native-toast-message/issues/280
 */
export function dampingFor(
  gesture: PanResponderGestureState,
  position: ToastPosition
) {
  const { moveY } = gesture;

  switch (position) {
    case 'bottom': {
      const { height: screenHeight } = Dimensions.get('screen');
      return Math.abs(screenHeight - moveY);
    }
    case 'top':
      return Math.abs(moveY);
    default:
      throw new Error(`Toast position: ${position} not implemented`);
  }
}

export function animatedValueFor(
  gesture: PanResponderGestureState,
  position: ToastPosition,
  damping: number
) {
  const boundValue = (val: number) => bound(val, 0, 2);
  const { dy } = gesture;

  switch (position) {
    case 'bottom':
      return boundValue(1 - dy / damping);
    case 'top':
      return boundValue(1 + dy / damping);
    default:
      throw new Error(`Toast position: ${position} not implemented`);
  }
}

export function AnimatedContainer({
  children,
  isVisible,
  position,
  topOffset,
  bottomOffset,
  keyboardOffset,
  avoidKeyboard,
  onHide,
  onRestorePosition = noop,
  swipeable
}: AnimatedContainerProps) {
  const { log } = useLogger();
  const { panning } = useGesture();

  const { computeViewDimensions, height } = useViewDimensions();

  const { animatedValue, animate, animationStyles } = useSlideAnimation({
    position,
    height,
    topOffset,
    bottomOffset,
    keyboardOffset,
    avoidKeyboard
  });

  const disable = React.useMemo(() => !swipeable || !isVisible, [swipeable, isVisible]);

  const onStart = React.useCallback(() => {
    log('Swipe, pan start');
    panning.current = true;
  }, [log, panning]);

  const onEnd = React.useCallback(() => {
    log('Swipe, pan end');
    panning.current = false;
  }, [log, panning]);

  const onDismiss = React.useCallback(() => {
    log('Swipe, dismissing');
    animate(0);
    onHide();
  }, [animate, log, onHide]);

  const onRestore = React.useCallback(() => {
    log('Swipe, restoring to original position');
    animate(1);
    onRestorePosition();
  }, [animate, log, onRestorePosition]);

  const computeNewAnimatedValueForGesture = React.useCallback(
    (gesture: PanResponderGestureState) => {
      const damping = dampingFor(gesture, position);
      const newAnimatedValue = animatedValueFor(gesture, position, damping);
      return newAnimatedValue;
    },
    [position]
  );
  const { panResponder } = usePanResponder({
    animatedValue,
    computeNewAnimatedValueForGesture,
    onDismiss,
    onRestore,
    onStart,
    onEnd,
    disable,
  });

  React.useLayoutEffect(() => {
    const newAnimationValue = isVisible ? 1 : 0;
    animate(newAnimationValue);
  }, [animate, isVisible]);

  return (
    <Animated.View
      testID={getTestId('AnimatedContainer')}
      onLayout={computeViewDimensions}
      style={[styles.base, styles[position], animationStyles]}
      // This container View is never the target of touch events but its subviews can be.
      // By doing this, tapping buttons behind the Toast is allowed
      pointerEvents={isVisible ? 'box-none' : 'none'}
      {...panResponder.panHandlers}>
      {children}
    </Animated.View>
  );
}
