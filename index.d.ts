declare module 'react-native-toast-message' {
  import React from 'react';
  interface ObjectLiteral {
    [key: string]: any;
  }
  const Toast: {
    show(options: {
      type: 'success' | 'error' | 'info';
      position?: 'top' | 'bottom';
      text1?: string;
      text2?: string;
      visibilityTime?: number;
      autoHide?: boolean;
      topOffset?: number;
      bottomOffset?: number;
      props?: ObjectLiteral;
      onShow?: () => {};
      onHide?: () => {};
    });
    hide: (options?: { onHide: () => any }) => void;
    setRef: (ref: any) => any;
  } & React.ComponentType<{
    ref: (ref: any) => any;
  }>;
  export default Toast;
}
