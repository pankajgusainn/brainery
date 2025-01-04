import { useState, useCallback } from 'react';
import { ChatState } from '../types/chat';
import { GeminiService } from '../services/gemini';

interface UseChatHandlersProps {
  chatState: ChatState;
  setChatState: React.Dispatch<React.SetStateAction<ChatState>>;
  geminiService: GeminiService | null;
}

export function useChatHandlers({ 
  chatState, 
  setChatState, 
  geminiService 
}: UseChatHandlersProps) {
  const handleSendMessage = useCallback(async (content: string) => {
    if (!geminiService) {
      setChatState(prev => ({
        ...prev,
        error: 'Gemini service is not initialized'
      }));
      return;
    }

    const userMessage = {
      role: 'user' as const,
      content,
      timestamp: Date.now()
    };

    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
      error: null
    }));

    try {
      const assistantMessage = await geminiService.generateResponse(
        content,
        chatState.messages
      );

      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        isLoading: false
      }));

      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth'
      });
    } catch (error) {
      setChatState(prev => ({
        ...prev,
        isLoading: false,
        error: (error as Error).message
      }));
    }
  }, [geminiService, chatState.messages]);

  const handleClearChat = useCallback(() => {
    setChatState({
      messages: [],
      isLoading: false,
      error: null
    });
    if (geminiService) {
      geminiService.startNewChat();
    }
  }, [geminiService]);

  return {
    handleSendMessage,
    handleClearChat
  };
}