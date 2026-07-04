import React from 'react';
import { motion } from 'motion/react';
import Container from '../components/Container/Container';

export const Footer: React.FC = () => {
  return (
    <footer className="relative py-8 bg-transparent select-none overflow-hidden">
      {/* Subtle 1px gradient line divider */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4 w-full"
        >
          {/* Left Side */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <span className="text-sm font-medium text-[#F2F2F2] font-mono tracking-wider">
              The Ambitious Lens
            </span>
            <span className="text-xs text-white/65 font-light mt-1.5">
              Designed • Directed • Developed by <span className="text-[#F2F2F2] font-medium">uvRaj</span>
            </span>
          </div>

          {/* Right Side */}
          <div className="flex flex-col items-center sm:items-end text-center sm:text-right gap-1 pointer-events-none select-none">
            <span className="text-xs text-white/45 font-light">
              © 2026 Yuvraj Singh. All Rights Reserved.
            </span>
            <span className="text-[9px] text-white/[0.04] font-sans font-light mt-0.5 tracking-wider select-none">
              ॥ श्री गणेशाय नमः ॥
            </span>
          </div>
        </motion.div>
      </Container>
    </footer>
  );
};

export default Footer;
