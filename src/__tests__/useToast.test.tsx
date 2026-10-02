/* eslint-env jest */

import { act, renderHook } from '@testing-library/react-hooks';
import React from 'react';

import { ToastOptions } from '../types';
import { DEFAULT_DATA, DEFAULT_OPTIONS, useToast } from '../useToast';
import { GestureProvider, useGesture } from '../contexts';

const setupGestureWrapper = (panning: boolean) => {
  return ({ children }: { children: React.ReactNode }) => (
    <GestureProvider panning={panning}>{children}</GestureProvider>
  );
};

const setup = (panning = false) => {
  const wrapper = setupGestureWrapper(panning)
  const utils = renderHook(() =>
    useToast({ defaultOptions: DEFAULT_OPTIONS }),
    { wrapper }
  );
  return {
    ...utils
  };
};


describe('test useToast hook', () => {
  it('returns defaults', () => {
    const { result } = setup();
    const { isVisible, data, options, show, hide } = result.current;

    expect(isVisible).toBe(false);
    expect(data).toEqual(DEFAULT_DATA);
    expect(options).toEqual(DEFAULT_OPTIONS);
    expect(show).toBeDefined();
    expect(hide).toBeDefined();
  });

  it('set isVisible: true when show is called', () => {
    const { result } = setup();

    act(() => {
      result.current.show({
        text1: 'test'
      });
    });

    expect(result.current.isVisible).toBe(true);
    expect(result.current.data.text1).toBe('test');
  });

  it('calls onShow when Toast is shown', () => {
    const { result } = setup();

    const onShow = jest.fn();
    act(() => {
      result.current.show({
        text1: 'test',
        onShow
      });
    });

    expect(result.current.isVisible).toBe(true);
    expect(result.current.data.text1).toBe('test');
    expect(onShow).toHaveBeenCalled();
  });

  it('set isVisible: false when hide is called', () => {
    const { result } = setup();

    act(() => {
      result.current.show({
        text1: 'test'
      });
    });

    expect(result.current.isVisible).toBe(true);
    expect(result.current.data.text1).toBe('test');

    act(() => {
      result.current.hide();
    });

    expect(result.current.isVisible).toBe(false);
  });

  it('calls onHide when Toast is shown', () => {
    const { result } = setup();

    const onHide = jest.fn();
    act(() => {
      result.current.show({
        text1: 'test',
        onHide
      });
    });

    expect(result.current.isVisible).toBe(true);
    expect(result.current.data.text1).toBe('test');

    act(() => {
      result.current.hide();
    });

    expect(result.current.isVisible).toBe(false);
    expect(onHide).toHaveBeenCalled();
  });

  it('sets data values on show', () => {
    const { result } = setup();

    act(() => {
      result.current.show({
        text1: 'text1',
        text2: 'text2'
      });
    });

    expect(result.current.isVisible).toBe(true);
    expect(result.current.data.text1).toBe('text1');
    expect(result.current.data.text2).toBe('text2');
  });

  it('sets option values on show', () => {
    const { result } = setup();

    const options: ToastOptions = {
      type: 'info',
      position: 'bottom',
      swipeable: true,
      text1Style: null,
      text2Style: null,
      autoHide: false,
      visibilityTime: 20,
      topOffset: 120,
      avoidKeyboard: true,
      bottomOffset: 130,
      keyboardOffset: 5,
      onShow: jest.fn(),
      onHide: jest.fn(),
      onPress: jest.fn(),
      props: {
        foo: 'bar'
      },
      animationConfig: { type: 'spring', friction: 8 }
    };
    act(() => {
      result.current.show({
        text1: 'test',
        ...options
      });
    });

    expect(result.current.isVisible).toBe(true);
    expect(result.current.options).toEqual(options);
  });

  it('automatically hides when autoHide: true', () => {
    jest.useFakeTimers();
    const { result } = setup();
    const onHide = jest.fn();
    act(() => {
      result.current.show({
        text1: 'test',
        autoHide: true,
        onHide
      });
    });

    expect(result.current.isVisible).toBe(true);

    act(() => {
      jest.runAllTimers();
    });
    expect(result.current.isVisible).toBe(false);
    expect(onHide).toHaveBeenCalled();
  });

  it('does not hide when autoHide is true but user is panning', () => {
    jest.useFakeTimers();
    const { result } = setup(true);
    const onHide = jest.fn();
    act(() => {
      result.current.show({
        text1: 'test',
        autoHide: true,
        onHide
      });
    });

    expect(result.current.isVisible).toBe(true);

    act(() => {
      jest.runAllTimers();
    });

    expect(result.current.isVisible).toBe(true);
    expect(onHide).not.toHaveBeenCalled();
  });

  it('restarts the autoHide timer on restore when panning blocked auto hiding', () => {
    jest.useFakeTimers();
    const { result } = renderHook(
      () => ({
        toast: useToast({ defaultOptions: DEFAULT_OPTIONS }),
        gesture: useGesture()
      }),
      { wrapper: setupGestureWrapper(true) }
    );
    const onHide = jest.fn();
    act(() => {
      result.current.toast.show({
        text1: 'test',
        autoHide: true,
        visibilityTime: 1000,
        onHide
      });
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current.toast.isVisible).toBe(true);

    // The user releases the Toast and it's restored to its position
    result.current.gesture.panning.current = false;
    act(() => {
      result.current.toast.onRestorePosition();
    });
    act(() => {
      jest.advanceTimersByTime(999);
    });
    expect(onHide).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(result.current.toast.isVisible).toBe(false);
    expect(onHide).toHaveBeenCalledTimes(1);
  });

  it('does not restart the autoHide timer on restore when auto hiding was not blocked', () => {
    jest.useFakeTimers();
    const { result } = setup();
    const onHide = jest.fn();
    act(() => {
      result.current.show({
        text1: 'test',
        autoHide: true,
        visibilityTime: 1000,
        onHide
      });
    });

    act(() => {
      jest.advanceTimersByTime(500);
    });
    act(() => {
      result.current.onRestorePosition();
    });
    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current.isVisible).toBe(false);
    expect(onHide).toHaveBeenCalledTimes(1);
  });


  it('shows using only text2', () => {
    const { result } = setup();

    act(() => {
      result.current.show({
        text2: 'text2'
      });
    });

    expect(result.current.isVisible).toBe(true);
    expect(result.current.data.text2).toBe('text2');
  });
});
