import React, { Component } from 'react'
import { Animated } from 'react-native'

import BaseToast from './components/base'
import SuccessToast from './components/success'
import ErrorToast from './components/error'
import styles from './styles'

const FRICTION = 8;
const VISBILITY_TIME = 4000; // ms

class Toast extends Component {
  static _ref = null;

  static setRef(ref = {}) {
    this._ref = ref;
  }

  static clearRef() {
    this._ref = null;
  }

  static show(options = {}) {
    this._ref.show(options);
  }

  static hide() {
    this._ref.hide();
  }

  constructor(props) {
    super(props);

    this._setState = this._setState.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.animate = this.animate.bind(this);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);

    this.state = {
      visibilityTime: VISBILITY_TIME,
      inProgress: false,
      isVisible: false,
      animation: new Animated.Value(0),
      position: 'bottom',
      type: 'success',
      text1: '',
      text2: ''
    }
  }

  _setState(newState = {}) {
    return new Promise((resolve) => this.setState(newState, () => resolve()));
  }

  async show(options = {}) {
    const state = this.state;
    if (state.inProgress || state.isVisible) {
      await this.hide();
    }

    await this._setState({ inProgress: true });

    const {
      position = 'bottom',
      type = 'success',
      text1 = '',
      text2 = '',
      autoHide = false,
      visibilityTime = VISBILITY_TIME
    } = options;
    await this._setState({ position, type, text1, text2, visibilityTime });

    await this.animateShow();
    await this._setState({ isVisible: true });

    this.clearTimer();
    if (autoHide) {
      this.startTimer();
    }
  }

  async hide() {
    await this.setState({ inProgress: true });
    await this.animateHide();
    await this._setState({ isVisible: true });
    this.clearTimer();
    this._setState({ isVisible: false, inProgress: false });
  }

  animateShow() {
    return this.animate({ toValue: 1 });
  }

  animateHide() {
    return this.animate({ toValue: 0 });
  }

  animate({ toValue }) {
    return new Promise((resolve) => {
      Animated
        .spring(this.state.animation, {
          toValue,
          friction: FRICTION
        })
        .start(() => resolve())
    })
  }

  startTimer() {
    this.timer = setTimeout(() => this.hide(), this.state.visibilityTime)
  }

  clearTimer() {
    clearTimeout(this.timer);
    this.timer = null;
  }

  getBaseStyle(position = 'bottom') {
    const offset = position === 'bottom' ? 70 : 40;

    const value = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [-BaseToast.HEIGHT, offset]
    })

    return [
      styles.base,
      { [position]: value }
    ]
  }

  renderToast() {
    const defaultProps = {
      onClose: this.hide,
      text1: this.state.text1,
      text2: this.state.text2
    };

    switch (this.state.type) {
      case 'success':
        return (
          <SuccessToast {...defaultProps} />
        )

      case 'error':
        return (
          <ErrorToast {...defaultProps} />
        )

      default:
        return null
    }
  }

  render() {
    const baseStyle = this.getBaseStyle(this.state.position);

    return (
      <Animated.View style={baseStyle}>
        {this.renderToast()}
      </Animated.View>
    );
  }
}

export default Toast
