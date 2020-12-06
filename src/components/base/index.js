import React from 'react';
import { View, TouchableOpacity, Text, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

import Icon from '../icon';
import { icons } from '../../assets';
import styles, { HEIGHT } from './styles';

function BaseToast({
  leadingIcon,
  trailingIcon,
  text1,
  text2,
  onLeadingIconPress,
  onTrailingIconPress,
  style,
  leadingIconContainerStyle,
  trailingIconContainerStyle,
  leadingIconStyle,
  trailingIconStyle,
  contentContainerStyle,
  text1Style,
  text2Style
}) {
  return (
    <View style={[styles.base, styles.borderLeft, style]}>
      {leadingIcon && (
        <TouchableOpacity
          style={[styles.leadingIconContainer, leadingIconContainerStyle]}
          onPress={onLeadingIconPress}
          activeOpacity={1}>
          <Icon
            style={[styles.leadingIcon, leadingIconStyle]}
            source={leadingIcon}
          />
        </TouchableOpacity>
      )}

      <View style={[styles.contentContainer, contentContainerStyle]}>
        {text1?.length > 0 && (
          <View>
            <Text style={[styles.text1, text1Style]} numberOfLines={1}>
              {text1}
            </Text>
          </View>
        )}
        {text2?.length > 0 && (
          <View>
            <Text style={[styles.text2, text2Style]} numberOfLines={2}>
              {text2}
            </Text>
          </View>
        )}
      </View>

      {trailingIcon && (
        <TouchableOpacity
          style={[styles.trailingIconContainer, trailingIconContainerStyle]}
          onPress={onTrailingIconPress}
          activeOpacity={1}>
          <Icon
            style={[styles.trailingIcon, trailingIconStyle]}
            source={trailingIcon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

BaseToast.HEIGHT = HEIGHT;

BaseToast.propTypes = {
  leadingIcon: Icon.propTypes.source,
  trailingIcon: Icon.propTypes.source,
  text1: PropTypes.string,
  text2: PropTypes.string,
  onTrailingIconPress: PropTypes.func,
  onLeadingIconPress: PropTypes.func,
  style: ViewPropTypes.style,
  leadingIconContainerStyle: ViewPropTypes.style,
  trailingIconContainerStyle: ViewPropTypes.style,
  leadingIconStyle: ViewPropTypes.style,
  trailingIconStyle: ViewPropTypes.style,
  contentContainerStyle: ViewPropTypes.style,
  text1Style: ViewPropTypes.style,
  text2Style: ViewPropTypes.style
};

BaseToast.defaultProps = {
  leadingIcon: undefined,
  trailingIcon: icons.close,
  text1: undefined,
  text2: undefined,
  onLeadingIconPress: undefined,
  onTrailingIconPress: undefined,
  style: undefined,
  leadingIconContainerStyle: undefined,
  trailingIconContainerStyle: undefined,
  leadingIconStyle: undefined,
  trailingIconStyle: undefined,
  contentContainerStyle: undefined,
  text1Style: undefined,
  text2Style: undefined
};

export default BaseToast;
