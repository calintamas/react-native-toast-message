import React from 'react';

import BaseToast from './base';
import { icons } from '../assets';
import colors from '../colors';

function SuccessToast(props) {
  return (
    <BaseToast
      style={{ borderLeftColor: colors.mantis }}
      leadingIcon={icons.success}
      {...props}
    />
  );
}

SuccessToast.propTypes = BaseToast.propTypes;

export default SuccessToast;
