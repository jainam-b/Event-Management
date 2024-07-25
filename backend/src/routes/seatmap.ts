import { Hono } from "hono";
import { Prisma, PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { z } from "zod";
import { authMiddleware } from "../middleware/authMiddleware";

export const seatMapRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

const seatMapSchema = z.object({
  rows: z.number().int().positive(),
  columns: z.number().int().positive(),
});

seatMapRouter.post("/events/:eventId/seat-map", authMiddleware, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const eventId = c.req.param("eventId");

  // Validate UUID format for eventId
  if (!/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(eventId)) {
    c.status(400);
    return c.json({ msg: "Invalid event ID" });
  }

  const body = await c.req.json();
  const validation = seatMapSchema.safeParse(body);

  if (!validation.success) {
    c.status(400);
    return c.json({
      msg: "Incorrect Inputs",
      errors: validation.error.errors,
    });
  }

  const { rows, columns } = validation.data;

  try {
    // Check if the event exists
    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      c.status(404);
      return c.json({ msg: "Event not found" });
    }

    // Create seat map entries
    const seatEntries = [];
    for (let row = 1; row <= rows; row++) {
      for (let column = 1; column <= columns; column++) {
        seatEntries.push({
          eventId,
          row,
          column,
          seatNumber: `R${row}C${column}`,
        });
      }
    }

    await prisma.seatMap.createMany({
      data: seatEntries,
    });

    c.status(201);
    return c.json({ msg: "Seat map created successfully!", seatEntries });
  } catch (error) {
    console.error("Error creating seat map:", error);
    c.status(500);
    return c.json({ msg: "An error occurred while creating the seat map" });
  } finally {
    await prisma.$disconnect();
  }
});



const assignSeatSchema = z.object({
  userId: z.string().uuid("Invalid user ID format").optional(),
  ticketTypesId: z.string().uuid("Invalid ticket type ID format"),
  quantity: z.number().int().positive(),
});

seatMapRouter.post("/events/:eventId/tickets/assign", authMiddleware, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const eventId = c.req.param("eventId");
  const body = await c.req.json();
  const validation = assignSeatSchema.safeParse(body);

  if (!validation.success) {
    c.status(411);
    return c.json({
      msg: "Incorrect Inputs",
      errors: validation.error.errors,
    });
  }

  const userId = c.user?.id || body.userId;
  const { ticketTypesId, quantity } = body;

  try {
    // Check if the event exists
    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      c.status(400);
      return c.json({ msg: "Event not found" });
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

    // Assign seats to user
    const seatUpdates = availableSeats.map((seat) => {
      return prisma.seatMap.update({
        where: { id: seat.id },
        data: {
          isReserved: true,
          userId,
        },
      });
    });

    // Create tickets
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

    return c.json({ msg: "Seats assigned successfully!", seatNumbers });
  } catch (error) {
    console.error("Error assigning seats:", error);
    c.status(500);
    return c.json({ msg: "An error occurred while assigning the seats" });
  }
});


  