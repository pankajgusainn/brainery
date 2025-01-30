import React from 'react';
import { Link, ExternalLink } from 'lucide-react';
import { Source, RelatedContent } from '../../types/chat';

interface MessageSourcesProps {
  sources: Source[] | RelatedContent[];
  isRelated?: boolean;
}

export function MessageSources({ sources, isRelated = false }: MessageSourcesProps) {
  return (
    <div className="mt-4 space-y-3">
      <h4 className="text-sm font-semibold text-gray-300">
        {isRelated ? 'Related Content:' : 'Sources:'}
      </h4>
      <ul className="space-y-3">
        {sources.map((source, index) => (
          <li key={index} className="text-sm">
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[var(--accent-primary)] hover:text-[var(--accent-secondary)]"
            >
              {isRelated ? <ExternalLink className="w-4 h-4" /> : <Link className="w-4 h-4" />}
              {source.title}
              <ExternalLink className="w-3 h-3" />
            </a>
            {(source as Source).snippet && (
              <p className="mt-2 text-gray-400 text-xs leading-relaxed">
                {(source as Source).snippet}
              </p>
            )}
            {(source as RelatedContent).description && (
              <p className="mt-2 text-gray-400 text-xs leading-relaxed">
                {(source as RelatedContent).description}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}