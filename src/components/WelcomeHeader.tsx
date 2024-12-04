import React from 'react';
import { PromptSuggestions } from './PromptSuggestions';

interface WelcomeHeaderProps {
  onPromptSelect: (text: string) => void;
  userName?: string;
}

export function WelcomeHeader({ onPromptSelect, userName }: WelcomeHeaderProps) {
  return (
    <div className="welcome-header px-1 mt-8">
      <h1 className="text-3xl md:text-4xl font-medium mb-4">
        Hi there, <span className="text-[var(--accent-primary)]">{userName || 'Guest'}</span>
      </h1>
      <h2 className="text-3xl md:text-4xl font-medium mb-6">
        What would <span className="text-[var(--accent-primary)]">you like</span> to{' '}
        <span className="text-[var(--accent-secondary)]">know?</span>
      </h2>
      <p className="text-gray-400 text-sm md:text-base mb-8">
        Click one of the common prompts below or type your own question
      </p>
      <PromptSuggestions onSelect={onPromptSelect} />
    </div>
  );
}