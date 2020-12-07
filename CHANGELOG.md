# Changelog

All notable changes to this project will be documented in this file. The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

⚠️ The changelog should be **human-readable**, so everything that's added here should be easy to understand without additional lookups and checks

Headers are one of:

- `Added`, `Changed`, `Removed` or `Fixed`.

## [1.4.1]

### Fixed

- Fix type declaration file, fixes [#109](https://github.com/calintamas/react-native-toast-message/issues/109)

## [1.4.0]

### Added

- Add `onPress` to `Toast.show` method, fixes [#86](https://github.com/calintamas/react-native-toast-message/issues/98)
- Export `BaseToast` component to allow styling, fixes [#50](https://github.com/calintamas/react-native-toast-message/issues/50), [#68](https://github.com/calintamas/react-native-toast-message/issues/68), [#87](https://github.com/calintamas/react-native-toast-message/issues/87), [#97](https://github.com/calintamas/react-native-toast-message/issues/97)
- Add `topOffset`, `bottomOffset` and `visibilityTime` as instance props, fixes [#98](https://github.com/calintamas/react-native-toast-message/issues/98)
- When shown with `position: bottom`, Toast is now Keyboard aware, fixes [#65](https://github.com/calintamas/react-native-toast-message/issues/65)

## [1.3.7]

### Added

- Add Typescript declaration file, fixes [#83](https://github.com/calintamas/react-native-toast-message/issues/83) ([spidi123q](https://github.com/spidi123q) in [#94](https://github.com/calintamas/react-native-toast-message/pull/94))

### Fixed

- Allow style prop to style the base component, fixes [#92](https://github.com/calintamas/react-native-toast-message/issues/92) ([akmjenkins](https://github.com/akmjenkins) in [#93](https://github.com/calintamas/react-native-toast-message/pull/93))

## [1.3.6]

### Fixed

- Custom render props are now part of the initial state. This removes the need to use optional chaining when defining a custom toast `config`

## [1.3.5]

### Added

- Allow arbitrary data to be passed into Toasts [#79](https://github.com/calintamas/react-native-toast-message/issues/79) ([troyvnit](https://github.com/troyvnit) in [#81](https://github.com/calintamas/react-native-toast-message/pull/81))

### Fixed

- In case of RTL the text will start from the right ([timorss](https://github.com/timorss) in [#84](https://github.com/calintamas/react-native-toast-message/pull/84))
- null is not an object (evaluating 'this.\_ref.show') [#89](https://github.com/calintamas/react-native-toast-message/issues/89) ([rogerkerse](https://github.com/rogerkerse) in [#90](https://github.com/calintamas/react-native-toast-message/pull/90))

## [1.3.4]

### Fixed

- Shadows not visible on Android [#43](https://github.com/calintamas/react-native-toast-message/issues/43) ([DerekFei](https://github.com/DerekFei) in [#51](https://github.com/calintamas/react-native-toast-message/pull/51))

## [1.3.3]

### Fixed

- `position: bottom`, damping value must be grater than 0 error [#41](https://github.com/calintamas/react-native-toast-message/issues/41) ([juliancwirko](https://github.com/juliancwirko) in [#48](https://github.com/calintamas/react-native-toast-message/pull/48))

## [1.3.2]

### Changed

- Given texts `text1` and `text2` are rendered conditionally now ([sardok](https://github.com/sardok) in [#40](https://github.com/calintamas/react-native-toast-message/pull/40))

### Fixed

- Custom toast does not hide completely if its `height` is greater than the default 60 ([#35](https://github.com/calintamas/react-native-toast-message/issues/35))

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

- #6 Android status bar has bottom shadow

## [1.2.2]

### Added

- Swipe to dismiss gesture
