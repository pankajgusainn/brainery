import React, { useState, useEffect } from 'react';
import { Message, ChatState } from './types/chat';
import { ChatInput } from './components/ChatInput';
import { ChatContainer } from './components/ChatContainer';
import { WelcomeHeader } from './components/WelcomeHeader';
import { BraineryHeader } from './components/BraineryHeader';
import { AnimatedBackground } from './components/background/AnimatedBackground';
import { SupportButton } from './components/buttons/SupportButton';
import { GeminiService } from './services/gemini';
import { AlertCircle } from 'lucide-react';
import { useLoadingState } from './hooks/useLoadingState';
import { useUserData } from './hooks/useUserData';
import './styles/animations.css';
import './styles/colors.css';
import './styles/custom.css';
import './styles/background-animations.css';

export function App() {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    error: null
  });

  const { setLoading } = useLoadingState();
  const [geminiService, setGeminiService] = useState<GeminiService | null>(null);
  const [initError, setInitError] = useState<string | null>(null);
  const { userData, setUserData } = useUserData();

  useEffect(() => {
    setLoading(chatState.isLoading);
  }, [chatState.isLoading, setLoading]);

  useEffect(() => {
    try {
      const service = new GeminiService(import.meta.env.VITE_GEMINI_API_KEY);
      setGeminiService(service);
    } catch (error) {
      setInitError((error as Error).message);
    }
  }, []);

  const handleUserDataSubmit = (name: string, age: number) => {
    setUserData({ name, age });
  };

  const handleSendMessage = async (content: string) => {
    if (!geminiService) {
      setChatState(prev => ({
        ...prev,
        error: 'Gemini service is not initialized'
      }));
      return;
    }

    const userMessage: Message = {
      role: 'user',
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
  };

  const handleClearChat = () => {
    setChatState({
      messages: [],
      isLoading: false,
      error: null
    });
    if (geminiService) {
      geminiService.startNewChat();
    }
  };

  if (initError) {
    return (
      <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-2 text-red-500 mb-4">
            <AlertCircle className="w-6 h-6" />
            <h1 className="text-xl font-semibold">Initialization Error</h1>
          </div>
          <p className="text-gray-700">{initError}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] overflow-y-auto">
      <AnimatedBackground />
      <SupportButton />
      
      <div className="max-w-5xl mx-auto px-4 py-4 md:py-6">
        <div className="relative z-10">
          <BraineryHeader />
          
          <div className="min-h-[400px] flex flex-col">
            {chatState.messages.length === 0 ? (
              <WelcomeHeader 
                onPromptSelect={handleSendMessage}
                userName={userData?.name}
              />
            ) : (
              <ChatContainer
                messages={chatState.messages}
                isLoading={chatState.isLoading}
                error={chatState.error}
              />
            )}
          </div>
          
          <div className="mt-4 sticky bottom-0 pt-4">
            <ChatInput
              onSend={handleSendMessage}
              onClear={handleClearChat}
              disabled={chatState.isLoading || !geminiService}
            />
          </div>
        </div>
      </div>
    </div>
  );
}