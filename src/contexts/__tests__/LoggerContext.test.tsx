/* eslint-env jest */

import { renderHook } from '@testing-library/react-hooks';
import React from 'react';

import { ReactChildren } from '../../types';
import { LoggerProvider, useLogger } from '../LoggerContext';
import { LoggerProviderProps } from '..';

const setup = (props?: Omit<LoggerProviderProps, 'children'>) => {
  const wrapper = ({ children }: { children: ReactChildren }) => (
    <LoggerProvider {...props}>{children}</LoggerProvider>
  );
  const utils = renderHook(useLogger, {
    wrapper
  });
  return {
    ...utils
  };
};

describe('test Logger context', () => {
  const spy = jest.spyOn(console, 'log');

  it('injects the log function', () => {
    const { result } = setup();
    expect(result.current.log).toBeDefined();
  });

  it('it calls console.log when enableLogs: true', () => {
    const { result } = setup({
      enableLogs: true
    });
    const args = ['answer', 'is', 42];
    result.current.log(...args);
    expect(spy).toHaveBeenCalledWith('Toast:', ...args);
  });

  it('it does not call console.log when enableLogs: false', () => {
    const { result } = setup({
      enableLogs: false
    });
    result.current.log('test');
    expect(spy).not.toHaveBeenCalledWith('test');
  });
});
