import React from 'react';

import { LoggerProvider } from './contexts';
import { ToastUI } from './ToastUI';
import {
  ToastHideParams,
  ToastProps,
  ToastRef,
  ToastShowParams
} from './types';
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

type ToastRefObj = {
  current: ToastRef | null;
};

const refs: ToastRefObj[] = [];

export function Toast({ nestingLevel = 0, ...rest }: ToastProps) {
  return (
    <LoggerProvider enableLogs={false}>
      <ToastRoot
        ref={(ref: ToastRef) => {
          refs[nestingLevel] = {
            current: ref
          };
        }}
        {...rest}
      />
    </LoggerProvider>
  );
}

/**
 * Get the active Toast instance `ref`, by priority.
 * The "highest" Toast in the `View` hierarchy has the highest priority.
 *
 * For example, a Toast inside a `Modal`, would have a higher priority than a Toast inside App's Root
 * (which has a default `nestingLevel` of 0)
 * ```js
 * <>
 *  <Toast nestingLevel={0} />
 *  <Modal>
 *    <Toast nestingLevel={1} />
 *  </Modal>
 * </>
 * ```
 */
function getRef() {
  const reversePriority = [...refs].reverse();
  const activeRef = reversePriority.find((ref) => ref?.current !== null);
  if (!activeRef) {
    return null;
  }
  return activeRef.current;
}

Toast.show = (params: ToastShowParams) => {
  getRef()?.show(params);
};

Toast.hide = (params?: ToastHideParams) => {
  getRef()?.hide(params);
};
