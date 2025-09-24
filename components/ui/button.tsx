'use client';
import { cn } from '@/lib/utils';
import React from 'react';

type LogoutButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  viewType?: string; 
};

const LogoutButton: React.FC<LogoutButtonProps> = ({
  children,
  className,
  viewType,
  ...props
}) => {
  return (
    <button
      className={cn(
        'bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors cursor-pointer',
        className
      )}
      {...props}
    >
      {children || 'Logout'}
    </button>
  );
};

export default LogoutButton;
