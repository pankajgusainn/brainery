import { useEffect, useRef } from 'react';

export function useAnimatedPath() {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length} ${length}`;
    path.style.strokeDashoffset = `${length}`;

    const animation = path.animate(
      [
        { strokeDashoffset: length },
        { strokeDashoffset: 0 }
      ],
      {
        duration: 10000,
        easing: 'ease-in-out',
        iterations: Infinity
      }
    );

    return () => animation.cancel();
  }, []);

  return pathRef;
}