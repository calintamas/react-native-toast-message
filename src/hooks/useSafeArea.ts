import {NativeModules, StatusBar} from 'react-native'
import {useEffect, useState} from "react";
import {isIOS} from "../utils/platform";
import {SCREEN_HEIGHT, WINDOW_HEIGHT} from "../utils/dimension";

type TSafeArea = {
  top: number
  bottom: number
  left: number
  right: number
}

type TNativeModulesSafeArea = {
  SafeAreaInsetsModule: {
    getSafeAreaInsets(p: (error: Error, result: TSafeArea) => void): Promise<{
      top: number;
      bottom: number;
      left: number;
      right: number
    }>;
  };
}
export const useSafeArea = () => {
  const [safeAreaInsets, setSafeAreaInsets] = useState<TSafeArea | null>(null);
  useEffect(() => {
    if (isIOS()) {
      NativeModules?.SafeAreaModule?.getSafeAreaInsets((error: Error, result: TSafeArea) => {
        if (error) {
          console.error(error);
        } else {
          setSafeAreaInsets(result)
        }
      });
    } else {
      const statusBarHeight = StatusBar.currentHeight ?? 0
      const bottomInset = SCREEN_HEIGHT - WINDOW_HEIGHT - statusBarHeight;
      setSafeAreaInsets({top: statusBarHeight, bottom: bottomInset, left: 0, right: 0})
    }
  }, [])

  return {safeAreaInsets}
}
