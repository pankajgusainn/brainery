import React from 'react';
import { useAnimatedPath } from '../../hooks/useAnimatedPath';

export function CurvedLines() {
  return (
    <div className="absolute inset-0">
      {[2, 3, 4, 5].map((thickness, index) => (
        <div
          key={thickness}
          className="absolute w-full overflow-hidden"
          style={{ top: `${(index + 1) * 20}%`, height: `${thickness}px` }}
        >
          <div className="curved-line"
            style={{
              height: '100%',
              background: `linear-gradient(90deg, 
                rgba(0, 255, 157, 0) 0%,
                rgba(0, 255, 157, ${0.3 - index * 0.05}) 50%,
                rgba(0, 255, 157, 0) 100%
              )`,
              animation: `flowCurve ${10 + index * 2}s ease-in-out infinite`,
              animationDelay: `${-index * 2}s`
            }}
          />
        </div>
      ))}
    </div>
  );
}