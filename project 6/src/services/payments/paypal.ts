import { PAYMENT_CONFIG } from '../../config/payments';

class PayPalService {
  private clientId: string;
  private clientSecret: string;
  private isSandbox: boolean;

  constructor() {
    this.clientId = PAYMENT_CONFIG.PAYPAL.CLIENT_ID;
    this.clientSecret = PAYMENT_CONFIG.PAYPAL.CLIENT_SECRET;
    this.isSandbox = PAYMENT_CONFIG.PAYPAL.SANDBOX;
  }

  private getApiUrl() {
    return this.isSandbox
      ? 'https://api.sandbox.paypal.com'
      : 'https://api.paypal.com';
  }

  private async getAccessToken(): Promise<string> {
    try {
      const response = await fetch(`${this.getApiUrl()}/v1/oauth2/token`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Accept-Language': 'en_US',
          'Authorization': `Basic ${btoa(`${this.clientId}:${this.clientSecret}`)}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials'
      });

      if (!response.ok) {
        throw new Error('Failed to get PayPal access token');
      }

      const data = await response.json();
      return data.access_token;
    } catch (error) {
      console.error('PayPal authentication failed:', error);
      throw new Error('Failed to authenticate with PayPal');
    }
  }

  async createOrder(amount: number): Promise<string> {
    try {
      const accessToken = await this.getAccessToken();
      
      const response = await fetch(`${this.getApiUrl()}/v2/checkout/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          intent: 'CAPTURE',
          purchase_units: [{
            amount: {
              currency_code: 'USD',
              value: amount.toFixed(2)
            }
          }]
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('PayPal order creation failed:', errorData);
        throw new Error('Failed to create PayPal order');
      }

      const order = await response.json();
      return order.id;
    } catch (error) {
      console.error('PayPal order creation failed:', error);
      throw new Error('Failed to initialize PayPal payment');
    }
  }

  async checkout(amount: number = 10) {
    try {
      const orderId = await this.createOrder(amount);
      const checkoutUrl = `${this.getApiUrl()}/checkoutnow?token=${orderId}`;
      window.open(checkoutUrl, '_blank');
    } catch (error) {
      console.error('PayPal checkout failed:', error);
      alert('Failed to initiate PayPal checkout. Please try again.');
    }
  }
}

export const paypalService = new PayPalService();