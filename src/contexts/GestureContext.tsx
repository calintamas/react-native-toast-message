import React from 'react';

import { ReactChildren } from '../types';

export type GestureContextType = {
  panning: React.MutableRefObject<boolean>;
};

export type GestureProviderProps = {
  children: ReactChildren;
};

const GestureContext = React.createContext<GestureContextType>({
  panning: { current: false }
});

function GestureProvider({ children }: GestureProviderProps) {
  const panning = React.useRef(false);
  const value = { panning };
  return (
    <GestureContext.Provider value={value}>{children}</GestureContext.Provider>
  );
}

function useGesture() {
  const ctx = React.useContext(GestureContext);
  return ctx;
}

export { GestureProvider, useGesture };
