import React from 'react';

import { BaseToastProps } from '../types';
import { BaseToast } from './BaseToast';

export function InfoToast(props: BaseToastProps) {
  return <BaseToast style={{ borderLeftColor: '#87CEFA' }} {...props} />;
}
