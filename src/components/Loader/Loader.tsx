import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoaderProps {
  onComplete: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Cinematic timing: 1.8 seconds before triggering slide/fade exit
    const timer = setTimeout(() => {
      setShow(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {show && (
        <motion.div
          className="fixed inset-0 bg-obsidian z-[99999] flex flex-col items-center justify-center pointer-events-auto"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="text-center flex flex-col items-center px-4">
            {/* Elegant letter-spaced brand entry */}
            <motion.h1
              className="text-lg sm:text-2xl font-display font-light tracking-[0.35em] text-platinum/90 select-none"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              The Ambitious Lens
            </motion.h1>
            
            {/* Cinematic divider animation */}
            <motion.div
              className="h-[1px] bg-platinum/20 my-4"
              initial={{ width: 0 }}
              animate={{ width: 60 }}
              transition={{ delay: 0.3, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            />

            <motion.p
              className="text-[10px] font-mono tracking-[0.25em] text-neutral-500 select-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              by uvRaj
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
