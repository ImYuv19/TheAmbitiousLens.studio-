import React from 'react';
import Container from '../components/Container/Container';
import SectionTitle from '../components/SectionTitle/SectionTitle';
import { useCursor } from '../context/CursorContext';
import { useVideoPlayback } from '../context/VideoPlaybackContext';
import { motionProjects, type MotionProject } from '../data/motionGraphics';
import { getYoutubeId } from '../data/shortFormVideos';

// 1. Play-On-Demand Card Component for Motion Graphics Grid
interface MotionCardProps {
  project: MotionProject;
}

const MotionCard: React.FC<MotionCardProps> = React.memo(({ project }) => {
  const { setCursorVariant } = useCursor();
  const { activeVideoId, playVideo } = useVideoPlayback();
  const isPlaying = activeVideoId === `motion-${project.id}`;
  const videoId = getYoutubeId(project.youtubeUrl);
  const thumbnailUrl = videoId ? (project.thumbnail || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`) : '';

  // Show premium fallback card if the YouTube ID cannot be resolved
  if (!videoId) {
    return (
      <div
        className="relative w-full aspect-video rounded-sm overflow-hidden bg-neutral-950/60 border border-neutral-900/40 flex flex-col items-center justify-center p-6 text-center select-none"
        onMouseEnter={() => setCursorVariant('hover')}
        onMouseLeave={() => setCursorVariant('default')}
      >
        <svg className="w-7 h-7 text-neutral-600 mb-3" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <span className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase">Warning</span>
        <p className="text-xs text-neutral-400 font-light mt-1.5">This video can't be embedded.</p>
      </div>
    );
  }

  return (
    <div
      className="relative w-full aspect-video rounded-sm overflow-hidden bg-neutral-950 border border-white/[0.03] transition-[transform,filter,box-shadow,border-color] duration-700 cursor-pointer hover:scale-[1.015] hover:brightness-[1.04] hover:shadow-cinematic-depth group/card"
      onMouseEnter={() => setCursorVariant('play')}
      onMouseLeave={() => setCursorVariant('default')}
    >
      {isPlaying ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={`Motion Graphics Project ${project.id}`}
          style={{ border: 0 }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full object-cover"
        />
      ) : (
        <div
          onClick={() => playVideo(`motion-${project.id}`)}
          className="relative w-full h-full"
        >
          <img
            src={thumbnailUrl}
            alt={`Motion Graphics Project ${project.id}`}
            className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 ease-cinematic-out group-hover/card:scale-[1.02]"
          />
          {/* Centered play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover/card:bg-black/10 transition-colors duration-500">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-neutral-900/90 backdrop-blur-sm border border-white/10 shadow-2xl text-platinum group-hover/card:scale-110 group-hover/card:bg-white group-hover/card:text-obsidian transition-all duration-500 ease-cinematic-out">
              <svg className="w-5 h-5 ml-0.5 fill-current" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>

          {/* Thin outline border overlay */}
          <div className="absolute inset-0 border border-white/[0.04] pointer-events-none rounded-sm" />

          {/* Vignette filter overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/15 pointer-events-none" />
        </div>
      )}
    </div>
  );
});

// 2. Main Motion Graphics Showcase Component
export const MotionGraphics: React.FC = () => {

  return (
    <section
      id="motion-graphics"
      className="bg-obsidian pt-10 pb-10 md:pt-14 md:pb-14"
      aria-label="Motion Graphics Exhibition"
    >
      <Container>
        {/* Minimal Editorial Header */}
        <SectionTitle
          eyebrow="03 // MOTION"
          title="Motion Graphics"
          className="mb-12 md:mb-16"
        />

        {/* 2-Column Square Grid (2x2 Layout on Desktop/Tablet, 1-Column on Mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-6 gap-y-6 md:gap-y-8 max-w-[1400px] mx-auto">
          {motionProjects.map((project) => (
            <MotionCard
              key={project.id}
              project={project}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default MotionGraphics;
