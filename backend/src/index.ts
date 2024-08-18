import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { userRouter } from './routes/user';
import { eventRouter } from './routes/event';
import { ticketTypeRouter } from './routes/ticketType';
import { ticketRouter } from './routes/ticket';
import { transactionRouter } from './routes/transaction';
import { seatMapRouter } from './routes/seatmap';
 

// Define the Hono app with bindings
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

// List of allowed origins
const allowedOrigins = ['http://localhost:5173',"https://event-hive-jainam.vercel.app"];

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

// Ensure your route paths do not conflict
app.route('/api/v1/user', userRouter);
app.route('/api/v1/events', eventRouter);
app.route('/api/v1/ticket-types', ticketTypeRouter);
app.route('/api/v1/tickets', ticketRouter);
app.route('/api/v1/transactions', transactionRouter);
app.route('/api/v1/seat-maps', seatMapRouter);
 

export default app;
