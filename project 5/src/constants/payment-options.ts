import { CircleDollarSign } from 'lucide-react';

export const PAYMENT_OPTIONS = [
  {
    id: 'paypal',
    title: 'Pay with PayPal',
    description: 'Quick and easy PayPal checkout',
    icon: CircleDollarSign,
    onClick: () => {
      // This will be implemented when PayPal credentials are provided
      console.log('PayPal integration pending');
      window.open('https://www.paypal.com', '_blank');
    }
  }
] as const;