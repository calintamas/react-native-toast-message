/* eslint-env jest */

import { render } from '@testing-library/react-native';
import React from 'react';

import Icon from '../icon';

describe('test Icon component', () => {
  it('does not render anything', () => {
    const { queryByTestId } = render(<Icon />);
    const icon = queryByTestId('icon');
    expect(icon).toBeFalsy();
  });

  it('renders an icon', () => {
    const mockIcon = { uri: 'mock' };
    const { queryByTestId } = render(<Icon source={mockIcon} />);
    const icon = queryByTestId('icon');
    expect(icon.props.source).toBe(mockIcon);
  });
});
