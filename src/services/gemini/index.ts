import { GoogleGenerativeAI } from '@google/generative-ai';
import { Message } from '../../types/chat';
import { GEMINI_CONFIG } from './config';
import { SYSTEM_PROMPTS } from './prompts';
import { formatPrompt, extractJsonFromText, validateApiKey } from './utils';
import { GeminiInitializationError, GeminiResponseError } from './errors';

export class GeminiService {
  private model;
  private chat;

  constructor(apiKey: string) {
    try {
      const validApiKey = validateApiKey(apiKey || GEMINI_CONFIG.API_KEY);
      const genAI = new GoogleGenerativeAI(validApiKey);
      
      this.model = genAI.getGenerativeModel({ 
        model: GEMINI_CONFIG.MODEL,
        generationConfig: {
          maxOutputTokens: GEMINI_CONFIG.MAX_TOKENS,
          temperature: GEMINI_CONFIG.TEMPERATURE,
          topP: GEMINI_CONFIG.TOP_P,
          topK: GEMINI_CONFIG.TOP_K,
        }
      });
      
      this.startNewChat();
    } catch (error) {
      throw new GeminiInitializationError((error as Error).message, error);
    }
  }

  startNewChat(): void {
    try {
      this.chat = this.model.startChat();
    } catch (error) {
      throw new GeminiInitializationError('Failed to start new chat session', error);
    }
  }

  private async findSources(content: string) {
    try {
      const result = await this.model.generateContent(SYSTEM_PROMPTS.SOURCES);
      const response = await result.response;
      return extractJsonFromText(response.text()) || [];
    } catch {
      return [];
    }
  }

  private async findRelatedContent(topic: string) {
    try {
      const result = await this.model.generateContent(SYSTEM_PROMPTS.RELATED);
      const response = await result.response;
      return extractJsonFromText(response.text()) || [];
    } catch {
      return [];
    }
  }

  async generateResponse(prompt: string, history: Message[]): Promise<Message> {
    if (!prompt.trim()) {
      throw new GeminiResponseError('Prompt cannot be empty');
    }

    try {
      if (!this.model || !this.chat) {
        throw new GeminiResponseError('Gemini service not properly initialized');
      }

      if (history.length === 0) {
        this.startNewChat();
      }

      const result = await this.chat.sendMessage(formatPrompt(prompt));
      const response = await result.response;
      const content = response.text();

      if (!content) {
        throw new GeminiResponseError('Empty response from Gemini API');
      }

      const [sources, relatedContent] = await Promise.all([
        this.findSources(content),
        this.findRelatedContent(prompt)
      ]);

      return {
        role: 'assistant',
        content,
        sources,
        relatedContent,
        timestamp: Date.now()
      };
    } catch (error) {
      throw new GeminiResponseError(
        (error as Error).message || 'Unknown error occurred',
        error
      );
    }
  }
}