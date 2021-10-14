import React from 'react';

import { LoggerProvider } from './contexts';
import { ToastUI } from './ToastUI';
import { ToastHideParams, ToastProps, ToastShowParams } from './types';
import { useToast } from './useToast';

const ToastRoot = React.forwardRef((props: ToastProps, ref) => {
  const {
    config,
    type,
    position,
    visibilityTime,
    topOffset,
    bottomOffset,
    keyboardOffset,
    onShow,
    onHide,
    onPress
  } = props;
  const { show, hide, isVisible, options, data } = useToast({
    defaultOptions: {
      type,
      position,
      visibilityTime,
      topOffset,
      bottomOffset,
      keyboardOffset,
      onShow,
      onHide,
      onPress
    }
  });

  React.useImperativeHandle(ref, () => ({
    show,
    hide
  }));

  return (
    <ToastUI
      isVisible={isVisible}
      options={options}
      data={data}
      hide={hide}
      show={show}
      config={config}
    />
  );
});

type ToastRef = {
  show: (params: ToastShowParams) => void;
  hide: (params: ToastHideParams) => void;
};

const toastRef = React.createRef<ToastRef>();

export function Toast({
  config,
  type,
  position,
  visibilityTime,
  topOffset,
  bottomOffset,
  keyboardOffset,
  onShow,
  onHide,
  onPress
}: ToastProps) {
  return (
    <LoggerProvider enableLogs>
      <ToastRoot
        ref={toastRef}
        config={config}
        type={type}
        position={position}
        visibilityTime={visibilityTime}
        topOffset={topOffset}
        bottomOffset={bottomOffset}
        keyboardOffset={keyboardOffset}
        onShow={onShow}
        onHide={onHide}
        onPress={onPress}
      />
    </LoggerProvider>
  );
}

Toast.show = (params: ToastShowParams) => {
  toastRef.current?.show(params);
};

Toast.hide = (params?: ToastHideParams) => {
  toastRef.current?.hide(params);
};
