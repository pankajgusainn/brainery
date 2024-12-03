import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { generatePromptSet } from '../data/promptSuggestions';

interface PromptSuggestionsProps {
  onSelect: (text: string) => void;
}

export function PromptSuggestions({ onSelect }: PromptSuggestionsProps) {
  const [currentSuggestions, setCurrentSuggestions] = useState(generatePromptSet());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setCurrentSuggestions(generatePromptSet());
    
    // Add a small delay to show the rotation animation
    setTimeout(() => {
      setIsRefreshing(false);
    }, 500);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {currentSuggestions.map((suggestion, index) => {
          const Icon = suggestion.icon;
          return (
            <button
              key={`${index}-${suggestion.text}`}
              onClick={() => onSelect(suggestion.text)}
              className="flex items-start gap-3 p-4 rounded-xl border border-[rgba(0,255,157,0.2)] bg-[rgba(13,13,13,0.95)] hover:border-[var(--accent-primary)] hover:bg-[rgba(0,255,157,0.1)] transition-all duration-300 group"
            >
              <div className="text-[var(--accent-primary)] group-hover:scale-110 transition-transform">
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-sm text-left text-gray-300 group-hover:text-white">
                {suggestion.text}
              </span>
            </button>
          );
        })}
      </div>
      
      <div className="flex justify-center">
        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 px-3 py-1.5 text-xs text-gray-400 hover:text-[var(--accent-primary)] rounded-lg border border-[rgba(0,255,157,0.2)] hover:border-[var(--accent-primary)] bg-[rgba(13,13,13,0.95)] hover:bg-[rgba(0,255,157,0.1)] transition-all duration-300 group"
        >
          <RefreshCw className={`w-3 h-3 transition-transform duration-500 ${isRefreshing ? 'rotate-180' : ''} group-hover:rotate-180`} />
          Refresh prompts
        </button>
      </div>
    </div>
  );
}