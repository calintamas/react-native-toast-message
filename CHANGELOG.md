# Changelog

All notable changes to this project will be documented in this file. The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

⚠️ The changelog should be **human-readable**, so everything that's added here should be easy to understand without additional lookups and checks

Headers are one of:

- `Added`, `Changed`, `Removed`, `Fixed` or `Breaking`.

## [2.1.1]

### Fixed

- Tapping a View / Button behind the Toast is not possible ([b9d191e](https://github.com/calintamas/react-native-toast-message/commit/b9d191e1dcc4d331fd5159ca9aabd54d7d0ecb97)) (fixes [#282](https://github.com/calintamas/react-native-toast-message/issues/282))

## [2.1.0]

### Fixed

- After a Toast is shown within a Modal, the main instance outside of Modal doesn't work anymore ([#293](https://github.com/calintamas/react-native-toast-message/pull/293))
- A previously set timer is not cleared when `autoHide` changes from `true` to `false`. This can make a newly shown Toast auto hide (even if it was shown with `autoHide: false`) ([#294](https://github.com/calintamas/react-native-toast-message/pull/294))

  Big thanks go to [jstheoriginal](https://github.com/jstheoriginal) for all the work on fixing the two issues above 🙌.

- Flexbox not working for setting Toast width or alignment ([3400f00](https://github.com/calintamas/react-native-toast-message/commit/3400f0074116f5acb37ca2eb696ea50b0c669ddc))

### Changed

- `BaseToastProps` style types allows passing an array of styles now `style={[styles.one, styles.two]}` ([#243](https://github.com/calintamas/react-native-toast-message/pull/243) was ported to v2)
- Peer deps no longer require a min version ([e91ed21](https://github.com/calintamas/react-native-toast-message/commit/e91ed21d277d7348b674834765147be752b6abfb))

## [2.0.2]

### Fixed

- Fast swipe up re-creates the toast [#280](https://github.com/calintamas/react-native-toast-message/issues/280)

## [2.0.1]

### Fixed

- `ansi-regex` vulnerability by upgrading to `@testing-library/jest-native v4.0.4` ([#277](https://github.com/calintamas/react-native-toast-message/pull/277))

## [2.0.0]

### Breaking

- Setting the `ref` is no longer required when rendering the `Toast` component in your app's entry point. Ref storage is now handled internally using [React.createRef](https://reactjs.org/docs/react-api.html#reactcreateref). This should improve ref access reliability at runtime.

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

- When you want to have the Toast visible inside a Modal, you no longer need to set a separate `ref`.

  Simply render the `Toast` component inside the Modal, as well as in your app's entry point. When the Modal is visible, the `ref` from inside the Modal will be automatically used.

- `onHide` callback is now always called when the Toast hides (does not matter if `autoHide` was `true` / `false`).

- `inProgress` state has been removed and can no longer be relied upon in a custom Toast config.

- `style` and `height` props from the Toast component were removed; with the purpose of achieving a cleaner API design. The only way to change the style / layout of different Toast types is through the `config` prop (fixes [#204](https://github.com/calintamas/react-native-toast-message/issues/204)).

### Added

- on the `BaseToast` component, the following props were added: `touchableContainerProps`, `contentContainerProps`, `text1Props`, `text2Props` , `text1NumberOfLines`, `text2NumberOfLines` (fixes [#112](https://github.com/calintamas/react-native-toast-message/issues/112), [#133](https://github.com/calintamas/react-native-toast-message/issues/133)).

- on the `Toast` component, the following callbacks were added as props: `onShow` , `onHide` and `onPress` (fixes [#143](https://github.com/calintamas/react-native-toast-message/issues/143)).

- A new `ToastShowParams` type is exported (fixes [#192](https://github.com/calintamas/react-native-toast-message/issues/192)).

### Changed

- `topOffset` and `bottomOffset` are now by default `40px`
- New test ids on `BaseToast` component: `toastTouchableContainer`, `toastContentContainer`, `toastText1` and `toastText2`.

### Removed

- Success, error and info leading icons were removed from the package (to make it as lightweight as possible).

  It's now possible to pass them via render functions (for more flexibility, see issues regarding svg support, using components as icons, etc) on `BaseToast` component, example below:

  ```js
  const toastConfig = {
    success: (props) => (
      <BaseToast
        {...props}
        renderLeadingIcon={() => <Image />}
        renderTrailingIcon={() => <Image />}
      />
    )
  }
  ```

  Fixes [#188](https://github.com/calintamas/react-native-toast-message/issues/188), [#203](https://github.com/calintamas/react-native-toast-message/issues/203), [#245](https://github.com/calintamas/react-native-toast-message/issues/245), [#250](https://github.com/calintamas/react-native-toast-message/issues/250).

- Trailing close icon has been removed from default components `BaseToast`, `SuccessToast`, `ErrorToast` and `InfoToast`. Fixes [#167](https://github.com/calintamas/react-native-toast-message/issues/167).

### Fixed

- Failed prop type: Invalid props.text2Style key fontSize supplied to BaseToast [#174](https://github.com/calintamas/react-native-toast-message/issues/174).
- Changing Font Family does not work [#176](https://github.com/calintamas/react-native-toast-message/issues/176)
- Text1 not showing on Android [#194](https://github.com/calintamas/react-native-toast-message/issues/194)
- Toast background is Transparent [#219](https://github.com/calintamas/react-native-toast-message/issues/219)
- TypeError: Cannot read property 'show' of null [#232](https://github.com/calintamas/react-native-toast-message/issues/232)
- textStyle1 styles not been applied [#233](https://github.com/calintamas/react-native-toast-message/issues/233)
- Typescript-class component toast message in modal usage [#172](https://github.com/calintamas/react-native-toast-message/issues/172)
- Getting last toast along with native prompt [#149](https://github.com/calintamas/react-native-toast-message/issues/149)
- When modal request permission appear then the modal toast on the previous screen also appears -> android [#226](https://github.com/calintamas/react-native-toast-message/issues/226)
- autoHide: false crashes on android [#256](https://github.com/calintamas/react-native-toast-message/issues/256)

## [1.6.0]

### Added

- Export all default Toast components (`BaseToast`, `SuccessToast`, `InfoToast`, `ErrorToast`) to be able to reuse them with custom props ([#225](https://github.com/calintamas/react-native-toast-message/pull/225))

## [1.5.0]

### Changed

- Move `show` method options to separate `ToastShowOptions` interface ([#242](https://github.com/calintamas/react-native-toast-message/pull/242))
- Use `StyleProp` in type definition file, to allow different types of style to be used (eg. `style={[styles.one, styles.two]}`) ([#243](https://github.com/calintamas/react-native-toast-message/pull/243))

## [1.4.9]

### Fixed

- Fix Keyboard pushing Toast too much on Android when displayed with position `bottom` ([#161](https://github.com/calintamas/react-native-toast-message/pull/161))

## [1.4.8]

### Added

- Add types for `text1NumberOfLines` and `text2NumberOfLines` ([#152](https://github.com/calintamas/react-native-toast-message/pull/152))

## [1.4.7]

### Fixed

- Fix proptype regression ([#151](https://github.com/calintamas/react-native-toast-message/pull/151))

## [1.4.6]

### Fixed

- Fix type declaration file ([#148](https://github.com/calintamas/react-native-toast-message/pull/148))

## [1.4.5]

### Fixed

- Remove dependency on ViewPropTypes ([#147](https://github.com/calintamas/react-native-toast-message/pull/147))

## [1.4.4]

### Changed

- Move eslint-plugin-prettier to dev dependencies ([#135](https://github.com/calintamas/react-native-toast-message/pull/135))
- Increase the threshold to register a swipe on the toast container ([#144](https://github.com/calintamas/react-native-toast-message/pull/144))

## [1.4.3]

### Fixed

- Fix type definitions ([#127](https://github.com/calintamas/react-native-toast-message/pull/127))
- Reset customProps every time show is called ([#128](https://github.com/calintamas/react-native-toast-message/pull/128))

## [1.4.2]

### Fixed

- Fix `onPress` handler for custom components

## [1.4.1]

### Fixed

- Fix type declaration file

## [1.4.0]

### Added

- Add `onPress` to `Toast.show` method
- Export `BaseToast` component to allow styling
- Add `topOffset`, `bottomOffset` and `visibilityTime` as instance props
- When shown with `position: bottom`, Toast is now Keyboard aware

## [1.3.7]

### Added

- Add Typescript declaration file ([#94](https://github.com/calintamas/react-native-toast-message/pull/94))

### Fixed

- Allow style prop to style the base component ([#93](https://github.com/calintamas/react-native-toast-message/pull/93))

## [1.3.6]

### Fixed

- Custom render props are now part of the initial state. This removes the need to use optional chaining when defining a custom toast `config`

## [1.3.5]

### Added

- Allow arbitrary data to be passed into Toasts ([#81](https://github.com/calintamas/react-native-toast-message/pull/81))

### Fixed

- In case of RTL the text will start from the right ([#84](https://github.com/calintamas/react-native-toast-message/pull/84))
- null is not an object (evaluating 'this.\_ref.show') ([#90](https://github.com/calintamas/react-native-toast-message/pull/90))

## [1.3.4]

### Fixed

- Shadows not visible on Android ([#51](https://github.com/calintamas/react-native-toast-message/pull/51))

## [1.3.3]

### Fixed

- `position: bottom`, damping value must be grater than 0 error ([#48](https://github.com/calintamas/react-native-toast-message/pull/48))

## [1.3.2]

### Changed

- Given texts `text1` and `text2` are rendered conditionally now ([#40](https://github.com/calintamas/react-native-toast-message/pull/40))

### Fixed

- Custom toast does not hide completely if its `height` is greater than the default 60

## [1.3.1]

### Fixed

- Fix typescript import err

## [1.3.0]

### Added

- Render custom toast types using a `config` prop
- A default `info` type toast
- `onShow` and `onHide` callbacks when using `Toast.show({ onShow, onHide })`

### Changed

- `autoHide` is now `true` by default

### Removed

- `renderSuccessToast` and `renderErrorToast` props are no longer relevant, so they were removed

### Fixed

- `onHide` is called when the toast is dismissed by a swipe gesture

## [1.2.3]

### Fixed

- Android status bar has bottom shadow

## [1.2.2]

### Added

- Swipe to dismiss gesture
