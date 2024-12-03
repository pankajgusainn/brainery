import React from 'react';

export function ParticleField() {
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
              float ${Math.random() * 10 + 10}s linear infinite,
              pulse ${Math.random() * 4 + 2}s ease-in-out infinite
            `,
            animationDelay: `-${Math.random() * 10}s`
          }}
        />
      ))}
    </div>
  );
}