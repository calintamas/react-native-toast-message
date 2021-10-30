/* eslint-env jest */

import { act, renderHook } from '@testing-library/react-hooks';

import { ToastOptions } from '../types';
import { DEFAULT_DATA, DEFAULT_OPTIONS, useToast } from '../useToast';

const setup = () => {
  const utils = renderHook(() =>
    useToast({
      defaultOptions: DEFAULT_OPTIONS
    })
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
      autoHide: false,
      visibilityTime: 20,
      topOffset: 120,
      bottomOffset: 130,
      keyboardOffset: 5,
      onShow: jest.fn(),
      onHide: jest.fn(),
      onPress: jest.fn(),
      props: {
        foo: 'bar'
      }
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
