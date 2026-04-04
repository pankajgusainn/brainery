import React, { useState } from 'react';
import { Send, Eraser, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

interface ChatInputProps {
  onSend: (message: string) => void;
  onClear: () => void;
  disabled: boolean;
}

export function ChatInput({ onSend, onClear, disabled }: ChatInputProps) {
  const [input, setInput] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setInput(text);
    setCharCount(text.length);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput('');
      setCharCount(0);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleRefresh = () => {
    if (disabled) return;
    
    setIsRefreshing(true);
    onSend(input || "Please provide an alternative response");
    
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="relative"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", duration: 0.5 }}
    >
      <motion.div 
        className="flex items-center rounded-xl bg-[rgba(13,13,13,0.95)] backdrop-blur-xl border border-[rgba(255,255,255,0.1)] shadow-lg overflow-hidden"
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        <textarea
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder="Ask Brainery"
          rows={1}
          className="flex-1 px-4 py-3 md:p-4 bg-transparent text-[#e0e0e0] placeholder-gray-500 focus:outline-none resize-none rounded-xl text-base transition-all duration-300"
          style={{
            boxShadow: 'inset 0 0 20px rgba(0,255,157,0.05)'
          }}
        />
        <div className="flex items-center gap-3 pr-4">
          <motion.span 
            className="text-xs md:text-sm text-gray-400"
            animate={{ 
              scale: charCount > 900 ? [1, 1.1, 1] : 1,
              color: charCount > 900 ? "#ff4444" : "#9ca3af"
            }}
            transition={{ duration: 0.3 }}
          >
            {charCount}/1000
          </motion.span>

          {/* Recycle Button */}
          <motion.button
            type="button"
            onClick={handleRefresh}
            disabled={disabled}
            className="p-1.5 md:p-2 text-gray-400 hover:text-[var(--accent-primary)] rounded-lg hover:bg-[rgba(0,255,157,0.1)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Generate alternative response"
          >
            <motion.div
              animate={isRefreshing ? { rotate: 360 } : {}}
              transition={{ duration: 1, ease: "linear" }}
            >
              <RefreshCw className="w-5 h-5" />
            </motion.div>
          </motion.button>
          
          <motion.button
            type="button"
            onClick={onClear}
            className="p-1.5 md:p-2 text-gray-400 hover:text-[var(--accent-primary)] rounded-lg hover:bg-[rgba(0,255,157,0.1)] transition-colors"
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            title="Clear chat history"
          >
            <Eraser className="w-5 h-5" />
          </motion.button>
          
          <motion.button
            type="submit"
            disabled={disabled || !input.trim()}
            className="p-1.5 md:p-2 bg-[var(--accent-primary)] text-black rounded-lg hover:bg-[var(--accent-secondary)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors hover:shadow-[0_0_20px_rgba(0,255,157,0.3)]"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={disabled ? { opacity: 0.5 } : { opacity: 1 }}
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.div>
    </motion.form>
  );
}