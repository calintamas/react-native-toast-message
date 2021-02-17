import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';

import Icon from '../icon';
import { icons } from '../../assets';
import { stylePropType } from '../../utils/prop-types';
import styles, { HEIGHT } from './styles';

function BaseToast({
  leadingIcon,
  trailingIcon,
  text1,
  text2,
  onPress,
  onLeadingIconPress,
  onTrailingIconPress,
  style,
  leadingIconContainerStyle,
  trailingIconContainerStyle,
  leadingIconStyle,
  trailingIconStyle,
  contentContainerStyle,
  text1Style,
  text2Style,
  activeOpacity,
  text1NumberOfLines,
  text2NumberOfLines
}) {
  return (
    <TouchableOpacity
      testID='rootView'
      style={[styles.base, styles.borderLeft, style]}
      onPress={onPress}
      activeOpacity={onPress ? activeOpacity : 1}>
      {leadingIcon && (
        <TouchableOpacity
          testID='leadingIcon'
          style={[styles.leadingIconContainer, leadingIconContainerStyle]}
          onPress={onLeadingIconPress}
          activeOpacity={onLeadingIconPress ? activeOpacity : 1}>
          <Icon
            style={{ ...styles.leadingIcon, ...leadingIconStyle }}
            source={leadingIcon}
          />
        </TouchableOpacity>
      )}

      <View
        testID='contentContainer'
        style={[styles.contentContainer, contentContainerStyle]}>
        {text1?.length > 0 && (
          <View>
            <Text
              testID='text1'
              style={[styles.text1, text1Style]}
              numberOfLines={text1NumberOfLines}>
              {text1}
            </Text>
          </View>
        )}
        {text2?.length > 0 && (
          <View>
            <Text
              testID='text2'
              style={[styles.text2, text2Style]}
              numberOfLines={text2NumberOfLines}>
              {text2}
            </Text>
          </View>
        )}
      </View>

      {trailingIcon && (
        <TouchableOpacity
          testID='trailingIcon'
          style={[styles.trailingIconContainer, trailingIconContainerStyle]}
          onPress={onTrailingIconPress}
          activeOpacity={onTrailingIconPress ? activeOpacity : 1}>
          <Icon
            style={{ ...styles.trailingIcon, ...trailingIconStyle }}
            source={trailingIcon}
          />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

BaseToast.HEIGHT = HEIGHT;

BaseToast.propTypes = {
  leadingIcon: Icon.propTypes.source,
  trailingIcon: Icon.propTypes.source,
  text1: PropTypes.string,
  text2: PropTypes.string,
  onPress: PropTypes.func,
  onTrailingIconPress: PropTypes.func,
  onLeadingIconPress: PropTypes.func,
  style: stylePropType,
  leadingIconContainerStyle: stylePropType,
  trailingIconContainerStyle: stylePropType,
  leadingIconStyle: stylePropType,
  trailingIconStyle: stylePropType,
  contentContainerStyle: stylePropType,
  text1Style: stylePropType,
  text2Style: stylePropType,
  activeOpacity: PropTypes.number,
  text1NumberOfLines: PropTypes.number,
  text2NumberOfLines: PropTypes.number
};

BaseToast.defaultProps = {
  leadingIcon: undefined,
  trailingIcon: icons.close,
  text1: undefined,
  text2: undefined,
  onPress: undefined,
  onLeadingIconPress: undefined,
  onTrailingIconPress: undefined,
  style: undefined,
  leadingIconContainerStyle: undefined,
  trailingIconContainerStyle: undefined,
  leadingIconStyle: undefined,
  trailingIconStyle: undefined,
  contentContainerStyle: undefined,
  text1Style: undefined,
  text2Style: undefined,
  activeOpacity: 0.8,
  text1NumberOfLines: 1,
  text2NumberOfLines: 2
};

export default BaseToast;
