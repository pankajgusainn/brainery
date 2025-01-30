import {
  Brain, Code, Lightbulb, Rocket, User, Mail, FileText, Settings,
  Palette, Book, Globe, Terminal, Music, Camera, Coffee, Heart,
  Laptop, Microscope, Star, Cloud, Database, Cpu, Smartphone,
  Calculator, Map, Compass, TreePine, Leaf, Flower2, Utensils,
  DollarSign, Dumbbell, Stethoscope, Briefcase, GraduationCap,
  Plane, Home, Car, ShoppingCart, PiggyBank, Bike, Film,
  Gamepad2, Shirt, Camera, Newspaper, Wrench
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface PromptCategory {
  name: string;
  icon: LucideIcon;
  prompts: string[];
}

export const categories: PromptCategory[] = [
  {
    name: 'Technology',
    icon: Laptop,
    prompts: [
      "Explain quantum computing in simple terms",
      "Compare different cloud platforms",
      "Latest trends in artificial intelligence",
      "How to protect against cyber threats",
      "Future of autonomous vehicles",
      "Blockchain technology explained"
    ]
  },
  {
    name: 'Health & Wellness',
    icon: Heart,
    prompts: [
      "Best practices for mental health",
      "Quick stress relief techniques",
      "Benefits of meditation",
      "Healthy sleep habits",
      "Natural immunity boosters",
      "Work-life balance tips"
    ]
  },
  {
    name: 'Finance',
    icon: DollarSign,
    prompts: [
      "Beginner's guide to investing",
      "Cryptocurrency investment tips",
      "Personal budgeting strategies",
      "Understanding stock markets",
      "Retirement planning basics",
      "Tax saving strategies"
    ]
  },
  {
    name: 'Food & Cooking',
    icon: Utensils,
    prompts: [
      "Quick healthy breakfast ideas",
      "Mediterranean diet recipes",
      "Meal prep for beginners",
      "Vegetarian protein sources",
      "International cuisine guide",
      "Baking tips and tricks"
    ]
  },
  {
    name: 'Education',
    icon: GraduationCap,
    prompts: [
      "Effective study techniques",
      "Learning new languages tips",
      "Memory improvement methods",
      "Online learning resources",
      "Career development advice",
      "Public speaking skills"
    ]
  },
  {
    name: 'Fitness',
    icon: Dumbbell,
    prompts: [
      "Home workout routines",
      "Weight loss exercise plan",
      "Strength training basics",
      "Running tips for beginners",
      "Yoga poses for flexibility",
      "HIIT workout guide"
    ]
  },
  {
    name: 'Business',
    icon: Briefcase,
    prompts: [
      "Starting a small business",
      "Digital marketing strategies",
      "Leadership skills development",
      "Remote team management",
      "Business plan writing",
      "Networking tips"
    ]
  },
  {
    name: 'Travel',
    icon: Plane,
    prompts: [
      "Budget travel tips",
      "Solo travel safety",
      "Best destinations 2024",
      "Packing tips for long trips",
      "Cultural etiquette guide",
      "Adventure travel ideas"
    ]
  },
  {
    name: 'Home & Living',
    icon: Home,
    prompts: [
      "Home organization tips",
      "Indoor plant care guide",
      "DIY home improvements",
      "Energy saving tips",
      "Interior design basics",
      "Sustainable living practices"
    ]
  },
  {
    name: 'Entertainment',
    icon: Film,
    prompts: [
      "Must-watch movies 2024",
      "Best TV series recommendations",
      "Video game suggestions",
      "Book recommendations",
      "Podcast suggestions",
      "Music playlist creation"
    ]
  }
];