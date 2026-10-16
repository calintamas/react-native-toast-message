/* eslint-env jest */

import { act, renderHook } from '@testing-library/react-hooks';
import React from 'react';
import { Keyboard, View } from 'react-native';

import { keyboardOverlapFor, useKeyboardOverlap } from '../useKeyboardOverlap';

type MeasureInWindowCallback = (
  x: number,
  y: number,
  width: number,
  height: number
) => void;

// Edge-to-edge Pixel 6 (dp): the parent ends at the bottom of the screen and
// the keyboard starts at 578, its 312 plus a 24 navigation bar under it
const SCREEN_BOTTOM = 914;
const KEYBOARD_TOP = 578;

const setup = (enabled = true) => {
  const utils = renderHook(() => useKeyboardOverlap(enabled));
  const setAnchor = (anchor: Partial<View> | null) => {
    (utils.result.current.anchorRef as React.MutableRefObject<unknown>).current =
      anchor;
  };
  const anchorAt = (hostBottom: number) => {
    const measureInWindow = jest.fn((callback: MeasureInWindowCallback) =>
      callback(0, hostBottom, 0, 0)
    );
    setAnchor({ measureInWindow });
    return measureInWindow;
  };
  return {
    ...utils,
    setAnchor,
    anchorAt
  };
};

const showKeyboard = (screenY: number) =>
  act(() => {
    Keyboard.emit('keyboardDidShow', { endCoordinates: { screenY } });
  });

const hideKeyboard = () =>
  act(() => {
    Keyboard.emit('keyboardDidHide');
  });

describe('test keyboardOverlapFor function', () => {
  it('returns how far the keyboard reaches above the parent', () => {
    expect(
      keyboardOverlapFor({
        hostBottom: SCREEN_BOTTOM,
        keyboardScreenY: KEYBOARD_TOP
      })
    ).toBe(336);
  });

  it('returns 0 when the parent ends above the keyboard', () => {
    expect(
      keyboardOverlapFor({ hostBottom: 529, keyboardScreenY: KEYBOARD_TOP })
    ).toBe(0);
  });
});

describe('test useKeyboardOverlap hook', () => {
  it('returns 0 by default', () => {
    const { result } = setup();
    expect(result.current.keyboardOverlap).toBe(0);
  });

  it('measures the overlap when the keyboard shows', () => {
    const { result, anchorAt } = setup();
    anchorAt(SCREEN_BOTTOM);
    showKeyboard(KEYBOARD_TOP);
    expect(result.current.keyboardOverlap).toBe(336);
  });

  it('returns 0 when the window was resized for the keyboard', () => {
    const { result, anchorAt } = setup();
    anchorAt(529);
    showKeyboard(KEYBOARD_TOP);
    expect(result.current.keyboardOverlap).toBe(0);
  });

  it('returns 0 again when the keyboard hides', () => {
    const { result, anchorAt } = setup();
    anchorAt(SCREEN_BOTTOM);
    showKeyboard(KEYBOARD_TOP);
    hideKeyboard();
    expect(result.current.keyboardOverlap).toBe(0);
  });

  it('measures again when the parent is laid out with the keyboard up', () => {
    const { result, anchorAt } = setup();
    anchorAt(SCREEN_BOTTOM);
    showKeyboard(KEYBOARD_TOP);
    expect(result.current.keyboardOverlap).toBe(336);

    // The window shrinks after the keyboard event arrived
    anchorAt(529);
    act(() => result.current.onAnchorLayout());
    expect(result.current.keyboardOverlap).toBe(0);
  });

  it('ignores a measurement that lands after the keyboard hid', () => {
    const { result, setAnchor } = setup();
    let pending: MeasureInWindowCallback | undefined;
    setAnchor({
      measureInWindow: (callback: MeasureInWindowCallback) => {
        pending = callback;
      }
    });
    showKeyboard(KEYBOARD_TOP);
    hideKeyboard();
    act(() => pending?.(0, SCREEN_BOTTOM, 0, 0));
    expect(result.current.keyboardOverlap).toBe(0);
  });

  it('does not measure on layout while the keyboard is hidden', () => {
    const { result, anchorAt } = setup();
    const measureInWindow = anchorAt(SCREEN_BOTTOM);
    act(() => result.current.onAnchorLayout());
    expect(measureInWindow).not.toHaveBeenCalled();
  });

  it('keeps 0 without an anchor to measure', () => {
    const { result, setAnchor } = setup();
    setAnchor(null);
    showKeyboard(KEYBOARD_TOP);
    expect(result.current.keyboardOverlap).toBe(0);
  });

  it('does nothing when disabled', () => {
    const { result, anchorAt } = setup(false);
    const measureInWindow = anchorAt(SCREEN_BOTTOM);
    showKeyboard(KEYBOARD_TOP);
    expect(measureInWindow).not.toHaveBeenCalled();
    expect(result.current.keyboardOverlap).toBe(0);
  });
});
