import React, { useState, useEffect } from 'react';
import { Message, ChatState } from './types/chat';
import { ChatInput } from './components/ChatInput';
import { ChatContainer } from './components/ChatContainer';
import { WelcomeHeader } from './components/WelcomeHeader';
import { WelcomeForm } from './components/WelcomeForm';
import { DeveloperCredit } from './components/DeveloperCredit';
import { BraineryHeader } from './components/BraineryHeader';
import { AnimatedBackground } from './components/background/AnimatedBackground';
import { GeminiService } from './services/gemini';
import { AlertCircle } from 'lucide-react';
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

  const [geminiService, setGeminiService] = useState<GeminiService | null>(null);
  const [initError, setInitError] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(() => {
    const saved = localStorage.getItem('userData');
    return saved ? JSON.parse(saved) : null;
  });

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
      
      {!userData && <WelcomeForm onSubmit={handleUserDataSubmit} />}
      
      <div className="relative max-w-5xl mx-auto min-h-screen px-4 py-8 md:py-12">
        <div className="bg-[var(--bg-secondary)] backdrop-blur-xl rounded-2xl shadow-[var(--box-shadow)] p-6 md:p-8 border border-[rgba(255,255,255,0.1)]">
          <BraineryHeader />
          <WelcomeHeader 
            onPromptSelect={handleSendMessage}
            userName={userData?.name}
          />
          
          <div className="mt-8 space-y-6">
            <ChatContainer
              messages={chatState.messages}
              isLoading={chatState.isLoading}
              error={chatState.error}
            />
            
            <ChatInput
              onSend={handleSendMessage}
              disabled={chatState.isLoading || !geminiService}
            />
          </div>
        </div>
      </div>
      
      <DeveloperCredit />
    </div>
  );
}