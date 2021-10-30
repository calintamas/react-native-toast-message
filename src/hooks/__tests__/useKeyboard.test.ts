/* eslint-env jest */

import { act, renderHook } from '@testing-library/react-hooks';
import { Keyboard } from 'react-native';

import { isIOS } from '../../utils/platform';
import { useKeyboard } from '../useKeyboard';

jest.mock('../../utils/platform');

const mockIsIOS = isIOS as jest.MockedFunction<typeof isIOS>;

const setup = (platform: 'ios' | 'android' = 'ios') => {
  mockIsIOS.mockReturnValue(platform === 'ios');
  const utils = renderHook(useKeyboard);
  return {
    ...utils
  };
};

describe('test useKeyboard hook', () => {
  it('returns defaults', () => {
    const { result } = setup();
    expect(result.current.isKeyboardVisible).toBe(false);
    expect(result.current.keyboardHeight).toBe(0);
  });

  it('updates keyboard height on show', () => {
    const { result } = setup();
    expect(result.current.isKeyboardVisible).toBe(false);
    expect(result.current.keyboardHeight).toBe(0);
    act(() => {
      Keyboard.emit('keyboardDidShow', {
        endCoordinates: {
          height: 425
        }
      });
    });
    expect(result.current.isKeyboardVisible).toBe(true);
    expect(result.current.keyboardHeight).toBe(425);
  });

  it('updates keyboard height on hide', () => {
    const { result } = setup();
    expect(result.current.isKeyboardVisible).toBe(false);
    expect(result.current.keyboardHeight).toBe(0);
    act(() => {
      Keyboard.emit('keyboardDidShow', {
        endCoordinates: {
          height: 425
        }
      });
    });
    expect(result.current.isKeyboardVisible).toBe(true);
    expect(result.current.keyboardHeight).toBe(425);
    act(() => {
      Keyboard.emit('keyboardDidHide');
    });
    expect(result.current.isKeyboardVisible).toBe(false);
    expect(result.current.keyboardHeight).toBe(0);
  });

  it('does nothing on Android', () => {
    mockIsIOS.mockReturnValue(false);
    const { result } = setup('android');
    expect(result.current.isKeyboardVisible).toBe(false);
    expect(result.current.keyboardHeight).toBe(0);
  });
});
