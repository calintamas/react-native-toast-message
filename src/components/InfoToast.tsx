import React from 'react';

import { BaseToastProps } from '../types';
import { BaseToast } from './BaseToast';

export function InfoToast(props: BaseToastProps) {
  return <BaseToast {...props} style={{ borderLeftColor: '#87CEFA' }} />;
}
