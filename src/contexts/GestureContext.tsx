import React from 'react';

import { ReactChildren } from '../types';

export type GestureContextType = {
  panning: React.MutableRefObject<boolean>;
};

export type GestureProviderProps = {
  children: ReactChildren;
  panning?: boolean;
};

const GestureContext = React.createContext<GestureContextType>({
  panning: { current: false }
});

function GestureProvider({ children, panning = false }: GestureProviderProps) {
  const panningRef = React.useRef(panning);
  const value = { panning: panningRef };
  return (
    <GestureContext.Provider value={value}>{children}</GestureContext.Provider>
  );
}

function useGesture() {
  const ctx = React.useContext(GestureContext);
  return ctx;
}

export { GestureProvider, useGesture };
