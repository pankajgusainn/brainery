export class GeminiError extends Error {
  constructor(message: string, public readonly cause?: unknown) {
    super(message);
    this.name = 'GeminiError';
  }
}

export class GeminiInitializationError extends GeminiError {
  constructor(message: string, cause?: unknown) {
    super(`Failed to initialize Gemini AI: ${message}`, cause);
    this.name = 'GeminiInitializationError';
  }
}

export class GeminiResponseError extends GeminiError {
  constructor(message: string, cause?: unknown) {
    super(`Failed to generate response: ${message}`, cause);
    this.name = 'GeminiResponseError';
  }
}