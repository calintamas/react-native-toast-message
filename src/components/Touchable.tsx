import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { ReactChildren } from '../types';

type TouchableProps = {
  children: ReactChildren;
} & TouchableOpacityProps;

export function Touchable({
  children,
  activeOpacity = 1,
  ...rest
}: TouchableProps) {
  return (
    <TouchableOpacity activeOpacity={activeOpacity} {...rest}>
      {children}
    </TouchableOpacity>
  );
}
