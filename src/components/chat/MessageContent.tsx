import React from 'react';
import ReactMarkdown from 'react-markdown';

interface MessageContentProps {
  content: string;
}

export function MessageContent({ content }: MessageContentProps) {
  return (
    <ReactMarkdown className="prose prose-invert max-w-none prose-p:mb-4 prose-p:leading-relaxed">
      {content}
    </ReactMarkdown>
  );
}