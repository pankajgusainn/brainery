const fetch = require('node-fetch');

async function testGeminiAPI() {
  const API_KEY = process.env.VITE_GEMINI_API_KEY;
  const MODEL = 'gemini-pro';
  const API_URL = `https://generativelanguage.googleapis.com/v1/models/${MODEL}:generateContent`;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: 'What is artificial intelligence?'
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Gemini Response:', data);
  } catch (error) {
    console.error('Test failed:', error);
  }
}