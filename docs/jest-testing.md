# How to mock the library for testing with [jest](https://jestjs.io)?

```js
jest.mock('react-native-toast-message', () => ({
  show: jest.fn(),
  hide: jest.fn()
}));
```
