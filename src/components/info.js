import React from 'react';

import BaseToast from './base';
import { icons } from '../assets';
import colors from '../colors';

function InfoToast(props) {
  return (
    <BaseToast
      style={{ borderLeftColor: colors.lightSkyBlue }}
      leadingIcon={icons.info}
      {...props}
    />
  );
}

InfoToast.propTypes = BaseToast.propTypes;

export default InfoToast;
