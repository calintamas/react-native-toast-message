# Quick start

## Install React Native Project

```sh
yarn add react-native-toast-message
# or
npm install --save react-native-toast-message
cd ios && pod install # for iOS
```

## Install Expo Project
```sh
npx expo install react-native-toast-message
```

## Rebuild the project
Rebuild the project
```sh
# expo projects
npx expo run:android
npx expo run:ios

# non-expo projects
npx react-native run-android
npx react-native run-ios
```

## Expo
- ❌ This library can't be used in the "Expo Go" app because it [requires custom native code](https://docs.expo.dev/workflow/customizing/).

## Usage

Render the `Toast` component in your app's entry file, as the **LAST CHILD** in the `View` hierarchy (along with any other components that might be rendered there):

```js
// App.jsx
import Toast from 'react-native-toast-message';

export function App(props) {
  return (
    <>
      {/* ... */}
      <Toast />
    </>
  );
}
```

Then use it anywhere in your app (even outside React components), by calling [any `Toast` method](./api.md#methods) directly:

```js
// Foo.jsx
import Toast from 'react-native-toast-message';
import { Button } from 'react-native'

export function Foo(props) {
  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Hello',
      text2: 'This is some something 👋'
    });
  }

  return (
    <Button
      title='Show toast'
      onPress={showToast}
    />
  )
}
```

## What's next

Explore the following topics:

- [Using the Toast API](./api.md)
- [Create custom layouts](./custom-layouts.md)
