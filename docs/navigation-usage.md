# How to render the Toast when using a Navigation library?

1. Usage with [react-navigation](https://reactnavigation.org)

## Usage with [react-navigation](https://reactnavigation.org)

To have the Toast visible on top of the navigation `View` hierarchy, render it as the **last child** in the `View` hierarchy (along the root Navigation component):

```js
import Toast from 'react-native-toast-message'
import { NavigationContainer } from '@react-navigation/native';

export function App() {
  return (
    <>
      <NavigationContainer>
        {...}
      </NavigationContainer>
      <Toast />
    </>
  );
}
```
