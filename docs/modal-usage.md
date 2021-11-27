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

> Same behavior when using [react-native-modal](https://github.com/react-native-modal/react-native-modal) or a [NativeStackNavigator](https://reactnavigation.org/docs/native-stack-navigator#presentation) with `presentation: 'modal'`.

This means **you need a new instance** of `<Toast />` rendered inside your `Modal`.

The `ref` will still be tracked automatically, but there's one more thing that needs to be done for this to work properly. **You need to specify how _nested_ is your new `<Toast />` instance**.

This is done via the `nestingLevel` prop.

By default `nestingLevel` is `0` - this is the _root level_ (the `<Toast />` that is rendered in your App's entry point).

If you go a level "higher", inside a Modal, you get _level 1_ (a Modal is on top of your root, so you can think of it as being "higher" than your root). If you have another modal inside the previous Modal, you get _level 2_, and so on

```js
<>
  <Toast />
  <Modal>
    <Toast nestingLevel={1} />
    <Modal>
      <Toast nestingLevel={2} />
    </Modal>
  </Modal>
</>
```

So, when you have a `Modal` (1 level nesting), the implementation looks like this:

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
+        <Toast nestingLevel={1} />
      </Modal>
    </>
  );
}
```

Everything else works as usual, you can show and hide Toasts using the imperative API: `Toast.show()` or `Toast.hide()`. When the `Modal` is visible, the `ref` from inside the `Modal` will be used, otherwise the one outside.
