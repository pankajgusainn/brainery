import React from 'react';

interface CurvedLinesProps {
  isActive: boolean;
}

export function CurvedLines({ isActive }: CurvedLinesProps) {
  const speed = isActive ? 'animate-curve-fast' : 'animate-curve-normal';
  
  return (
    <div className="absolute inset-0">
      {[2, 3, 4, 5].map((thickness, index) => (
        <div
          key={thickness}
          className="absolute w-full overflow-hidden"
          style={{ top: `${(index + 1) * 20}%`, height: `${thickness}px` }}
        >
          <div className={`curved-line ${speed}`}
            style={{
              height: '100%',
              background: `linear-gradient(90deg, 
                rgba(0, 255, 157, 0) 0%,
                rgba(0, 255, 157, ${0.3 - index * 0.05}) 50%,
                rgba(0, 255, 157, 0) 100%
              )`,
              animationDelay: `${-index * 2}s`
            }}
          />
        </div>
      ))}
    </div>
  );
}