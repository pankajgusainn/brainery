import React, { useState } from 'react';
import { User, Calendar } from 'lucide-react';

interface WelcomeFormProps {
  onSubmit: (name: string, age: number) => void;
}

export function WelcomeForm({ onSubmit }: WelcomeFormProps) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [error, setError] = useState('');

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative w-full max-w-md p-6 rounded-2xl bg-[rgba(13,13,13,0.95)] border border-[rgba(0,255,157,0.2)] shadow-[0_0_50px_rgba(0,255,157,0.1)]">
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[rgba(0,255,157,0.1)] to-transparent" />
        </div>
        
        <div className="relative">
          <h2 className="text-2xl font-semibold text-white mb-6">Welcome to AI Chat</h2>
          <p className="text-gray-400 mb-6">Please tell us a bit about yourself to get started</p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm text-gray-300">Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--accent-primary)]" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-[rgba(0,0,0,0.3)] border border-[rgba(0,255,157,0.2)] rounded-lg text-white placeholder-gray-500 focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] transition-colors"
                  placeholder="Enter your name"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm text-gray-300">Age</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--accent-primary)]" />
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  min="13"
                  max="120"
                  className="w-full pl-10 pr-4 py-2 bg-[rgba(0,0,0,0.3)] border border-[rgba(0,255,157,0.2)] rounded-lg text-white placeholder-gray-500 focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] transition-colors"
                  placeholder="Enter your age"
                />
              </div>
            </div>
            
            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}
            
            <button
              type="submit"
              className="w-full py-2 px-4 bg-[var(--accent-primary)] text-black rounded-lg hover:bg-[var(--accent-secondary)] transition-colors duration-300 hover:shadow-[0_0_20px_rgba(0,255,157,0.3)]"
            >
              Get Started
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}