import React from 'react';
import { CreditCard } from 'lucide-react';
import { PAYMENT_BUTTON_STYLES } from '../../constants/styles';

interface CardPaymentProps {
  onClose: () => void;
  url: string;
}

export function CardPayment({ onClose, url }: CardPaymentProps) {
  const handleClick = () => {
    window.open(url, '_blank');
    onClose();
  };

  return (
    <div className="w-full flex flex-col items-center">
      <button
        onClick={handleClick}
        className={PAYMENT_BUTTON_STYLES}
      >
        Pay with Card
      </button>
      <div className="flex items-center justify-center gap-2 mt-2">
        <img 
          src="https://js.stripe.com/v3/fingerprinted/img/visa-729c05c240c4bdb47b03ac81d9945bfe.svg" 
          alt="Visa"
          className="h-6"
        />
        <img 
          src="https://js.stripe.com/v3/fingerprinted/img/mastercard-4d8844094130711885b5e41b28c9848f.svg" 
          alt="Mastercard"
          className="h-6"
        />
        <img 
          src="https://js.stripe.com/v3/fingerprinted/img/amex-a49b82f46c5cd6a96a6e418a6ca1717c.svg" 
          alt="American Express"
          className="h-6"
        />
        <img 
          src="https://js.stripe.com/v3/fingerprinted/img/discover-ac52cd46f89fa40a29a0bfb954e33173.svg" 
          alt="Discover"
          className="h-6"
        />
      </div>
      <div className="mt-2 text-gray-400 text-sm text-center">
        Powered by <span className="text-[#635BFF] font-semibold">Stripe</span>
      </div>
    </div>
  );
}