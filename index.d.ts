import React from 'react';
import { ViewStyle, TextStyle, ImageSourcePropType } from 'react-native'

declare module 'react-native-toast-message' {
  interface AnyObject {
    [key: string]: any;
  }

  export type ToastPosition = 'top' | 'bottom'

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
    activeOpacity?: number,
    text1NumberOfLines: number,
    text2NumberOfLines: number,
  }
  export const BaseToast: React.FC<BaseToastProps>

  export interface ToastProps {
    ref: (ref: any) => any;
    config?: AnyObject,
    style?: ViewStyle,
    topOffset?: number,
    bottomOffset?: number,
    keyboardOffset?: number,
    visibilityTime?: number,
    autoHide?: boolean,
    height?: number,
    position?: ToastPosition,
    type?: string
  }

  export default class Toast extends React.Component<ToastProps> {
    static show(options: {
      type: string,
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

    static hide(): void;

    static setRef(ref: any): any;
  }
}
