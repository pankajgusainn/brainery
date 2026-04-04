import { GoogleGenerativeAI } from '@google/generative-ai';

export async function testGeminiConnection(apiKey: string): Promise<boolean> {
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const result = await model.generateContent("Test connection");
    const response = await result.response;
    const text = response.text();
    
    return !!text; // Returns true if we got a valid response
  } catch (error) {
    console.error('Gemini API Connection Error:', error);
    return false;
  }
}