import React from 'react';

const ProgressBar = ({
  current,
  max,
  label = '',
  showNumbers = true,
  height = 'md',
  color = 'primary',
  className = ''
}) => {
  const percentage = Math.min((current / max) * 100, 100);

  const heights = {
    sm: 'h-4',
    md: 'h-6',
    lg: 'h-8',
  };

  const colors = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    accent: 'bg-accent',
    warning: 'bg-warning',
    danger: 'bg-danger',
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="font-display text-sm font-bold">{label}</span>
          {showNumbers && (
            <span className="font-mono text-sm">
              {current} / {max}
            </span>
          )}
        </div>
      )}
      <div className={`w-full ${heights[height]} border-3 border-dark shadow-brutal bg-light overflow-hidden`}>
        <div
          className={`${heights[height]} ${colors[color]} transition-all duration-500 border-r-3 border-dark`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
