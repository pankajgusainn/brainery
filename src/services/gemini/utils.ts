import { SYSTEM_PROMPTS } from './prompts';

export function formatPrompt(userPrompt: string): string {
  return `${SYSTEM_PROMPTS.DEFAULT}\n\n## Your Query:\n${userPrompt}`;
}

export function extractJsonFromText(text: string): any {
  try {
    const start = text.indexOf('[');
    const end = text.lastIndexOf(']') + 1;
    if (start === -1 || end === 0) return null;
    
    const jsonStr = text.substring(start, end);
    return JSON.parse(jsonStr);
  } catch {
    return null;
  }
}

export function validateApiKey(apiKey: string | undefined): string {
  if (!apiKey) {
    throw new Error('Gemini API key not found. Please check your environment configuration.');
  }
  return apiKey;
}