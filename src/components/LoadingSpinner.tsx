import React from 'react';

export function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center p-4">
      <div className="relative w-12 h-12">
        {/* Outer ring */}
        <div className="absolute inset-0 border-4 border-[rgba(0,255,157,0.1)] rounded-full"></div>
        
        {/* Spinning gradient ring */}
        <div className="absolute inset-0 border-4 border-transparent border-t-[var(--accent-primary)] rounded-full animate-spin"></div>
        
        {/* Inner pulsing core */}
        <div className="absolute inset-3 bg-[var(--accent-primary)] rounded-full animate-pulse opacity-50"></div>
        
        {/* Center dot */}
        <div className="absolute inset-5 bg-[var(--accent-primary)] rounded-full"></div>
      </div>
    </div>
  );
}