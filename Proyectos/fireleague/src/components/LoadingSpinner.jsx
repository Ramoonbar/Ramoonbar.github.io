import React from 'react';

const LoadingSpinner = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4'
  };

  return (
    <div className="flex items-center justify-center">
      <div className={`${sizeClasses[size]} border-primary border-t-transparent rounded-full animate-spin`}></div>
    </div>
  );
};

export default LoadingSpinner;
