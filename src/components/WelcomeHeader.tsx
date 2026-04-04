import React from 'react';
import { motion } from 'framer-motion';
import { PromptSuggestions } from './PromptSuggestions';

interface WelcomeHeaderProps {
  onPromptSelect: (text: string) => void;
  userName?: string;
}

export function WelcomeHeader({ onPromptSelect, userName }: WelcomeHeaderProps) {
  // Enhanced shake animation with more pronounced movement
  const shakeAnimation = {
    x: [0, -3, 3, -3, 3, -2, 2, -1, 1, 0],
    y: [0, 2, -2, 2, -2, 1, -1, 1, -1, 0],
    rotate: [0, -2, 2, -2, 2, -1, 1, -1, 1, 0]
  };

  return (
    <div className="welcome-header px-1 mt-auto mb-8">
      <div className="space-y-4">
        <motion.h1 
          className="text-3xl md:text-4xl font-medium"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Hi there, <span className="text-[var(--accent-primary)]">{userName || 'Guest'}</span>
        </motion.h1>
        <motion.h2 
          className="text-3xl md:text-4xl font-medium"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          What would <span className="text-[var(--accent-primary)]">you like</span> to{' '}
          <span className="relative inline-block">
            {/* Glowing background effect */}
            <motion.span 
              className="absolute inset-0 blur-lg bg-red-500 opacity-50"
              animate={shakeAnimation}
              transition={{
                duration: 0.3, // Faster duration
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear" // Changed to linear for more robotic shake
              }}
            />
            {/* Text with enhanced shake */}
            <motion.span 
              className="relative text-red-500 brightness-125"
              animate={shakeAnimation}
              transition={{
                duration: 0.3, // Faster duration
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear" // Changed to linear for more robotic shake
              }}
            >
              know
            </motion.span>
          </span>?
        </motion.h2>
        <motion.p 
          className="text-gray-400 text-sm md:text-base"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Click one of the common prompts below or type your own question
        </motion.p>
      </div>
      <motion.div 
        className="mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <PromptSuggestions onSelect={onPromptSelect} />
      </motion.div>
    </div>
  );
}