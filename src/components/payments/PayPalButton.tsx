import React, { useEffect } from 'react';

interface PayPalButtonProps {
  containerId: string;
}

declare global {
  interface Window {
    paypal: any;
  }
}

export function PayPalButton({ containerId }: PayPalButtonProps) {
  useEffect(() => {
    // Load PayPal SDK
    const script = document.createElement('script');
    script.src = 'https://www.paypal.com/sdk/js?client-id=BAAZlopGWyGY_43Ratu8erepu-QPDGiK9O-mJREADTBakyt-dGa8O5QJzAsWUCIayhhpeGncWQM0NBmsOI&components=hosted-buttons&enable-funding=venmo&currency=USD';
    script.async = true;
    
    script.onload = () => {
      if (window.paypal) {
        window.paypal.HostedButtons({
          hostedButtonId: "QXJYFKC5RTRDY",
        }).render(`#${containerId}`);
      }
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [containerId]);

  return <div id={containerId} className="w-full"></div>;
}