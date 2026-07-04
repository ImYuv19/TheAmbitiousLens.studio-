import React from 'react';
import { cn } from '../../utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant = 'primary', size = 'md', isLoading, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          // Base styles
          'inline-flex items-center justify-center font-medium tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50',
          // Variants
          variant === 'primary' && 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 active:scale-[0.98]',
          variant === 'secondary' && 'bg-neutral-800 text-neutral-100 hover:bg-neutral-700 active:scale-[0.98]',
          variant === 'outline' && 'border border-neutral-700 bg-transparent text-neutral-200 hover:bg-neutral-900 hover:text-white',
          variant === 'ghost' && 'bg-transparent text-neutral-400 hover:bg-neutral-900 hover:text-neutral-100',
          variant === 'link' && 'bg-transparent text-neutral-300 underline-offset-4 hover:text-white hover:underline p-0',
          // Sizes
          size === 'sm' && 'h-9 px-4 text-xs rounded-sm',
          size === 'md' && 'h-11 px-6 text-sm rounded-sm',
          size === 'lg' && 'h-13 px-8 text-base rounded-sm',
          className
        )}
        {...props}
      >
        {isLoading ? (
          <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
