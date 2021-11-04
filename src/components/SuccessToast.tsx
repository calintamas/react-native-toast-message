import React from 'react';

import { BaseToastProps } from '../types';
import { BaseToast } from './BaseToast';

export function SuccessToast(props: BaseToastProps) {
  return <BaseToast style={{ borderLeftColor: '#69C779' }} {...props} />;
}
