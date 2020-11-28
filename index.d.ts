declare module 'react-native-toast-message' {
  import React from 'react';
  const Toast: {
    show(options: {
      type?: 'success' | 'error' | 'info';
      position?: 'top' | 'bottom';
      text1: string;
      text2: string;
      visibilityTime?: number;
      autoHide?: boolean;
      topOffset?: number;
      bottomOffset?: number;
      onShow?: () => {};
      onHide?: () => {};
    });
    setRef: (ref: any) => any;
  } & React.ComponentType<{
    ref: (ref: any) => any;
  }>;
  export default Toast;
}
