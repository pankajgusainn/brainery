import React from 'react';
import { Message } from '../types/chat';
import { ChatMessage } from './ChatMessage';
import { LoadingSpinner } from './LoadingSpinner';

interface ChatContainerProps {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

export function ChatContainer({ messages, isLoading, error }: ChatContainerProps) {
  return (
    <div className="flex-1 p-4 space-y-4 overflow-y-auto custom-scrollbar">
      {messages.map((message, index) => (
        <ChatMessage key={index} message={message} />
      ))}
      {isLoading && <LoadingSpinner />}
      {error && (
        <div className="text-center text-red-400 bg-[rgba(255,0,0,0.1)] border border-red-900 p-3 rounded-lg animate-fade-in">
          {error}
        </div>
      )}
    </div>
  );
}