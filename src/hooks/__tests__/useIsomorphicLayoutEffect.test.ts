/* eslint-env jest */

type LoadedEffects = {
  effect: typeof import('react').useEffect;
  isomorphicLayoutEffect: typeof import('react').useLayoutEffect;
  layoutEffect: typeof import('react').useLayoutEffect;
};

const originalWindow = Object.getOwnPropertyDescriptor(globalThis, 'window');

const loadEffects = (): LoadedEffects => {
  let effects: LoadedEffects | undefined;

  jest.isolateModules(() => {
    const React = jest.requireActual<typeof import('react')>('react');
    const { useIsomorphicLayoutEffect } = jest.requireActual<
      typeof import('../useIsomorphicLayoutEffect')
    >('../useIsomorphicLayoutEffect');

    effects = {
      effect: React.useEffect,
      isomorphicLayoutEffect: useIsomorphicLayoutEffect,
      layoutEffect: React.useLayoutEffect
    };
  });

  return effects as LoadedEffects;
};

afterEach(() => {
  if (originalWindow) {
    Object.defineProperty(globalThis, 'window', originalWindow);
  } else {
    Reflect.deleteProperty(globalThis, 'window');
  }
});

describe('test useIsomorphicLayoutEffect hook', () => {
  it('uses useEffect during server rendering', () => {
    Reflect.deleteProperty(globalThis, 'window');

    const { effect, isomorphicLayoutEffect } = loadEffects();

    expect(isomorphicLayoutEffect).toBe(effect);
  });

  it('uses useLayoutEffect in browser environments', () => {
    Object.defineProperty(globalThis, 'window', {
      configurable: true,
      value: {}
    });

    const { isomorphicLayoutEffect, layoutEffect } = loadEffects();

    expect(isomorphicLayoutEffect).toBe(layoutEffect);
  });
});
