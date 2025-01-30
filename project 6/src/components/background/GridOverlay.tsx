import React from 'react';

interface GridOverlayProps {
  isActive: boolean;
}

export function GridOverlay({ isActive }: GridOverlayProps) {
  const speed = isActive ? 'animate-grid-fast' : 'animate-grid-normal';
  
  return (
    <div className="absolute inset-0">
      <div 
        className={`absolute inset-0 opacity-20 ${speed}`}
        style={{
          backgroundImage: `
            linear-gradient(var(--accent-primary) 1px, transparent 1px),
            linear-gradient(90deg, var(--accent-primary) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          transform: 'perspective(500px) rotateX(60deg)'
        }}
      />
    </div>
  );
}