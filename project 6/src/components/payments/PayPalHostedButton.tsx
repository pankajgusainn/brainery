import React, { useEffect, useRef } from 'react';

interface PayPalHostedButtonProps {
  containerId: string;
  onButtonClick?: () => void;
}

declare global {
  interface Window {
    paypal: any;
  }
}

export function PayPalHostedButton({ containerId, onButtonClick }: PayPalHostedButtonProps) {
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const hasScriptLoaded = useRef(false);
  const hasButtonRendered = useRef(false);

  const renderPayPalButton = () => {
    if (window.paypal && containerRef.current && !hasButtonRendered.current) {
      try {
        window.paypal.HostedButtons({
          hostedButtonId: "QXJYFKC5RTRDY",
          onApprove: () => {
            if (onButtonClick) {
              onButtonClick();
            }
          }
        }).render(`#${containerId}`);
        hasButtonRendered.current = true;
      } catch (error) {
        console.error('Failed to render PayPal button:', error);
      }
    }
  };

  useEffect(() => {
    // Check if script is already loaded
    if (hasScriptLoaded.current) {
      renderPayPalButton();
      return;
    }

    // Create and load PayPal SDK script
    const script = document.createElement('script');
    script.src = 'https://www.paypal.com/sdk/js?client-id=BAAZlopGWyGY_43Ratu8erepu-QPDGiK9O-mJREADTBakyt-dGa8O5QJzAsWUCIayhhpeGncWQM0NBmsOI&components=hosted-buttons&enable-funding=venmo&currency=USD';
    script.async = true;
    script.crossOrigin = "anonymous";
    scriptRef.current = script;

    const handleLoad = () => {
      hasScriptLoaded.current = true;
      renderPayPalButton();
    };

    // Add both script.onload and DOMContentLoaded handlers
    script.addEventListener('load', handleLoad);
    
    const domLoadedHandler = () => {
      if (hasScriptLoaded.current) {
        renderPayPalButton();
      }
    };
    
    document.addEventListener('DOMContentLoaded', domLoadedHandler);
    document.body.appendChild(script);

    return () => {
      script.removeEventListener('load', handleLoad);
      document.removeEventListener('DOMContentLoaded', domLoadedHandler);
      if (scriptRef.current && document.body.contains(scriptRef.current)) {
        document.body.removeChild(scriptRef.current);
        hasScriptLoaded.current = false;
        hasButtonRendered.current = false;
      }
    };
  }, [containerId, onButtonClick]);

  // Add a retry mechanism if initial render fails
  useEffect(() => {
    const retryTimeout = setTimeout(() => {
      if (!hasButtonRendered.current && hasScriptLoaded.current) {
        renderPayPalButton();
      }
    }, 1000);

    return () => clearTimeout(retryTimeout);
  }, []);

  return (
    <div 
      ref={containerRef}
      id={containerId} 
      className="w-full min-h-[40px] flex justify-center items-center bg-transparent"
    />
  );
}