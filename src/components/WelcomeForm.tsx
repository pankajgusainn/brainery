import React, { useState } from 'react';
import { User, Calendar, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface WelcomeFormProps {
  onSubmit: (name: string, age: number) => void;
}

export function WelcomeForm({ onSubmit }: WelcomeFormProps) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [error, setError] = useState('');
  const [currentStep, setCurrentStep] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    if (!age || parseInt(age) < 13 || parseInt(age) > 120) {
      setError('Please enter a valid age between 13 and 120');
      return;
    }
    onSubmit(name, parseInt(age));
  };

  const handleNextStep = () => {
    if (name.trim().length >= 2) {
      setCurrentStep(1);
    } else {
      setError('Please enter your name');
    }
  };

  const formVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: { duration: 0.3 }
    }
  };

  const inputVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { duration: 0.5, type: "spring" }
    }
  };

  const backgroundVariants = {
    animate: {
      background: [
        'radial-gradient(circle at top left, rgba(0,255,157,0.1), transparent 50%)',
        'radial-gradient(circle at top right, rgba(0,184,212,0.1), transparent 50%)',
        'radial-gradient(circle at bottom right, rgba(157,0,255,0.1), transparent 50%)',
        'radial-gradient(circle at bottom left, rgba(0,255,157,0.1), transparent 50%)'
      ],
      transition: {
        duration: 10,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  return (
    <motion.div 
      className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="relative w-full max-w-md overflow-hidden"
        variants={formVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Animated background */}
        <motion.div
          className="absolute inset-0 opacity-30"
          variants={backgroundVariants}
          animate="animate"
        />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[var(--accent-primary)] rounded-full"
              animate={{
                x: [Math.random() * 400, Math.random() * 400],
                y: [Math.random() * 400, Math.random() * 400],
                scale: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          ))}
        </div>

        {/* Main content */}
        <div className="relative bg-[rgba(13,13,13,0.95)] border border-[rgba(0,255,157,0.2)] rounded-2xl p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-6 h-6 text-[var(--accent-primary)]" />
              <h2 className="text-2xl font-bold bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-transparent bg-clip-text">
                Welcome to Brainery
              </h2>
            </div>
            <p className="text-gray-400">
              Let's personalize your experience
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {currentStep === 0 ? (
                <motion.div
                  key="name"
                  variants={inputVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="space-y-2"
                >
                  <label className="block text-sm text-gray-300">What's your name?</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--accent-primary)]" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleNextStep();
                        }
                      }}
                      className="w-full pl-10 pr-4 py-3 bg-[rgba(0,0,0,0.3)] border border-[rgba(0,255,157,0.2)] rounded-lg text-white placeholder-gray-500 focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] transition-all duration-300"
                      placeholder="Enter your name"
                      autoFocus
                    />
                  </div>
                  <motion.button
                    type="button"
                    onClick={handleNextStep}
                    className="w-full mt-4 py-3 px-4 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-black font-semibold rounded-lg hover:opacity-90 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Next
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  key="age"
                  variants={inputVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="space-y-2"
                >
                  <label className="block text-sm text-gray-300">How old are you?</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--accent-primary)]" />
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      min="13"
                      max="120"
                      className="w-full pl-10 pr-4 py-3 bg-[rgba(0,0,0,0.3)] border border-[rgba(0,255,157,0.2)] rounded-lg text-white placeholder-gray-500 focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] transition-all duration-300"
                      placeholder="Enter your age"
                      autoFocus
                    />
                  </div>
                  <div className="flex gap-3">
                    <motion.button
                      type="button"
                      onClick={() => setCurrentStep(0)}
                      className="flex-1 py-3 px-4 bg-[rgba(0,255,157,0.1)] text-white font-semibold rounded-lg hover:bg-[rgba(0,255,157,0.2)] transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Back
                    </motion.button>
                    <motion.button
                      type="submit"
                      className="flex-1 py-3 px-4 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-black font-semibold rounded-lg hover:opacity-90 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Get Started
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm"
              >
                {error}
              </motion.p>
            )}
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}