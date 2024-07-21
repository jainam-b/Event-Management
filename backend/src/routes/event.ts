import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { getCookie } from "hono/cookie";
import { verify } from "hono/jwt";
import { createEventSchema } from "@jainam-b/event-comman/dist";

export const eventRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

eventRouter.use("/*", async (c) => {
  const token = getCookie(c, "token");
  try {
    if (!token) {
      c.status(401);
      return c.json({
        Error: "unauthorized access, Please Signup!!",
      });
    }
    const isValidToken = await verify(token, c.env.JWT_SECRET);
    if (!isValidToken) {
      c.status(401);
      return c.json({
        error: "Invalid token. Please log in again.",
      });
    }
  } catch (error) {
    console.log(error);
    c.status(403);
    return c.json({
      message: "You are not logged in",
    });
  }
});

eventRouter.post("/create", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = createEventSchema.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      msg: "Incorrect Inputs",
    });
  }
  try {
    const { name, description, date, location, ticketTypes } = body;
    const event = await prisma.event.create({
        data: {
          name,
          description,
          date: new Date(date), // Ensure date is correctly formatted
          location,
          ticketTypes: {
            create: ticketTypes.map((ticketType: { name: string; price: any; totalQuantity: any; availableQuantity: any; }) => ({
              name: ticketType.name,
              price: ticketType.price,
              totalQuantity: ticketType.totalQuantity,
              availableQuantity: ticketType.availableQuantity,
            })),
          },
        },
      });
  
      return c.json({
        msg: "Event created successfully!",
        event,
      });
  } catch (error) {}

  return c.json({
    msg: "inside post request",
  });
});
