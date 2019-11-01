import React, { Component } from 'react'
import { Animated, PanResponder } from 'react-native'

import SuccessToast from './components/success'
import ErrorToast from './components/error'
import styles from './styles'

const FRICTION = 8;

const VISBILITY_TIME = 4000; // ms
const TOP_OFFSET = 30;
const BOTTOM_OFFSET = 40;
const HEIGHT = 60;

const _complement = (arr) => {
  return arr.map(i => -i)
}

class Toast extends Component {
  static _ref = null;

  static setRef(ref = {}) {
    this._ref = ref;
  }

  static getRef() {
    return this._ref;
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
    this._animateMovement = this._animateMovement.bind(this);
    this._animateRelease = this._animateRelease.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.animate = this.animate.bind(this);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);

    this.state = {
      // offsets
      top: props.topOffset || TOP_OFFSET,
      bottom: props.bottomOffset || BOTTOM_OFFSET,

      // toast height
      height: props.height || HEIGHT,

      // in ms
      visibilityTime: VISBILITY_TIME,

      position: 'top',
      type: 'success',

      inProgress: false,
      isVisible: false,
      animation: new Animated.Value(0),

      text1: '',
      text2: ''
    };

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        this._animateMovement(gesture);
      },
      onPanResponderRelease: (event, gesture) => {
        this._animateRelease(gesture);
      },
    });
  }

  _setState(newState = {}) {
    return new Promise((resolve) => this.setState(newState, () => resolve()));
  }

  _animateMovement(gesture) {
    const { dy } = gesture;
    let value = 1 + (dy / 100);

    if (this.state.position === 'bottom') {
      value = 1 - (dy / 100);
    }

    if (value < 1) {
      this.state.animation.setValue(value)
    }
  }

  _animateRelease(gesture) {
    const { dy, vy } = gesture;
    let value = 1 + (dy / 100);

    if (this.state.position === 'bottom') {
      value = 1 - (dy / 100);
    }

    if (value < 0.65) {
      Animated.spring(this.state.animation, {
        toValue: -2,
        speed: -vy,
        useNativeDriver: true
      }).start();
    } else if (value < 0.95) {
      Animated.spring(this.state.animation, {
        toValue: 1,
        velocity: vy,
        useNativeDriver: true
      }).start();
    }
  }

  async show(options = {}) {
    const state = this.state;
    if (state.inProgress || state.isVisible) {
      await this.hide();
    }

    await this._setState({ inProgress: true });

    const {
      topOffset = this.state.top,
      bottomOffset = this.state.bottom,
      position = 'top',
      type = 'success',
      text1 = '',
      text2 = '',
      autoHide = false,
      visibilityTime = VISBILITY_TIME
    } = options;
    await this._setState({
      top: topOffset,
      bottom: bottomOffset,
      visibilityTime,
      position,
      type,
      text1,
      text2
    });

    await this.animateShow();
    await this._setState({ isVisible: true });

    this.clearTimer();
    if (autoHide) {
      this.startTimer();
    }

    if (this.props.onShow) {
      this.props.onShow();
    }
  }

  async hide() {
    await this.setState({ inProgress: true });
    await this.animateHide();
    await this._setState({ isVisible: true });
    this.clearTimer();
    this._setState({ isVisible: false, inProgress: false });

    if (this.props.onHide) {
      this.props.onHide();
    }
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
          friction: FRICTION,
          useNativeDriver: true
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
    const offset = this.state[position];
    const height = this.state.height;
    const range = [height, -offset];
    const outputRange = position === 'bottom' ? range : _complement(range);

    const value = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange
    })

    return [
      styles.base,
      styles[position],
      {
        transform: [
          { translateY: value }
        ]
      }
    ]
  }

  renderSuccessToast(props) {
    if (props.renderSuccessToast) {
      return props.renderSuccessToast(this.state)
    }

    return (
      <SuccessToast
        onClose={this.hide}
        text1={this.state.text1}
        text2={this.state.text2} />
    )
  }

  renderErrorToast(props) {
    if (props.renderErrorToast) {
      return props.renderErrorToast(this.state)
    }

    return (
      <ErrorToast
        onClose={this.hide}
        text1={this.state.text1}
        text2={this.state.text2} />
    )
  }

  renderContent(props) {
    switch (this.state.type) {
      case 'success':
        return this.renderSuccessToast(props)

      case 'error':
        return this.renderErrorToast(props)

      default:
        return null
    }
  }

  render() {
    const props = this.props;
    const baseStyle = this.getBaseStyle(this.state.position);

    return (
      <Animated.View style={baseStyle} {...this.panResponder.panHandlers}>
        {this.renderContent(props)}
      </Animated.View>
    );
  }
}

export default Toast
