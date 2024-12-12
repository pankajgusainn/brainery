import React from 'react';
import { X } from 'lucide-react';
import { CardPayment } from '../payments/CardPayment';
import { PayPalPayment } from '../payments/PayPalPayment';
import { PAYMENT_OPTIONS } from '../../constants/payments';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SupportModal({ isOpen, onClose }: SupportModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="min-h-screen w-full flex items-center justify-center p-4">
        <div className="relative w-full max-w-md bg-[rgba(13,13,13,0.95)] border border-[rgba(0,255,157,0.2)] rounded-xl shadow-lg">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-white mb-2">Support Our Project</h2>
              <p className="text-gray-400">Choose your preferred payment method to support our work.</p>
            </div>

            <div className="space-y-6">
              {/* Card Payment */}
              <CardPayment 
                url={PAYMENT_OPTIONS[0].url} 
                onClose={onClose} 
              />
              
              {/* PayPal Payment */}
              <PayPalPayment />
            </div>

            <div className="mt-6 pt-4 border-t border-[rgba(255,255,255,0.1)]">
              <p className="text-xs text-gray-400 text-center">
                All payments are secure and encrypted. By making a payment, you agree to our terms of service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}