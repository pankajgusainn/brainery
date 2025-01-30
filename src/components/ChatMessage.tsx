import React, { useState } from 'react';
import { User, Bot, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Message } from '../../types/chat';
import { MessageHeader } from './MessageHeader';
import { MessageContent } from './MessageContent';
import { MessageSources } from './MessageSources';
import { hasValidSources, hasValidRelatedContent } from '../../utils/messageValidators';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const [showSources, setShowSources] = useState(false);
  const isUser = message.role === 'user';
  const hasSources = hasValidSources(message);
  const hasRelated = hasValidRelatedContent(message);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", duration: 0.5 }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
    >
      <motion.div 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`w-8 h-8 rounded-full flex items-center justify-center ${
          isUser ? 'bg-[var(--accent-primary)]' : 'bg-[rgba(0,255,157,0.2)]'
        }`}
      >
        {isUser ? 
          <User className="w-5 h-5 text-black" /> : 
          <Bot className="w-5 h-5 text-[var(--accent-primary)]" />
        }
      </motion.div>
      
      <motion.div 
        className={`flex-1 ${isUser ? 'items-end' : 'items-start'}`}
        initial={{ x: isUser ? 20 : -20 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <motion.div 
          className={`px-4 py-3 rounded-lg backdrop-blur-lg transform-gpu perspective-1000 ${
            isUser 
              ? 'bg-[rgba(0,255,157,0.1)] border border-[rgba(0,255,157,0.2)]' 
              : 'bg-[rgba(13,13,13,0.95)] border border-[rgba(255,255,255,0.1)]'
          }`}
          whileHover={{ scale: 1.01, rotateX: 2, rotateY: isUser ? -2 : 2 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <MessageHeader timestamp={message.timestamp} />
          <MessageContent content={message.content} />
          
          {(hasSources || hasRelated) && (
            <motion.button
              onClick={() => setShowSources(!showSources)}
              className="mt-3 text-sm text-gray-400 flex items-center gap-1 hover:text-[var(--accent-primary)]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: showSources ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {showSources ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </motion.div>
              {showSources ? 'Hide sources' : 'Show sources'}
            </motion.button>
          )}
          
          <AnimatePresence>
            {showSources && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-3 border-t border-[rgba(255,255,255,0.1)] pt-3">
                  {hasSources && <MessageSources sources={message.sources!} />}
                  {hasRelated && <MessageSources sources={message.relatedContent!} isRelated />}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}