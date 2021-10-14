import React from 'react';

import { BaseToastProps } from '../types';
import { BaseToast } from './BaseToast';

export function ErrorToast(props: BaseToastProps) {
  return <BaseToast {...props} style={{ borderLeftColor: '#FE6301' }} />;
}
