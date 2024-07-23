import { Hono } from "hono";
import { Prisma, PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { ticketType } from "@jainam-b/event-comman/dist";

export const ticketTypeRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

ticketTypeRouter.post("/:eventId/ticket-types", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const eventId = c.req.param("eventId");
  const validation = ticketType.safeParse(body);

  if (!validation.success) {
    c.status(411);
    return c.json({
      msg: "Incorrect Inputs",
      errors: validation.error.errors,
    });
  }

  const { name, price, totalQuantity, availableQuantity } = body;

  try {
    const createTicketType = await prisma.ticketType.create({
      data: {
        eventId,
        name,
        price,
        totalQuantity,
        availableQuantity,
      },
    });

    return c.json({
      msg: "Event Ticket Type created successfully!",
      createTicketType,
    });
  } catch (error) {
    console.error(error); // Log the error details to the console
    c.status(500); // Internal Server Error
    return c.json({
      msg: "An error occurred while creating the event ticket type",
    });
  }
});

//  Get all ticket types for a specific event
ticketTypeRouter.get("/:eventId/ticket-types", async (c) => {
  const eventId = c.req.param("eventId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const getTicketType = await prisma.ticketType.findMany({
      where: {
        eventId: eventId,
      },
    });
    return c.json({
      getTicketType,
    });
  } catch (error) {
    c.status(404);
    return c.json({
      msg: "Invalid event ID ",
    });
  }
});

//   Update a specific ticket type

ticketTypeRouter.put("/ticket-types/:ticketTypeId", async (c) => {
  const ticketTypeId = c.req.param("ticketTypeId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const validation = ticketType.safeParse(body);

  if (!validation.success) {
    c.status(400);
    return c.json({
      msg: "Incorrect Inputs",
      errors: validation.error.errors,
    });
  }

  const { eventId, name, price, totalQuantity, availableQuantity } = body;

  try {
    const updateTicketType = await prisma.ticketType.update({
      where: {
        id: ticketTypeId,
      },
      data: {
        eventId,
        name,
        price,
        totalQuantity,
        availableQuantity,
      },
    });

    return c.json({
      msg: "Event Ticket Type updated successfully!",
      updateTicketType,
    });
  } catch (error) {
    console.error(error); // Log the error details to the console
    c.status(500); // Internal Server Error
    return c.json({
      msg: "An error occurred while updating the event ticket type",
    });
  }
});

//  Delete a specific ticket type
ticketTypeRouter.delete("/ticket-types/:ticketTypeId", async (c) => {
  const ticketTypeId = c.req.param("ticketTypeId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const deleteTicketType = await prisma.ticketType.delete({
      where: {
        id: ticketTypeId,
      },
    });
    return c.json({
      msg: "Ticket type delete successfully!!!",
    });
  } catch (error) {
    c.status(500);
    return c.json({
      msg: "Error occured while deleting the event !!",
    });
  }
});
