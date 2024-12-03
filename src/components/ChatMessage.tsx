import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { User, Bot, Link, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { Message, Source, RelatedContent } from '../types/chat';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const [showSources, setShowSources] = useState(false);
  const isUser = message.role === 'user';
  const hasSources = message.sources && message.sources.length > 0;
  const hasRelated = message.relatedContent && message.relatedContent.length > 0;

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  const renderSources = (sources: Source[]) => (
    <div className="mt-4 space-y-3">
      <h4 className="text-sm font-semibold text-gray-300">Sources:</h4>
      <ul className="space-y-3">
        {sources.map((source, index) => (
          <li key={index} className="text-sm">
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[var(--accent-primary)] hover:text-[var(--accent-secondary)]"
            >
              <Link className="w-4 h-4" />
              {source.title}
              <ExternalLink className="w-3 h-3" />
            </a>
            {source.snippet && (
              <p className="mt-2 text-gray-400 text-xs leading-relaxed">
                {source.snippet}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );

  const renderRelatedContent = (related: RelatedContent[]) => (
    <div className="mt-4 space-y-3">
      <h4 className="text-sm font-semibold text-gray-300">Related Content:</h4>
      <ul className="space-y-3">
        {related.map((item, index) => (
          <li key={index} className="text-sm">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[var(--accent-primary)] hover:text-[var(--accent-secondary)]"
            >
              <ExternalLink className="w-4 h-4" />
              {item.title}
            </a>
            {item.description && (
              <p className="mt-2 text-gray-400 text-xs leading-relaxed">
                {item.description}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
        isUser ? 'bg-[var(--accent-primary)]' : 'bg-[rgba(0,255,157,0.2)]'
      }`}>
        {isUser ? 
          <User className="w-5 h-5 text-black" /> : 
          <Bot className="w-5 h-5 text-[var(--accent-primary)]" />
        }
      </div>
      <div className={`flex-1 ${isUser ? 'items-end' : 'items-start'}`}>
        <div className={`px-4 py-3 rounded-lg backdrop-blur-lg ${
          isUser 
            ? 'bg-[rgba(0,255,157,0.1)] border border-[rgba(0,255,157,0.2)]' 
            : 'bg-[rgba(13,13,13,0.95)] border border-[rgba(255,255,255,0.1)]'
        }`}>
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs text-gray-400">
              {formatTimestamp(message.timestamp)}
            </span>
          </div>
          <ReactMarkdown className="prose prose-invert max-w-none prose-p:mb-4 prose-p:leading-relaxed">
            {message.content}
          </ReactMarkdown>
          {(hasSources || hasRelated) && (
            <button
              onClick={() => setShowSources(!showSources)}
              className="mt-3 text-sm text-gray-400 flex items-center gap-1 hover:text-[var(--accent-primary)]"
            >
              {showSources ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              {showSources ? 'Hide sources' : 'Show sources'}
            </button>
          )}
          {showSources && (
            <div className="mt-3 border-t border-[rgba(255,255,255,0.1)] pt-3">
              {hasSources && renderSources(message.sources!)}
              {hasRelated && renderRelatedContent(message.relatedContent!)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}