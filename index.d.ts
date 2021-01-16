import React from 'react';
import { ViewStyle, TextStyle, ImageSourcePropType } from 'react-native'

declare module 'react-native-toast-message' {
  interface AnyObject {
    [key: string]: any;
  }

  export interface ToastConfig extends AnyObject {}
  export type ToastPosition = 'top' | 'bottom'
  export type ToastType = keyof ToastConfig

  export interface BaseToastProps {
    leadingIcon?: ImageSourcePropType,
    trailingIcon?: ImageSourcePropType,
    text1?: string,
    text2?: string,
    onPress?: () => void,
    onTrailingIconPress?: () => void,
    onLeadingIconPress?: () => void,
    style?: ViewStyle,
    leadingIconContainerStyle?: ViewStyle,
    trailingIconContainerStyle?: ViewStyle,
    leadingIconStyle?: ViewStyle,
    trailingIconStyle?: ViewStyle,
    contentContainerStyle?: ViewStyle,
    text1Style?: TextStyle,
    text2Style?: TextStyle,
    activeOpacity?: number
  }
  export const BaseToast: React.FC<BaseToastProps>

  export interface ToastProps {
    ref: (ref: any) => any;
    config?: ToastConfig,
    style?: ViewStyle,
    topOffset?: number,
    bottomOffset?: number,
    keyboardOffset?: number,
    visibilityTime?: number,
    autoHide?: boolean,
    height?: number,
    position?: ToastPosition,
    type?: ToastType
  }

  export default class Toast extends React.Component<ToastProps> {
    static show(options: {
      type: ToastType,
      position?: ToastPosition,
      text1?: string,
      text2?: string,
      visibilityTime?: number,
      autoHide?: boolean,
      topOffset?: number,
      bottomOffset?: number,
      props?: AnyObject,
      onShow?: () => void,
      onHide?: () => void,
      onPress?: () => void
    }): void;

    static hide(options?: {
      onHide?: () => void
    }): void;

    static setRef(ref: any): any;
  }
}
