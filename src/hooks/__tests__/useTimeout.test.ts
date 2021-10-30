/* eslint-env jest */

import { act, renderHook } from '@testing-library/react-hooks';

import { useTimeout } from '../useTimeout';

const setup = () => {
  const cb = jest.fn();
  const utils = renderHook(() => useTimeout(cb));
  return {
    ...utils,
    cb
  };
};

describe('test useTimeout hook', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  it('sets timeout', () => {
    const { cb, result } = setup();

    act(() => {
      result.current.startTimer();
    });
    expect(cb).not.toHaveBeenCalled();

    act(() => {
      jest.runAllTimers();
    });
    expect(cb).toHaveBeenCalled();
  });

  it('clears timeout before running', () => {
    const { cb, result } = setup();

    act(() => {
      result.current.startTimer();
    });
    expect(cb).not.toHaveBeenCalled();

    act(() => {
      result.current.clearTimer();
    });
    expect(cb).not.toHaveBeenCalled();

    act(() => {
      jest.runAllTimers();
    });
    expect(cb).not.toHaveBeenCalled();
  });

  it('clears timeout when unmounting', () => {
    const { cb, result, unmount } = setup();

    act(() => {
      result.current.startTimer();
    });
    expect(cb).not.toHaveBeenCalled();

    act(() => {
      unmount();
      jest.runAllTimers();
    });
    expect(cb).not.toHaveBeenCalled();
  });
});
