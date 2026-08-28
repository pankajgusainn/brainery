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

    const isAlternativeRequest =
      content === 'Please provide an alternative response';

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

    setTimeout(() => {
      scrollToBottom();
    }, 50);

    try {
      const assistantMessage = {
        role: 'assistant' as const,
        content: '',
        timestamp: Date.now()
      };

      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        isLoading: true,
        error: null
      }));

      let hasReceivedFirstChunk = false;

      await chatService.generateResponse(
        content,
        chatState.messages,
        (chunk: string) => {
          setChatState(prev => {
            const messages = [...prev.messages];

            const lastMessage = messages[messages.length - 1];

            if (lastMessage?.role === 'assistant') {
              messages[messages.length - 1] = {
                ...lastMessage,
                content: lastMessage.content + chunk
              };
            }

            return {
              ...prev,
              isLoading: hasReceivedFirstChunk
                ? prev.isLoading
                : false,
              messages
            };
          });

          hasReceivedFirstChunk = true;

          // Do NOT scroll during streaming.
        }
      );

      setChatState(prev => ({
        ...prev,
        isLoading: false
      }));

      setTimeout(() => {
        scrollToBottom();
      }, 50);

    } catch (error) {
      setChatState(prev => ({
        ...prev,
        isLoading: false,
        error: (error as Error).message
      }));

      scrollToBottom();
    }
  }, [chatService, chatState.messages, setChatState]);

  const handleClearChat = useCallback(() => {
    setChatState({
      messages: [],
      isLoading: false,
      error: null
    });

    if (chatService) {
      chatService.startNewChat();
    }
  }, [chatService, setChatState]);

  return {
    handleSendMessage,
    handleClearChat
  };
}
