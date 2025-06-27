import React from 'react';

import { useLogger, useGesture } from './contexts';
import { useTimeout } from './hooks';
import { ToastData, ToastOptions, ToastProps, ToastShowParams } from './types';
import { noop } from './utils/func';
import { mergeIfDefined } from './utils/obj';

export const DEFAULT_DATA: ToastData = {
  text1: undefined,
  text2: undefined
};

export const DEFAULT_OPTIONS: Required<ToastOptions> = {
  type: 'success',
  text1Style: null,
  text2Style: null,
  position: 'top',
  autoHide: true,
  swipeable: true,
  visibilityTime: 4000,
  topOffset: 40,
  bottomOffset: 40,
  keyboardOffset: 10,
  avoidKeyboard: true,
  onShow: noop,
  onHide: noop,
  onPress: noop,
  props: {}
};

export type UseToastParams = {
  defaultOptions: Omit<ToastProps, 'config'>;
};

export function useToast({ defaultOptions }: UseToastParams) {
  const { log } = useLogger();
  const { panning } = useGesture();

  const [isVisible, setIsVisible] = React.useState(false);
  const [data, setData] = React.useState<ToastData>(DEFAULT_DATA);

  const initialOptions = mergeIfDefined(
    DEFAULT_OPTIONS,
    defaultOptions
  ) as Required<ToastOptions>;
  const [options, setOptions] =
    React.useState<Required<ToastOptions>>(initialOptions);

  const onAutoHide = React.useCallback(() => {
    if (panning.current) {
      log('Auto hiding was blocked due to panning');
    } else {
      log('Auto hiding');
      setIsVisible(false);
      options.onHide();
    }
  }, [log, options, panning]);
  const { startTimer, clearTimer } = useTimeout(
    onAutoHide,
    options.visibilityTime
  );

  const hide = React.useCallback(() => {
    log('Hiding');
    setIsVisible(false);
    clearTimer();
    options.onHide();
  }, [clearTimer, log, options]);

  const show = React.useCallback(
    (params: ToastShowParams) => {
      log(`Showing with params: ${JSON.stringify(params)}`);
      const {
        text1 = DEFAULT_DATA.text1,
        text2 = DEFAULT_DATA.text2,
        type = initialOptions.type,
        text1Style = initialOptions.text1Style,
        text2Style = initialOptions.text2Style,
        position = initialOptions.position,
        autoHide = initialOptions.autoHide,
        visibilityTime = initialOptions.visibilityTime,
        topOffset = initialOptions.topOffset,
        bottomOffset = initialOptions.bottomOffset,
        keyboardOffset = initialOptions.keyboardOffset,
        avoidKeyboard = initialOptions.avoidKeyboard,
        onShow = initialOptions.onShow,
        onHide = initialOptions.onHide,
        onPress = initialOptions.onPress,
        swipeable = initialOptions.swipeable,
        props = initialOptions.props
      } = params;
      setData({
        text1,
        text2
      });
      setOptions(
        mergeIfDefined(initialOptions, {
          type,
          text1Style,
          text2Style,
          position,
          autoHide,
          visibilityTime,
          topOffset,
          bottomOffset,
          keyboardOffset,
          avoidKeyboard,
          onShow,
          onHide,
          onPress,
          swipeable,
          props
        }) as Required<ToastOptions>
      );
      // TODO: validate input
      // TODO: use a queue when Toast is already visible
      setIsVisible(true);
      onShow();
    },
    [initialOptions, log]
  );

  React.useEffect(() => {
    const { autoHide } = options;
    if (isVisible) {
      if (autoHide) {
        startTimer();
      } else {
        clearTimer();
      }
    }
  }, [isVisible, options, startTimer, clearTimer]);

  return {
    isVisible,
    data,
    options,
    show,
    hide
  };
}
