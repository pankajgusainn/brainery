import React from 'react';
import { Brain } from 'lucide-react';

export function BraineryHeader() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-6 mb-8">
      <div className="relative">
        {/* Outer glowing effects */}
        <div className="absolute -inset-8 bg-[var(--accent-primary)] blur-3xl opacity-20 animate-pulse" />
        <div className="absolute -inset-4 bg-gradient-to-r from-[var(--accent-primary)] via-transparent to-[var(--accent-primary)] blur-2xl opacity-30 animate-gradient" />
        
        {/* Additional outer glow layers */}
        <div className="absolute -inset-6 rounded-2xl bg-[var(--accent-primary)] opacity-10 blur-2xl animate-glow" />
        
        {/* Main container with solid black background */}
        <div className="relative flex items-center gap-6 px-12 py-6 rounded-xl bg-black border border-[rgba(0,255,157,0.2)] shadow-[0_0_30px_rgba(0,255,157,0.2)] transition-all duration-500">
          {/* Vertical lighting effects */}
          <div className="absolute inset-0 overflow-hidden rounded-xl">
            {/* Left vertical light */}
            <div className="absolute left-0 w-[2px] h-full">
              <div className="absolute inset-0 animate-light-up-down bg-gradient-to-b from-transparent via-[var(--accent-primary)] to-transparent opacity-70" />
              <div className="absolute inset-0 animate-light-up-down-delayed bg-gradient-to-b from-transparent via-[var(--accent-primary)] to-transparent opacity-50" />
            </div>
            
            {/* Right vertical light */}
            <div className="absolute right-0 w-[2px] h-full">
              <div className="absolute inset-0 animate-light-down-up bg-gradient-to-b from-transparent via-[var(--accent-primary)] to-transparent opacity-70" />
              <div className="absolute inset-0 animate-light-down-up-delayed bg-gradient-to-b from-transparent via-[var(--accent-primary)] to-transparent opacity-50" />
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