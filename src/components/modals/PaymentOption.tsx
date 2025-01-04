import React from 'react';
import { LucideIcon } from 'lucide-react';

interface PaymentOptionProps {
  title: string;
  description: string;
  icon: LucideIcon;
  url: string;
  onClose: () => void;
}

export function PaymentOption({ 
  title, 
  description, 
  icon: Icon,
  url,
  onClose
}: PaymentOptionProps) {
  const handleClick = () => {
    window.open(url, '_blank');
    onClose();
  };

  return (
    <div className="w-full flex flex-col items-center">
      <button
        onClick={handleClick}
        className="w-full text-center border-none rounded-3xl min-w-[11.625rem] px-8 h-[2.625rem] font-bold bg-[#FFD140] text-black font-['Helvetica Neue',Arial,sans-serif] text-base leading-5 cursor-pointer hover:bg-[#f4c73b] transition-colors duration-300"
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