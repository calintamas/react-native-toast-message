/* eslint-env jest */

import { render } from '@testing-library/react-native';
import React from 'react';

import colors from '../../colors';
import { icons } from '../../assets';
import InfoToast from '../info';

describe('test InfoToast component', () => {
  it('renders style correctly', () => {
    const { queryByTestId } = render(<InfoToast />);
    const rootView = queryByTestId('rootView');
    const leadingIcon = queryByTestId('leadingIcon');

    expect(rootView).toHaveStyle({
      borderLeftColor: colors.lightSkyBlue
    });
    expect(leadingIcon.children[0].props.source).toBe(icons.info);
  });
});
