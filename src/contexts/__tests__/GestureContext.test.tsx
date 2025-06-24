/* eslint-env jest */

import { renderHook, act } from '@testing-library/react-hooks';
import React from 'react';

import { ReactChildren } from '../../types';
import { GestureProvider, useGesture } from '../GestureContext';
import { GestureProviderProps } from '..';

const setup = (props?: Omit<GestureProviderProps, 'children'>) => {
  const wrapper = ({ children }: { children: ReactChildren }) => (
    <GestureProvider {...props}>{children}</GestureProvider>
  );
  const utils = renderHook(() => useGesture(), { wrapper });
  return { ...utils };
};

describe('GestureContext', () => {
  it('provides a panning ref with current defaulting to false', () => {
    const { result } = setup();
    expect(result.current.panning).toBeDefined();
    expect(result.current.panning.current).toBe(false);
  });

  it('allows updating the panning ref value', () => {
    const { result } = setup();
    act(() => (result.current.panning.current = true));
    expect(result.current.panning.current).toBe(true);
  });
});
