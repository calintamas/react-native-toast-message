import React from 'react';

import { BaseToastProps } from '../types';
import { BaseToast } from './BaseToast';

export function ErrorToast(props: BaseToastProps) {
  return <BaseToast style={{ borderLeftColor: '#FE6301' }} {...props} />;
}
