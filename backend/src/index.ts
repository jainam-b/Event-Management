import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign, verify } from "hono/jwt";
// import bcrypt from "bcryptjs";
import { userRouter } from "./routes/user";
import { eventRouter } from "./routes/event";
import { ticketTypeRouter } from "./routes/ticketType";
import { ticketRouter } from "./routes/ticket";
import { transactionRouter } from "./routes/transaction";
 
import { cors } from "hono/cors";
import { seatMapRouter } from "./routes/seatmap";
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();
 
app.use("/*", cors());
app.route("/api/v1/user", userRouter);
app.route("/api/v1/", eventRouter);
app.route("/api/v1/", ticketTypeRouter);
app.route("/api/v1/ticket", ticketRouter);
app.route("/api/v1/transaction", transactionRouter);
app.route("/api/v1/", seatMapRouter);

export default app;
