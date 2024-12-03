import { GoogleGenerativeAI } from '@google/generative-ai';
import { Message, Source, RelatedContent } from '../types/chat';

export class GeminiService {
  private model;
  private chat;

  constructor(apiKey: string) {
    const finalApiKey = apiKey || 'AIzaSyAEn2b2PFKnFm-7KFZs3V89degmxGiks6E';
    
    if (!finalApiKey) {
      throw new Error('Gemini API key not found. Please check your environment configuration.');
    }

    try {
      const genAI = new GoogleGenerativeAI(finalApiKey);
      this.model = genAI.getGenerativeModel({ model: "gemini-pro" });
      this.startNewChat();
    } catch (error) {
      throw new Error('Failed to initialize Gemini AI: ' + (error as Error).message);
    }
  }

  startNewChat() {
    this.chat = this.model.startChat({
      generationConfig: {
        maxOutputTokens: 2048,
        temperature: 0.9,
        topP: 0.8,
        topK: 16,
      },
    });
  }

  private async findRelatedContent(topic: string): Promise<RelatedContent[]> {
    try {
      const result = await this.model.generateContent(`
        Generate 2-3 related articles or resources for the topic: "${topic}"
        Format as JSON array with structure:
        [{ "title": "...", "url": "...", "description": "..." }]
        Use real, relevant URLs from reputable sources.
      `);
      const response = await result.response;
      const text = response.text();
      try {
        return JSON.parse(text.substring(text.indexOf('['), text.lastIndexOf(']') + 1));
      } catch {
        return [];
      }
    } catch {
      return [];
    }
  }

  private async findSources(content: string): Promise<Source[]> {
    try {
      const result = await this.model.generateContent(`
        Generate 2-3 source references for the content: "${content}"
        Format as JSON array with structure:
        [{ "url": "...", "title": "...", "snippet": "..." }]
        Use real, relevant URLs from reputable sources.
      `);
      const response = await result.response;
      const text = response.text();
      try {
        return JSON.parse(text.substring(text.indexOf('['), text.lastIndexOf(']') + 1));
      } catch {
        return [];
      }
    } catch {
      return [];
    }
  }

  async generateResponse(prompt: string, history: Message[]): Promise<Message> {
    if (!prompt.trim()) {
      throw new Error('Prompt cannot be empty');
    }

    try {
      if (history.length === 0) {
        this.startNewChat();
      }

      const result = await this.chat.sendMessage(prompt);
      const response = await result.response;
      const content = response.text();

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
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      throw new Error(`Failed to generate response: ${errorMessage}`);
    }
  }
}