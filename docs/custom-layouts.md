# Create custom layouts

If you want to add custom Toast types - or overwrite the existing ones - you can add a [`config` prop](./api.md#props) when rendering the `Toast` component in your app's entry point.

When creating the `config`, you can either:

1. Use any of the default `BaseToast`, `SuccessToast`, `ErrorToast` or `InfoToast` components and adjust their layout
1. Create Toast layouts from scratch

```js
// App.jsx
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

/*
  1. Create the config
*/
const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'pink' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400'
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17
      }}
      text2Style={{
        fontSize: 15
      }}
    />
  ),
  /*
    Or create a completely new type - `tomatoToast`,
    building the layout from scratch.

    I can consume any custom `props` I want.
    They will be passed when calling the `show` method (see below)
  */
  tomatoToast: ({ text1, props }) => (
    <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
      <Text>{text1}</Text>
      <Text>{props.uuid}</Text>
    </View>
  )
};

/*
  2. Pass the config as prop to the Toast component instance
*/
export function App(props) {
  return (
    <>
      {...}
      <Toast config={toastConfig} />
    </>
  );
}
```

Then just use the library as before.

For example, if I want to show the new `tomatoToast` type I just created above:

```js
Toast.show({
  type: 'tomatoToast',
  // And I can pass any custom props I want
  props: { uuid: 'bba1a7d0-6ab2-4a0a-a76e-ebbe05ae6d70' }
});
```

All the available props on `BaseToast`, `SuccessToast`, `ErrorToast` or `InfoToast` components can be found here: [BaseToastProps](../src/types/index.ts#L86-L103).

## Backdrop

Use `renderBackdrop` on the `<Toast />` instance to render a decorative layer behind the Toast:

```tsx
import { View } from 'react-native';
import Toast from 'react-native-toast-message';

<Toast
  renderBackdrop={({ type }) => (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor:
          type === 'error' ? 'rgba(255, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.1)'
      }}
    />
  )}
/>;
```

The callback receives `type`, `position`, `isVisible`, and the custom `props` passed to `Toast.show()`. Return `null` to omit the backdrop for a particular Toast type. This is an instance prop; it cannot be overridden through `Toast.show()`.

The library provides a container with the same width and measured height as the Toast container, aligned with the Toast's resting position. Use `width: '100%'` and `height: '100%'` to fill it. Include any desired padding in your custom Toast layout to extend the backdrop's area.

The backdrop follows `topOffset`, `bottomOffset`, and keyboard avoidance, but stays in place and keeps its opacity while the Toast is dragged or restored. It fades in and out using the enter/exit `animationConfig`, independently of the swipe animation. `isVisible` indicates the requested visibility, not animation completion; returning `null` when it becomes `false` skips the exit fade.

The backdrop does not receive touch events, so controls underneath remain interactive. When `renderBackdrop` is omitted, Toast behavior is unchanged.
