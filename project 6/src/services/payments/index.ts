// Central export point for payment services
import { stripeService } from './stripe';
import { paypalService } from './paypal';

export const paymentServices = {
  stripe: stripeService,
  paypal: paypalService
};