import React from 'react';

import { BaseToastProps } from '../types';
import { BaseToast } from './BaseToast';

export function ErrorToast(props: BaseToastProps): React.ReactElement {
  return <BaseToast style={{ borderLeftColor: '#FE6301' }} {...props} />;
}
