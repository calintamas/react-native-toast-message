import React from 'react';

import BaseToast from './base';
import { icons } from '../assets';
import colors from '../colors';

function ErrorToast(props) {
  return (
    <BaseToast
      {...props}
      style={{ borderLeftColor: colors.blazeOrange }}
      leadingIcon={icons.error}
    />
  );
}

ErrorToast.propTypes = BaseToast.propTypes;

export default ErrorToast;
