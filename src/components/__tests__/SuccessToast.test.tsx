/* eslint-env jest */

import { render } from '@testing-library/react-native';
import React from 'react';

import { BaseToastProps } from '../../types';
import { SuccessToast } from '../SuccessToast';

const setup = (props?: BaseToastProps) => {
  const utils = render(<SuccessToast {...props} />);
  return {
    ...utils
  };
};

describe('test SuccessToast component', () => {
  it('renders default style', () => {
    const { queryByTestId } = setup();
    const touchableContainer = queryByTestId('toastTouchableContainer');
    expect(touchableContainer).not.toBe(null);
    expect(touchableContainer).toHaveStyle({
      borderLeftColor: '#69C779'
    });
  });
});
