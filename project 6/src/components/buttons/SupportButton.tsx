import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { SupportModal } from '../modals/SupportModal';

export function SupportButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-2 bg-[rgba(13,13,13,0.95)] hover:bg-[rgba(0,255,157,0.1)] border border-[rgba(0,255,157,0.2)] rounded-lg transition-all duration-300 group"
      >
        <Heart className="w-4 h-4 text-[var(--accent-primary)] group-hover:scale-110 transition-transform" />
        <span className="text-sm text-gray-300 group-hover:text-white">Support Us</span>
      </button>

      <SupportModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}