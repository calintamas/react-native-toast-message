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

let refs: ToastRefObj[] = [];

/**
 * Removes the passed in ref from the file-level refs array using a strict equality check.
 * 
 * @param oldRef the exact ref object to remove from the refs array.
 */
function removeOldRef(oldRef: ToastRef | null) {
  refs = refs.filter(r => r.current !== oldRef);
}

export function Toast(props: ToastProps) {
  const toastRef = React.useRef<ToastRef | null>(null);

  return (
    <LoggerProvider enableLogs={false}>
      <ToastRoot
        ref={(ref: ToastRef | null) => {
          // Since we know there's a ref, we'll update `refs` to use it.
          if (ref) {
            // if by chance the ref's object changes, make sure to remove the previous ref object.
            if (toastRef.current && ref !== toastRef.current) {
              removeOldRef(toastRef.current);
            }

            // store the ref in this toast instance to be able to remove it from the array later when the ref becomes null.
            toastRef.current = ref;

            // add it to the end of the array, which will be used to show the toasts until its ref becomes null.
            refs.push({
              current: ref
            });
          } else {
            // remove the this toast's ref, wherever it is in the array.
            removeOldRef(toastRef.current);
          }
        }}
        {...props}
      />
    </LoggerProvider>
  );
}

/**
 * Get the active Toast instance `ref`, by priority.
 * The "highest" Toast in the `View` hierarchy has the highest priority.
 *
 * For example, a Toast inside a `Modal`, would have had its ref set later than a Toast inside App's Root. Therefore, the library knows that it is currently visible on top of the App's Root, and will thus use the `Modal`'s Toast when showing/hiding.
 *
 * ```js
 * <>
 *  <Toast />
 *  <Modal>
 *    <Toast />
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
