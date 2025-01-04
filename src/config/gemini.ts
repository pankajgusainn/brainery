export const GEMINI_CONFIG = {
  API_KEY: import.meta.env.VITE_GEMINI_API_KEY,
  BASE_URL: 'https://generativelanguage.googleapis.com/v1',
  MODEL: 'gemini-pro',
  PROJECT_ID: '888317241843',
  LOCATION: 'us-central1',
  MAX_TOKENS: 2048,
  TEMPERATURE: 0.9
} as const;

export const GEMINI_ENDPOINTS = {
  GENERATE_CONTENT: `${GEMINI_CONFIG.BASE_URL}/models/${GEMINI_CONFIG.MODEL}:generateContent`,
  STREAM_CONTENT: `${GEMINI_CONFIG.BASE_URL}/models/${GEMINI_CONFIG.MODEL}:streamGenerateContent`
} as const;