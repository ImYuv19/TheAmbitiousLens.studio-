import { createContext, useContext, useState, useMemo, type ReactNode } from 'react';

export type CursorVariant = 'default' | 'hover' | 'play' | 'view' | 'drag';

interface CursorContextType {
  cursorVariant: CursorVariant;
  setCursorVariant: (variant: CursorVariant) => void;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export const CursorProvider = ({ children }: { children: ReactNode }) => {
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>('default');

  const value = useMemo(() => ({ cursorVariant, setCursorVariant }), [cursorVariant]);

  return (
    <CursorContext.Provider value={value}>
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = () => {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
};
