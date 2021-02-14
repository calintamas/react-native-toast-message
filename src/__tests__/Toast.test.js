/* eslint-env jest */

import { act, fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { View } from 'react-native';

import Toast from '..';
import colors from '../colors';

function setup(props) {
  const ref = {
    current: undefined
  };
  const utils = render(<Toast ref={ref} autoHide={false} {...props} />);
  const getAnimatedView = () => utils.queryByTestId('animatedView');
  const getText1 = () => utils.queryByTestId('text1');
  const getText2 = () => utils.queryByTestId('text2');
  const getRootView = () => utils.queryByTestId('rootView');

  return {
    ref,
    getRootView,
    getText1,
    getText2,
    getAnimatedView,
    ...utils
  };
}

function getVerticalOffset(reactElement) {
  return reactElement.props.style.transform[0].translateY;
}

describe('test Toast behavior', () => {
  describe('test API', () => {
    it('becomes visible when show() is called, hides when hide() is called', async () => {
      const { ref, getText1, getText2, getAnimatedView } = setup();
      let animatedView = getAnimatedView();

      expect(getText1()).toBeFalsy();
      // Toast View is pushed off screen, on the Y axis
      expect(getVerticalOffset(animatedView) < 0).toBe(true);

      await act(async () => {
        await ref.current.show({
          text1: 'Hello',
          text2: 'Test'
        });
      });
      await waitFor(() => getText1());
      await waitFor(() => getText2());
      animatedView = getAnimatedView();
      expect(getVerticalOffset(animatedView) < 0).toBe(false);

      await act(async () => {
        await ref.current.hide();
      });
      animatedView = getAnimatedView();
      expect(getVerticalOffset(animatedView) < 0).toBe(true);
    });

    it('shows success type', async () => {
      const { ref, getRootView } = setup();

      await act(async () => {
        await ref.current.show({
          type: 'success'
        });
      });

      expect(getRootView()).toHaveStyle({
        borderLeftColor: colors.mantis
      });
    });

    it('shows info type', async () => {
      const { ref, getRootView } = setup();

      await act(async () => {
        await ref.current.show({
          type: 'info'
        });
      });

      expect(getRootView()).toHaveStyle({
        borderLeftColor: colors.lightSkyBlue
      });
    });

    it('shows error type', async () => {
      const { ref, getRootView } = setup();

      await act(async () => {
        await ref.current.show({
          type: 'error'
        });
      });

      expect(getRootView()).toHaveStyle({
        borderLeftColor: colors.blazeOrange
      });
    });

    it('calls onShow', async () => {
      const onShow = jest.fn();
      const { ref } = setup();

      await act(async () => {
        await ref.current.show({
          type: 'info',
          onShow
        });
      });

      expect(onShow).toHaveBeenCalled();
    });

    it('calls onHide', async () => {
      const onHide = jest.fn();
      const { ref } = setup();

      await act(async () => {
        await ref.current.show({
          type: 'info',
          onHide
        });
        await ref.current.hide();
      });

      expect(onHide).toHaveBeenCalled();
    });

    it('fires onPress', async () => {
      const onPress = jest.fn();
      const { ref, getRootView } = setup();

      await act(async () => {
        await ref.current.show({
          type: 'info',
          onPress
        });
      });

      fireEvent.press(getRootView());
      expect(onPress).toHaveBeenCalled();
    });

    it('shows at the bottom', async () => {
      const { ref, getAnimatedView } = setup();

      await act(async () => {
        await ref.current.show({
          position: 'bottom'
        });
      });
      expect(getAnimatedView()).toHaveStyle({
        bottom: 0
      });
    });

    it('shows with custom top offset', async () => {
      const { ref, getAnimatedView } = setup();
      const offset = 60;
      const height = 65;

      let animatedView = getAnimatedView();
      expect(getVerticalOffset(animatedView)).toBe(-height);

      await act(async () => {
        await ref.current.show({
          topOffset: offset
        });
      });

      animatedView = getAnimatedView();
      expect(getVerticalOffset(animatedView)).toBe(offset);
    });

    it('shows with custom bottom offset', async () => {
      const { ref, getAnimatedView } = setup();
      const offset = 60;
      const height = 65;

      let animatedView = getAnimatedView();
      expect(getVerticalOffset(animatedView)).toBe(-height);

      await act(async () => {
        await ref.current.show({
          position: 'bottom',
          bottomOffset: offset
        });
      });

      animatedView = getAnimatedView();
      expect(getVerticalOffset(animatedView)).toBe(-offset);
    });
  });

  describe('test props', () => {
    it('shows Toast from custom config', async () => {
      const testID = 'testView';
      const { ref, queryByTestId } = setup({
        config: {
          test: () => <View testID={testID} />
        }
      });

      await act(async () => {
        await ref.current.show({
          type: 'test'
        });
      });

      const testView = queryByTestId(testID);
      expect(testView).toBeTruthy();
    });

    it('tries to show Toast type that does not exist', async () => {
      const { ref, getRootView } = setup();

      await act(async () => {
        await ref.current.show({
          type: 'test'
        });
      });

      const rootView = getRootView();
      expect(rootView).toBeFalsy();
    });
  });
});
