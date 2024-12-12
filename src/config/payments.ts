// Payment configuration constants
export const PAYMENT_CONFIG = {
  STRIPE: {
    CHECKOUT_URL: 'https://buy.stripe.com/28o9Ea4kBbD6fm0000'
  },
  PAYPAL: {
    ENABLED: true,
    CLIENT_ID: 'BAAxhlPAdTM10TlAQ3jU_8V5pMizG-nyOnctedPjurJzJZgQbYZE0Vlki0DDhK9mz_8xo9rNloYsfi6LWU',
    CLIENT_SECRET: 'EHOLnlWShEyTjZwIsrfJwN8DTonSBdAaTyLyntqTR9h-4_fd-RMksTRbYYX0mUUyE5kRTulJ8a9kNSEk',
    SANDBOX: false, // Set to false for production credentials
    CURRENCY: 'USD',
    DEFAULT_AMOUNT: 10
  }
} as const;