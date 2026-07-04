import { useState, useEffect } from 'react';
import { ReactLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';

import { CursorProvider } from './context/CursorContext';
import { VideoPlaybackProvider } from './context/VideoPlaybackContext';
import Cursor from './components/Cursor/Cursor';
import Loader from './components/Loader/Loader';
import Navbar from './components/Navbar/Navbar';

// Import sections
import Hero from './sections/Hero';
import About from './sections/About';
import VideoPortfolio from './sections/VideoPortfolio';
import MotionGraphics from './sections/MotionGraphics';
import DesignShowcase from './sections/DesignShowcase';
import Process from './sections/Process';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  // Smoothly locks scroll while loader animation executes
  useEffect(() => {
    if (!isLoaded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isLoaded]);

  return (
    <CursorProvider>
      <VideoPlaybackProvider>
        <ReactLenis root options={{ lerp: 0.08, duration: 1.4 }}>
          <div className="relative min-h-screen bg-cinematic-dark text-platinum antialiased overflow-x-hidden">
            
            {/* Custom Camera Lens Cursor */}
            <Cursor />

            {/* Fullscreen Onboarding Loader */}
            <Loader onComplete={() => setIsLoaded(true)} />

            {/* Floating Glass Navigation Header */}
            <Navbar />

            {/* Portfolio Sections Container */}
            <div
              className={`transition-opacity duration-[1200ms] ease-out ${
                isLoaded ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <main>
                <Hero />
                <VideoPortfolio />
                <MotionGraphics />
                <DesignShowcase />
                <Process />
                <About />
                <Contact />
              </main>
              <Footer />
            </div>
          </div>
        </ReactLenis>
      </VideoPlaybackProvider>
    </CursorProvider>
  );
}

export default App;
