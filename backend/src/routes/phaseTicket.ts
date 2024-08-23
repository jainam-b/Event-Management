import { Hono } from "hono";
import { Prisma, PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

import { authMiddleware } from "../middleware/authMiddleware";
import { z } from "zod";

// Define phases for an event
export const phaseRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

// Updated schema to handle an array of ticket assignments
const phaseAssignmentSchema = z.array(
  z.object({
    userId: z.string().uuid("Invalid user ID format").optional(),
    ticketTypeId: z.string().uuid("Invalid ticket type ID format"),
    quantity: z.number().int().positive(),
  })
);

phaseRouter.post("/events/:eventId/tickets/assign-phase", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const eventId = c.req.param("eventId");
  const body = await c.req.json();
  const validation = phaseAssignmentSchema.safeParse(body);

  if (!validation.success) {
    c.status(400);
    return c.json({
      msg: "Incorrect Inputs",
      errors: validation.error.errors,
    });
  }

  // Destructure the array of assignments
  const assignments = body;

  try {
    // Check if the event exists
    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      c.status(404);
      return c.json({ msg: "Event not found" });
    }

    // Process each ticket assignment
    for (const { ticketTypeId, quantity, userId } of assignments) {
      // Check if the ticket type exists and is available
      const ticketType = await prisma.ticketType.findUnique({
        where: { id: ticketTypeId },
      });

      if (!ticketType) {
        c.status(404);
        return c.json({ msg: `Ticket type with ID ${ticketTypeId} not found` });
      }

      if (ticketType.availableQuantity < quantity) {
        c.status(400);
        return c.json({ msg: `Not enough tickets available for ticket type ${ticketTypeId}` });
      }

      // Create tickets for the user
      const ticketCreation = Array.from({ length: quantity }).map(() => ({
        userId,
        eventId,
        ticketTypesId: ticketTypeId,
        status: "ACTIVE",
        purchasedDate: new Date(),
      }));

      // Update available quantity
      await prisma.ticketType.update({
        where: { id: ticketTypeId },
        data: {
          availableQuantity: ticketType.availableQuantity - quantity,
        },
      });

      await prisma.ticket.createMany({
        data: ticketCreation,
      });
    }

    return c.json({ msg: "Tickets processed successfully!" });
  } catch (error) {
    console.error("Error during phase assignment:", error);
    c.status(500);
    return c.json({
      msg: "An error occurred while processing the tickets",
    });
  } finally {
    await prisma.$disconnect();
  }
});
