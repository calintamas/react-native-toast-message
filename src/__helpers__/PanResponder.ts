import {
  GestureResponderHandlers,
  PanResponder,
  PanResponderCallbacks,
  PanResponderGestureState
} from 'react-native';

export const mockGestureValues: PanResponderGestureState = {
  moveY: 0,
  moveX: 0,
  y0: 0,
  x0: 0,
  dx: 0,
  dy: 10,
  stateID: 123,
  vx: 0,
  vy: 0,
  numberActiveTouches: 1,
  _accountsForMovesUpTo: 1
};

export function mockPanResponder() {
  jest
    .spyOn(PanResponder, 'create')
    .mockImplementation(
      ({
        onMoveShouldSetPanResponder,
        onMoveShouldSetPanResponderCapture,
        onPanResponderMove,
        onPanResponderRelease
      }: PanResponderCallbacks) => ({
        panHandlers: {
          onMoveShouldSetResponder: onMoveShouldSetPanResponder,
          onMoveShouldSetResponderCapture: onMoveShouldSetPanResponderCapture,
          onResponderMove: onPanResponderMove,
          onResponderRelease: onPanResponderRelease
        } as GestureResponderHandlers
      })
    );
}
