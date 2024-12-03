import React from 'react';

export function WavePatterns() {
  return (
    <div className="absolute inset-0">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="absolute w-full h-[1px]"
          style={{
            top: `${25 + index * 25}%`,
            background: `linear-gradient(90deg,
              transparent 0%,
              rgba(0, 255, 157, ${0.4 - index * 0.1}) 50%,
              transparent 100%
            )`,
            animation: `waveFlow ${8 + index * 2}s ease-in-out infinite`,
            animationDelay: `${-index * 2}s`
          }}
        />
      ))}
    </div>
  );
}