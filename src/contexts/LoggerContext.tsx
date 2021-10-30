import React from 'react';

import { ReactChildren } from '../types';
import { noop } from '../utils/func';

export type LoggerContextType = {
  log: (...args: unknown[]) => void;
};

export type LoggerProviderProps = {
  children: ReactChildren;
  enableLogs?: boolean;
};

const LoggerContext = React.createContext<LoggerContextType>({
  log: noop
});

function LoggerProvider({ children, enableLogs = false }: LoggerProviderProps) {
  const log = React.useCallback(
    (...args: unknown[]) => {
      if (enableLogs) {
        // eslint-disable-next-line no-console
        console.log('Toast:', ...args);
      }
    },
    [enableLogs]
  );

  const value = {
    log
  };

  return (
    <LoggerContext.Provider value={value}>{children}</LoggerContext.Provider>
  );
}

function useLogger() {
  const ctx = React.useContext(LoggerContext);
  return ctx;
}

export { LoggerProvider, useLogger };
