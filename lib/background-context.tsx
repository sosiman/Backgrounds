'use client'
import { createContext, useState, ReactNode, use } from 'react';

interface BackgroundContextType {
  props: Record<string, any>;
  setProps: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  updateProp: (key: string, value: any) => void;
}

const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined);

export function BackgroundProvider({ children }: { children: ReactNode }) {
  const [props, setProps] = useState<Record<string, any>>({});
  const updateProp = (key: string, value: any) => {
    setProps(prev => ({ ...prev, [key]: value }));
  };

  return (
    <BackgroundContext value={{ props, setProps, updateProp }}>
      {children}
    </BackgroundContext>
  );
}

export function useBackgroundProps() {
  const context = use(BackgroundContext);
  if (!context) {
    throw new Error('useBackgroundProps must be used within BackgroundProvider');
  }
  return context;
}
