import { PayPalConfig, PayPalTokenResponse, PayPalOrder } from './types';

export class PayPalAPI {
  private config: PayPalConfig;

  constructor(config: PayPalConfig) {
    this.config = config;
  }

  private getApiUrl(): string {
    return this.config.isSandbox
      ? 'https://api-m.sandbox.paypal.com'
      : 'https://api-m.paypal.com';
  }

  private getAuthHeader(): string {
    const credentials = `${this.config.clientId}:${this.config.clientSecret}`;
    return `Basic ${btoa(credentials)}`;
  }

  async getAccessToken(): Promise<string> {
    try {
      const response = await fetch(`${this.getApiUrl()}/v1/oauth2/token`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Accept-Language': 'en_US',
          'Authorization': this.getAuthHeader(),
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`PayPal API Error: ${JSON.stringify(errorData)}`);
      }

      const data: PayPalTokenResponse = await response.json();
      return data.access_token;
    } catch (error) {
      console.error('PayPal authentication details:', {
        url: this.getApiUrl(),
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw new Error('Failed to authenticate with PayPal');
    }
  }

  async createOrder(accessToken: string, amount: number): Promise<PayPalOrder> {
    try {
      const response = await fetch(`${this.getApiUrl()}/v2/checkout/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
          'PayPal-Request-Id': crypto.randomUUID()
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
        throw new Error(`Order creation failed: ${JSON.stringify(errorData)}`);
      }

      return await response.json();
    } catch (error) {
      console.error('PayPal order creation details:', {
        url: this.getApiUrl(),
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw new Error('Failed to create PayPal order');
    }
  }
}