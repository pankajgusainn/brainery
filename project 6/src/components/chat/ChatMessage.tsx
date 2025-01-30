import React, { useState } from 'react';
import { User, Bot, ChevronDown, ChevronUp } from 'lucide-react';
import { Message } from '../../types/chat';
import { MessageHeader } from './MessageHeader';
import { MessageContent } from './MessageContent';
import { MessageSources } from './MessageSources';
import { hasValidSources, hasValidRelatedContent } from '../../utils/messageValidators';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const [showSources, setShowSources] = useState(false);
  const isUser = message.role === 'user';
  const hasSources = hasValidSources(message);
  const hasRelated = hasValidRelatedContent(message);

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
          <MessageHeader timestamp={message.timestamp} />
          <MessageContent content={message.content} />
          
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
              {hasSources && <MessageSources sources={message.sources!} />}
              {hasRelated && <MessageSources sources={message.relatedContent!} isRelated />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}