import React from 'react';
import { useLoadingState } from '../../hooks/useLoadingState';
import { CurvedLines } from './CurvedLines';
import { GlowingOrbs } from './GlowingOrbs';
import { WavePatterns } from './WavePatterns';
import { GridOverlay } from './GridOverlay';
import { ParticleField } from './ParticleField';

export function AnimatedBackground() {
  const { isLoading } = useLoadingState();
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-radial from-[#0a0a0a] to-black">
        <GridOverlay isActive={isLoading} />
        <ParticleField isActive={isLoading} />
        <CurvedLines isActive={isLoading} />
        <GlowingOrbs isActive={isLoading} />
        <WavePatterns isActive={isLoading} />
      </div>
    </div>
  );
}