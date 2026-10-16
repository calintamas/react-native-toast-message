import { Platform } from 'react-native';

export function isIOS() {
  return Platform.OS === 'ios';
}

export function isAndroid() {
  return Platform.OS === 'android';
}
