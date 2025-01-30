// Payment configuration constants
export const PAYMENT_CONFIG = {
  STRIPE: {
    CHECKOUT_URL: 'https://support.brainery.cloud/b/28o9Ea4kBbD6fm0000'
  },
  PAYPAL: {
    ENABLED: true,
    CLIENT_ID: 'BAAxhlPAdTM10TlAQ3jU_8V5pMizG-nyOnctedPjurJzJZgQbYZE0Vlki0DDhK9mz_8xo9rNloYsfi6LWU',
    CURRENCY: 'USD',
    DEFAULT_AMOUNT: 10
  }
} as const;