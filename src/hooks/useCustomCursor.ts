import { useState, useEffect } from 'react';

export type CursorVariant = 'default' | 'hover' | 'play' | 'view' | 'drag';

export interface MousePosition {
  x: number;
  y: number;
}

export function useCustomCursor() {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: -100, y: -100 });
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>('default');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  return {
    mousePosition,
    cursorVariant,
    setCursorVariant,
    isVisible
  };
}

export default useCustomCursor;
