import React from 'react';
import { PromptSuggestions } from './PromptSuggestions';

interface WelcomeHeaderProps {
  onPromptSelect: (text: string) => void;
  userName?: string;
}

export function WelcomeHeader({ onPromptSelect, userName }: WelcomeHeaderProps) {
  return (
    <div className="welcome-header px-1">
      <h1 className="text-3xl md:text-4xl font-medium mb-2">
        Hi there, <span className="text-[var(--accent-primary)]">{userName || 'Guest'}</span>
      </h1>
      <h2 className="text-3xl md:text-4xl font-medium mb-3 md:mb-4">
        What would <span className="text-[var(--accent-primary)]">you like</span> to{' '}
        <span className="text-[var(--accent-secondary)]">know?</span>
      </h2>
      <p className="text-gray-400 text-sm md:text-base mb-6">
        Click one of the common prompts below or type your own question
      </p>
      <PromptSuggestions onSelect={onPromptSelect} />
    </div>
  );
}