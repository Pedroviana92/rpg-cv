import React from 'react';

const Badge = ({
  children,
  variant = 'primary',
  size = 'md',
  icon = null,
  className = ''
}) => {
  const baseClasses = 'inline-flex items-center gap-2 font-display font-bold border-3 border-dark';

  const variants = {
    primary: 'bg-primary text-dark',
    secondary: 'bg-secondary text-light',
    accent: 'bg-accent text-dark',
    warning: 'bg-warning text-dark',
    danger: 'bg-danger text-light',
    light: 'bg-light text-dark',
  };

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  return (
    <span className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}>
      {icon && <span>{icon}</span>}
      {children}
    </span>
  );
};

export default Badge;
