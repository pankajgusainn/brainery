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
    >
      <ReactMarkdown 
        className="prose prose-invert max-w-none 
          prose-headings:text-[var(--accent-primary)] 
          prose-headings:font-semibold 
          prose-h1:text-2xl prose-h1:mb-6 prose-h1:mt-8
          prose-h2:text-xl prose-h2:mb-4 prose-h2:mt-6
          prose-h3:text-lg prose-h3:mb-3 prose-h3:mt-4
          prose-p:mb-4 prose-p:leading-relaxed prose-p:text-gray-200
          prose-ul:my-4 prose-ul:list-disc prose-ul:pl-6
          prose-ol:my-4 prose-ol:list-decimal prose-ol:pl-6
          prose-li:mb-2 prose-li:text-gray-300
          prose-code:text-[var(--accent-secondary)]
          prose-code:bg-[rgba(0,255,157,0.1)]
          prose-code:px-2 prose-code:py-0.5 prose-code:rounded-md
          prose-pre:bg-[rgba(0,0,0,0.3)]
          prose-pre:border prose-pre:border-[rgba(255,255,255,0.1)]
          prose-pre:p-4 prose-pre:rounded-lg prose-pre:my-4
          prose-blockquote:border-l-4
          prose-blockquote:border-[var(--accent-primary)]
          prose-blockquote:pl-4 prose-blockquote:py-1
          prose-blockquote:my-4 prose-blockquote:bg-[rgba(0,255,157,0.05)]
          prose-blockquote:rounded-r-lg
          prose-strong:text-[var(--accent-primary)]
          prose-em:text-gray-300
          [&>*:first-child]:mt-0
          [&>*:last-child]:mb-0
          [&_a]:text-[var(--accent-primary)]
          [&_a:hover]:text-[var(--accent-secondary)]
          [&_a]:underline
          [&_a]:transition-colors
          [&_table]:w-full
          [&_table]:border-collapse
          [&_th]:bg-[rgba(0,255,157,0.1)]
          [&_th]:p-2
          [&_td]:border
          [&_td]:border-[rgba(255,255,255,0.1)]
          [&_td]:p-2
          [&_hr]:border-[rgba(255,255,157,0.2)]
          [&_hr]:my-6
          [&_img]:rounded-lg
          [&_img]:border
          [&_img]:border-[rgba(255,255,255,0.1)]
          [&_img]:shadow-lg
          [&_details]:bg-[rgba(0,255,157,0.05)]
          [&_details]:rounded-lg
          [&_details]:p-4
          [&_details]:border
          [&_details]:border-[rgba(255,255,157,0.2)]
          [&_summary]:cursor-pointer
          [&_summary:hover]:text-[var(--accent-primary)]"
        components={{
          h1: ({ node, ...props }) => (
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              {...props}
            />
          ),
          h2: ({ node, ...props }) => (
            <motion.h2
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              {...props}
            />
          ),
          h3: ({ node, ...props }) => (
            <motion.h3
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              {...props}
            />
          ),
          blockquote: ({ node, ...props }) => (
            <motion.blockquote
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              {...props}
            />
          ),
          pre: ({ node, ...props }) => (
            <motion.pre
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              {...props}
            />
          ),
          ul: ({ node, ...props }) => (
            <motion.ul
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              {...props}
            />
          ),
          ol: ({ node, ...props }) => (
            <motion.ol
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              {...props}
            />
          )
        }}
      >
        {content}
      </ReactMarkdown>
    </motion.div>
  );
}