import { Hono } from "hono";
import { Prisma, PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { ticket } from "@jainam-b/event-comman/dist";
import { authMiddleware } from "../middleware/authMiddleware";

export const ticketRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

// ticketRouter.use("/*", authMiddleware);

ticketRouter.get("/", authMiddleware, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  if (!c.user?.role) {
    c.status(403);
    return c.json({
      error: "Forbidden",
    });
  }

  const tickets = await prisma.ticket.findMany();
  return c.json(tickets);
});

// route to purchase a ticket
ticketRouter.post("/create", async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const validation = ticket.safeParse(body);

  if (!validation.success) {
    c.status(411);
    return c.json({
      msg: "Incorrect Inputs",
      errors: validation.error.errors,
    });
  }

  const { userId, eventId, ticketTypesId, quantity } = body;

  try {
    // Start a transaction to ensure atomic operations
    const result = await prisma.$transaction(async (prisma) => {
      // Find existing tickets for this user, event, and ticket type
      const existingTicket = await prisma.ticket.findFirst({
        where: {
          userId,
          eventId,
          ticketTypesId,
          status: "ACTIVE",
        },
      });

      if (existingTicket) {
        // Update the existing ticket quantity
        await prisma.ticket.update({
          where: {
            id: existingTicket.id,
          },
          data: {
            quantity: existingTicket.quantity + quantity, // Increment the quantity
            purchasedDate: new Date(), // Update the purchased date
          },
        });
      } else {
        // Create new tickets if none exist
        await prisma.ticket.create({
          data: {
            userId,
            eventId,
            ticketTypesId,
            quantity, // Set the quantity
            status: "ACTIVE",
            purchasedDate: new Date(), // Set purchased date
          },
        });
      }

      // Update the available quantity in the TicketType table
      const ticketType = await prisma.ticketType.findUnique({
        where: { id: ticketTypesId },
      });

      if (ticketType) {
        await prisma.ticketType.update({
          where: { id: ticketTypesId },
          data: {
            availableQuantity: ticketType.availableQuantity - quantity,
          },
        });
      }

      return { msg: "Tickets processed successfully!" };
    });

    return c.json(result);
  } catch (error) {
    console.error("Error during ticket purchase:", error);
    c.status(500);
    return c.json({
      msg: "An error occurred while processing the tickets",
    });
  }
});

// Get details of a specific ticket
ticketRouter.get("/:ticketId", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const ticketId = c.req.param("ticketId");

  try {
    const tickets = await prisma.ticket.findUnique({
      where: {
        id: ticketId,
      },
    });
    return c.json(tickets);
  } catch (error: any) {
    c.status(500);
    return c.json({
      error: error.message,
    });
  }
});

// Update ticket status (e.g., cancel ticket)

ticketRouter.put("/:ticketId", async (c) => {
  const body = await c.req.json();
  const ticketId = c.req.param("ticketId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    // Check if the ticket exists
    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId },
    });

    if (!ticket) {
      c.status(404); // Not Found
      return c.json({
        msg: "Ticket not found",
      });
    }

    // Update the ticket status
    const updatedTicket = await prisma.ticket.update({
      where: { id: ticketId },
      data: { status: body.status },
    });

    return c.json({
      msg: "Ticket status updated successfully",
      ticket: updatedTicket,
    });
  } catch (error: any) {
    c.status(500);
    return c.json({
      error: error.message,
    });
  }
});


ticketRouter.delete("/:ticketId", authMiddleware, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const ticketId = c.req.param("ticketId");

  try {
    const tickets = await prisma.ticket.delete({
      where: {
        id: ticketId,
      },
    });
    return c.json({
      msg:"Deleted",
      tickets
    });
  } catch (error: any) {
    c.status(500);
    return c.json({
      error: error.message,
    });
  }
});