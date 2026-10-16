import React from 'react';
import { Keyboard, KeyboardEvent, View } from 'react-native';

type KeyboardOverlapForParams = {
  hostBottom: number;
  keyboardScreenY: number;
};

/**
 * How far the keyboard reaches above the bottom edge of the Toast's parent.
 *
 * Zero when the window was resized to make room for the keyboard
 * (`adjustResize` without edge-to-edge): the parent already ends where the
 * keyboard starts, and lifting the Toast by the keyboard's height on top of
 * that would count the keyboard twice.
 */
export function keyboardOverlapFor({
  hostBottom,
  keyboardScreenY
}: KeyboardOverlapForParams) {
  return Math.max(0, hostBottom - keyboardScreenY);
}

/**
 * Android: how much of the Toast's parent the keyboard covers, measured
 * rather than read off the keyboard event.
 *
 * - `endCoordinates.height` leaves out the navigation bar under the keyboard
 *   (React Native subtracts the system bars from it), while `screenY` is where
 *   the keyboard actually starts.
 * - Whether the window shrinks for the keyboard depends on
 *   `windowSoftInputMode` and on edge-to-edge, which Android 15+ enforces.
 *   Comparing the parent's bottom edge with the keyboard's top works either
 *   way.
 *
 * The parent's bottom edge is read from `anchorRef`, a zero-height view pinned
 * there. `measureInWindow` is relative to the app's root view and `screenY` to
 * the screen: the two agree under edge-to-edge, and otherwise differ by the
 * status bar, which can only make the overlap smaller, never lift the Toast
 * twice.
 */
export function useKeyboardOverlap(enabled: boolean) {
  const anchorRef = React.useRef<View>(null);
  const keyboardScreenY = React.useRef<number | null>(null);
  const [keyboardOverlap, setKeyboardOverlap] = React.useState(0);

  // Measures first and sets the overlap once, so a resized window is never
  // compared with the keyboard while the parent still has its old height
  const measure = React.useCallback(() => {
    const screenY = keyboardScreenY.current;
    if (screenY === null) {
      return;
    }
    anchorRef.current?.measureInWindow((_x, hostBottom) => {
      // The keyboard moved or closed while this was being measured
      if (keyboardScreenY.current !== screenY) {
        return;
      }
      setKeyboardOverlap(
        keyboardOverlapFor({ hostBottom, keyboardScreenY: screenY })
      );
    });
  }, []);

  React.useEffect(() => {
    if (!enabled) {
      return () => {};
    }
    const didShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (event: KeyboardEvent) => {
        keyboardScreenY.current = event.endCoordinates.screenY;
        measure();
      }
    );
    const didHideListener = Keyboard.addListener('keyboardDidHide', () => {
      keyboardScreenY.current = null;
      setKeyboardOverlap(0);
    });

    return () => {
      didShowListener.remove();
      didHideListener.remove();
    };
  }, [enabled, measure]);

  return {
    keyboardOverlap,
    anchorRef,
    onAnchorLayout: measure
  };
}
