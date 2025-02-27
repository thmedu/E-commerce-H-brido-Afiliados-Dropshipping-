import { loadStripe } from "@stripe/stripe-js";

// Replace with your own publishable key from the Stripe Dashboard
const stripePublishableKey =
  "pk_test_51NxSample1234567890abcdefghijklmnopqrstuvwxyz";

export const stripePromise = loadStripe(stripePublishableKey);
