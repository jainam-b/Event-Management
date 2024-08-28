// import { useEffect, useState } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import { BACKEND_URL } from '../config';

// const stripePromise = loadStripe('pk_test_51OpkQfSIXPkAEiNIjfmV6nsKbWgjHPOKHb3VWLYdtwnV8hseSA3pwkpmNHOXDnZLLEs74CoEkNTB6Cq3WRXI2dXW00585szgA4'); // Replace with your Stripe publishable key

// export const CheckoutForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [clientSecret, setClientSecret] = useState('');

//   useEffect(() => {
//     fetch(`${BACKEND_URL}/api/v1/payments/create-payment-intent`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ amount: 5000 }), // Example amount in cents
//     })
//       .then((response) => response.json())
//       .then((data) => setClientSecret(data.clientSecret))
//       .catch((error) => console.error('Error fetching payment intent:', error));
//   }, []);

//   const handleSubmit = async (event: { preventDefault: () => void; }) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     const result = await stripe.confirmCardPayment(clientSecret, {
//       payment_method: {
//         card: elements.getElement(CardElement),
//       },
//     });

//     if (result.error) {
//       console.error('Payment failed:', result.error);
//     } else {
//       if (result.paymentIntent.status === 'succeeded') {
//         console.log('Payment successful!');
//         // Handle successful payment (e.g., show a success message, update order status, etc.)
//       }
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <CardElement
//         options={{
//           style: {
//             base: {
//               fontSize: '16px',
//               color: '#424770',
//               '::placeholder': {
//                 color: 'black',
//               },
//             },
//             invalid: {
//               color: '#9e2146',
//             },
//           },
//         }}
//       />
//       <button type="submit" disabled={!stripe}>
//         Pay
//       </button>
//     </form>
//   );
// };

// export default function Checkout() {
//   return (
//     <Elements stripe={stripePromise}>
//       <CheckoutForm />
//     </Elements>
//   );
// }
