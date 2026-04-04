import React from 'react';

interface WavePatternsProps {
  isActive: boolean;
}

export function WavePatterns({ isActive }: WavePatternsProps) {
  const speed = isActive ? 'animate-wave-fast' : 'animate-wave-normal';
  
  return (
    <div className="absolute inset-0">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className={`absolute w-full h-[1px] ${speed}`}
          style={{
            top: `${25 + index * 25}%`,
            background: `linear-gradient(90deg,
              transparent 0%,
              rgba(0, 255, 157, ${0.4 - index * 0.1}) 50%,
              transparent 100%
            )`,
            animationDelay: `${-index * 2}s`
          }}
        />
      ))}
    </div>
  );
}