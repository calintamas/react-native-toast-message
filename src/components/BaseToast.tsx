import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import { BaseToastProps } from '../types';
import { getTestId } from '../utils/test-id';
import { styles } from './BaseToast.styles';

export function BaseToast({
  text1,
  text2,
  onPress,
  activeOpacity = 1,
  style,
  touchableContainerProps,
  contentContainerStyle,
  contentContainerProps,
  text1Style,
  text1NumberOfLines = 1,
  text1Props,
  text2Style,
  text2NumberOfLines = 1,
  text2Props,
  renderLeadingIcon,
  renderTrailingIcon
}: BaseToastProps) {
  return (
    <TouchableOpacity
      testID={getTestId('TouchableContainer')}
      onPress={onPress}
      activeOpacity={activeOpacity}
      style={[styles.base, styles.leadingBorder, style]}
      {...touchableContainerProps}>
      {renderLeadingIcon && renderLeadingIcon()}
      <View
        testID={getTestId('ContentContainer')}
        style={[styles.contentContainer, contentContainerStyle]}
        {...contentContainerProps}>
        {(text1?.length ?? 0) > 0 && (
          <Text
            testID={getTestId('Text1')}
            style={[styles.text1, text1Style]}
            numberOfLines={text1NumberOfLines}
            ellipsizeMode='tail'
            {...text1Props}>
            {text1}
          </Text>
        )}
        {(text2?.length ?? 0) > 0 && (
          <Text
            testID={getTestId('Text2')}
            style={[styles.text2, text2Style]}
            numberOfLines={text2NumberOfLines}
            ellipsizeMode='tail'
            {...text2Props}>
            {text2}
          </Text>
        )}
      </View>
      {renderTrailingIcon && renderTrailingIcon()}
    </TouchableOpacity>
  );
}
