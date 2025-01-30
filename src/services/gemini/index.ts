import { generateResponse } from '../api';
import { Message } from '../../types/chat';

export class GeminiService {
  private chat: any;

  constructor() {
    this.startNewChat();
  }

  startNewChat(): void {
    this.chat = null;
  }

  async generateResponse(prompt: string, history: Message[]): Promise<Message> {
    if (!prompt.trim()) {
      throw new Error('Prompt cannot be empty');
    }

    try {
      const content = await generateResponse(prompt);

      return {
        role: 'assistant',
        content,
        timestamp: Date.now()
      };
    } catch (error) {
      throw new Error(`Failed to generate response: ${(error as Error).message}`);
    }
  }
}