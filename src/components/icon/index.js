import React from 'react';
import { Image, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

function Icon({ source, style }) {
  if (!source) {
    return null;
  }

  return (
    <Image source={source} style={[styles.base, style]} resizeMode='contain' />
  );
}

const imageSourcePropType = PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.shape({
    uri: PropTypes.string
  })
]);

Icon.propTypes = {
  source: imageSourcePropType,
  style: ViewPropTypes.style
};

Icon.defaultProps = {
  source: undefined,
  style: undefined
};

export default Icon;
