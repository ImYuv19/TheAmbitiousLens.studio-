import React from 'react';
import { cn } from '../../utils/cn';

export interface SectionTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  className,
  eyebrow,
  title,
  subtitle,
  align = 'left',
  ...props
}) => {
  return (
    <div
      className={cn(
        'flex flex-col mb-12 md:mb-16',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className
      )}
      {...props}
    >
      {eyebrow && (
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-500 mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-neutral-100 leading-none">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-sm sm:text-base md:text-lg text-neutral-400 max-w-2xl font-light leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
