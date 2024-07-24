import { verify } from "hono/jwt";
import { getCookie } from "hono/cookie";
import { Context, Next } from "hono";

export interface UserPayload {
  id: string;
  email: string;
  role: string;
}

declare module "hono" {
  interface Context {
    user?: UserPayload;
  }
}

export const authMiddleware = async (c: Context, next: Next) => {
  const token = getCookie(c, "token");

  if (!token) {
    c.status(401);
    return c.json({
      error: "Unauthorized access, please sign up!",
    });
  }

  try {
    // Type assertion here
    const decodedToken = await verify(token, c.env.JWT_SECRET) as unknown as { id: string, email: string, role:string };

    // Create userPayload based on the asserted type
    const userPayload: UserPayload = {
      id: decodedToken.id,
      email: decodedToken.email,
      role: decodedToken.role,
    };

    // Attach the user payload to the context
    c.user = userPayload;

    await next();
  } catch (error) {
    console.error(error);
    c.status(403);
    return c.json({
      message: "You are not logged in",
    });
  }
};
