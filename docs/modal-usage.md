# How to show the Toast inside a Modal?

To show the Toast inside a Modal, simply render the Toast instance inside the Modal, **as well as** in your app's entry point.

That's it.

Now when the Modal is visible, the Toast reference from the Modal will be used and the Toast will be visible on top of the Modal.

```js
// Modal.jsx
import Toast from 'react-native-toast-message'
import { Modal } from 'react-native'

function Modal(props) {
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  return (
    <Modal visible={isModalVisible}>
        {/* Modal content */}
        {/* Toast component instance rendered inside Modal */}
        <Toast />
    </Modal>
  )
}
```

```js
// App.jsx
import Toast from 'react-native-toast-message'

export function App(props) {
  return (
    <>
      {/* ... */}
      {/* Toast component instance rendered in the app's entry point */}
      <Toast />
    </>
  );
}
```
