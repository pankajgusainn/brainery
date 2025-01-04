export interface PayPalConfig {
  clientId: string;
  clientSecret: string;
  isSandbox: boolean;
}

export interface PayPalOrder {
  id: string;
  status: string;
}

export interface PayPalTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}