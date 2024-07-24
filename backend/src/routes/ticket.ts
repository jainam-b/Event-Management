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



// route to purchase a ticket
 
ticketRouter.post("/create", authMiddleware, async (c) => {
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
  const userId = c.user?.id;
  const { eventId, ticketTypesId, quantity } = body;

  try {
    // Find the ticket type first to ensure it's available
    const ticketType = await prisma.ticketType.findUnique({
      where: { id: ticketTypesId },
    });

    if (!ticketType) {
      c.status(400);
      return c.json({ msg: "Ticket type not found" });
    }

    if (ticketType.availableQuantity < quantity) {
      c.status(400);
      return c.json({ msg: "Not enough tickets available" });
    }

    let ticketId: string;

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
      const updatedTicket = await prisma.ticket.update({
        where: {
          id: existingTicket.id,
        },
        data: {
          quantity: existingTicket.quantity + quantity, // Increment the quantity
          purchasedDate: new Date(), // Update the purchased date
        },
      });
      ticketId = updatedTicket.id;
    } else {
      // Create new tickets if none exist
      const newTicket = await prisma.ticket.create({
        data: {
          userId:userId,
          eventId,
          ticketTypesId,
          quantity, // Set the quantity
          status: "ACTIVE",
          purchasedDate: new Date(), // Set purchased date
          
           
        },
      });
      ticketId = newTicket.id;
    }

    // Update the available quantity in the TicketType table
    await prisma.ticketType.update({
      where: { id: ticketTypesId },
      data: {
        availableQuantity: ticketType.availableQuantity - quantity,
      },
    });

    // Create a transaction record
    await prisma.transaction.create({
      data: {
        userId:userId,
        eventId,
        ticketTypesId, // Include the ticketTypesId
        totalAmount: ticketType.price * quantity,  
        paymentMethod: "credit card",  
        paymentStatus: "completed",
        
      },
    });

    return c.json({ msg: "Tickets processed successfully!" });
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
      msg: "Deleted",
      tickets,
    });
  } catch (error: any) {
    c.status(500);
    return c.json({
      error: error.message,
    });
  }
});
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