import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_CONFIG } from './config';

export async function makeFirstRequest() {
  try {
    const genAI = new GoogleGenerativeAI(GEMINI_CONFIG.API_KEY);
    const model = genAI.getGenerativeModel({ model: GEMINI_CONFIG.MODEL });

    const prompt = "Explain how AI works";
    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    return response.text();
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw new Error('Failed to generate content: ' + (error as Error).message);
  }
}