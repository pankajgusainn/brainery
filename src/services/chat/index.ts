import { generateResponse } from '../api';
import { Message } from '../../types/chat';
import { formatResponse, generateAlternativePrompt } from './formatters';

export class ChatService {
  private chat: any;
  private lastPrompt: string = '';
  private alternativeCount: number = 0;

  constructor() {
    this.startNewChat();
  }

  startNewChat(): void {
    this.chat = null;
    this.lastPrompt = '';
    this.alternativeCount = 0;
  }

  async generateResponse(prompt: string, history: Message[]): Promise<Message> {
    if (!prompt.trim()) {
      throw new Error('Prompt cannot be empty');
    }

    try {
      let finalPrompt: string;
      
      // Handle alternative response requests
      if (prompt === "Please provide an alternative response" && this.lastPrompt) {
        this.alternativeCount++;
        finalPrompt = generateAlternativePrompt(this.lastPrompt);
      } else {
        // Store new prompt and reset alternative count
        this.lastPrompt = prompt;
        this.alternativeCount = 0;
        finalPrompt = prompt;
      }

      const rawContent = await generateResponse(finalPrompt);
      const formattedContent = formatResponse(rawContent);

      // Add a note if this is an alternative response
      const content = this.alternativeCount > 0
        ? `Alternative Perspective #${this.alternativeCount}\n\n${formattedContent}`
        : formattedContent;

      return {
        role: 'assistant',
        content,
        timestamp: Date.now()
      };
    } catch (error) {
      throw new Error(`Failed to generate response: ${(error as Error).message}`);
    }
  }

  getLastPrompt(): string {
    return this.lastPrompt;
  }

  getAlternativeCount(): number {
    return this.alternativeCount;
  }
}