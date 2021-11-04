/* eslint-env jest */

import { render } from '@testing-library/react-native';
import React from 'react';

import { ToastUI, ToastUIProps } from '../ToastUI';
import { DEFAULT_OPTIONS } from '../useToast';

const setup = (props?: Partial<ToastUIProps>) => {
  const show = jest.fn();
  const hide = jest.fn();

  const utils = render(
    <ToastUI
      isVisible
      options={DEFAULT_OPTIONS}
      data={{
        text1: 'text1',
        text2: 'text2'
      }}
      show={show}
      hide={hide}
      {...props}
    />
  );
  return {
    ...utils
  };
};

describe('test ToastUI component', () => {
  it('renders defaults', () => {
    const { queryByText } = setup();
    expect(queryByText('text1')).toBeDefined();
    expect(queryByText('text2')).toBeDefined();
  });

  it('renders error type Toast', () => {
    const { queryByText } = setup({
      options: {
        ...DEFAULT_OPTIONS,
        type: 'error'
      }
    });
    expect(queryByText('text1')).toBeDefined();
    expect(queryByText('text2')).toBeDefined();
  });

  it('renders info type Toast', () => {
    const { queryByText } = setup({
      options: {
        ...DEFAULT_OPTIONS,
        type: 'info'
      }
    });
    expect(queryByText('text1')).toBeDefined();
    expect(queryByText('text2')).toBeDefined();
  });

  it('throws when trying to render an undefined Toast type', () => {
    const type = 'mock';
    expect(() =>
      setup({
        options: {
          ...DEFAULT_OPTIONS,
          type
        }
      })
    ).toThrow(
      new Error(
        `Toast type: '${type}' does not exist. You can add it via the 'config' prop on the Toast instance. Learn more: https://github.com/calintamas/react-native-toast-message/blob/master/README.md`
      )
    );
  });
});
