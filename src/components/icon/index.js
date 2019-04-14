import React from 'react'
import { Image } from 'react-native'

import styles from './styles'

const Icon = (props) => {
  if (!props.source) {
    return null
  }

  return (
    <Image
      source={props.source}
      style={[styles.base, props.style]}
      resizeMode='contain' />
  )
};

export default Icon
