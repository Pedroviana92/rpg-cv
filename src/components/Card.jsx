import React from 'react';

const Card = ({
  children,
  variant = 'light',
  shadow = 'brutal',
  className = '',
  padding = 'md'
}) => {
  const baseClasses = 'border-3';

  const variants = {
    light: 'bg-light border-dark',
    primary: 'bg-primary border-dark text-dark',
    secondary: 'bg-secondary border-dark text-dark',
    accent: 'bg-accent border-dark text-dark',
    warning: 'bg-warning border-dark text-dark',
    'dark-800': 'bg-dark-800 border-primary text-light',
    'dark-700': 'bg-dark-700 border-primary text-light',
    'dark-600': 'bg-dark-600 border-secondary text-light',
  };

  const shadows = {
    brutal: 'shadow-brutal',
    'brutal-lg': 'shadow-brutal-lg',
    'brutal-xl': 'shadow-brutal-xl',
    'brutal-green': 'shadow-brutal-green',
    'brutal-cyan': 'shadow-brutal-cyan',
    none: '',
  };

  const paddings = {
    sm: 'p-3 sm:p-4',
    md: 'p-4 sm:p-6',
    lg: 'p-6 sm:p-8',
    none: 'p-0',
  };

  return (
    <div className={`${baseClasses} ${variants[variant]} ${shadows[shadow]} ${paddings[padding]} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
