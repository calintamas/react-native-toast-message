/* eslint-env jest */

import { render } from '@testing-library/react-native';
import React from 'react';

import { BaseToastProps } from '../../types';
import { InfoToast } from '../InfoToast';

const setup = (props?: BaseToastProps) => {
  const utils = render(<InfoToast {...props} />);
  return {
    ...utils
  };
};

describe('test ErrorToast component', () => {
  it('renders default style', () => {
    const { queryByTestId } = setup();
    const touchableContainer = queryByTestId('toastTouchableContainer');
    expect(touchableContainer).not.toBe(null);
    expect(touchableContainer).toHaveStyle({
      borderLeftColor: '#87CEFA'
    });
  });
});
