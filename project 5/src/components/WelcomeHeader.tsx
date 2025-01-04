import React from 'react';
import { PromptSuggestions } from './PromptSuggestions';

interface WelcomeHeaderProps {
  onPromptSelect: (text: string) => void;
  userName?: string;
}

export function WelcomeHeader({ onPromptSelect, userName }: WelcomeHeaderProps) {
  return (
    <div className="welcome-header px-1 mt-auto mb-8">
      <div className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-medium">
          Hi there, <span className="text-[var(--accent-primary)]">{userName || 'Guest'}</span>
        </h1>
        <h2 className="text-3xl md:text-4xl font-medium">
          What would <span className="text-[var(--accent-primary)]">you like</span> to{' '}
          <span className="relative">
            <span className="absolute inset-0 blur-lg bg-red-500 opacity-50"></span>
            <span className="relative text-red-500 brightness-125">know</span>
          </span>?
        </h2>
        <p className="text-gray-400 text-sm md:text-base">
          Click one of the common prompts below or type your own question
        </p>
      </div>
      <div className="mt-6">
        <PromptSuggestions onSelect={onPromptSelect} />
      </div>
    </div>
  );
}