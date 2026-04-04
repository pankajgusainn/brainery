import React from 'react';
import { Brain } from 'lucide-react';

export function BraineryHeader() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-6 mb-8">
      <div className="relative">
        {/* Main content without container box */}
        <div className="relative flex items-center gap-6 px-12 py-6 transition-all duration-500">
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