import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { signupInput, signinInput } from "@jainam-b/event-comman/dist";
import { sign, verify } from "hono/jwt";
import { setCookie, getCookie } from "hono/cookie";
import bcrypt from "bcryptjs";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      msg: "Incorrect Inputs",
    });
  }
  const hashedPassword = await bcrypt.hash(body.password, 10);
  try {
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
      },
    });
    const token = await sign(
      {
        id: user.id,
      },
      c.env.JWT_SECRET
    );

    setCookie(c, "token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    return c.json({ message: "SignUp successfully" });
  } catch (e) {
    console.error("Error creating user:", e);
    c.status(500); // Use a more appropriate status code
    return c.json({ msg: "Internal Server Error" });
  }
});




// route to login
userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      msg: "Incorrect Inputs",
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
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
      {
        id: user.id,
      },
      c.env.JWT_SECRET
    );

    setCookie(c, "token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    return c.json({ message: "Logged in successfully" });
  } catch (e) {
    console.error("Error creating user:", e);
    c.status(500); // Use a more appropriate status code
    return c.json({ msg: "Internal Server Error" });
  }
});
