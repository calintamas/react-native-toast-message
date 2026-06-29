# API

The `Toast` API consists of:

1. [methods](#methods) that can be called directly on the `Toast` object (in an _imperative_ way)
1. [props](#props) that can be passed to the `Toast` component instance; they act as defaults for all Toasts that are shown

## methods

### `show(options = {})`

To show a Toast, call the `show()` method and pass the `options` that suit your needs. Everything is optional, unless specified otherwise:

```js
import Toast from 'react-native-toast-message'

Toast.show({
  type: 'info',
  text1: 'This is an info message'
});
```

The complete set of **options** is described below:

| option           | description                                                                                                                                                                                     | type              | default value |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ------------- |
| `type`           | Toast type. Default available values: `success`, `error`, `info`. [Learn how to extend / overwrite Toast types](./custom-layouts.md)                                                            | `string`          | `success`     |
| `text1`          | First line of text                                                                                                                                                                              | `string`          |               |
| `text2`          | Second line of text                                                                                                                                                                             | `string`          |               |
| `position`       | Toast position                                                                                                                                                                                  | `top` or `bottom` | `top`         |
| `visibilityTime` | Number of milliseconds after which Toast automatically hides. Has effect only in conjunction with `autoHide` prop set to `true`                                                                 | `number`          | `4000`        |
| `autoHide`       | When `true`, the visible Toast automatically hides after a certain number of milliseconds, specified by the `visibilityTime` prop                                                               | `boolean`         | `true`        |
| `topOffset`      | Offset from the top of the screen (in px). Has effect only when `position` is `top`                                                                                                             | `number`          | `40`          |
| `bottomOffset`   | Offset from the bottom of the screen (in px). Has effect only when `position` is `bottom`                                                                                                       | `number`          | `40`          |
| `keyboardOffset` | Offset from the Keyboard (in px). Has effect only when `position` is `bottom` and Keyboard is visible (iOS only)                                                                                | `number`          | `10`          |
| `onShow`         | Called when the Toast is shown                                                                                                                                                                  | `() => void`      |               |
| `onHide`         | Called when the Toast hides                                                                                                                                                                     | `() => void`      |               |
| `onPress`        | Called on Toast press                                                                                                                                                                           | `() => void`      |               |
| `props`          | Any custom props passed to the specified Toast type. Has effect only when there is a custom Toast type (configured via the `config` prop on the Toast instance) that uses the `props` parameter | `any`             |               |
| `animationConfig` | Configures the enter/exit animation. See [Animation config](#animation-config) | `ToastAnimationConfig` | `{ type: 'spring', friction: 8 }` |

### `hide()`

To hide the current visible Toast, call the `hide()` method:

```js
Toast.hide();
```

If an `onHide` callback was set (via `show()`, or as a default `prop` on the Toast component instance), it will be called now.

## props

The following set of `props` can be passed to the `Toast` component instance to specify certain **defaults for all Toasts that are shown**:

| prop             | description                                                                                                                       | type                                   | default value |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- | ------------- |
| `config`         | Layout configuration for custom Toast types                                                                                       | [`ToastConfig`](../src/types/index.ts) |               |
| `type`           | Default Toast type                                                                                                                | `string`                               | `success`     |
| `position`       | Default Toast position                                                                                                            | `top` or `bottom`                      | `top`         |
| `visibilityTime` | Number of milliseconds after which Toast automatically hides. Has effect only in conjunction with `autoHide` prop set to `true`   | `number`                               | `4000`        |
| `autoHide`       | When `true`, the visible Toast automatically hides after a certain number of milliseconds, specified by the `visibilityTime` prop | `boolean`                              | `true`        |
| `swipeable`      | When `true`, the Toast can be swiped to dismiss                                                                                   | `boolean`                              | `true`        |
| `topOffset`      | Offset from the top of the screen (in px). Has effect only when `position` is `top`                                               | `number`                               | `40`          |
| `bottomOffset`   | Offset from the bottom of the screen (in px). Has effect only when `position` is `bottom`                                         | `number`                               | `40`          |
| `keyboardOffset` | Offset from the Keyboard (in px). Has effect only when `position` is `bottom` and Keyboard is visible (iOS only)                  | `number`                               | `10`          |
| `onShow`         | Called when any Toast is shown                                                                                                    | `() => void`                           |               |
| `onHide`         | Called when any Toast hides                                                                                                       | `() => void`                           |               |
| `onPress`        | Called on any Toast press                                                                                                         | `() => void`                           |               |
| `animationConfig` | Default enter/exit animation config applied to every Toast. See [Animation config](#animation-config) | `ToastAnimationConfig` | `{ type: 'spring', friction: 8 }` |

For example, to make sure all your Toasts are displayed at the bottom of the screen:

```js
// App.jsx
import Toast from 'react-native-toast-message';

export function App(props) {
  return (
    <>
      {/* ... */}
      <Toast
        position='bottom'
        bottomOffset={20}
      />
    </>
  );
}
```

## Animation config

The enter and exit animations can be customized via the `animationConfig` option. It accepts either a single config (applied to both phases) or a pair `{ enter, exit }`.

Each config has a `type` of `'spring'` or `'timing'` and forwards the rest of the props to `Animated.spring` or `Animated.timing` from React Native (`useNativeDriver` and `toValue` are managed internally).

```js
import Toast from 'react-native-toast-message';
import { Easing } from 'react-native';

// timing animation for both enter and exit
Toast.show({
  text1: 'Hello',
  animationConfig: { type: 'timing', duration: 200 }
});

// different animations for enter and exit
Toast.show({
  text1: 'Hello',
  animationConfig: {
    enter: { type: 'timing', duration: 200, easing: Easing.out(Easing.cubic) },
    exit: { type: 'timing', duration: 400, easing: Easing.in(Easing.cubic) }
  }
});

// tune the default spring
Toast.show({
  text1: 'Hello',
  animationConfig: { type: 'spring', friction: 6, tension: 40 }
});
```

The default is `{ type: 'spring', friction: 8 }`, matching previous releases.
