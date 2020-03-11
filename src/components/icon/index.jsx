import React from 'react';
import { Image } from 'react-native';

import styles from './styles';

const Icon = (props) => {
  const { source, style } = props;
  if (!source) {
    return null;
  }

  return (
    <Image
      source={source}
      style={[styles.base, style]}
      resizeMode='contain'
    />
  );
};

export default Icon;
