import React from 'react';

import { useLogger } from '../contexts';

function useTimeout<CbParams>(cb: (params?: CbParams) => void, delayMs = 0) {
  const { log } = useLogger();

  const ref = React.useRef<NodeJS.Timeout>();

  const clearTimer = React.useCallback(() => {
    if (ref.current) {
      log('Clearing timer', ref.current);
      clearTimeout(ref.current);
      ref.current = undefined;
    }
  }, [log]);

  const startTimer = React.useCallback(() => {
    clearTimer();
    ref.current = setTimeout(() => {
      cb();
      log('Running timer', ref.current);
      ref.current = undefined;
    }, delayMs);
    log('Starting timer', ref.current);
  }, [clearTimer, delayMs, log, cb]);

  React.useEffect(() => () => clearTimer(), [clearTimer]);

  return {
    startTimer,
    clearTimer,
    isActive: ref.current !== undefined
  };
}

export { useTimeout };
