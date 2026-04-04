import { generateContent } from './services/gemini/api';
import { parseGeminiResponse } from './utils/gemini';

async function testGeminiAPI() {
  try {
    const response = await generateContent('What is artificial intelligence?');
    const result = parseGeminiResponse(response);
    console.log('Gemini Response:', result);
  } catch (error) {
    console.error('Test failed:', error);
  }
}

testGeminiAPI();