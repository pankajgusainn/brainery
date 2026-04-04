import { PayPalAPI } from './api';
import { PAYMENT_CONFIG } from '../../../config/payments';

class PayPalService {
  private api: PayPalAPI;

  constructor() {
    this.api = new PayPalAPI({
      clientId: PAYMENT_CONFIG.PAYPAL.CLIENT_ID,
      clientSecret: PAYMENT_CONFIG.PAYPAL.CLIENT_SECRET,
      isSandbox: PAYMENT_CONFIG.PAYPAL.SANDBOX
    });
  }

  async checkout(amount: number = PAYMENT_CONFIG.PAYPAL.DEFAULT_AMOUNT): Promise<void> {
    try {
      // Get access token
      const accessToken = await this.api.getAccessToken();
      
      // Create order
      const order = await this.api.createOrder(accessToken, amount);
      
      if (!order.id) {
        throw new Error('Invalid order ID received from PayPal');
      }

      // Redirect to PayPal checkout
      const checkoutUrl = this.getCheckoutUrl(order.id);
      window.open(checkoutUrl, '_blank');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error('PayPal checkout failed:', errorMessage);
      throw new Error('Failed to initiate PayPal checkout. Please try again.');
    }
  }

  private getCheckoutUrl(orderId: string): string {
    const baseUrl = PAYMENT_CONFIG.PAYPAL.SANDBOX
      ? 'https://www.sandbox.paypal.com'
      : 'https://www.paypal.com';
    return `${baseUrl}/checkoutnow?token=${orderId}`;
  }
}

export const paypalService = new PayPalService();