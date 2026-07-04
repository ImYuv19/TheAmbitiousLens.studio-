import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { useCursor } from '../../context/CursorContext';

export const Cursor: React.FC = () => {
  const { cursorVariant } = useCursor();
  const [isFinePointer, setIsFinePointer] = useState(false);
  const [isOverText, setIsOverText] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isSelectingText, setIsSelectingText] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for liquid movement
  const springConfig = { damping: 30, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // 1. Detect if the device has a fine pointer (mouse/trackpad)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsFinePointer(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setIsFinePointer(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  // 2. Track pointer position and clicks only if fine pointer is available
  useEffect(() => {
    if (!isFinePointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    let isMouseDownInternal = false;

    const handleMouseDown = () => {
      isMouseDownInternal = true;
      setIsClicked(true);
    };

    const handleMouseUp = () => {
      isMouseDownInternal = false;
      setIsClicked(false);
      setIsSelectingText(false);
    };

    const handleSelectionChange = () => {
      if (isMouseDownInternal) {
        const selection = window.getSelection();
        if (selection && selection.toString().length > 0) {
          setIsSelectingText(true);
        } else {
          setIsSelectingText(false);
        }
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const computedCursor = window.getComputedStyle(target).cursor;
      const isTextInput =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.hasAttribute('contenteditable');

      if (computedCursor === 'text' || isTextInput) {
        setIsOverText(true);
      } else {
        setIsOverText(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('selectionchange', handleSelectionChange);
    document.documentElement.classList.add('custom-cursor-active');

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('selectionchange', handleSelectionChange);
      document.documentElement.classList.remove('custom-cursor-active');
    };
  }, [isFinePointer, mouseX, mouseY]);

  if (!isFinePointer) return null;

  // Define sizes & visual tokens for different cursor variants
  const variants = {
    default: {
      width: 32,
      height: 32,
      backgroundColor: 'rgba(244, 244, 247, 0)',
      borderColor: 'rgba(244, 244, 247, 0.4)',
    },
    hover: {
      width: 48,
      height: 48,
      backgroundColor: 'rgba(244, 244, 247, 0.05)',
      borderColor: 'rgba(244, 244, 247, 0.9)',
    },
    play: {
      width: 72,
      height: 72,
      backgroundColor: 'rgba(244, 244, 247, 0.95)',
      borderColor: '#f4f4f7',
    },
    view: {
      width: 72,
      height: 72,
      backgroundColor: 'rgba(244, 244, 247, 0.95)',
      borderColor: '#f4f4f7',
    },
    drag: {
      width: 72,
      height: 72,
      backgroundColor: 'rgba(244, 244, 247, 0.95)',
      borderColor: '#f4f4f7',
    }
  };

  const currentVariant = variants[cursorVariant] || variants.default;

  // Selection override style: enlarge the cursor ring by 12% and soften its border
  const selectionOverride = isSelectingText ? {
    width: currentVariant.width * 1.12,
    height: currentVariant.height * 1.12,
    borderColor: 'rgba(244, 244, 247, 0.15)', // soften the border
  } : {};

  const cursorStyle = {
    ...currentVariant,
    ...selectionOverride,
  };

  return (
    <>
      {/* 1. Main outer animated ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border pointer-events-none z-[10000] flex items-center justify-center overflow-hidden"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          ...cursorStyle,
          opacity: isOverText && !isSelectingText ? 0 : 1,
          scale: isClicked && !isSelectingText ? 0.9 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 250,
          mass: 0.6
        }}
      >
        {/* Render text inside context variant buttons */}
        {cursorVariant === 'play' && (
          <span className="text-[10px] font-mono font-bold tracking-widest text-obsidian uppercase select-none">
            PLAY
          </span>
        )}
        {cursorVariant === 'view' && (
          <span className="text-[10px] font-mono font-bold tracking-widest text-obsidian uppercase select-none">
            VIEW
          </span>
        )}
        {cursorVariant === 'drag' && (
          <span className="text-[10px] font-mono font-bold tracking-widest text-obsidian uppercase select-none">
            DRAG
          </span>
        )}
      </motion.div>

      {/* 2. Central pinpoint dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-platinum rounded-full pointer-events-none z-[10001]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: isOverText || cursorVariant === 'play' || cursorVariant === 'drag' || cursorVariant === 'view' ? 0 : 0.8,
          scale: isClicked ? 0.7 : 1,
        }}
        transition={{ duration: 0.1 }}
      />
    </>
  );
};

export default Cursor;
