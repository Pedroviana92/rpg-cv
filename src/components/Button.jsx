import React from 'react';

const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false
}) => {
  const baseClasses = 'font-display font-bold border-3 border-dark shadow-brutal transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-primary text-dark',
    secondary: 'bg-secondary text-light',
    accent: 'bg-accent text-dark',
    warning: 'bg-warning text-dark',
    danger: 'bg-danger text-light',
  };

  const sizes = {
    sm: 'px-3 py-2 text-xs sm:text-sm',
    md: 'px-4 py-3 sm:px-6 text-sm sm:text-base',
    lg: 'px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
