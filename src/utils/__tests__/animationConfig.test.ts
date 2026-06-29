/* eslint-env jest */

import {
  DEFAULT_ANIMATION_CONFIG,
  resolveAnimationConfig
} from '../animationConfig';

describe('test resolveAnimationConfig function', () => {
  it('returns the default config when none is provided', () => {
    expect(resolveAnimationConfig(undefined, 'enter')).toEqual(
      DEFAULT_ANIMATION_CONFIG
    );
    expect(resolveAnimationConfig(undefined, 'exit')).toEqual(
      DEFAULT_ANIMATION_CONFIG
    );
  });

  it('returns a single config for both phases when typed', () => {
    const config = { type: 'timing', duration: 200 } as const;
    expect(resolveAnimationConfig(config, 'enter')).toEqual(config);
    expect(resolveAnimationConfig(config, 'exit')).toEqual(config);
  });

  it('returns the enter/exit branch when configured separately', () => {
    const enter = { type: 'timing', duration: 100 } as const;
    const exit = { type: 'spring', friction: 12 } as const;

    expect(resolveAnimationConfig({ enter, exit }, 'enter')).toEqual(enter);
    expect(resolveAnimationConfig({ enter, exit }, 'exit')).toEqual(exit);
  });

  it('falls back to the default when only one phase is configured', () => {
    const enter = { type: 'timing', duration: 100 } as const;
    expect(resolveAnimationConfig({ enter }, 'exit')).toEqual(
      DEFAULT_ANIMATION_CONFIG
    );
  });
});
