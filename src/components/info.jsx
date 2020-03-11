import React from 'react';

import BaseToast from './base';
import { icons } from '../assets';
import colors from '../colors';

const InfoToast = (props) => {
  return <BaseToast {...props} color={colors.lightSkyBlue} icon={icons.info} />;
};

export default InfoToast;
