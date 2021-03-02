import React, { Component } from 'react';
import { Animated, PanResponder, Keyboard } from 'react-native';
import PropTypes from 'prop-types';

import SuccessToast from './components/success';
import ErrorToast from './components/error';
import InfoToast from './components/info';
import { complement } from './utils/arr';
import { includeKeys } from './utils/obj';
import { stylePropType } from './utils/prop-types';
import { isIOS } from './utils/platform';
import styles from './styles';

const FRICTION = 8;

const defaultComponentsConfig = {
  // eslint-disable-next-line react/prop-types
  success: ({ hide, ...rest }) => (
    <SuccessToast {...rest} onTrailingIconPress={hide} />
  ),
  // eslint-disable-next-line react/prop-types
  error: ({ hide, ...rest }) => (
    <ErrorToast {...rest} onTrailingIconPress={hide} />
  ),
  // eslint-disable-next-line react/prop-types
  info: ({ hide, ...rest }) => (
    <InfoToast {...rest} onTrailingIconPress={hide} />
  )
};

function shouldSetPanResponder(gesture) {
  const { dx, dy } = gesture;
  // Fixes onPress handler https://github.com/calintamas/react-native-toast-message/issues/113
  return Math.abs(dx) > 2 || Math.abs(dy) > 2;
}

const getInitialState = ({
  topOffset,
  bottomOffset,
  keyboardOffset,
  visibilityTime,
  height,
  autoHide,
  position,
  type
}) => ({
  // layout
  topOffset,
  bottomOffset,
  keyboardOffset,
  height,
  position,
  type,

  // timing (in ms)
  visibilityTime,
  autoHide,

  // content
  text1: undefined,
  text2: undefined,

  onPress: undefined,
  onShow: undefined,
  onHide: undefined
});

class Toast extends Component {
  static _ref = null;

  static setRef(ref = {}) {
    Toast._ref = ref;
  }

  static getRef() {
    return Toast._ref;
  }

  static clearRef() {
    Toast._ref = null;
  }

  static show(options = {}) {
    Toast._ref.show(options);
  }

  static hide() {
    Toast._ref.hide();
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
    this.onLayout = this.onLayout.bind(this);

    this.state = {
      ...getInitialState(props),

      inProgress: false,
      isVisible: false,
      animation: new Animated.Value(0),
      keyboardHeight: 0,
      keyboardVisible: false,

      customProps: {}
    };

    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (event, gesture) =>
        shouldSetPanResponder(gesture),
      onMoveShouldSetPanResponderCapture: (event, gesture) =>
        shouldSetPanResponder(gesture),
      onPanResponderMove: (event, gesture) => {
        this._animateMovement(gesture);
      },
      onPanResponderRelease: (event, gesture) => {
        this._animateRelease(gesture);
      }
    });
  }

  componentDidMount() {
    const noop = {
      remove: () => {}
    };
    this.keyboardDidShowListener = isIOS
      ? Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
      : noop;
    this.keyboardDidHideListner = isIOS
      ? Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
      : noop;
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListner.remove();
    clearTimeout(this.timer);
  }

  keyboardDidShow = (e) => {
    const { isVisible, position } = this.state;
    this.setState({
      keyboardHeight: e.endCoordinates.height,
      keyboardVisible: true
    });

    if (isVisible && position === 'bottom') {
      this.animate({ toValue: 2 });
    }
  };

  keyboardDidHide = () => {
    const { isVisible, position } = this.state;
    this.setState({
      keyboardVisible: false
    });
    if (isVisible && position === 'bottom') {
      this.animate({ toValue: 1 });
    }
  };

  _setState(reducer) {
    return new Promise((resolve) => this.setState(reducer, () => resolve()));
  }

  _animateMovement(gesture) {
    const { position, animation, keyboardVisible } = this.state;
    const { dy } = gesture;
    let value = 1 + dy / 100;
    const start = keyboardVisible && position === 'bottom' ? 2 : 1;

    if (position === 'bottom') {
      value = start - dy / 100;
    }

    if (value <= start) {
      animation.setValue(value);
    }
  }

  _animateRelease(gesture) {
    const { position, animation, keyboardVisible } = this.state;
    const { dy, vy } = gesture;

    const isBottom = position === 'bottom';
    let value = 1 + dy / 100;

    if (isBottom) {
      value = 1 - dy / 100;
    }

    const treshold = 0.65;
    if (value <= treshold || Math.abs(vy) >= treshold) {
      this.hide({
        speed: Math.abs(vy) * 3
      });
    } else {
      Animated.spring(animation, {
        toValue: keyboardVisible && isBottom ? 2 : 1,
        velocity: vy,
        useNativeDriver: true
      }).start();
    }
  }

  async show(options = {}) {
    const { inProgress, isVisible } = this.state;
    if (inProgress || isVisible) {
      await this.hide();
    }

    await this._setState((prevState) => ({
      ...prevState,
      ...getInitialState(this.props), // Reset layout
      /*
          Preserve the previously computed height (via onLayout).
          If the height of the component corresponding to this `show` call is different,
          onLayout will be called again and `height` state will adjust.

          This fixes an issue where a succession of calls to components with custom heights (custom Toast types)
          fails to hide them completely due to always resetting to the default component height
      */
      height: prevState.height,
      inProgress: true,
      ...options,
      ...(options?.props ? { customProps: options.props } : { customProps: {} })
    }));
    await this.animateShow();
    await this._setState((prevState) => ({
      ...prevState,
      isVisible: true,
      inProgress: false
    }));
    this.clearTimer();

    const { autoHide, onShow } = this.state;

    if (autoHide) {
      this.startTimer();
    }

    if (onShow) {
      onShow();
    }
  }

  async hide({ speed } = {}) {
    await this._setState((prevState) => ({
      ...prevState,
      inProgress: true
    }));
    await this.animateHide({
      speed
    });
    this.clearTimer();
    await this._setState((prevState) => ({
      ...prevState,
      isVisible: false,
      inProgress: false
    }));

    const { onHide } = this.state;
    if (onHide) {
      onHide();
    }
  }

  animateShow = () => {
    const { keyboardVisible, position } = this.state;
    const toValue = keyboardVisible && position === 'bottom' ? 2 : 1;
    return this.animate({ toValue });
  };

  animateHide({ speed } = {}) {
    return this.animate({ toValue: 0, speed });
  }

  animate({ toValue, speed = 0 }) {
    const { animation } = this.state;
    return new Promise((resolve) => {
      const config = {
        toValue,
        useNativeDriver: true,
        ...(speed > 0 ? { speed } : { friction: FRICTION })
      };
      Animated.spring(animation, config).start(() => resolve());
    });
  }

  startTimer() {
    const { visibilityTime } = this.state;
    this.timer = setTimeout(() => this.hide(), visibilityTime);
  }

  clearTimer() {
    clearTimeout(this.timer);
    this.timer = null;
  }

  renderContent({ config }) {
    const componentsConfig = {
      ...defaultComponentsConfig,
      ...config
    };

    const { type, customProps } = this.state;
    const toastComponent = componentsConfig[type];

    if (!toastComponent) {
      // eslint-disable-next-line no-console
      console.error(
        `Type '${type}' does not exist. Make sure to add it to your 'config'. You can read the documentation here: https://github.com/calintamas/react-native-toast-message/blob/master/README.md`
      );
      return null;
    }

    return toastComponent({
      ...includeKeys({
        obj: this.state,
        keys: [
          'position',
          'type',
          'inProgress',
          'isVisible',
          'text1',
          'text2',
          'hide',
          'show',
          'onPress'
        ]
      }),
      props: { ...customProps },
      hide: this.hide,
      show: this.show
    });
  }

  getBaseStyle(position = 'bottom', keyboardHeight) {
    const {
      topOffset,
      bottomOffset,
      keyboardOffset,
      height,
      animation
    } = this.state;
    const offset = position === 'bottom' ? bottomOffset : topOffset;

    // +5 px to completely hide the toast under StatusBar (on Android)
    const range = [height + 5, -offset, -(keyboardOffset + keyboardHeight)];
    const outputRange = position === 'bottom' ? range : complement(range);

    const translateY = animation.interpolate({
      inputRange: [0, 1, 2],
      outputRange
    });

    return [
      styles.base,
      styles[position],
      {
        transform: [{ translateY }]
      }
    ];
  }

  onLayout(e) {
    this.setState({ height: e.nativeEvent.layout.height });
  }

  render() {
    const { style } = this.props;
    const { position, keyboardHeight } = this.state;
    const baseStyle = this.getBaseStyle(position, keyboardHeight);

    return (
      <Animated.View
        testID='animatedView'
        onLayout={this.onLayout}
        style={[baseStyle, style]}
        {...this.panResponder.panHandlers}>
        {this.renderContent(this.props)}
      </Animated.View>
    );
  }
}

Toast.propTypes = {
  config: PropTypes.objectOf(PropTypes.func),
  style: stylePropType,
  topOffset: PropTypes.number,
  bottomOffset: PropTypes.number,
  keyboardOffset: PropTypes.number,
  visibilityTime: PropTypes.number,
  autoHide: PropTypes.bool,
  height: PropTypes.number,
  position: PropTypes.oneOf(['top', 'bottom']),
  type: PropTypes.string
};

Toast.defaultProps = {
  config: {},
  style: undefined,
  topOffset: 30,
  bottomOffset: 40,
  keyboardOffset: 15,
  visibilityTime: 4000,
  autoHide: true,
  height: 60,
  position: 'top',
  type: 'success'
};

export default Toast;
