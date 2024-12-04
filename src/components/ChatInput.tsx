import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { FileUploadButton } from './chat/FileUploadButton';
import { AttachmentPreview } from './chat/AttachmentPreview';
import { Attachment } from '../types/chat';

interface ChatInputProps {
  onSend: (message: string, attachments?: Attachment[]) => void;
  disabled: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [attachments, setAttachments] = useState<Attachment[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setInput(text);
    setCharCount(text.length);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((input.trim() || attachments.length > 0) && !disabled) {
      onSend(input.trim(), attachments);
      setInput('');
      setCharCount(0);
      setAttachments([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleFileSelect = (newAttachments: Attachment[]) => {
    setAttachments(prev => [...prev, ...newAttachments]);
  };

  const handleRemoveAttachment = (id: string) => {
    setAttachments(prev => {
      const filtered = prev.filter(attachment => attachment.id !== id);
      prev
        .filter(attachment => attachment.id === id)
        .forEach(attachment => URL.revokeObjectURL(attachment.previewUrl));
      return filtered;
    });
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex flex-col rounded-xl bg-[rgba(13,13,13,0.95)] backdrop-blur-xl border border-[rgba(255,255,255,0.1)] shadow-lg">
        <textarea
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder="Ask Brainery"
          rows={1}
          className="w-full px-4 py-3 md:p-4 bg-transparent text-[#e0e0e0] placeholder-gray-500 focus:outline-none resize-none rounded-xl text-base"
          style={{
            boxShadow: 'inset 0 0 20px rgba(0,255,157,0.05)'
          }}
        />
        <AttachmentPreview 
          attachments={attachments}
          onRemove={handleRemoveAttachment}
        />
        <div className="flex items-center justify-between p-2 border-t border-[rgba(255,255,255,0.1)]">
          <div className="flex gap-2">
            <FileUploadButton
              onFileSelect={handleFileSelect}
              type="document"
            />
            <FileUploadButton
              onFileSelect={handleFileSelect}
              type="image"
            />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs md:text-sm text-gray-400">{charCount}/1000</span>
            <button
              type="submit"
              disabled={disabled || (!input.trim() && attachments.length === 0)}
              className="p-1.5 md:p-2 bg-[var(--accent-primary)] text-black rounded-lg hover:bg-[var(--accent-secondary)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors hover:shadow-[0_0_20px_rgba(0,255,157,0.3)]"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}