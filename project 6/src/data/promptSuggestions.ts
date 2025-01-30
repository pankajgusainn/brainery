import { categories } from './promptCategories';
import { LucideIcon } from 'lucide-react';

interface Suggestion {
  icon: LucideIcon;
  text: string;
}

export function generatePromptSet(): Suggestion[] {
  const suggestions: Suggestion[] = [];
  const usedCategories = new Set<number>();

  // Select 4 random categories
  while (suggestions.length < 4) {
    const categoryIndex = Math.floor(Math.random() * categories.length);
    
    if (!usedCategories.has(categoryIndex)) {
      usedCategories.add(categoryIndex);
      const category = categories[categoryIndex];
      
      // Get a random prompt from the category
      const promptIndex = Math.floor(Math.random() * category.prompts.length);
      
      suggestions.push({
        icon: category.icon,
        text: category.prompts[promptIndex]
      });
    }
  }

  return suggestions;
}