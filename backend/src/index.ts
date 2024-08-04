import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { userRouter } from './routes/user';
import { eventRouter } from './routes/event';
import { ticketTypeRouter } from './routes/ticketType';
import { ticketRouter } from './routes/ticket';
import { transactionRouter } from './routes/transaction';
import { seatMapRouter } from './routes/seatmap';

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();


// Apply CORS middleware
app.use(cors({
  origin: 'http://localhost:5173', // Update this with your frontend URL
  credentials: true // Allow credentials (cookies) to be sent
}));

// Ensure your route paths do not conflict
app.route('/api/v1/user', userRouter);

app.route('/api/v1/events', eventRouter); // Updated path to avoid overlap
app.route('/api/v1/ticket-types', ticketTypeRouter); // Updated path
app.route('/api/v1/tickets', ticketRouter); // Updated path
app.route('/api/v1/transactions', transactionRouter); // Updated path
app.route('/api/v1/seat-maps', seatMapRouter); // Updated path

export default app;
