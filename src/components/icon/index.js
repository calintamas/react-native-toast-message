import React from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';

import { stylePropType } from '../../utils/prop-types';
import styles from './styles';

function Icon({ source, style }) {
  if (!source) {
    return null;
  }

  return (
    <Image
      testID='icon'
      source={source}
      style={[styles.base, style]}
      resizeMode='contain'
    />
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
  style: stylePropType
};

Icon.defaultProps = {
  source: undefined,
  style: undefined
};

export default Icon;
