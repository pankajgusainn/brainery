import React from 'react';
import { Brain } from 'lucide-react';

export function BraineryHeader() {
  return (
    <div className="flex items-center justify-center gap-3 py-6 mb-6">
      <Brain className="w-10 h-10 text-[var(--accent-primary)] animate-brain-pulse relative">
        <div className="absolute inset-0 bg-[var(--accent-primary)] blur-xl animate-glow-pulse opacity-50" />
      </Brain>
      <h1 className="text-5xl font-bold tracking-tight relative group perspective">
        <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-[#00ff9d] via-[#00b8d4] to-[#9d00ff] animate-rainbow-flow relative">
          Brainery
          <div className="absolute -inset-2 bg-gradient-to-r from-[#00ff9d] via-[#00b8d4] to-[#9d00ff] opacity-30 blur-2xl animate-glow-strong" />
        </span>
        <div className="absolute -inset-1 bg-gradient-conic from-[#00ff9d] via-[#00b8d4] to-[#9d00ff] opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500" />
      </h1>
    </div>
  );
}