import React from 'react';

interface ParticleFieldProps {
  isActive: boolean;
}

export function ParticleField({ isActive }: ParticleFieldProps) {
  const baseSpeed = isActive ? 5 : 10;
  const pulseSpeed = isActive ? 2 : 4;
  
  return (
    <div className="absolute inset-0">
      {[...Array(50)].map((_, index) => (
        <div
          key={index}
          className="absolute rounded-full"
          style={{
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            backgroundColor: 'var(--accent-primary)',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5 + 0.3,
            animation: `
              float ${Math.random() * baseSpeed + baseSpeed}s linear infinite,
              pulse ${Math.random() * pulseSpeed + pulseSpeed}s ease-in-out infinite
            `,
            animationDelay: `-${Math.random() * 10}s`
          }}
        />
      ))}
    </div>
  );
}