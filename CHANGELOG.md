# Changelog
All notable changes to this project will be documented in this file. The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

⚠️ The changelog should be **human-readable**, so everything that's added here should be easy to understand without additional lookups and checks

Headers are one of:
- `Added`, `Changed`, `Removed` or `Fixed`.

## [1.3.0]
## Added
- Render custom toast types using a `config` prop
- A default `info` type toast
- `onShow` and `onHide` callbacks when using `Toast.show({ onShow, onHide })`

## Changed
- `autoHide` is now `true` by default

## Removed
- `renderSuccessToast` and `renderErrorToast` props are no longer relevant, so they were removed

## Fixed
- `onHide` is called when the toast is dismissed by a swipe gesture

## Changed

## [1.2.3]
### Fixed
- #6 Android status bar has bottom shadow

## [1.2.2]
### Added
- Swipe to dismiss gesture
