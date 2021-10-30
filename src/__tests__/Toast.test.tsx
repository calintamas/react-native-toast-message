/* eslint-env jest */

import { render } from '@testing-library/react-native';
import React from 'react';
import { act } from 'react-test-renderer';

import { Toast } from '../Toast';
import { ToastProps } from '../types';

const setup = (props?: Partial<ToastProps>) => {
  const utils = render(<Toast {...props} />);
  return {
    ...utils
  };
};

describe('test Toast component', () => {
  it('creates imperative handle', () => {
    const onShow = jest.fn();
    const onHide = jest.fn();
    setup({
      onShow,
      onHide
    });
    expect(Toast.show).toBeDefined();
    expect(Toast.hide).toBeDefined();

    act(() => {
      Toast.show({
        text1: 'test'
      });
    });

    expect(onShow).toHaveBeenCalled();

    act(() => {
      Toast.hide();
    });

    expect(onHide).toHaveBeenCalled();
  });
});
