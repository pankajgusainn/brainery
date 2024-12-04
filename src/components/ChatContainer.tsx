import React from 'react';
import { Message } from '../types/chat';
import { ChatMessage } from './chat/ChatMessage';
import { LoadingAnimation } from './loading/LoadingAnimation';
import { useScrollToBottom } from '../hooks/useScrollToBottom';

interface ChatContainerProps {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

export function ChatContainer({ messages, isLoading, error }: ChatContainerProps) {
  const scrollRef = useScrollToBottom([messages, isLoading]);

  return (
    <div 
      ref={scrollRef}
      className="flex-1 p-4 space-y-4 overflow-y-auto custom-scrollbar max-h-[60vh]"
    >
      {messages.map((message, index) => (
        <ChatMessage key={index} message={message} />
      ))}
      
      {isLoading && (
        <div className="bg-[rgba(13,13,13,0.95)] border border-[rgba(255,255,255,0.1)] rounded-lg backdrop-blur-lg">
          <LoadingAnimation message="Brainery is thinking" />
        </div>
      )}
      
      {error && (
        <div className="text-center text-red-400 bg-[rgba(255,0,0,0.1)] border border-red-900 p-3 rounded-lg animate-fade-in">
          {error}
        </div>
      )}
    </div>
  );
}