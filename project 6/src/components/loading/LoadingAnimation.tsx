import React, { useState, useEffect } from 'react';

const CUBE_FRAMES = [
  [
    "    ┌─────────┐    ",
    "   ╱         ╱│    ",
    "  ┌─────────┐ │    ",
    "  │ BRAINERY│ │    ",
    "  │THINKING │ │    ",
    "  │         │╱     ",
    "  └─────────┘      "
  ],
  [
    "    ┌─────────┐    ",
    "   ╱         ╱│    ",
    "  ┌─────────┐ │    ",
    "  │BRAINERY │ │    ",
    "  │THINKING │ │    ",
    "  │         │╱     ",
    "  └─────────┘      "
  ]
];

const NEURAL_FRAMES = [
  [
    "     ○───○───○     ",
    "    ╱│\\╱│\\╱│\\     ",
    "   ○─○─○─○─○─○    ",
    "    \\│╱\\│╱\\│╱     ",
    "     ○───○───○     "
  ],
  [
    "     ●───○───●     ",
    "    ╱│\\╱│\\╱│\\     ",
    "   ○─●─○─●─○─●    ",
    "    \\│╱\\│╱\\│╱     ",
    "     ●───○───●     "
  ],
  [
    "     ○───●───○     ",
    "    ╱│\\╱│\\╱│\\     ",
    "   ●─○─●─○─●─○    ",
    "    \\│╱\\│╱\\│╱     ",
    "     ○───●───○     "
  ]
];

const PULSE_FRAMES = ['◜', '◠', '◝', '◞', '◡', '◟'];
const SPARK_FRAMES = ['⚡', '✧', '✦', '❋', '❊', '✺'];
const SYNAPSE_FRAMES = ['∴', '∵', '∶', '∷', '∸', '∹'];

interface LoadingAnimationProps {
  message?: string;
}

export function LoadingAnimation({ message = "Processing" }: LoadingAnimationProps) {
  const [cubeFrame, setCubeFrame] = useState(0);
  const [neuralFrame, setNeuralFrame] = useState(0);
  const [pulseFrame, setPulseFrame] = useState(0);
  const [sparkFrame, setSparkFrame] = useState(0);
  const [synapseFrame, setSynapseFrame] = useState(0);
  const [glowIntensity, setGlowIntensity] = useState(0);
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);

  useEffect(() => {
    const intervals = [
      setInterval(() => setCubeFrame(prev => (prev + 1) % CUBE_FRAMES.length), 800),
      setInterval(() => setNeuralFrame(prev => (prev + 1) % NEURAL_FRAMES.length), 300),
      setInterval(() => setPulseFrame(prev => (prev + 1) % PULSE_FRAMES.length), 120),
      setInterval(() => setSparkFrame(prev => (prev + 1) % SPARK_FRAMES.length), 150),
      setInterval(() => setSynapseFrame(prev => (prev + 1) % SYNAPSE_FRAMES.length), 180),
      setInterval(() => {
        const time = Date.now() / 1000;
        setGlowIntensity(Math.sin(time * 2) * 0.5 + 0.5);
        setRotationX(Math.sin(time) * 8);
        setRotationY(Math.cos(time) * 8);
      }, 50)
    ];

    return () => intervals.forEach(clearInterval);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center p-8 space-y-6">
      {/* Neural Network Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <pre className="text-[var(--accent-secondary)] transform scale-150">
          {NEURAL_FRAMES[neuralFrame].map((line, i) => (
            <div key={i} className="text-center">{line}</div>
          ))}
        </pre>
      </div>

      {/* Main 3D Cube */}
      <div className="relative transform hover:scale-105 transition-transform duration-300">
        <div 
          className="absolute inset-0 blur-2xl bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] opacity-20"
          style={{
            animation: 'pulse 2s ease-in-out infinite'
          }}
        />
        <pre
          className="text-[var(--accent-primary)] relative z-10"
          style={{
            filter: `drop-shadow(0 0 ${8 + glowIntensity * 12}px var(--accent-primary))`,
            transform: `
              perspective(1000px) 
              rotateX(${rotationX}deg) 
              rotateY(${rotationY}deg)
              scale3d(1.1, 1.1, 1.1)
            `,
            transition: 'transform 0.3s ease-out'
          }}
        >
          {CUBE_FRAMES[cubeFrame].map((line, i) => (
            <div key={i} className="text-center whitespace-pre font-bold">{line}</div>
          ))}
        </pre>
      </div>

      {/* Synapse Indicators */}
      <div className="flex items-center gap-4 text-lg">
        <span className="text-[var(--accent-primary)]">{SYNAPSE_FRAMES[synapseFrame]}</span>
        <span className="text-[var(--accent-secondary)]">{SPARK_FRAMES[sparkFrame]}</span>
        <span className="text-[var(--accent-primary)]">{PULSE_FRAMES[pulseFrame]}</span>
      </div>

      {/* Progress Bar */}
      <div className="w-64 h-1.5 bg-[rgba(0,255,157,0.1)] rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-primary)] rounded-full transition-all duration-300"
          style={{
            width: '50%',
            transform: `translateX(${-100 + (neuralFrame * 50)}%)`,
            filter: `brightness(${1 + glowIntensity})`,
            backgroundSize: '200% 100%',
            animation: 'gradient 2s linear infinite'
          }}
        />
      </div>
    </div>
  );
}