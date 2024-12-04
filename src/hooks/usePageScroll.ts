import { useEffect } from 'react';

export function usePageScroll(dependencies: any[]) {
  useEffect(() => {
    const scrollToBottom = () => {
      const documentHeight = document.documentElement.scrollHeight;
      const startPosition = window.pageYOffset;
      const distance = documentHeight - startPosition;
      const duration = 1500; // 1.5 seconds
      let start: number | null = null;

      function animate(currentTime: number) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);

        // Smooth easing function
        const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

        const position = startPosition + distance * easeOutQuart(progress);
        window.scrollTo(0, position);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      }

      requestAnimationFrame(animate);
    };

    scrollToBottom();
  }, dependencies);
}