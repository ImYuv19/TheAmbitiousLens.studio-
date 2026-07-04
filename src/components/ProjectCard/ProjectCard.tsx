import React from 'react';
import { cn } from '../../utils/cn';

export interface ProjectCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle: string;
  tags?: string[];
  imageUrl?: string;
  linkUrl?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  className,
  title,
  subtitle,
  tags = [],
  imageUrl,
  linkUrl,
  ...props
}) => {
  return (
    <div
      role="article"
      aria-label={`Project: ${title}`}
      className={cn(
        'group flex flex-col bg-neutral-900/40 border border-neutral-900 hover:border-neutral-800 transition-colors duration-300 overflow-hidden',
        className
      )}
      {...props}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-950">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-102"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-neutral-700">
            <span className="text-xs tracking-wider font-mono">IMAGE PLACEHOLDER</span>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="flex flex-col p-5">
        <h3 className="text-base font-light text-neutral-200 transition-colors duration-300 group-hover:text-white">
          {title}
        </h3>
        <p className="text-xs text-neutral-500 mt-1 font-light">{subtitle}</p>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-[9px] font-mono tracking-wider text-neutral-400 bg-neutral-800/50 px-2 py-0.5"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
