declare module 'razorpay' {
    export interface RazorpayOptions {
      key: string;
      amount: number;
      currency: string;
      name: string;
      description: string;
      handler: (response: any) => void;
      prefill: {
        name: string;
        email: string;
        contact: string;
      };
      theme: {
        color: string;
      };
    }
  
    export class Razorpay {
      constructor(options: RazorpayOptions);
      open(): void;
    }
  }
  
  declare global {
    interface Window {
      Razorpay: any;
    }
  }
  