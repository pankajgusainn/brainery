import { 
  Brain, Code, Lightbulb, Rocket, User, Mail, FileText, Settings, 
  Palette, Book, Globe, Terminal, Music, Camera, Coffee, Heart,
  Laptop, Microscope, Star, Cloud, Database, Cpu, Smartphone,
  Calculator, Map, Compass, TreePine, Leaf, Flower2
} from 'lucide-react';

// Base topics for generating combinations
const topics = [
  'AI', 'Technology', 'Science', 'Art', 'Business', 'Health',
  'Environment', 'Space', 'History', 'Literature', 'Music',
  'Programming', 'Design', 'Mathematics', 'Philosophy'
];

const actions = [
  'Explain', 'Compare', 'Analyze', 'Generate', 'Optimize',
  'Debug', 'Create', 'Improve', 'Transform', 'Solve'
];

const contexts = [
  'for beginners', 'in simple terms', 'with examples',
  'step by step', 'in detail', 'with best practices',
  'using analogies', 'for practical use'
];

// Function to generate dynamic prompts
function generateDynamicPrompt() {
  const topic = topics[Math.floor(Math.random() * topics.length)];
  const action = actions[Math.floor(Math.random() * actions.length)];
  const context = contexts[Math.floor(Math.random() * contexts.length)];
  return `${action} ${topic} ${context}`;
}

// Static prompt sets
const staticPrompts = [
  [
    { icon: Brain, text: "Explain quantum computing in simple terms" },
    { icon: Code, text: "Help me debug this JavaScript code" },
    { icon: Lightbulb, text: "Generate creative ideas for a startup" },
    { icon: Rocket, text: "What are the latest trends in space technology?" }
  ],
  [
    { icon: Palette, text: "Design a color scheme for my website" },
    { icon: Book, text: "Recommend books based on my interests" },
    { icon: Globe, text: "Explain current global economic trends" },
    { icon: Terminal, text: "Show me useful terminal commands" }
  ],
  [
    { icon: Music, text: "Create a playlist based on my mood" },
    { icon: Camera, text: "Give photography composition tips" },
    { icon: Coffee, text: "Suggest productivity techniques" },
    { icon: Heart, text: "Share mindfulness exercises" }
  ],
  [
    { icon: TreePine, text: "Explain environmental sustainability" },
    { icon: Database, text: "Compare different database types" },
    { icon: Cpu, text: "How do quantum processors work?" },
    { icon: Leaf, text: "Describe photosynthesis process" }
  ]
];

// All available icons for dynamic prompts
const allIcons = [
  Brain, Code, Lightbulb, Rocket, User, Mail, FileText, Settings,
  Palette, Book, Globe, Terminal, Music, Camera, Coffee, Heart,
  Laptop, Microscope, Star, Cloud, Database, Cpu, Smartphone,
  Calculator, Map, Compass, TreePine, Leaf, Flower2
];

export function generatePromptSet() {
  // 50% chance to return a static prompt set
  if (Math.random() < 0.5 && staticPrompts.length > 0) {
    return staticPrompts[Math.floor(Math.random() * staticPrompts.length)];
  }

  // Generate dynamic prompt set
  return Array.from({ length: 4 }, () => ({
    icon: allIcons[Math.floor(Math.random() * allIcons.length)],
    text: generateDynamicPrompt()
  }));
}