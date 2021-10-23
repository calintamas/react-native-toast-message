/* eslint-env jest */

import { renderHook } from '@testing-library/react-hooks';
import { LayoutChangeEvent } from 'react-native';
import { act } from 'react-test-renderer';

import { useViewDimensions } from '../useViewDimensions';
import { UseViewDimensionsParams } from '..';

const setup = (offsets: UseViewDimensionsParams) => {
  const layoutChangeEventMock = {
    nativeEvent: {
      layout: {
        height: 250,
        width: 320
      }
    }
  } as LayoutChangeEvent;
  const utils = renderHook(() => useViewDimensions(offsets));
  return {
    ...utils,
    layoutChangeEventMock
  };
};

describe('test useViewDimensions hook', () => {
  it('computes dimensions correctly', () => {
    const { result, layoutChangeEventMock } = setup();
    const { computeViewDimensions } = result.current;

    act(() => {
      computeViewDimensions(layoutChangeEventMock);
    });

    expect(result.current.height).toBe(250);
    expect(result.current.width).toBe(320);
  });

  it('computes dimensions with offsets correctly', () => {
    const offsets = {
      heightOffset: -40,
      widthOffset: 120
    };
    const { result, layoutChangeEventMock } = setup(offsets);
    const { computeViewDimensions } = result.current;

    act(() => {
      computeViewDimensions(layoutChangeEventMock);
    });

    expect(result.current.height).toBe(250 + offsets.heightOffset);
    expect(result.current.width).toBe(320 + offsets.widthOffset);
  });

  it('falls back to 0 when View dimensions are missing', () => {
    const { result } = setup();

    act(() => {
      result.current.computeViewDimensions({} as LayoutChangeEvent);
    });

    expect(result.current.height).toBe(0);
    expect(result.current.width).toBe(0);
  });
});
