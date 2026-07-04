import { motion } from 'motion/react';
import Container from '../components/Container/Container';
import Button from '../components/Button/Button';
import HeroCarousel from '../components/HeroCarousel/HeroCarousel';
import { useCursor } from '../context/CursorContext';
import { INSTAGRAM_URL } from '../data/config';

export const Hero: React.FC = () => {
  const { setCursorVariant } = useCursor();

  const handleCtaClick = () => {
    const el = document.querySelector('#video-portfolio');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Bezier cinematic ease out timing (no bounce, clean cut deceleration)
  const easeCurve = [0.16, 1, 0.3, 1] as const;

  return (
    <motion.section
      id="hero"
      aria-label="Welcome and Portfolio Intro"
      className="relative min-h-[100svh] flex flex-col justify-center items-center pt-24 pb-12 overflow-hidden bg-obsidian"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 1.0, ease: easeCurve }}
    >
      <Container className="flex flex-col items-center justify-center space-y-5 md:space-y-7 z-10 w-full">
        
        {/* Branding & Titles Area */}
        <div className="text-center flex flex-col items-center w-full max-w-5xl lg:max-w-none">
          {/* Main Name Header */}
          <div className="overflow-hidden mb-1 w-full flex justify-center">
            <motion.h1
              className="text-5xl md:text-[clamp(3.5rem,7.5vw,7.5rem)] font-display font-light uppercase tracking-[0.18em] text-white leading-none md:whitespace-nowrap w-full"
              initial={{ y: 80, filter: 'blur(8px)', opacity: 0 }}
              animate={{ y: 0, filter: 'blur(0px)', opacity: 1 }}
              transition={{ delay: 0.5, duration: 1.4, ease: easeCurve }}
            >
              YUVRAJ SINGH
            </motion.h1>
          </div>

          {/* Sub-Branding */}
          <motion.div
            className="flex flex-col items-center mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1.2, ease: easeCurve }}
          >
            <h2 className="text-sm sm:text-base md:text-lg font-display font-light tracking-[0.25em] text-platinum/90">
              The Ambitious Lens
            </h2>
            <span className="font-mono text-[9px] sm:text-[10px] text-neutral-500 tracking-[0.25em] leading-none mt-1.5">
              by uvRaj
            </span>
          </motion.div>

          {/* Core Roles Title */}
          <motion.h3
            className="mt-6 text-xs sm:text-sm md:text-base font-sans font-medium tracking-[0.2em] text-platinum/95 uppercase text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 1.0, ease: easeCurve }}
          >
            Video Editor & Motion Graphics Designer
          </motion.h3>

          {/* Supporting Tagline */}
          <motion.p
            className="mt-3 text-[10px] sm:text-xs md:text-sm font-sans font-light tracking-widest text-neutral-500 text-center max-w-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 1.0, ease: easeCurve }}
          >
            Crafting Stories Through Motion & Emotion
          </motion.p>
        </div>

        {/* Video Portfolio Carousel */}
        <motion.div
          className="w-full my-2 md:my-3"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.4, duration: 1.2, ease: easeCurve }}
        >
          <HeroCarousel />
        </motion.div>

        {/* Call To Action Buttons */}
        <motion.div
          className="flex flex-col items-center gap-4 text-center w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1.0, ease: easeCurve }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-[280px] sm:max-w-none">
            <Button
              variant="primary"
              onClick={handleCtaClick}
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
              className="w-full sm:w-auto font-mono tracking-widest text-[10px] uppercase font-medium bg-platinum text-obsidian border border-platinum hover:bg-neutral-900 hover:text-white hover:border-neutral-700 h-11 px-8 rounded-sm active:scale-[0.98] transition-all duration-300"
            >
              Explore Work
            </Button>
            
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
              className="w-full sm:w-auto inline-flex items-center justify-center font-mono tracking-widest text-[10px] uppercase font-medium border border-neutral-700 bg-neutral-950/40 text-neutral-300 hover:border-neutral-400 hover:text-white h-11 px-8 rounded-sm active:scale-[0.98] transition-all duration-300"
            >
              DM Me
            </a>
          </div>
          
          <span 
            className="font-mono text-[9px] tracking-[0.2em] text-neutral-500 uppercase select-none cursor-pointer hover:text-neutral-300 transition-colors duration-300 mt-2"
            onClick={handleCtaClick}
          >
            Scroll to discover
          </span>
        </motion.div>

      </Container>
      
      {/* Existing background layout details */}
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none opacity-20" />
    </motion.section>
  );
};

export default Hero;
