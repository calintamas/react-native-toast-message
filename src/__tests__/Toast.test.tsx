/* eslint-env jest */

import { act, fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { Button, Modal, Text } from 'react-native';

import { Toast } from '../Toast';

/*
  The Modal component is automatically mocked by RN and apparently contains a bug which makes the Modal 
  (and its children) to always be visible in the test tree.

  This fixes the issue:
 */
jest.mock('react-native/Libraries/Modal/Modal', () => {
  const ActualModal = jest.requireActual('react-native/Libraries/Modal/Modal');
  return (props) => <ActualModal {...props} />;
});

jest.mock('react-native/Libraries/LogBox/LogBox');

describe('test Toast component', () => {
  it('creates imperative handle', () => {
    const onShow = jest.fn();
    const onHide = jest.fn();

    render(<Toast onShow={onShow} onHide={onHide} />);

    expect(Toast.show).toBeDefined();
    expect(Toast.hide).toBeDefined();

    act(() => {
      Toast.show({
        text1: 'test'
      });
    });
    expect(onShow).toHaveBeenCalled();
    act(() => {
      Toast.hide();
    });
    expect(onHide).toHaveBeenCalled();
  });

  it('shows Toast inside a Modal', async () => {
    const onShow = jest.fn();
    const onHide = jest.fn();

    const onShowInsideModal = jest.fn();
    const onHideInsideModal = jest.fn();

    const ModalWrapper = () => {
      const [isVisible, setIsVisible] = React.useState(false);
      return (
        <>
          <Toast onShow={onShow} onHide={onHide} />
          <Text>Outside modal</Text>
          <Button title='Show modal' onPress={() => setIsVisible(true)} />
          <Modal visible={isVisible}>
            <Text>Inside modal</Text>
            <Button title='Hide modal' onPress={() => setIsVisible(false)} />
            <Toast onShow={onShowInsideModal} onHide={onHideInsideModal} />
          </Modal>
        </>
      );
    };

    const utils = render(<ModalWrapper />);
    expect(utils.queryByText('Outside modal')).toBeTruthy();
    expect(Toast.show).toBeDefined();
    expect(Toast.hide).toBeDefined();

    // Test the Toast instance that's outside the Modal
    act(() => {
      Toast.show({
        text1: 'test'
      });
    });
    expect(onShow).toHaveBeenCalled();
    act(() => {
      Toast.hide();
    });
    expect(onHide).toHaveBeenCalled();

    // Show the Modal
    const showModalButton = utils.queryByText('Show modal');
    expect(showModalButton).toBeTruthy();
    fireEvent.press(showModalButton);
    await waitFor(() => {
      expect(utils.queryByText('Inside modal')).toBeTruthy();
    });

    // Test the Toast instance that's inside the Modal
    act(() => {
      Toast.show({
        text1: 'test'
      });
    });
    expect(onShowInsideModal).toHaveBeenCalled();
    act(() => {
      Toast.hide();
    });
    expect(onHideInsideModal).toHaveBeenCalled();

    // Hide modal
    const hideModalButton = utils.queryByText('Hide modal');
    expect(hideModalButton).toBeTruthy();
    fireEvent.press(hideModalButton);
    await waitFor(() => {
      expect(utils.queryByText('Inside modal')).toBeFalsy();
    });

    // Now that the Modal is hidden, the the outside Toast instance again
    act(() => {
      Toast.show({
        text1: 'test'
      });
    });
    expect(onShow).toHaveBeenCalledTimes(2);
    expect(onShowInsideModal).toHaveBeenCalledTimes(1);
    act(() => {
      Toast.hide();
    });
    expect(onHide).toHaveBeenCalledTimes(2);
    expect(onHideInsideModal).toHaveBeenCalledTimes(1);
  });

  it(`doesn't show a Toast if there is no active ref`, () => {
    const onShow = jest.fn();
    const onHide = jest.fn();
    const ModalWrapper = () => (
      <>
        <Modal visible={false}>
          <Text>Inside modal</Text>
          <Toast onShow={onShow} onHide={onHide} />
        </Modal>
      </>
    );

    render(<ModalWrapper />);

    act(() => {
      Toast.show({
        text1: 'test'
      });
    });
    expect(onShow).not.toHaveBeenCalled();
  });

  it('when autoHide: true, the Toast only hides when timer reaches visibilityTime', () => {
    jest.useFakeTimers();
    const onShow = jest.fn();
    const onHide = jest.fn();
    const visibilityTime = 1500;

    render(
      <Toast
        onShow={onShow}
        onHide={onHide}
        autoHide={true}
        visibilityTime={visibilityTime}
      />
    );

    act(() => {
      Toast.show({
        text1: 'I am auto hiding, by default'
      });
    });
    expect(onShow).toHaveBeenCalled();

    // Advance time by 1/4 visibilityTime
    // Toast should not hide yet
    jest.advanceTimersByTime(visibilityTime / 4);
    expect(onHide).not.toHaveBeenCalled();

    // Do it again 1/4 visibilityTime
    // Toast should still be visible
    jest.advanceTimersByTime(visibilityTime / 4);
    expect(onHide).not.toHaveBeenCalled();

    // Advance time by the remaining 1/2 visibilityTime
    act(() => {
      jest.advanceTimersByTime(visibilityTime / 2);
    });
    // Now the Toast should hide
    expect(onHide).toHaveBeenCalled();

    jest.useRealTimers();
  });

  it('clears previous autoHide: true timer when a new Toast is presented with autoHide: false', () => {
    jest.useFakeTimers();

    const onShow = jest.fn();
    const onHide = jest.fn();
    const visibilityTime = 1500;

    render(
      <Toast
        onShow={onShow}
        onHide={onHide}
        autoHide={true}
        visibilityTime={visibilityTime}
      />
    );

    act(() => {
      Toast.show({
        text1: 'I am auto hiding, by default'
      });
    });
    expect(onShow).toHaveBeenCalled();

    // Advance by 1/2 visibilityTime
    // Toast should not hide
    jest.advanceTimersByTime(visibilityTime / 2);
    expect(onHide).not.toHaveBeenCalled();

    // Now, show another Toast, before the previous one has the chance to hide
    act(() => {
      Toast.show({
        text1: 'I am NOT auto hiding',
        autoHide: false
      });
    });

    // Advance time to the end of visibilityTime
    act(() => {
      jest.advanceTimersByTime(visibilityTime / 2);
    });

    // The new Toast should NOT hide
    // (the previous timer should have been cleared before reaching the end)
    expect(onHide).not.toHaveBeenCalled();

    // And even go beyond visibilityTime
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // The new Toast should still not hide
    expect(onHide).not.toHaveBeenCalled();

    jest.useRealTimers();
  });
});
