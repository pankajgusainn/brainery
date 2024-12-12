import { PAYMENT_CONFIG } from '../../config/payments';

export const stripeService = {
  redirectToCheckout: () => {
    window.open(PAYMENT_CONFIG.STRIPE.CHECKOUT_URL, '_blank');
  }
};