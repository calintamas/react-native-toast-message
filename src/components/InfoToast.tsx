import React from 'react';

import { BaseToastProps } from '../types';
import { BaseToast } from './BaseToast';

export function InfoToast(props: BaseToastProps): React.ReactElement {
  return <BaseToast style={{ borderLeftColor: '#87CEFA' }} {...props} />;
}
