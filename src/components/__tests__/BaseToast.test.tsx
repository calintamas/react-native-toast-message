/* eslint-env jest */

import '@testing-library/jest-native';

import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { Image } from 'react-native';
import { ReactTestInstance } from 'react-test-renderer';

import { BaseToastProps } from '../../types';
import { BaseToast } from '../BaseToast';

const setup = (props?: BaseToastProps) => {
  const utils = render(<BaseToast {...props} />);
  return {
    ...utils
  };
};

describe('test BaseToast component', () => {
  it('renders defaults', () => {
    const { queryByTestId } = setup();
    expect(queryByTestId('toastTouchableContainer')).not.toBe(null);
    expect(queryByTestId('toastContentContainer')).not.toBe(null);
    expect(queryByTestId('toastText1')).toBe(null);
    expect(queryByTestId('toastText2')).toBe(null);
  });

  it('renders text1 and text2', () => {
    const { queryByTestId, queryByText } = setup({
      text1: 'Hello',
      text2: 'World'
    });
    expect(queryByTestId('toastText1')).not.toBe(null);
    expect(queryByTestId('toastText2')).not.toBe(null);
    expect(queryByText('Hello')).not.toBe(null);
    expect(queryByText('World')).not.toBe(null);
  });

  it('renders only text1', () => {
    const { queryByTestId, queryByText } = setup({
      text1: 'Hello'
    });
    expect(queryByTestId('toastText1')).not.toBe(null);
    expect(queryByTestId('toastText2')).toBe(null);
    expect(queryByText('Hello')).not.toBe(null);
  });

  it('renders only text2', () => {
    const { queryByTestId, queryByText } = setup({
      text2: 'World'
    });
    expect(queryByTestId('toastText1')).toBe(null);
    expect(queryByTestId('toastText2')).not.toBe(null);
    expect(queryByText('World')).not.toBe(null);
  });

  it('fires onPress', () => {
    const onPress = jest.fn();
    const { queryByTestId } = setup({
      onPress
    });
    const touchableContainer = queryByTestId('toastTouchableContainer');
    expect(touchableContainer).not.toBe(null);
    fireEvent.press(touchableContainer as ReactTestInstance);
    expect(onPress).toHaveBeenCalled();
  });

  it('adds custom style to toastTouchableContainer', () => {
    const { queryByTestId } = setup({
      style: {
        borderRadius: 20
      }
    });
    const touchableContainer = queryByTestId('toastTouchableContainer');
    expect(touchableContainer).not.toBe(null);
    expect(touchableContainer).toHaveStyle({
      borderRadius: 20
    });
  });

  it('renders leading icon', () => {
    const { queryByTestId } = setup({
      renderLeadingIcon: () => (
        <Image source={{ uri: 'testUri' }} testID='leadingIcon' />
      )
    });
    expect(queryByTestId('leadingIcon')).not.toBe(null);
  });

  it('renders trailing icon', () => {
    const { queryByTestId } = setup({
      renderTrailingIcon: () => (
        <Image source={{ uri: 'testUri' }} testID='trailingIcon' />
      )
    });
    expect(queryByTestId('trailingIcon')).not.toBe(null);
  });
});
