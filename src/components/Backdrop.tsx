import React from 'react';
import { Animated } from 'react-native';

import { ReactChildren, ToastAnimationConfig, ToastPosition } from '../types';
import { createAnimation } from '../utils/animationConfig';
import { getTestId } from '../utils/test-id';
import { styles } from './AnimatedContainer.styles';

type BackdropProps = {
  children: ReactChildren;
  isVisible: boolean;
  position: ToastPosition;
  height: number;
  offset: number;
  animationConfig: ToastAnimationConfig | undefined;
};

export function Backdrop({
  children,
  isVisible,
  position,
  height,
  offset,
  animationConfig
}: BackdropProps) {
  // A separate value prevents swiping the Toast from changing backdrop opacity.
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const animation = createAnimation(
      animatedValue,
      isVisible ? 1 : 0,
      animationConfig
    );
    animation.start();
    return () => animation.stop();
  }, [animatedValue, isVisible, animationConfig]);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
    extrapolate: 'clamp'
  });

  return (
    <Animated.View
      testID={getTestId('Backdrop')}
      pointerEvents='none'
      style={[
        styles.base,
        styles[position],
        { height, opacity, transform: [{ translateY: offset }] }
      ]}>
      {children}
    </Animated.View>
  );
}
