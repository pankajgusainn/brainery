import React, { useState, useEffect } from 'react';
import { Message, ChatState } from './types/chat';
import { ChatInput } from './components/ChatInput';
import { ChatContainer } from './components/ChatContainer';
import { WelcomeHeader } from './components/WelcomeHeader';
import { DeveloperCredit } from './components/DeveloperCredit';
import { BraineryHeader } from './components/BraineryHeader';
import { AnimatedBackground } from './components/background/AnimatedBackground';
import { GeminiService } from './services/gemini';
import { AlertCircle } from 'lucide-react';
import { useLoadingState } from './hooks/useLoadingState';
import { usePageScroll } from './hooks/usePageScroll';
import './styles/animations.css';
import './styles/colors.css';
import './styles/custom.css';
import './styles/background-animations.css';

interface UserData {
  name: string;
  age: number;
}

export default function App() {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    error: null
  });

  const { setLoading } = useLoadingState();
  const [geminiService, setGeminiService] = useState<GeminiService | null>(null);
  const [initError, setInitError] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(() => {
    const saved = localStorage.getItem('userData');
    return saved ? JSON.parse(saved) : null;
  });

  usePageScroll([chatState.messages]);

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
    const data = { name, age };
    setUserData(data);
    localStorage.setItem('userData', JSON.stringify(data));
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
    <div className="min-h-screen bg-[var(--bg-primary)] relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative max-w-7xl mx-auto min-h-screen px-4 py-4 md:py-6">
        <div className="relative bg-[var(--bg-secondary)] backdrop-blur-xl rounded-2xl shadow-[var(--box-shadow)] p-4 md:p-6 border border-[rgba(255,255,255,0.1)]">
          {/* Animated border lines */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden">
            {/* Top border */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--accent-primary)] to-transparent opacity-70" />
            
            {/* Bottom border */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--accent-primary)] to-transparent opacity-70" />
            
            {/* Left border with animation */}
            <div className="absolute left-0 top-0 w-[2px] h-full">
              <div className="absolute inset-0 animate-light-up-down bg-gradient-to-b from-transparent via-[var(--accent-primary)] to-transparent opacity-70" />
              <div className="absolute inset-0 animate-light-up-down-delayed bg-gradient-to-b from-transparent via-[var(--accent-primary)] to-transparent opacity-50" />
            </div>
            
            {/* Right border with animation */}
            <div className="absolute right-0 top-0 w-[2px] h-full">
              <div className="absolute inset-0 animate-light-down-up bg-gradient-to-b from-transparent via-[var(--accent-primary)] to-transparent opacity-70" />
              <div className="absolute inset-0 animate-light-down-up-delayed bg-gradient-to-b from-transparent via-[var(--accent-primary)] to-transparent opacity-50" />
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10">
            <BraineryHeader />
            
            <div className="flex flex-col min-h-[calc(100vh-16rem)]">
              <ChatContainer
                messages={chatState.messages}
                isLoading={chatState.isLoading}
                error={chatState.error}
              />
              
              {chatState.messages.length === 0 && (
                <WelcomeHeader 
                  onPromptSelect={handleSendMessage}
                  userName={userData?.name}
                />
              )}
              
              <ChatInput
                onSend={handleSendMessage}
                onClear={handleClearChat}
                disabled={chatState.isLoading || !geminiService}
              />
            </div>
          </div>
        </div>
      </div>
      
      <DeveloperCredit />
    </div>
  );
}