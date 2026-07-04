import React from 'react';
import { motion } from 'motion/react';
import type { Variants } from 'motion/react';
import Container from '../components/Container/Container';
import SectionTitle from '../components/SectionTitle/SectionTitle';

export const About: React.FC = () => {
  const staggerItem: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as const
      }
    }
  };

  const pillContainer: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.03
      }
    }
  };

  const pillItem: Variants = {
    hidden: { opacity: 0, y: 8 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as const
      }
    }
  };

  return (
    <section
      id="about"
      className="relative bg-obsidian pt-10 pb-16 md:pt-14 md:pb-20"
      aria-label="About Me"
    >
      <Container>
        {/* Editorial Section Header */}
        <SectionTitle
          eyebrow="06 // ABOUT ME"
          title="Behind The Lens"
          subtitle="Meet the creative mind behind every frame, motion and story."
          className="mb-20 md:mb-24"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

          {/* LEFT COLUMN: Camera Monitor Portrait & Easter Egg (45% / 5 Cols of 12) */}
          <div className="lg:col-span-5 w-full flex flex-col items-center lg:sticky lg:top-28">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="w-full aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] rounded-md overflow-hidden bg-neutral-950 border border-white/[0.04] p-3.5 relative group shadow-cinematic-depth select-none"
            >
              {/* Camera Monitor Overlay HUD */}
              {/* Outer border guide lines */}
              <div className="absolute inset-2 border border-white/[0.02] pointer-events-none rounded-sm" />

              {/* Corner brackets */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/20 pointer-events-none" />
              <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/20 pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/20 pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/20 pointer-events-none" />

              {/* Top HUD bar */}
              <div className="absolute top-6 left-6 right-6 flex justify-between items-center font-mono text-[9px] text-neutral-500/70 select-none z-10 pointer-events-none">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                  <span className="tracking-wider">REC</span>
                </div>
                <div className="tracking-widest">4K 24fps</div>
              </div>

              {/* Bottom HUD bar */}
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center font-mono text-[9px] text-neutral-500/70 select-none z-10 pointer-events-none">
                <span className="tracking-widest">00:06:27:12</span>
                <span className="tracking-wider">STBY</span>
              </div>

              {/* Parallax Image Container */}
              <div className="w-full h-full overflow-hidden rounded-sm relative">
                <motion.img
                  src="/images/yuvraj_portrait.png"
                  alt="Yuvraj Singh Portrait"
                  className="w-full h-full object-cover pointer-events-none select-none transition-transform duration-700 ease-[0.22,1,0.36,1] group-hover:scale-[1.04]"
                  initial={{ scale: 1.06 }}
                  whileInView={{ scale: 1.01 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                />
                {/* Cinematic vignette gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/25 pointer-events-none" />
              </div>
            </motion.div>

            {/* Connecting guideline */}
            <motion.div
              initial={{ opacity: 0, scaleY: 0 }}
              whileInView={{ opacity: 0.12, scaleY: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="w-[1px] h-8 bg-white origin-top"
            />

            {/* Section 5: THE AMBITIOUS LENS (Mysterious Easter Egg Card) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-xl animate-none"
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-full p-6 rounded-md bg-white/[0.01] backdrop-blur-xl border border-white/[0.04] shadow-cinematic-depth relative overflow-hidden group hover:border-cyan-500/20 hover:bg-white/[0.02] hover:shadow-[0_0_25px_rgba(6,182,212,0.04)] transition-[border-color,background-color,box-shadow] duration-700"
              >
                {/* Background Watermark */}
                <div className="absolute inset-0 flex items-center justify-center font-display text-9xl font-black text-white/[0.03] select-none pointer-events-none tracking-widest">
                  TAL
                </div>

                {/* Ambient glow decoration */}
                <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-cyan-500/5 blur-2xl group-hover:bg-cyan-500/10 transition-all duration-700" />

                {/* Header row with Title and tiny pulsing status dot */}
                <div className="flex justify-between items-center mb-3 relative z-10">
                  <h4 className="text-xs sm:text-sm font-display tracking-widest text-neutral-200 uppercase">
                    The Ambitious Lens
                  </h4>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-500/60 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed mb-6 relative z-10">
                  Some ideas are meant to grow quietly before the world notices them. This is one of them. A long-term vision where creativity, storytelling, motion and technology eventually converge.
                </p>

                {/* Spaced bottom labels */}
                <div className="flex justify-between items-center text-[9px] font-mono text-neutral-500 uppercase tracking-widest border-t border-white/[0.03] pt-4 mt-6 relative z-10">
                  <span className="hover:text-neutral-400 transition-colors duration-300">Chapter One</span>
                  <span className="flex items-center gap-1.5 text-cyan-500/80">
                    <span className="w-1 h-1 rounded-full bg-cyan-500/80 animate-pulse" />
                    <span>In Progress</span>
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>


          {/* RIGHT COLUMN: Spaced Editorial Biography (55% / 7 Cols of 12) */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.12
                }
              }
            }}
            className="lg:col-span-7 flex flex-col space-y-12 text-left items-start justify-center pt-2 lg:pt-0"
          >
            {/* Section 1: WHO I AM */}
            <motion.div variants={staggerItem} className="flex flex-col space-y-4 w-full">
              <span className="text-[10px] font-mono tracking-[0.25em] text-neutral-500 uppercase">
                Who I Am
              </span>
              <h3 className="text-xl sm:text-2xl font-light tracking-wide text-neutral-200">
                AKA uvRaj (uv)
              </h3>
              <div className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed space-y-4 max-w-xl">
                <p>
                  Hi, I'm Yuvraj.
                </p>
                <p>
                  A Video Editor, Motion Graphics Designer and Filmmaker passionate about transforming ideas into cinematic visual experiences.
                </p>
                <p>
                  I believe editing is not simply arranging clips. It is rhythm. Emotion. Timing. Storytelling. Every frame should communicate something.
                </p>
              </div>
            </motion.div>

            {/* Section 2: PRIMARY DISCIPLINES */}
            <motion.div variants={staggerItem} className="flex flex-col space-y-4 w-full">
              <span className="text-[10px] font-medium font-mono tracking-[0.3em] text-[#D4D4D4] uppercase">
                Primary Disciplines
              </span>
              <motion.div variants={pillContainer} className="flex flex-wrap gap-2 max-w-xl">
                {[
                  "Video Editing",
                  "Motion Graphics",
                  "Visual Effects",
                  "Graphic Design",
                  "Color Grading",
                  "Creative Storytelling",
                  "Filmmaking",
                  "YouTube Editing",
                  "Short Form Content"
                ].map((discipline, idx) => (
                  <motion.span
                    key={idx}
                    variants={pillItem}
                    className="px-3.5 py-1.5 text-xs font-light text-neutral-300 bg-neutral-900/40 border border-white/[0.05] rounded-full tracking-wide hover:border-white/10 hover:bg-neutral-900/60 transition-[border-color,background-color] duration-300 cursor-default"
                  >
                    {discipline}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>

            {/* Section 3: COMPLEMENTARY SKILLS */}
            <motion.div variants={staggerItem} className="flex flex-col space-y-4 w-full">
              <span className="text-[10px] font-medium font-mono tracking-[0.3em] text-[#D4D4D4] uppercase">
                Complementary Skills
              </span>
              <motion.div variants={pillContainer} className="flex flex-wrap gap-2 max-w-xl">
                {[
                  "Social Media Marketing",
                  "Content Strategy",
                  "Creative Scripting",
                  "AI-Assisted Content Writing",
                  "AI-Assisted Design",
                  "AI-Assisted Video Production",
                  "Content Creation",
                  "Creative Research",
                  "Creative Direction"
                ].map((skill, idx) => (
                  <motion.span
                    key={idx}
                    variants={pillItem}
                    className="px-3.5 py-1.5 text-xs font-light text-neutral-400 bg-white/[0.02] backdrop-blur-md border border-white/[0.03] rounded-full hover:bg-white/[0.05] hover:text-neutral-200 transition-[border-color,background-color,color] duration-300 tracking-wide cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>

            {/* Section 4: CURRENTLY */}
            <motion.div variants={staggerItem} className="pt-2 border-t border-white/[0.04] w-full max-w-xl">
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-700 mt-2 flex-shrink-0" />
                <p className="text-xs text-neutral-500 font-light leading-relaxed">
                  <span className="text-neutral-400 font-mono tracking-wide uppercase text-[10px] block mb-0.5">Currently</span>
                  B.Tech Computer Science Engineering Student // Learning AI, Creative Technology & Storytelling. Building the intersection between technology and creativity.
                </p>
              </div>
            </motion.div>

          </motion.div>

        </div>
      </Container>
    </section>
  );
};

export default About;
