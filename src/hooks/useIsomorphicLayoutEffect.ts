import { useEffect, useLayoutEffect } from 'react';

export const useIsomorphicLayoutEffect =
  typeof (globalThis as { window?: unknown }).window !== 'undefined'
    ? useLayoutEffect
    : useEffect;
