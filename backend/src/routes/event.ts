import { Hono } from "hono";
import { Prisma, PrismaClient } from "@prisma/client/edge";
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

eventRouter.use("/*", async (c, next) => {
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
  await next();
});

// type fot ticket type
interface TicketType {
  name: string;
  price: number;
  totalQuantity: number;
  availableQuantity: number;
}

// route to create event
eventRouter.post("/create", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const validation = createEventSchema.safeParse(body);
  if (!validation.success) {
    c.status(411);
    return c.json({
      msg: "Incorrect Inputs",
      errors: validation.error.errors, // Return validation errors
    });
  }

  const { name, description, date, location, ticketTypes } = body;

  // Convert the date to a format that the JavaScript Date object can understand
  const [day, month, year] = date.split("/");
  const formattedDate = `${year}-${month}-${day}`;
  const eventDate = new Date(formattedDate);

  // Validate the date
  if (isNaN(eventDate.getTime())) {
    c.status(400);
    return c.json({
      msg: "Invalid date format",
    });
  }

  try {
    const event = await prisma.event.create({
      data: {
        name,
        description,
        date: eventDate,
        location,
        ticketTypes: {
          create: ticketTypes.map((ticketType: TicketType) => ({
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
  } catch (error) {
    console.log(error);
    c.status(500); // Internal Server Error
    return c.json({
      msg: "An error occurred while creating the event",
    });
  }
});

// api to get all events
eventRouter.get("/events", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const allEvents = await prisma.event.findMany({});
  return c.json(allEvents);
});

// api to get  events by ID
eventRouter.get("/events/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const eventId = c.req.param("id");
  const eventbyId = await prisma.event.findFirst({
    where: {
      id: parseInt(eventId),
    },
  });
  return c.json(eventbyId);
});

eventRouter.put("/events/:id", async (c) => {
  const body = c.req.json();
  const { success } = createEventSchema.safeParse(body);
  const eventId= c.req.param("id")
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  if (!success) {
    c.status(411);
    return c.json({
      msg: "Error Invalid inputs ",
    });
  }
  const { name, description, date, location, ticketTypes } = body;
  // Convert the date to a format that the JavaScript Date object can understand
  const [day, month, year] = date.split("/");
  const formattedDate = `${year}-${month}-${day}`;
  const eventDate = new Date(formattedDate);

  // Validate the date
  if (isNaN(eventDate.getTime())) {
    c.status(400);
    return c.json({
      msg: "Invalid date format",
    });
  }
  try {
    
    const updateEvent= await prisma.event.update({
      where:{
        id: parseInt(eventId),
      },
      data: {
        name,
        description,
        date: eventDate,
        location,
        ticketTypes: {
          create: ticketTypes.map((ticketType: TicketType) => ({
            name: ticketType.name,
            price: ticketType.price,
            totalQuantity: ticketType.totalQuantity,
            availableQuantity: ticketType.availableQuantity,
          })),
        },
      },
    })
    
  } catch (error) {
    c.status(500); // Internal Server Error
    return c.json({
      msg: "An error occurred while creating the event",
    });
  }


});
