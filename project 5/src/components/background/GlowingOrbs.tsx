import React from 'react';

interface GlowingOrbsProps {
  isActive: boolean;
}

export function GlowingOrbs({ isActive }: GlowingOrbsProps) {
  const speed = isActive ? 'animate-float-fast' : 'animate-float-normal';
  
  return (
    <div className="absolute inset-0">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className={`absolute rounded-full blur-3xl ${speed}`}
          style={{
            width: `${300 + index * 100}px`,
            height: `${300 + index * 100}px`,
            background: `radial-gradient(circle at center,
              rgba(0, 255, 157, ${0.15 - index * 0.03}) 0%,
              rgba(0, 184, 212, ${0.1 - index * 0.02}) 45%,
              transparent 70%
            )`,
            top: `${30 + index * 20}%`,
            left: `${20 + index * 25}%`,
            animationDelay: `${-index * 3}s`
          }}
        />
      ))}
    </div>
  );
}