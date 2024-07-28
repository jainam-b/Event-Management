import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { signupInput, signinInput } from "@jainam-b/event-comman/dist";
import { sign } from "hono/jwt";
import { setCookie } from "hono/cookie";
import bcrypt from "bcryptjs";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();



// Signup route
userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);

  if (!success) {
    c.status(400); // Use 400 for bad request
    return c.json({ msg: "Incorrect Inputs" });
  }

  const hashedPassword = await bcrypt.hash(body.password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
        role: body.role || "user",
      },
    });

    const token = await sign(
      { id: user.id, email: user.email, role: user.role },
      c.env.JWT_SECRET
    );

    setCookie(c, "token", token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production", // Secure flag based on environment
      sameSite: "None", // Use 'strict' for better security
      path: "/", // Ensure the cookie is available throughout the site
    });

    return c.json({ message: "Signup successfully" });
  } catch (e) {
    console.error("Error creating user:", e);
    c.status(500);
    return c.json({ msg: "Internal Server Error" });
  }
});

// Signin route
userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);

  if (!success) {
    c.status(400); // Use 400 for bad request
    return c.json({ msg: "Incorrect Inputs" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (!user) {
      c.status(401);
      return c.json({ msg: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(body.password, user.password);

    if (!isPasswordValid) {
      c.status(401);
      return c.json({ msg: "Invalid email or password" });
    }

    const token = await sign(
      { id: user.id, email: user.email, role: user.role },
      c.env.JWT_SECRET
    );

    setCookie(c, "token", token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production", // Secure flag based on environment
      sameSite: "None", // Use 'strict' for better security
      path: "/", // Ensure the cookie is available throughout the site
    });

    return c.json({ message: "Logged in successfully" });
  } catch (e) {
    console.error("Error logging in user:", e);
    c.status(500);
    return c.json({ msg: "Internal Server Error" });
  }
});
