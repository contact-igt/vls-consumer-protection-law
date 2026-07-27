/**
 * Razorpay client-side type declarations and helpers.
 *
 * The Razorpay checkout.js script is loaded via next/script in app/layout.tsx.
 * It attaches `window.Razorpay` — this file declares that global so TypeScript
 * is happy and isolates all Razorpay-specific types from the React component.
 */

export interface RazorpayOrder {
  id: string;
  amount: number;
  currency: string;
}

export interface RazorpaySuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
  captured?: string;
}

export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  order_id: string;
  description: string;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: { color: string };
  handler: (response: RazorpaySuccessResponse) => void;
}

export interface RazorpayInstance {
  open(): void;
  on(event: "payment.failed", handler: (response: unknown) => void): void;
}

// Augment the Window interface so TypeScript accepts window.Razorpay
declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

/**
 * Returns true when the Razorpay checkout script has been loaded and
 * `window.Razorpay` is available. Call this before opening the checkout.
 */
export function isRazorpayReady(): boolean {
  return typeof window !== "undefined" && typeof window.Razorpay === "function";
}
