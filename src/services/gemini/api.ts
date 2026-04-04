import { GEMINI_CONFIG, GEMINI_ENDPOINTS } from '../../config/gemini';

export async function generateContent(prompt: string) {
  try {
    const response = await fetch(GEMINI_ENDPOINTS.GENERATE_CONTENT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GEMINI_CONFIG.API_KEY}`
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw new Error('Failed to generate content');
  }
}

export async function streamContent(prompt: string) {
  try {
    const response = await fetch(GEMINI_ENDPOINTS.STREAM_CONTENT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GEMINI_CONFIG.API_KEY}`
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.body;
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw new Error('Failed to stream content');
  }
}