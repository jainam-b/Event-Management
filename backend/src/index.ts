import { Hono } from 'hono';
import { cors } from 'hono/cors';
import Stripe from 'stripe';
import { userRouter } from './routes/user';
import { eventRouter } from './routes/event';
import { ticketTypeRouter } from './routes/ticketType';
import { ticketRouter } from './routes/ticket';
import { transactionRouter } from './routes/transaction';
import { seatMapRouter } from './routes/seatmap';
import { phaseRouter} from './routes/phaseTicket';

// Define the Hono app with bindings
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
    STRIPE_SECRET_KEY: string; 
    env: string, 
  };
}>();

const stripe = require('stripe')('sk_test_51OpkQfSIXPkAEiNIbga3T6jwRGpCbbfMFp0iCGUtjhjNrhxVxQbVFIpJqE3cYlgiY2htEhY9HtD57tAmDMclXwnw00rTYmzQwF');

// List of allowed origins
const allowedOrigins = ['http://localhost:5173', 'https://event-hive-jainam.vercel.app'];

// CORS options
const corsOptions = cors({
  origin: (origin: string | undefined) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return '*';
    if (allowedOrigins.includes(origin)) {
      return origin;
    }
    return ''; // Reject other origins
  },
  credentials: true, // Allow credentials (cookies) to be sent
});

// Apply CORS middleware
app.use('*', corsOptions);

// Stripe Endpoint to create a Payment Intent
app.post('/api/v1/payments/create-payment-intent', async (c) => {
  try {
    const { amount } = await c.req.json<{ amount: number }>();

    if (!amount) {
      return c.json({ error: 'Amount is required' }, 400);
    }

    // Create a Payment Intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // amount in cents
      currency: 'inr', // or the currency you prefer
      payment_method_types: ['card'],
    });

    // Return the client secret to the frontend
    return c.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return c.json({ error: 'Failed to create payment intent' }, 500);
  }
});

// Ensure your route paths do not conflict
app.route('/api/v1/user', userRouter);
app.route('/api/v1/events', eventRouter);
app.route('/api/v1/ticket-types', ticketTypeRouter);
app.route('/api/v1/tickets', ticketRouter);
app.route('/api/v1/transactions', transactionRouter);
app.route('/api/v1/seat-maps', seatMapRouter);
app.route('/api/v1/phase', phaseRouter);

export default app;
