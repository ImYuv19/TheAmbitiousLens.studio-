import React from 'react';
import { cn } from '../../utils/cn';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  clean?: boolean;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
  clean = false,
  ...props
}) => {
  return (
    <div
      className={cn(
        !clean && 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-12',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
