import React, { useRef } from 'react';
import { Image, Paperclip } from 'lucide-react';
import { Attachment } from '../../types/chat';

interface FileUploadButtonProps {
  onFileSelect: (attachments: Attachment[]) => void;
  type: 'image' | 'document';
}

export function FileUploadButton({ onFileSelect, type }: FileUploadButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    const newAttachments: Attachment[] = files.map(file => ({
      id: Math.random().toString(36).substring(7),
      file,
      previewUrl: URL.createObjectURL(file),
      type
    }));

    onFileSelect(newAttachments);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className="p-1.5 md:p-2 text-gray-400 hover:text-[var(--accent-primary)] rounded-lg hover:bg-[rgba(0,255,157,0.1)] transition-colors"
      >
        {type === 'image' ? (
          <Image className="w-5 h-5" />
        ) : (
          <Paperclip className="w-5 h-5" />
        )}
      </button>
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept={type === 'image' ? 'image/*' : undefined}
        multiple
        onChange={handleFileChange}
      />
    </>
  );
}