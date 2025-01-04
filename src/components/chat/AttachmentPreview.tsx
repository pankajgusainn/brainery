import React from 'react';
import { X } from 'lucide-react';
import { Attachment } from '../../types/chat';

interface AttachmentPreviewProps {
  attachments: Attachment[];
  onRemove: (id: string) => void;
}

export function AttachmentPreview({ attachments, onRemove }: AttachmentPreviewProps) {
  if (attachments.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-2 p-2">
      {attachments.map((attachment) => (
        <div
          key={attachment.id}
          className="relative group rounded-lg overflow-hidden border border-[rgba(255,255,255,0.1)]"
        >
          {attachment.type === 'image' ? (
            <img
              src={attachment.previewUrl}
              alt="Preview"
              className="w-20 h-20 object-cover"
            />
          ) : (
            <div className="w-20 h-20 flex items-center justify-center bg-[rgba(0,255,157,0.1)]">
              <span className="text-xs text-gray-300 text-center px-2 break-words">
                {attachment.file.name}
              </span>
            </div>
          )}
          <button
            onClick={() => onRemove(attachment.id)}
            className="absolute top-1 right-1 p-1 rounded-full bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ))}
    </div>
  );
}