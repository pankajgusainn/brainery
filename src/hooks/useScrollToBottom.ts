import { useEffect, useRef } from 'react';

export function useScrollToBottom(dependencies: any[]) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      const scrollElement = scrollRef.current;
      const scrollHeight = scrollElement.scrollHeight;
      
      // Smooth scroll animation
      const startPosition = scrollElement.scrollTop;
      const distance = scrollHeight - startPosition;
      const duration = 1000; // 1 second
      let start: number | null = null;

      function animate(currentTime: number) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);

        // Easing function for smooth animation
        const easeInOutCubic = (t: number) => 
          t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

        const position = startPosition + distance * easeInOutCubic(progress);
        scrollElement.scrollTop = position;

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      }

      requestAnimationFrame(animate);
    }
  }, dependencies);

  return scrollRef;
}