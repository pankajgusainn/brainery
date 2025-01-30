import React from 'react';
import { Brain } from 'lucide-react';
import { motion } from 'framer-motion';

export function BraineryHeader() {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center gap-3 py-6 mb-8"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", duration: 0.8 }}
    >
      <motion.div 
        className="relative"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        <motion.div 
          className="relative flex items-center gap-6 px-12 py-6 transition-all duration-500 perspective-1000"
          animate={{ 
            rotateX: [0, 5, 0],
            rotateY: [0, 10, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Brain icon with enhanced animation */}
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.2, rotate: 360 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 360, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Brain className="w-12 h-12 text-red-500 z-10" />
            </motion.div>
            <motion.div 
              className="absolute inset-0 bg-red-500 blur-xl opacity-50"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>

          {/* Text content with enhanced animation */}
          <motion.div 
            className="text-5xl font-bold tracking-tight relative z-10"
            whileHover={{ scale: 1.1 }}
          >
            <motion.div
              className="relative"
              animate={{ 
                color: [
                  "rgb(0, 255, 157)",
                  "rgb(0, 184, 212)",
                  "rgb(157, 0, 255)",
                  "rgb(0, 255, 157)"
                ]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <span className="relative z-10">BRAINERY</span>
              <motion.div
                className="absolute inset-0 blur-lg opacity-50"
                animate={{ 
                  background: [
                    "rgb(0, 255, 157)",
                    "rgb(0, 184, 212)",
                    "rgb(157, 0, 255)",
                    "rgb(0, 255, 157)"
                  ]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}