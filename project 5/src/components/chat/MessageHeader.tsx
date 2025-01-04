import React from 'react';
import { formatTimestamp } from '../../utils/dateFormatters';

interface MessageHeaderProps {
  timestamp: number;
}

export function MessageHeader({ timestamp }: MessageHeaderProps) {
  return (
    <div className="flex justify-between items-start mb-2">
      <span className="text-xs text-gray-400">
        {formatTimestamp(timestamp)}
      </span>
    </div>
  );
}