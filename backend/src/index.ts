import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign, verify } from "hono/jwt";
// import bcrypt from "bcryptjs";
import { userRouter } from "./routes/user";
import { eventRouter } from "./routes/event";
 
import { cors } from "hono/cors";
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();
 
app.use("/*", cors());
app.route("/api/v1/user", userRouter);
app.route("/api/v1/event", eventRouter);

export default app;
