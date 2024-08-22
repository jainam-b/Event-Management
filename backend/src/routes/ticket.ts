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

  const { eventId, ticketTypesId, quantity, userId } = body;

  try {
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

    // Find available seats
    const availableSeats = await prisma.seatMap.findMany({
      where: {
        eventId,
        isReserved: false,
      },
      take: quantity,
    });

    if (availableSeats.length < quantity) {
      c.status(400);
      return c.json({ msg: "Not enough seats available" });
    }

    // Assign seats to the user
    const seatUpdates = availableSeats.map((seat) => {
      return prisma.seatMap.update({
        where: { id: seat.id },
        data: {
          isReserved: true,
          userId,
        },
      });
    });

    // Create tickets with assigned seats
    const ticketCreation = availableSeats.map((seat) => ({
      userId,
      eventId,
      ticketTypesId,
      seatId: seat.id,
      status: "ACTIVE",
      purchasedDate: new Date(),
    }));

    await Promise.all(seatUpdates);
    await prisma.ticket.createMany({
      data: ticketCreation,
    });

    // Collect seat numbers for response
    const seatNumbers = availableSeats.map(seat => seat.seatNumber);

    return c.json({ msg: "Tickets processed successfully!", seatNumbers });
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