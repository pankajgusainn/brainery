import React from 'react';
import { EXTERNAL_LINKS } from '../constants/links';

export function DeveloperCredit() {
  return (
    <div className="fixed bottom-2 right-2 text-xs text-gray-400 bg-[rgba(13,13,13,0.95)] px-3 py-1.5 rounded-full border border-[rgba(0,255,157,0.2)] backdrop-blur-sm">
      Developed by{' '}
      <a
        href={EXTERNAL_LINKS.DEVELOPER_PORTFOLIO}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[var(--accent-primary)] hover:text-[var(--accent-secondary)] transition-colors"
      >
        Pankaj Gusain
      </a>
    </div>
  );
}