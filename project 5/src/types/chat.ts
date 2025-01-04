export interface Source {
  url: string;
  title: string;
  snippet?: string;
}

export interface RelatedContent {
  title: string;
  url: string;
  description?: string;
}

export interface Attachment {
  id: string;
  file: File;
  previewUrl: string;
  type: 'image' | 'document';
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  sources?: Source[];
  relatedContent?: RelatedContent[];
  timestamp: number;
  attachments?: Attachment[];
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}