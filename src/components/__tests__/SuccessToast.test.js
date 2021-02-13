/* eslint-env jest */

import { render } from '@testing-library/react-native';
import React from 'react';

import colors from '../../colors';
import { icons } from '../../assets';
import SuccessToast from '../success';

describe('test SuccessToast component', () => {
  it('renders style correctly', () => {
    const { queryByTestId } = render(<SuccessToast />);
    const rootView = queryByTestId('rootView');
    const leadingIcon = queryByTestId('leadingIcon');

    expect(rootView).toHaveStyle({
      borderLeftColor: colors.mantis
    });
    expect(leadingIcon.children[0].props.source).toBe(icons.success);
  });
});
