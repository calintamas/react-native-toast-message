import React from 'react';
import { StyleProp, ViewStyle, TextStyle, ImageSourcePropType } from 'react-native'

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
    style?: StyleProp<ViewStyle>,
    leadingIconContainerStyle?: StyleProp<ViewStyle>,
    trailingIconContainerStyle?: StyleProp<ViewStyle>,
    leadingIconStyle?: StyleProp<ViewStyle>,
    trailingIconStyle?: StyleProp<ViewStyle>,
    contentContainerStyle?: StyleProp<ViewStyle>,
    text1Style?: StyleProp<TextStyle>,
    text2Style?: StyleProp<TextStyle>,
    activeOpacity?: number,
    text1NumberOfLines: number,
    text2NumberOfLines: number,
  }
  export const BaseToast: React.FC<BaseToastProps>
  export const SuccessToast: React.FC<BaseToastProps>
  export const ErrorToast: React.FC<BaseToastProps>
  export const InfoToast: React.FC<BaseToastProps>

  export interface ToastProps {
    ref: (ref: any) => any;
    config?: AnyObject,
    style?: StyleProp<ViewStyle>,
    topOffset?: number,
    bottomOffset?: number,
    keyboardOffset?: number,
    visibilityTime?: number,
    autoHide?: boolean,
    height?: number,
    position?: ToastPosition,
    type?: string
  }

  export interface ToastShowOptions {
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
  }

  export default class Toast extends React.Component<ToastProps> {
    static show(options: ToastShowOptions): void;

    static hide(): void;

    static setRef(ref: any): any;
  }
}
