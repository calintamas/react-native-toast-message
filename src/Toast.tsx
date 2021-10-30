import React from 'react';

import { LoggerProvider } from './contexts';
import { ToastUI } from './ToastUI';
import { ToastHideParams, ToastProps, ToastShowParams } from './types';
import { useToast } from './useToast';

const ToastRoot = React.forwardRef((props: ToastProps, ref) => {
  const { config, ...defaultOptions } = props;
  const { show, hide, isVisible, options, data } = useToast({
    defaultOptions
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

export function Toast(props: ToastProps) {
  return (
    <LoggerProvider enableLogs={false}>
      <ToastRoot ref={toastRef} {...props} />
    </LoggerProvider>
  );
}

Toast.show = (params: ToastShowParams) => {
  toastRef.current?.show(params);
};

Toast.hide = (params?: ToastHideParams) => {
  toastRef.current?.hide(params);
};
