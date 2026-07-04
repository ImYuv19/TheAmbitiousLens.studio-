import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Container from '../components/Container/Container';
import SectionTitle from '../components/SectionTitle/SectionTitle';
import { useCursor } from '../context/CursorContext';
import { designProjects } from '../data/designProjects';

export const DesignShowcase: React.FC = () => {
  const { setCursorVariant } = useCursor();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Lock body/Lenis scroll when lightbox is active
  useEffect(() => {
    if (activeIndex !== null) {
      document.documentElement.classList.add('lenis-stopped');
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.classList.remove('lenis-stopped');
      document.body.style.overflow = '';
    }
    return () => {
      document.documentElement.classList.remove('lenis-stopped');
      document.body.style.overflow = '';
    };
  }, [activeIndex]);

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (activeIndex === null) return;
    setActiveIndex((prev) => (prev !== null ? (prev - 1 + designProjects.length) % designProjects.length : null));
  }, [activeIndex]);

  const handleNext = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (activeIndex === null) return;
    setActiveIndex((prev) => (prev !== null ? (prev + 1) % designProjects.length : null));
  }, [activeIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeIndex === null) return;
      if (e.key === 'Escape') {
        setActiveIndex(null);
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, handlePrev, handleNext]);


  const activeProject = activeIndex !== null ? designProjects[activeIndex] : null;

  return (
    <section
      id="design-showcase"
      className="bg-obsidian pt-10 pb-12 md:pt-14 md:pb-16"
      aria-label="Design Portfolio"
    >
      <Container>
        {/* Minimal Editorial Header without description */}
        <SectionTitle
          eyebrow="04 // DESIGN"
          title="Creative Designs"
          className="mb-12 md:mb-16"
        />

        {/* 2-Column Responsive Grid matching other cinematic sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-6 gap-y-6 md:gap-y-8 max-w-[1400px] mx-auto">
          {designProjects.map((project, index) => (
            <div
              key={project.id}
              onClick={() => setActiveIndex(index)}
              onMouseEnter={() => setCursorVariant('view')}
              onMouseLeave={() => setCursorVariant('default')}
              className="relative w-full aspect-[3/2] rounded-sm overflow-hidden bg-neutral-950 border border-white/[0.03] transition-[transform,filter,box-shadow,border-color] duration-700 ease-cinematic-out cursor-pointer hover:-translate-y-1.5 hover:scale-[1.02] hover:brightness-[1.06] hover:shadow-cinematic-depth group/card"
            >
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 ease-cinematic-out group-hover/card:scale-[1.03]"
              />
              {/* Cinematic subtle vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />
              {/* Premium outline border overlay */}
              <div className="absolute inset-0 border border-white/[0.04] pointer-events-none rounded-sm" />
            </div>
          ))}
        </div>
      </Container>

      {/* Fullscreen Premium Lightbox */}
      <AnimatePresence>
        {activeIndex !== null && activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setActiveIndex(null)}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-obsidian/95 backdrop-blur-md select-none"
          >
            {/* Close button top right */}
            <button
              onClick={() => setActiveIndex(null)}
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
              className="fixed top-6 right-6 w-12 h-12 rounded-full bg-neutral-900/50 backdrop-blur-sm border border-white/10 hover:border-white/30 text-neutral-400 hover:text-white transition-all duration-300 flex items-center justify-center z-[10000] hover:scale-105"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left navigation arrow */}
            <button
              onClick={handlePrev}
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
              className="fixed left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-neutral-900/50 backdrop-blur-sm border border-white/10 hover:border-white/30 text-neutral-400 hover:text-white transition-all duration-300 flex items-center justify-center z-[10000] hover:scale-105 md:flex hidden animate-fade-in"
              aria-label="Previous design"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Right navigation arrow */}
            <button
              onClick={handleNext}
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
              className="fixed right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-neutral-900/50 backdrop-blur-sm border border-white/10 hover:border-white/30 text-neutral-400 hover:text-white transition-all duration-300 flex items-center justify-center z-[10000] hover:scale-105 md:flex hidden animate-fade-in"
              aria-label="Next design"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Image Centered Container */}
            <div
              className="relative max-w-[90vw] max-h-[75vh] md:max-w-[80vw] md:max-h-[80vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking the image container
            >
              <motion.img
                key={activeProject.id}
                src={activeProject.image}
                alt={activeProject.title}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-full max-h-[75vh] md:max-h-[80vh] object-contain rounded-sm shadow-2xl border border-white/[0.03]"
              />
            </div>

            {/* Title Metadata Caption */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="mt-8 flex flex-col items-center space-y-2 px-6 text-center select-none"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-[10px] font-mono tracking-[0.25em] text-neutral-500 uppercase">
                {String(activeIndex + 1).padStart(2, '0')} / {String(designProjects.length).padStart(2, '0')}
              </span>
              <h3 className="text-sm md:text-base font-display font-light text-platinum/90 tracking-wide uppercase">
                {activeProject.title}
              </h3>
            </motion.div>

            {/* Mobile Touch Navigation controls */}
            <div className="flex space-x-6 mt-6 md:hidden z-[10000]" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full bg-neutral-900/50 backdrop-blur-sm border border-white/10 text-neutral-400 flex items-center justify-center"
                aria-label="Previous"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-neutral-900/50 backdrop-blur-sm border border-white/10 text-neutral-400 flex items-center justify-center"
                aria-label="Next"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default DesignShowcase;
