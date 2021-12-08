# How to show the Toast inside a Modal?

## How are `refs` tracked

By default, when you render a `<Toast />` instance in your App's entry point (root), a `ref` is created and tracked internally.

```js
// App.jsx
import Toast from 'react-native-toast-message'

export function App(props) {
  return (
    <>
      {/* ... */}
      {/* A `ref` pointing to this Toast instance is created */}
      <Toast />
    </>
  );
}
```

Under the hood, this `ref` is used when you imperatively call `Toast.show()` or `Toast.hide()`.

## Showing a Toast inside a Modal

When you have a [Modal](https://reactnative.dev/docs/modal), things get different. This `Modal` component is [_above_ React's root `View`](https://stackoverflow.com/questions/39766350/bring-view-on-top-of-modal-using-zindex-style-with-react-native), so the only way to show something _on top of the modal_ is to render it inside the `Modal` itself.

This means **you need a new instance** of `<Toast />` rendered inside your `Modal` (as well as keeping the existing `<Toast />` instance outside, in your App's entry point).

```diff
// App.jsx
import { Modal } from 'react-native'
import Toast from 'react-native-toast-message'

export function App(props) {
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  return (
    <>
      {/* ... */}
      <Toast />
      <Modal visible={isModalVisible}>
+        <Toast />
      </Modal>
    </>
  );
}
```

Everything else works as usual; you can show and hide Toasts using the imperative API: `Toast.show()` or `Toast.hide()`. When the `Modal` is visible, the `ref` from inside the `Modal` will be used, otherwise the one outside.

> The `ref` is tracked automatically; whichever `<Toast />` instance last had its `ref` set will be used when showing/hiding.

### Notes regarding `react-native-modal` or `NativeStackNavigator`

The same requirements as above apply when using [react-native-modal](https://github.com/react-native-modal/react-native-modal) or a [NativeStackNavigator](https://reactnavigation.org/docs/native-stack-navigator#presentation) with `presentation: 'modal'`:

```js
<>
  {/* This `Toast` will show when neither the native stack screen nor `Modal` are presented */}
  <Toast />

  <NativeStackNavigator.Screen>
    {/* This `Toast` will show when the `NativeStackNavigator.Screen` is visible, but the `Modal` is NOT visible. */}
    <Toast />

    <Modal>
      {/* This `Toast` will show when both the `NativeStackNavigator.Screen` and the `Modal` are visible. */}
      <Toast />
    </Modal>
  </NativeStackNavigator.Screen>
</>
```
