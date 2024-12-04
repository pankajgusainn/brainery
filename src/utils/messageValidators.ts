import { Message } from '../types/chat';

export function isValidMessage(message: Message): boolean {
  return (
    typeof message.content === 'string' &&
    message.content.trim().length > 0 &&
    typeof message.timestamp === 'number' &&
    (message.role === 'user' || message.role === 'assistant')
  );
}

export function hasValidSources(message: Message): boolean {
  return (
    Array.isArray(message.sources) &&
    message.sources.every(source => 
      typeof source.url === 'string' &&
      typeof source.title === 'string'
    )
  );
}

export function hasValidRelatedContent(message: Message): boolean {
  return (
    Array.isArray(message.relatedContent) &&
    message.relatedContent.every(content => 
      typeof content.url === 'string' &&
      typeof content.title === 'string'
    )
  );
}