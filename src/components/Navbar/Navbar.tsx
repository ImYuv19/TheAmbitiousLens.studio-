import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLenis } from 'lenis/react';
import { useCursor } from '../../context/CursorContext';
import { Container } from '../Container/Container';
import { Button } from '../Button/Button';
import { INSTAGRAM_URL } from '../../data/config';

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#hero' },
  { label: 'Work', href: '#video-portfolio' },
  { label: 'Motion', href: '#motion-graphics' },
  { label: 'Design', href: '#design-showcase' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const lenis = useLenis();
  const { setCursorVariant } = useCursor();
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // 1. Monitor Scroll depth to add stronger border/shadow states and bottom section highlight
  useEffect(() => {
    let lastScrolled = false;
    const handleScroll = () => {
      const scrolled = window.scrollY > 40;
      if (scrolled !== lastScrolled) {
        setIsScrolled(scrolled);
        lastScrolled = scrolled;
      }

      // Check if we are at the bottom of the scroll container to highlight contact
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60;
      if (isAtBottom) {
        setActiveSection((prev) => (prev !== 'contact' ? 'contact' : prev));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. IntersectionObserver to detect currently active section
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -50% 0px', // check elements in middle of screen
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    NAV_ITEMS.forEach((item) => {
      const el = document.querySelector(item.href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (lenis) {
      lenis.scrollTo(href, { duration: 1.4 });
      // Update fallback if observer delay occurs
      setActiveSection(href.replace('#', ''));
    } else {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        // Update fallback if observer delay occurs
        setActiveSection(href.replace('#', ''));
      }
    }
  };

  const handleCtaClick = () => {
    setMobileMenuOpen(false);
    if (lenis) {
      lenis.scrollTo('#contact', { duration: 1.4 });
    } else {
      const el = document.querySelector('#contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 w-full z-40 transition-all duration-500 py-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
      >
        <Container>
          <div
            className={`w-full flex items-center justify-between px-6 py-4 rounded-sm transition-all duration-300 ${isScrolled
                ? 'glass-panel border-white/[0.06] shadow-cinematic-glass'
                : 'bg-transparent border-transparent'
              }`}
          >
            {/* Logo area */}
            <a
              href="#hero"
              onClick={(e) => handleLinkClick(e, '#hero')}
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
              className="flex flex-col select-none focus-visible:outline-none"
            >
              <span className="font-display font-light text-sm sm:text-base tracking-[0.2em] text-white">
                The Ambitious Lens
              </span>
              <span className="font-mono text-[9px] text-neutral-500 tracking-widest leading-none mt-0.5">
                by uvRaj
              </span>
            </a>

            {/* Desktop Navigation links */}
            <nav className="hidden md:flex items-center gap-8 font-mono text-[10px] tracking-widest text-neutral-400">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.href.replace('#', '');
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    onMouseEnter={() => setCursorVariant('hover')}
                    onMouseLeave={() => setCursorVariant('default')}
                    className={`relative py-1 transition-colors duration-300 hover:text-white uppercase ${isActive ? 'text-white' : ''
                      }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.span
                        className="absolute bottom-0 left-0 w-full h-[1px] bg-white"
                        layoutId="activeIndicator"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Let's Talk & DM Me CTA buttons (Desktop) */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
                className="inline-flex items-center justify-center font-mono tracking-widest text-[9px] uppercase font-medium bg-platinum text-obsidian border border-platinum hover:bg-neutral-900 hover:text-white hover:border-neutral-700 h-9 px-4 rounded-sm active:scale-[0.98] transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400"
              >
                DM Me
              </a>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCtaClick}
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
                className="font-mono tracking-widest text-[9px] uppercase h-9 px-4 border-neutral-800 hover:border-neutral-400 bg-neutral-950/40 text-neutral-300 hover:text-white"
              >
                Let's Talk
              </Button>
            </div>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
              className="flex md:hidden flex-col gap-1.5 justify-center items-center w-8 h-8 rounded-sm hover:bg-neutral-900/40 transition-colors focus:outline-none"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              <span
                className={`h-[1px] w-5 bg-platinum transition-transform duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
                  }`}
              />
              <span
                className={`h-[1px] w-5 bg-platinum transition-opacity duration-200 ${mobileMenuOpen ? 'opacity-0' : ''
                  }`}
              />
              <span
                className={`h-[1px] w-5 bg-platinum transition-transform duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
                  }`}
              />
            </button>
          </div>
        </Container>
      </motion.header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-30 bg-obsidian/98 backdrop-blur-lg md:hidden flex flex-col justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <nav className="flex flex-col items-center gap-8 font-display text-2xl font-light tracking-widest text-neutral-400">
              {NAV_ITEMS.map((item, idx) => {
                const isActive = activeSection === item.href.replace('#', '');
                return (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + idx * 0.05, duration: 0.5 }}
                    className={`hover:text-white transition-colors duration-300 ${isActive ? 'text-white font-normal' : ''
                      }`}
                  >
                    {item.label}
                  </motion.a>
                );
              })}

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + NAV_ITEMS.length * 0.05, duration: 0.5 }}
                className="mt-4 flex flex-col gap-3 w-full max-w-[200px]"
              >
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center font-mono text-xs tracking-widest uppercase py-3 font-medium bg-platinum text-obsidian border border-platinum hover:bg-neutral-900 hover:text-white rounded-sm text-center transition-all duration-300"
                >
                  DM Me
                </a>
                <Button
                  variant="outline"
                  onClick={handleCtaClick}
                  className="w-full font-mono text-xs tracking-widest uppercase py-3 border-neutral-800 hover:border-neutral-400 bg-neutral-950/40 text-neutral-300 hover:text-white"
                >
                  Let's Talk
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
