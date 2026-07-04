import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useAnimationFrame } from 'motion/react';
import { useCursor } from '../../context/CursorContext';
import { heroVideos, type HeroVideo } from '../../data/heroVideos';

interface HeroVideoCardProps {
  item: HeroVideo;
  cardWidth: number;
}

const HeroVideoCard: React.FC<HeroVideoCardProps> = ({ item, cardWidth }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [videoInView, setVideoInView] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVideoInView(entry.isIntersecting);
      },
      { rootMargin: '300px' }
    );

    observer.observe(card);
    return () => observer.unobserve(card);
  }, []);

  const handlePlay = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    if (video.dataset.playheadRandomized) return;
    video.dataset.playheadRandomized = 'true';
    if (video.duration) {
      video.currentTime = Math.random() * video.duration;
    } else {
      video.currentTime = Math.random() * 5; // fallback
    }
  };

  return (
    <div
      ref={cardRef}
      className="relative select-none flex-shrink-0"
      style={{ width: `${cardWidth}px` }}
    >
      <div className="w-full aspect-[16/10] rounded-sm overflow-hidden bg-neutral-900 border border-white/[0.03] transition-[transform,border-color,box-shadow] duration-500 hover:scale-[1.04] hover:border-white/10 hover:shadow-cinematic-depth">
        {videoInView ? (
          <video
            src={item.src}
            loop
            muted
            playsInline
            autoPlay
            preload="metadata"
            onPlay={handlePlay}
            onError={() => console.error("Failed to load: " + item.src)}
            onCanPlay={(e) => {
              e.currentTarget.play().catch((err) => {
                console.warn("Autoplay failed for clip: " + item.src, err);
              });
            }}
            className="w-full h-full object-cover select-none pointer-events-none"
          />
        ) : (
          <div className="w-full h-full bg-neutral-950 flex items-center justify-center text-neutral-800" />
        )}
        <div className="absolute inset-0 border border-white/[0.04] pointer-events-none rounded-sm" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 pointer-events-none" />
      </div>
    </div>
  );
};

export const HeroCarousel: React.FC = () => {
  const { setCursorVariant } = useCursor();
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  const [repeatedItems, setRepeatedItems] = useState<HeroVideo[]>([]);

  // Dimensions of cards and gaps (marquee filmstrip widths)
  const cardWidth = 360;
  const gap = 16;
  const singleSetWidth = heroVideos.length * (cardWidth + gap);

  // Position control coordinates
  const x = useMotionValue(-singleSetWidth);
  const speedRef = useRef(1.0);

  // 1. Observe if carousel is visible to pause loops in background
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 2. Repeat items dynamically to cover at least 3x the viewport width for seamless boundaries
  useEffect(() => {
    const minWidth = window.innerWidth * 3;
    const copiesNeeded = Math.ceil(minWidth / singleSetWidth) + 1;
    let temp: HeroVideo[] = [];
    for (let i = 0; i < copiesNeeded; i++) {
      temp = [...temp, ...heroVideos];
    }
    setRepeatedItems(temp);
  }, [singleSetWidth]);

  // 3. Modulate scroll speed based on hover states (1.5 standard speed down to 0.45)
  useEffect(() => {
    speedRef.current = isHovered ? 0.45 : 1.5;
  }, [isHovered]);

  // 4. Constant-velocity looping animation driven at 60 FPS
  useAnimationFrame((_, delta) => {
    if (!inView || repeatedItems.length === 0) return;

    // Standardize frames timing differences to keep velocity consistent
    const step = speedRef.current * (delta / 16.666);
    let nextX = x.get() + step;

    // Reset loop index once one set is offset fully
    if (nextX >= 0) {
      nextX -= singleSetWidth;
    }

    x.set(nextX);
  });

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden py-6 outline-none pointer-events-auto"
      onMouseEnter={() => {
        setIsHovered(true);
        setCursorVariant('hover');
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setCursorVariant('default');
      }}
    >
      {/* Slider moving filmstrip track */}
      <div className="flex items-center overflow-x-hidden">
        <motion.div
          className="flex gap-[16px]"
          style={{ x }}
        >
          {repeatedItems.map((item, idx) => (
            <HeroVideoCard
              key={`${item.id}-${idx}`}
              item={item}
              cardWidth={cardWidth}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default HeroCarousel;
