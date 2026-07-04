import React from 'react';
import { cn } from '../../utils/cn';

export interface VideoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  category: string;
  thumbnailUrl: string;
  duration?: string;
  videoUrl?: string; // To be linked to a modal or play action in future
  aspectRatio?: 'video' | 'square' | 'wide';
}

export const VideoCard: React.FC<VideoCardProps> = ({
  className,
  title,
  category,
  thumbnailUrl,
  duration,
  videoUrl,
  aspectRatio = 'video',
  ...props
}) => {
  return (
    <div
      role="region"
      aria-label={`Video: ${title}`}
      className={cn(
        'group relative overflow-hidden bg-neutral-900 border border-neutral-800 transition-all duration-500 cursor-pointer',
        className
      )}
      {...props}
    >
      {/* Thumbnail Aspect Ratio Container */}
      <div
        className={cn(
          'relative w-full overflow-hidden',
          aspectRatio === 'video' && 'aspect-video',
          aspectRatio === 'square' && 'aspect-square',
          aspectRatio === 'wide' && 'aspect-[21/9]'
        )}
      >
        {/* Thumbnail Image */}
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-neutral-900 text-neutral-600">
            <span className="text-xs tracking-widest font-mono">NO THUMBNAIL</span>
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-neutral-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
          <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
            <span className="text-xs uppercase tracking-widest font-mono text-neutral-500 mb-1 block">
              {category}
            </span>
            <h3 className="text-lg font-light text-neutral-100">{title}</h3>
            {duration && (
              <span className="inline-block mt-2 text-[10px] tracking-widest text-neutral-400 font-mono">
                {duration}
              </span>
            )}
          </div>
        </div>

        {/* Cinematic Play Icon overlay (Center) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="h-14 w-14 rounded-full border border-neutral-500/30 bg-neutral-950/40 backdrop-blur-sm flex items-center justify-center text-neutral-300 opacity-60 group-hover:opacity-100 group-hover:scale-110 group-hover:border-neutral-200 group-hover:text-white transition-all duration-300 ease-out">
            {/* Minimal Play Arrow */}
            <svg
              className="w-4 h-4 fill-current translate-x-[2px]"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
