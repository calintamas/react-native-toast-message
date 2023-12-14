import {NativeModules, StatusBar} from 'react-native'
import {isIOS} from "../utils/platform";
import {useEffect, useState} from "react";
import {TSafeArea} from "../types";
import {SCREEN_HEIGHT, WINDOW_HEIGHT} from "../utils/dimension";
export const useSafeArea = () => {
	const [safeAreaInsets, setSafeAreaInsets] = useState<TSafeArea | null>(null);
	useEffect(() => {
		if(isIOS()){
			NativeModules?.SafeAreaModule?.getSafeAreaInsets((error : Error, result: TSafeArea) => {
				if (error) {
					console.error(error);
				} else {
					setSafeAreaInsets(result)
				}
			});
		}else {
			const statusBarHeight = StatusBar.currentHeight ?? 0
			const bottomInset = SCREEN_HEIGHT - WINDOW_HEIGHT - statusBarHeight;
			setSafeAreaInsets({top: statusBarHeight, bottom: bottomInset, left: 0, right: 0})
		}
	},[])

	return {safeAreaInsets}
}
