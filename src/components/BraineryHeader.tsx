import React from 'react';
import { Brain } from 'lucide-react';

export function BraineryHeader() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12 mb-16">
      <div className="relative">
        {/* Outer glowing effects */}
        <div className="absolute -inset-8 bg-[var(--accent-primary)] blur-3xl opacity-20 animate-pulse" />
        <div className="absolute -inset-4 bg-gradient-to-r from-[var(--accent-primary)] via-transparent to-[var(--accent-primary)] blur-2xl opacity-30 animate-gradient" />
        
        {/* Additional outer glow layers */}
        <div className="absolute -inset-6 rounded-2xl bg-[var(--accent-primary)] opacity-10 blur-2xl animate-glow" />
        
        {/* Main container with solid black background */}
        <div className="relative flex items-center gap-6 px-12 py-8 rounded-xl bg-black border border-[rgba(0,255,157,0.2)] shadow-[0_0_30px_rgba(0,255,157,0.2)] transition-all duration-500">
          {/* Geometric patterns */}
          <div className="absolute inset-0 overflow-hidden rounded-xl">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--accent-primary)] to-transparent animate-pulse" />
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--accent-primary)] to-transparent animate-pulse" />
              <div className="absolute top-0 left-0 h-full w-[1px] bg-gradient-to-b from-transparent via-[var(--accent-primary)] to-transparent animate-pulse" />
              <div className="absolute top-0 right-0 h-full w-[1px] bg-gradient-to-b from-transparent via-[var(--accent-primary)] to-transparent animate-pulse" />
            </div>
          </div>

          {/* Brain icon with fast blinking effect */}
          <div className="relative">
            <Brain className="w-12 h-12 text-red-500 animate-brain-blink z-10" />
            <div className="absolute inset-0 bg-red-500 blur-xl animate-brain-glow opacity-50" />
          </div>

          {/* Text content with dynamic color animation */}
          <div className="text-5xl font-bold tracking-tight relative z-10">
            <span className="animate-text-color">
              BRAINERY
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}