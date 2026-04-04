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

  startNewChat(): void {
    this.chat = this.model.startChat({
      generationConfig: {
        maxOutputTokens: 2048,
        temperature: 0.9,
        topP: 0.8,
        topK: 16,
      },
    });
  }

  private formatPrompt(prompt: string): string {
    return `
# Instructions for Response Formatting

Please provide a well-structured response following these guidelines:

## Content Structure
- Start with a clear introduction
- Use proper heading hierarchy (# for main, ## for sub-sections)
- Leave empty lines between sections for better readability

## Formatting Elements
- Use **bold** for important terms and concepts
- Use *italics* for emphasis and additional context
- Use \`code blocks\` for technical terms, commands, or syntax
- Use >>> for important notes or callouts

## Lists and Examples
- Use bullet points for unrelated items
- Use numbered lists for sequential steps
- Provide relevant examples in code blocks with proper syntax highlighting
- Include practical examples where applicable

## Your Query:
${prompt}

Remember to:
1. Keep the response clear and concise
2. Use proper spacing between sections
3. Highlight key information
4. Include relevant examples
5. End with a conclusion or summary if appropriate
`;
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

      const formattedPrompt = this.formatPrompt(prompt);
      const result = await this.chat.sendMessage(formattedPrompt);
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