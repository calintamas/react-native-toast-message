# react-native-toast-message

[![npm version](https://img.shields.io/npm/v/react-native-toast-message)](https://www.npmjs.com/package/react-native-toast-message)
[![npm downloads](https://img.shields.io/npm/dw/react-native-toast-message)](https://www.npmjs.com/package/react-native-toast-message)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

An animated toast message component for React Native that can be called imperatively.

## Install

```
yarn add react-native-toast-message
```

![ToastSuccess](success-toast.gif)

## Usage

Render the `Toast` component in your app entry file (along with everything that might be rendered there) and set a ref to it.

```js
// App.jsx
import React from 'react';
import Toast from 'react-native-toast-message';

function App(props) {
  return (
    <>
      {/* ... */}
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </>
  );
}

export default App;
```

Then use it anywhere in your app, by calling any `Toast` method directly:

```js
import Toast from 'react-native-toast-message';

Toast.show({
  text1: 'Hello',
  text2: 'This is some something 👋'
});
```

## API

### `show(options = {})`

When calling the `show` method, you can use the following `options` to suit your needs. Everything is optional, unless specified otherwise.

The usage of `|` below, means that only one of the values show should be used.
If only one value is shown, that's the default.

```js
Toast.show({
  type: 'success | error | info',
  position: 'top | bottom',
  text1: 'Hello',
  text2: 'This is some something 👋',
  visibilityTime: 4000,
  autoHide: true,
  topOffset: 30,
  bottomOffset: 40,
  onShow: () => {},
  onHide: () => {}
});
```

### `hide(options = {})`

```js
Toast.hide({
  onHide: () => {}
});
```

## props

### `style`

Default `Animated.View` styles can be found in [styles.js](https://github.com/calintamas/react-native-toast-message/blob/master/src/styles.js#L4). They can be extended using the `style` prop.

### `config`

Allows you to add/overwrite Toast types. Explained below.

## Customizing the toast types

If you want to add custom types - or overwrite the existing ones - you can add a `config` prop when rendering the `Toast` in your app `root`.

```js
// App.jsx
import React from 'react';
import Toast from 'react-native-toast-message';

const toastConfig = {
  success: (internalState) => (
    <View style={{ height: 60, width: '100%', backgroundColor: 'pink' }}>
      <Text>{internalState.text1}</Text>
      <Text>{internalState.props.guid}</Text>
    </View>
  ),
  error: () => {},
  info: () => {},
  any_custom_type: () => {}
};

function App(props) {
  return (
    <>
      {/* ... */}
      <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
    </>
  );
}

export default App;
```

Then just use the library as before

```js
Toast.show({
  type: 'any_custom_type',
  props: { onPress: () => {}, guid: 'guid-id' }
});
```

## Credits

The icons for the default `success`, `error` and `info` types are made by [Pixel perfect](https://www.flaticon.com/authors/pixel-perfect) from [flaticon.com](www.flaticon.com).
