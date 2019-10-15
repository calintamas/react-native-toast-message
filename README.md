# react-native-toast-message
![npm version](https://img.shields.io/npm/v/react-native-toast-message)
![npm downloads](https://img.shields.io/npm/dt/react-native-toast-message)

This is an animated toast message component for React Native that can be called imperatively. 

## Install
```
yarn add react-native-toast-message
```
![ToastSuccess](success-toast.gif)

## Example
```js
// Import the component
import Toast from './react-native-toast-message'

// Add it to your Root render method
render() {
  return (
    <Toast ref={(ref) => Toast.setRef(ref)} />
  )
}

// Then use it anywhere in your app like this
Toast.show({
  text1: 'Hello',
  text2: 'This is some something 👋'
})
```

## API
### text1 `string`
This is what you see in the headline of the message. 

### text2 `string`
This is the main content of the toast message. 

### type `string`
Toast message can be displayed either upon `success` or `error`. Default is `success`. If `error` is the case, the green success icon turns into a red error icon.

### position `string`
Can be either `top` or `bottom`. Default is `top`.

### autoHide `bool`
Default is `false`. But you can choose to set it to `true` and use the visibilityTime property to manage the hide time.

### visibilityTime `int`
Number of miliseconds for which the toast is visible on screen. Default is `4000` ms.

### topOffset `int`
Margin to top. If `position` is `top`.
If you display the toast top of screen, you can set the distance with this property. 

### bottomOffset `int`
Margin to bottom. If `position` is `bottom`.
If you display the message bottom of screen, you can set the distance with this property. 
