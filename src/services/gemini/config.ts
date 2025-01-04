export const GEMINI_CONFIG = {
  API_KEY: import.meta.env.VITE_GEMINI_API_KEY,
  MODEL: "gemini-pro",
  MAX_TOKENS: 2048,
  TEMPERATURE: 0.9,
  TOP_P: 0.8,
  TOP_K: 16
} as const;