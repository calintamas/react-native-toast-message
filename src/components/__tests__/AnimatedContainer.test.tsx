/* eslint-env jest */

import { render, waitFor } from '@testing-library/react-native';
import React from 'react';
import {
  Dimensions,
  PanResponderGestureState,
  View,
  ViewStyle
} from 'react-native';

import {
  mockGestureValues,
  mockPanResponder
} from '../../__helpers__/PanResponder';
import { ToastPosition } from '../../types';
import {
  AnimatedContainer,
  AnimatedContainerProps,
  animatedValueFor,
  dampingFor
} from '../AnimatedContainer';

const setup = (props?: Omit<Partial<AnimatedContainerProps>, 'children'>) => {
  const onHide = jest.fn();
  const defaultProps: Omit<AnimatedContainerProps, 'children'> = {
    isVisible: false,
    position: 'top',
    topOffset: 40,
    bottomOffset: 40,
    keyboardOffset: 10,
    onHide
  };

  const utils = render(
    <AnimatedContainer {...defaultProps} {...props}>
      <View testID='childView' />
    </AnimatedContainer>
  );
  return {
    ...utils
  };
};

const defaultStyles: ViewStyle = {
  position: 'absolute',
  left: 0,
  right: 0,
  alignItems: 'center',
  justifyContent: 'center',
  top: 0
};

describe('test AnimatedContainer component', () => {
  it('is hidden by default', () => {
    const { queryByTestId } = setup();
    expect(queryByTestId('toastAnimatedContainer')).toHaveStyle({
      ...defaultStyles,
      opacity: 0
    });
    expect(queryByTestId('childView')).not.toBe(null);
  });

  it('shows when isVisible is true', async () => {
    const { queryByTestId } = setup({
      isVisible: true
    });

    await waitFor(() =>
      expect(queryByTestId('toastAnimatedContainer')).toHaveStyle({
        ...defaultStyles,
        opacity: 1
      })
    );
    expect(queryByTestId('childView')).not.toBe(null);
  });

  it('restores toast position on pan (if gesture is higher than threshold)', async () => {
    mockPanResponder();
    const onRestorePosition = jest.fn();
    const { queryByTestId } = setup({
      isVisible: true,
      onRestorePosition
    });
    await waitFor(() =>
      expect(queryByTestId('toastAnimatedContainer')).toHaveStyle({
        ...defaultStyles,
        opacity: 1
      })
    );
    const panHandler = queryByTestId('toastAnimatedContainer');
    const gesture: PanResponderGestureState = {
      ...mockGestureValues,
      moveY: 100,
      dy: 10
    };
    panHandler?.props.onResponderMove(undefined, gesture);
    panHandler?.props.onResponderRelease(undefined, gesture);
    expect(onRestorePosition).toHaveBeenCalled();
  });

  it('dismisses toast on pan (if gesture is lower than threshold)', async () => {
    mockPanResponder();
    const onHide = jest.fn();
    const { queryByTestId } = setup({
      isVisible: true,
      onHide
    });
    await waitFor(() =>
      expect(queryByTestId('toastAnimatedContainer')).toHaveStyle({
        ...defaultStyles,
        opacity: 1
      })
    );
    const panHandler = queryByTestId('toastAnimatedContainer');
    const gesture: PanResponderGestureState = {
      ...mockGestureValues,
      moveY: 5,
      dy: -78
    };
    panHandler?.props.onResponderMove(undefined, gesture);
    panHandler?.props.onResponderRelease(undefined, gesture);
    expect(onHide).toHaveBeenCalled();
  });
});

jest.spyOn(Dimensions, 'get').mockImplementation(() => ({
  height: 600,
  width: 200,
  scale: 1,
  fontScale: 1
}));

describe('test dampingFor function', () => {
  const gesture: PanResponderGestureState = {
    ...mockGestureValues,
    moveY: 100
  };

  it('returns damping for position: bottom', () => {
    const position: ToastPosition = 'bottom';
    expect(dampingFor(gesture, position)).toBe(500);
  });

  it('returns damping for position: top', () => {
    const position: ToastPosition = 'top';
    expect(dampingFor(gesture, position)).toBe(100);
  });

  it('throws if position is not implemented', () => {
    try {
      dampingFor(gesture, 'foo' as ToastPosition);
    } catch (err) {
      expect(err).toBeDefined();
    }
  });
});

describe('test animatedValueFor function', () => {
  const gesture: PanResponderGestureState = {
    ...mockGestureValues,
    dy: 10
  };
  it('returns animated value for position: bottom', () => {
    const position: ToastPosition = 'bottom';
    const damping = 100;
    expect(animatedValueFor(gesture, position, damping)).toBe(0.9);
  });

  it('returns animated value for position: top', () => {
    const position: ToastPosition = 'top';
    const damping = 100;
    expect(animatedValueFor(gesture, position, damping)).toBe(1.1);
  });

  it('throws if position is not implemented', () => {
    try {
      const position = 'foo' as ToastPosition;
      const damping = 100;
      animatedValueFor(gesture, position, damping);
    } catch (err) {
      expect(err).toBeDefined();
    }
  });
});
