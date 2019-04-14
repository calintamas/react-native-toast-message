import React, { Component } from 'react'
import { Animated } from 'react-native'

import BaseToast from './components/base'
import SuccessToast from './components/success'
import ErrorToast from './components/error'
import styles from './styles'

const FRICTION = 8;
const VISBILITY_TIME = 4000; // ms

class Toast extends Component {
  constructor(props) {
    super(props);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);

    this.state = {
      isVisible: false,
      animation: new Animated.Value(0),
      position: 'bottom',
      type: 'success',
      text1: '',
      text2: ''
    }
  }

  show(options = {}) {
    const newState = {
      position: options.position || 'bottom',
      type: options.type || 'success',
      text1: options.text1 || '',
      text2: options.text2 || ''
    }

    this.setState(newState, async () => {
      if (this.state.isVisible) {
        // hide the previous toast first
        await this.hide();
      }
      // then perform the animation
      this._showAnimation(options);
    })
  }

  _showAnimation(options) {
    Animated
      .spring(this.state.animation, {
        toValue: 1,
        friction: FRICTION
      })
      .start(() => {
        this.setState({ isVisible: true })
      });

    this.clearTimer();
    if (options.autoHide) {
      this.startTimer();
    }
  }

  hide() {
    return new Promise((resolve) => {
      Animated
        .spring(this.state.animation, {
          toValue: 0,
          friction: FRICTION
        })
        .start(() => {
          resolve();
          this.clearTimer();
          this.setState({ isVisible: false })
        });
    })
  }

  startTimer() {
    this.timer = setTimeout(() => this.hide(), VISBILITY_TIME)
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
