import React from 'react';
import { cn } from '../../utils/cn';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  active?: boolean;
}

export const Tag: React.FC<TagProps> = ({ children, className, active = false, ...props }) => {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3.5 py-1 text-xs font-medium tracking-wider transition-all duration-300',
        active
          ? 'bg-neutral-100 text-neutral-900 border border-neutral-100'
          : 'bg-neutral-900/60 text-neutral-400 border border-neutral-800 hover:border-neutral-700 hover:text-neutral-200',
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Tag;
