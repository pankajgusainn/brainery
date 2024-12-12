import { CreditCard } from 'lucide-react';

export const PAYMENT_OPTIONS = [
  {
    id: 'card',
    title: 'Secure Card Payment',
    description: 'Pay securely with your credit or debit card',
    icon: CreditCard,
    url: 'https://buy.stripe.com/28o9Ea4kBbD6fm0000'
  }
] as const;