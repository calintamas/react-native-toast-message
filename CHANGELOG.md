# Changelog

All notable changes to this project will be documented in this file. The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

⚠️ The changelog should be **human-readable**, so everything that's added here should be easy to understand without additional lookups and checks

Headers are one of:

- `Added`, `Changed`, `Removed` or `Fixed`.

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
