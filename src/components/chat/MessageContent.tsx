import React from 'react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';

interface MessageContentProps {
  content: string;
}

export function MessageContent({ content }: MessageContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-none text-gray-200"
    >
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <motion.h1
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold text-[var(--accent-primary)] mt-6 mb-4"
            >
              {children}
            </motion.h1>
          ),

          h2: ({ children }) => (
            <motion.h2
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl font-semibold text-[var(--accent-primary)] mt-6 mb-3"
            >
              {children}
            </motion.h2>
          ),

          h3: ({ children }) => (
            <h3 className="text-lg font-semibold text-[var(--accent-primary)] mt-5 mb-2">
              {children}
            </h3>
          ),

          p: ({ children }) => (
            <p className="mb-4 leading-7 text-gray-200">
              {children}
            </p>
          ),

          ul: ({ children }) => (
            <ul className="my-4 ml-6 list-disc space-y-2">
              {children}
            </ul>
          ),

          ol: ({ children }) => (
            <ol className="my-4 ml-6 list-decimal space-y-2">
              {children}
            </ol>
          ),

          li: ({ children }) => (
            <li className="leading-7 text-gray-200">
              {children}
            </li>
          ),

          strong: ({ children }) => (
            <strong className="font-semibold text-white">
              {children}
            </strong>
          ),

          em: ({ children }) => (
            <em className="text-gray-300">
              {children}
            </em>
          ),

          code: ({ children, className }) => {
            const isBlock = className?.includes('language-');

            if (isBlock) {
              return (
                <code className="block">
                  {children}
                </code>
              );
            }

            return (
              <code className="rounded bg-white/10 px-1.5 py-0.5 text-sm text-[var(--accent-secondary)]">
                {children}
              </code>
            );
          },

          pre: ({ children }) => (
            <pre className="my-5 overflow-x-auto rounded-lg border border-white/10 bg-black/40 p-4">
              {children}
            </pre>
          ),

          blockquote: ({ children }) => (
            <blockquote className="my-5 border-l-4 border-[var(--accent-primary)] bg-white/5 py-2 pl-4 text-gray-300">
              {children}
            </blockquote>
          ),

          table: ({ children }) => (
            <div className="my-6 overflow-x-auto">
              <table className="w-full border-collapse text-left">
                {children}
              </table>
            </div>
          ),

          thead: ({ children }) => (
            <thead className="bg-white/10">
              {children}
            </thead>
          ),

          th: ({ children }) => (
            <th className="border border-white/10 px-4 py-3 font-semibold text-white">
              {children}
            </th>
          ),

          td: ({ children }) => (
            <td className="border border-white/10 px-4 py-3 text-gray-300">
              {children}
            </td>
          ),

          hr: () => (
            <hr className="my-6 border-white/10" />
          ),

          a: ({ children, href }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent-primary)] underline hover:text-[var(--accent-secondary)]"
            >
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </motion.div>
  );
}
