/* eslint-env jest */

import { render } from '@testing-library/react-native';
import React from 'react';

import { BaseToastProps } from '../../types';
import { ErrorToast } from '../ErrorToast';

const setup = (props?: BaseToastProps) => {
  const utils = render(<ErrorToast {...props} />);
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
      borderLeftColor: '#FE6301'
    });
  });
});
