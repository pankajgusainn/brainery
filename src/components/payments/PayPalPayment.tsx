import React from 'react';

export function PayPalPayment() {
  return (
    <div className="w-full">
      <style>
        {`.pp-QXJYFKC5RTRDY {
          text-align: center;
          border: none;
          border-radius: 1.5rem;
          min-width: 11.625rem;
          padding: 0 2rem;
          height: 2.625rem;
          font-weight: bold;
          background-color: #FFD140;
          color: #000000;
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: 1rem;
          line-height: 1.25rem;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .pp-QXJYFKC5RTRDY:hover {
          background-color: #f4c73b;
        }`}
      </style>
      <form 
        action="https://www.paypal.com/ncp/payment/QXJYFKC5RTRDY" 
        method="post" 
        target="_top" 
        className="inline-grid justify-items-center content-start gap-2 w-full"
      >
        <input className="pp-QXJYFKC5RTRDY w-full" type="submit" value="PayPal" />
        <img src="https://www.paypalobjects.com/images/Debit_Credit_APM.svg" alt="Payment Methods" className="h-6" />
        <div className="text-gray-400 text-sm text-center flex items-center justify-center gap-1">
          Powered by PayPal
        </div>
      </form>
    </div>
  );
}