import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import Icon from '../icon';
import { icons } from '../../assets';
import styles, { HEIGHT } from './styles';

const BaseToast = (props) => {
  const baseStyle = [
    styles.base,
    styles.borderLeft,
    { borderLeftColor: props.color || undefined }
  ];

  return (
    <View style={baseStyle}>
      <View style={styles.iconContainer}>
        {props.icon ? (
          <Icon style={styles.icon} source={props.icon} />
        ) : (
          <View style={styles.icon} />
        )}
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.body}>
          <View>
            <Text style={styles.text1} numberOfLines={1}>
              {props.text1}
            </Text>
          </View>
          <View>
            <Text style={styles.text2} numberOfLines={2}>
              {props.text2}
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.closeButtonContainer}
        onPress={props.onClose}>
        <Icon style={styles.closeIcon} source={icons.close} />
      </TouchableOpacity>
    </View>
  );
};

BaseToast.HEIGHT = HEIGHT;

export default BaseToast;
