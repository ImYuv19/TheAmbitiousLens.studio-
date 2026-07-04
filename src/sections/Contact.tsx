import React from 'react';
import { motion } from 'motion/react';
import type { Variants } from 'motion/react';
import Container from '../components/Container/Container';
import { EMAIL, LOCATION, INSTAGRAM_URL, LINKEDIN_PROFILE, YOUTUBE_VIDEOS } from '../data/config';

export const Contact: React.FC = () => {
  const GMAIL_URL = "https://mail.google.com/mail/?view=cm&fs=1&to=theambitiouslens@gmail.com&su=New%20Project%20Inquiry&body=Hi%20Yuvraj,%0A%0AI%20came%20across%20your%20portfolio%20and%20would%20love%20to%20discuss%20a%20project.";

  // Motion variants for container and stagger items
  const containerVariants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const itemFadeUp = (duration: number): Variants => ({
    hidden: { opacity: 0, y: 15 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration, 
        ease: [0.22, 1, 0.36, 1] 
      } 
    }
  });

  const infoBlockContainer: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.06
      }
    }
  };

  const infoBlockItem: Variants = {
    hidden: { opacity: 0, y: 10 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1] 
      } 
    }
  };

  // Reusable hover values for details links
  const linkHover = {
    y: -2,
    textShadow: "0 0 8px rgba(255, 255, 255, 0.25)",
    color: "rgb(255, 255, 255)"
  } as const;

  const linkTransition = {
    duration: 0.25,
    ease: "easeOut"
  } as const;


  return (
    <section 
      id="contact" 
      className="relative bg-obsidian pt-16 pb-4 md:pt-20 md:pb-6" 
      aria-label="Contact"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start w-full">
          
          {/* LEFT COLUMN: Cinematic Invitation and elegant info blocks */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="lg:col-span-6 flex flex-col items-start"
          >
            {/* Eyebrow Label */}
            <motion.span 
              variants={itemFadeUp(0.5)}
              className="text-[10px] font-medium font-mono tracking-[0.3em] text-[#D4D4D4] uppercase mb-4"
            >
              07 // CONTACT
            </motion.span>
            
            {/* Heading */}
            <motion.h2 
              variants={itemFadeUp(0.7)}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-neutral-100 leading-tight"
            >
              Let's Talk About Your Next Project.
            </motion.h2>
            
            {/* Supporting Paragraph */}
            <motion.p 
              variants={itemFadeUp(0.9)}
              className="mt-6 text-sm sm:text-base text-neutral-400 font-light leading-relaxed max-w-xl"
            >
              Have a project, an idea, or simply want to connect?<br className="hidden sm:inline" />
              I'd love to hear what you're working on. Whether it's video editing, motion graphics, filmmaking, content creation, or creative strategy, let's build something meaningful together.
            </motion.p>

            {/* Elegant Information Blocks */}
            <motion.div 
              variants={infoBlockContainer}
              className="grid grid-cols-2 gap-x-8 gap-y-10 mt-12 w-full max-w-xl border-t border-white/[0.04] pt-10"
            >
              {/* EMAIL */}
              <motion.div variants={infoBlockItem} className="flex flex-col space-y-2">
                <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest">EMAIL</span>
                <motion.a 
                  href={GMAIL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={linkHover}
                  transition={linkTransition}
                  className="group relative inline-block text-sm sm:text-base text-neutral-300 cursor-pointer font-light self-start"
                >
                  <span>{EMAIL}</span>
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-neutral-200 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                </motion.a>
              </motion.div>


              {/* INSTAGRAM */}
              <motion.div variants={infoBlockItem} className="flex flex-col space-y-2">
                <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest">INSTAGRAM</span>
                <motion.a 
                  href={INSTAGRAM_URL} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={linkHover}
                  transition={linkTransition}
                  className="group relative inline-block text-sm sm:text-base text-neutral-300 cursor-pointer font-light self-start"
                >
                  <span>@theambitiouslens</span>
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-neutral-200 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                </motion.a>
              </motion.div>

              {/* LINKEDIN */}
              <motion.div variants={infoBlockItem} className="flex flex-col space-y-2">
                <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest">LINKEDIN</span>
                <motion.a 
                  href={LINKEDIN_PROFILE} 
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={linkHover}
                  transition={linkTransition}
                  className="group relative inline-block text-sm sm:text-base text-neutral-300 cursor-pointer font-light self-start"
                >
                  <span>Yuvraj Singh</span>
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-neutral-200 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                </motion.a>
              </motion.div>

              {/* LOCATION */}
              <motion.div variants={infoBlockItem} className="flex flex-col space-y-2">
                <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest">LOCATION</span>
                <motion.a 
                  href="https://maps.google.com/?q=Mumbai"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={linkHover}
                  transition={linkTransition}
                  className="group relative inline-block text-sm sm:text-base text-neutral-300 cursor-pointer font-light self-start"
                >
                  <span>{LOCATION}, India</span>
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-neutral-200 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                </motion.a>
              </motion.div>

              {/* YOUTUBE */}
              <motion.div variants={infoBlockItem} className="flex flex-col space-y-2">
                <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest">YOUTUBE</span>
                <motion.a 
                  href={YOUTUBE_VIDEOS} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={linkHover}
                  transition={linkTransition}
                  className="group relative inline-block text-sm sm:text-base text-neutral-300 cursor-pointer font-light self-start"
                >
                  <span>The Ambitious Lens</span>
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-neutral-200 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                </motion.a>
              </motion.div>

              {/* AVAILABILITY */}
              <motion.div variants={infoBlockItem} className="flex flex-col space-y-2 col-span-2">
                <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest">AVAILABILITY</span>
                <motion.a 
                  href={GMAIL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={linkHover}
                  transition={linkTransition}
                  className="group relative inline-block text-sm sm:text-base text-neutral-300 cursor-pointer font-light self-start text-left outline-none"
                >
                  <span>Freelance • Remote • Worldwide</span>
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-neutral-200 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                </motion.a>
              </motion.div>

            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: Premium Contact Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 w-full p-8 md:p-10 rounded-md bg-white/[0.01] backdrop-blur-xl border border-white/[0.04] relative overflow-hidden select-none"
          >
            {/* Subtle card background accent */}
            <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-neutral-500/[0.01] blur-3xl pointer-events-none" />

            <h3 className="font-display text-2xl sm:text-3xl font-light tracking-tight text-neutral-100 leading-none mb-4 uppercase">
              Get In Touch
            </h3>

            <div className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed mb-10 space-y-4">
              <p>Have a project in mind?</p>
              <p>Let's talk.</p>
              <div className="pt-4 border-t border-white/[0.03] mt-4 flex flex-col space-y-1">
                <span className="font-mono text-[8px] text-neutral-500 uppercase tracking-widest">Average response time</span>
                <span className="text-neutral-300 font-mono text-[10px] uppercase tracking-wider">Within 24 hours</span>
              </div>
            </div>

            <div className="flex flex-col space-y-4">
              {/* PRIMARY BUTTON: Instagram */}
              <motion.a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ 
                  y: -2,
                  boxShadow: "0 0 25px rgba(255, 255, 255, 0.05)",
                  borderColor: "rgba(255, 255, 255, 0.18)"
                }}
                whileTap={{ scale: 0.98 }}
                initial={{ y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 24,
                  duration: 0.25
                }}
                className="w-full inline-flex items-center justify-center font-mono tracking-widest text-[10px] sm:text-xs uppercase font-medium bg-platinum text-obsidian border border-platinum hover:bg-neutral-900 hover:text-platinum hover:border-neutral-800 h-12 px-8 rounded-sm cursor-pointer select-none transition-all duration-300 outline-none"
              >
                Chat on Instagram
              </motion.a>

              {/* SECONDARY BUTTON: Email */}
              <motion.a
                href={GMAIL_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ 
                  y: -2,
                  boxShadow: "0 0 20px rgba(255, 255, 255, 0.03)",
                  borderColor: "rgba(255, 255, 255, 0.12)",
                  backgroundColor: "rgba(255, 255, 255, 0.02)"
                }}
                whileTap={{ scale: 0.98 }}
                initial={{ y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 24,
                  duration: 0.25
                }}
                className="w-full inline-flex items-center justify-center font-mono tracking-widest text-[10px] sm:text-xs uppercase font-medium bg-transparent text-neutral-300 border border-white/[0.08] hover:text-white h-12 px-8 rounded-sm cursor-pointer select-none transition-all duration-300 outline-none"
              >
                Send an Email
              </motion.a>
            </div>
          </motion.div>

        </div>


      </Container>
    </section>
  );
};

export default Contact;
