import { useCallback } from 'react';
import { ChatState } from '../types/chat';
import { ChatService } from '../services/chat';

interface UseChatHandlersProps {
  chatState: ChatState;
  setChatState: React.Dispatch<React.SetStateAction<ChatState>>;
  chatService: ChatService | null;
}

export function useChatHandlers({ 
  chatState, 
  setChatState, 
  chatService 
}: UseChatHandlersProps) {
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  };

  const handleSendMessage = useCallback(async (content: string) => {
    if (!chatService) {
      setChatState(prev => ({
        ...prev,
        error: 'Service is not initialized'
      }));
      return;
    }

    // For alternative responses, use the last prompt but don't add a new user message
    const isAlternativeRequest = content === "Please provide an alternative response";
    const messageContent = isAlternativeRequest ? chatService.getLastPrompt() : content;

    if (!isAlternativeRequest) {
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
    } else {
      setChatState(prev => ({
        ...prev,
        isLoading: true,
        error: null
      }));
    }

    scrollToBottom();

    try {
      const assistantMessage = await chatService.generateResponse(
        content,
        chatState.messages
      );

      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        isLoading: false
      }));

      scrollToBottom();
    } catch (error) {
      setChatState(prev => ({
        ...prev,
        isLoading: false,
        error: (error as Error).message
      }));
      
      scrollToBottom();
    }
  }, [chatService, chatState.messages]);

  const handleClearChat = useCallback(() => {
    setChatState({
      messages: [],
      isLoading: false,
      error: null
    });
    if (chatService) {
      chatService.startNewChat();
    }
  }, [chatService]);

  return {
    handleSendMessage,
    handleClearChat
  };
}