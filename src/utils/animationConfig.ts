import {
  ToastAnimationConfig,
  ToastSingleAnimationConfig,
  ToastSpringAnimationConfig
} from '../types';

export const DEFAULT_ANIMATION_CONFIG: ToastSpringAnimationConfig = {
  type: 'spring',
  friction: 8
};

export type AnimationPhase = 'enter' | 'exit';

export function resolveAnimationConfig(
  config: ToastAnimationConfig | undefined,
  phase: AnimationPhase
): ToastSingleAnimationConfig {
  if (!config) {
    return DEFAULT_ANIMATION_CONFIG;
  }
  if ('type' in config) {
    return config;
  }
  return config[phase] ?? DEFAULT_ANIMATION_CONFIG;
}
