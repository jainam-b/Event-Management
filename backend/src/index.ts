import { Hono } from "hono";
import { cors } from "hono/cors";
import { userRouter } from "./routes/user";
import { eventRouter } from "./routes/event";
import { ticketTypeRouter } from "./routes/ticketType";
import { ticketRouter } from "./routes/ticket";
import { transactionRouter } from "./routes/transaction";
import { seatMapRouter } from "./routes/seatmap";
import { getCookie } from 'hono/cookie';

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.use("/*", cors({
  origin: 'http://localhost:5173', 
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));

app.route("/api/v1/user", userRouter);
app.route("/api/v1/", eventRouter);
app.route("/api/v1/", ticketTypeRouter);
app.route("/api/v1/ticket", ticketRouter);
app.route("/api/v1/transaction", transactionRouter);
app.route("/api/v1/", seatMapRouter);

app.get('/cookies', (c) => {
  const token = getCookie(c, 'token');
  console.log(token);
  return c.json({ token });
});

export default app;
