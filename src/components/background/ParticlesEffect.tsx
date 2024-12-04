import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number;
  speed: number;
  color: 'green' | 'red';
}

export function ParticlesEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animationFrameId = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const initParticles = () => {
      const totalParticles = 200;
      const greenParticles = Math.floor(totalParticles * 0.7); // 70% green
      
      particles.current = Array.from({ length: totalParticles }, (_, index) => ({
        x: Math.random() * canvas.width - canvas.width / 2,
        y: Math.random() * canvas.height - canvas.height / 2,
        z: Math.random() * 1000,
        speed: Math.random() * 2 + 1,
        color: index < greenParticles ? 'green' : 'red'
      }));
    };
    initParticles();

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.current.forEach((particle) => {
        // Move particle towards screen
        particle.z -= particle.speed;

        // Reset particle if it's too close
        if (particle.z < 1) {
          particle.z = 1000;
          particle.x = Math.random() * canvas.width - canvas.width / 2;
          particle.y = Math.random() * canvas.height - canvas.height / 2;
        }

        // 3D to 2D projection
        const scale = 1000 / particle.z;
        const x2d = particle.x * scale + canvas.width / 2;
        const y2d = particle.y * scale + canvas.height / 2;

        // Calculate size based on depth
        const size = Math.max(0.5, 5 * (1000 - particle.z) / 1000);

        // Draw particle with color-specific gradient
        const gradient = ctx.createRadialGradient(x2d, y2d, 0, x2d, y2d, size);
        if (particle.color === 'green') {
          gradient.addColorStop(0, 'rgba(0, 255, 157, 0.8)');
          gradient.addColorStop(1, 'rgba(0, 255, 157, 0)');
        } else {
          gradient.addColorStop(0, 'rgba(255, 0, 0, 0.8)');
          gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
        }

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
}