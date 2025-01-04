export function validateApiKey(apiKey: string | undefined): string {
  if (!apiKey) {
    throw new Error('Gemini API key not found');
  }
  return apiKey;
}

export function formatPrompt(prompt: string): string {
  return prompt.trim();
}

export function parseGeminiResponse(response: any) {
  try {
    const { candidates } = response;
    if (!candidates || candidates.length === 0) {
      throw new Error('No response candidates found');
    }
    
    const { content } = candidates[0];
    if (!content || !content.parts || content.parts.length === 0) {
      throw new Error('Invalid response format');
    }

    return content.parts[0].text;
  } catch (error) {
    console.error('Error parsing Gemini response:', error);
    throw new Error('Failed to parse API response');
  }
}