import React, { useState } from 'react';
import { motion } from 'motion/react';
import Container from '../components/Container/Container';
import SectionTitle from '../components/SectionTitle/SectionTitle';
import { useCursor } from '../context/CursorContext';
import { useVideoPlayback } from '../context/VideoPlaybackContext';
import { workVideos } from '../data/workVideos';
import { shortFormVideos, getYoutubeId, type ShortFormVideo } from '../data/shortFormVideos';

const CATEGORIES = [
  "Normal Talking Head",
  "Documentary Edit",
  "Gaming",
  "Clean Professional",
  "Storytelling",
  "Sound Design"
] as const;

// 1. Play-On-Demand Card Component for Short Form Videos Grid
interface ShortFormCardProps {
  video: ShortFormVideo;
}

const ShortFormCard: React.FC<ShortFormCardProps> = React.memo(({ video }) => {
  const { setCursorVariant } = useCursor();
  const { activeVideoId, playVideo } = useVideoPlayback();
  const isPlaying = activeVideoId === video.id;
  const videoId = getYoutubeId(video.youtubeUrl);
  const thumbnailUrl = video.thumbnail || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <div
      className="flex flex-col space-y-3 group/card"
      onMouseEnter={() => setCursorVariant('play')}
      onMouseLeave={() => setCursorVariant('default')}
    >
      {/* 9:16 Aspect Video Container with rounded-sm matching Hero Carousel */}
      <div className="relative w-full aspect-[9/16] rounded-sm overflow-hidden bg-neutral-950 border border-white/[0.03] transition-[transform,border-color,box-shadow] duration-500 ease-cinematic-out hover:-translate-y-1.5 hover:scale-[1.02] hover:border-white/10 hover:shadow-cinematic-depth cursor-pointer">
        {isPlaying ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            onClick={() => playVideo(video.id)}
            className="relative w-full h-full"
          >
            <img
              src={thumbnailUrl}
              alt={video.title}
              className="w-full h-full object-cover select-none pointer-events-none group-hover/card:scale-[1.03] group-hover/card:brightness-[1.05] transition-[transform,filter] duration-700 ease-cinematic-out"
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover/card:bg-black/10 transition-colors duration-500">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-neutral-900/90 backdrop-blur-sm border border-white/10 shadow-lg text-platinum group-hover/card:scale-110 group-hover/card:bg-white group-hover/card:text-obsidian transition-all duration-500 ease-cinematic-out">
                <svg className="w-5 h-5 ml-0.5 fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>

            {/* Duration Tag */}
            <div className="absolute bottom-3 right-3 bg-neutral-950/80 px-2 py-0.5 text-[8px] font-mono tracking-wider text-platinum border border-white/[0.05] rounded-sm select-none">
              {video.duration}
            </div>

            {/* Cinematic Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/15 pointer-events-none" />
          </div>
        )}
      </div>

      {/* Details */}
      <div className="space-y-1">
        <span className="text-[8px] font-mono tracking-[0.2em] text-neutral-500 uppercase">
          {video.category}
        </span>
        <h4 className="text-sm font-display font-light text-platinum/90 leading-snug">
          {video.title}
        </h4>
      </div>
    </div>
  );
});

// 2. Main Tabbed Work Exhibition Component
export const VideoPortfolio: React.FC = () => {
  const { setCursorVariant } = useCursor();
  const { activeVideoId, playVideo, pauseVideo } = useVideoPlayback();
  const [activeCategory, setActiveCategory] = useState<typeof CATEGORIES[number]>("Normal Talking Head");

  // Find the video details corresponding to the selected category
  const activeVideo = workVideos.find(v => v.category === activeCategory) || workVideos[0];
  const activeYoutubeId = getYoutubeId(activeVideo.youtubeUrl);
  const mainThumbnailUrl = activeVideo.thumbnail || `https://img.youtube.com/vi/${activeYoutubeId}/maxresdefault.jpg`;

  const isMainVideoPlaying = activeVideoId === 'work-main';

  return (
    <section
      id="video-portfolio"
      className="bg-obsidian pt-16 pb-16 md:pb-24"
      aria-label="Selected Work Exhibition"
    >
      <Container>
        {/* Section Intro */}
        <SectionTitle
          eyebrow="01 // SELECTED WORK"
          title="My Works"
          subtitle="Stories crafted through editing, rhythm and emotion."
          align="left"
          className="mb-12 md:mb-16"
        />

        {/* Category Tabs Wrapper */}
        <div className="flex justify-start lg:justify-center border-b border-neutral-900 overflow-x-auto no-scrollbar scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0 mb-12 md:mb-16">
          <div className="flex space-x-8 md:space-x-12 pb-px flex-nowrap">
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => {
                    if (activeCategory !== category) {
                      setActiveCategory(category);
                      if (activeVideoId === 'work-main') {
                        pauseVideo();
                      }
                    }
                  }}
                  onMouseEnter={() => setCursorVariant('hover')}
                  onMouseLeave={() => setCursorVariant('default')}
                  className={`relative py-4 text-[10px] font-mono tracking-widest uppercase transition-colors duration-300 whitespace-nowrap outline-none focus-visible:ring-0 ${isActive ? 'text-white font-medium' : 'text-neutral-500 hover:text-neutral-300'
                    }`}
                >
                  {category}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-platinum"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Video Display Player */}
        <div className="w-full max-w-4xl mx-auto aspect-video rounded-sm overflow-hidden bg-neutral-950 border border-white/[0.03] shadow-cinematic-depth relative group/player mb-24">
          {isMainVideoPlaying && activeYoutubeId ? (
            <iframe
              src={`https://www.youtube.com/embed/${activeYoutubeId}?autoplay=1&rel=0&modestbranding=1`}
              title={activeVideo.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full object-cover"
            />
          ) : (
            <div
              onClick={() => {
                if (activeYoutubeId) {
                  playVideo('work-main');
                }
              }}
              onMouseEnter={() => {
                if (activeYoutubeId) {
                  setCursorVariant('play');
                } else {
                  setCursorVariant('hover');
                }
              }}
              onMouseLeave={() => setCursorVariant('default')}
              className={`relative w-full h-full ${activeYoutubeId ? 'cursor-pointer' : 'cursor-default'}`}
            >
              <img
                src={mainThumbnailUrl}
                alt={activeVideo.title}
                className="w-full h-full object-cover select-none pointer-events-none transition-[transform,filter] duration-700 ease-cinematic-out group-hover/player:scale-[1.01] group-hover/player:brightness-[1.04]"
              />
              {/* Dark vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

              {/* Play Overlay Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                {activeYoutubeId ? (
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-neutral-900/90 backdrop-blur-sm border border-white/10 shadow-2xl text-platinum group-hover/player:scale-110 group-hover/player:bg-white group-hover/player:text-obsidian transition-all duration-500 ease-cinematic-out">
                    <svg className="w-6 h-6 ml-0.5 fill-current" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                ) : (
                  <div className="bg-neutral-950/85 backdrop-blur-md px-6 py-4 rounded-sm border border-white/10 shadow-2xl text-center max-w-xs transition-transform duration-500 group-hover/player:scale-[1.02]">
                    <span className="text-[10px] font-mono tracking-[0.2em] text-neutral-400 uppercase block mb-1">
                      Project Showcase
                    </span>
                    <h4 className="text-sm font-display font-light text-white uppercase tracking-wider">
                      Coming Soon
                    </h4>
                  </div>
                )}
              </div>

              {/* Title / Info card overlay at bottom-left */}
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between pointer-events-none">
                <div className="flex flex-col space-y-1">
                  <span className="text-[8px] font-mono tracking-widest text-neutral-400 uppercase">
                    {activeVideo.category}
                  </span>
                  <h3 className="text-sm sm:text-base font-display font-light text-white tracking-wide">
                    {activeVideo.title}
                  </h3>
                </div>
              </div>

              {/* Glass outlines */}
              <div className="absolute inset-0 border border-white/[0.04] pointer-events-none rounded-sm" />
            </div>
          )}
        </div>

        {/* Short Form Videos Subsection Grid */}
        <SectionTitle
          eyebrow="02 // SHORT FORM"
          title="Short Form Videos"
          subtitle="High-impact edits crafted for social media, brands and creators."
          className="mb-12 md:mb-16 mt-32 md:mt-48"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {shortFormVideos.map((video) => (
            <ShortFormCard
              key={video.id}
              video={video}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default VideoPortfolio;
