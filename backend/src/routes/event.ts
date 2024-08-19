import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { createEventSchema, CreateEventSchemaType } from '@jainam-b/event-comman/dist';

export const eventRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
    CLOUDINARY_CLOUD_NAME: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_API_SECRET: string;
  };
}>();

// Custom function to convert FormData to an object
async function formDataToObject(formData: FormData): Promise<Record<string, any>> {
  const obj: Record<string, any> = {};
  for (const [key, value] of (formData as any).entries()) {
    obj[key] = value;
  }
  return obj;
}

// Define the expected Cloudinary response type
interface CloudinaryResponse {
  secure_url: string;
  error?: {
    message: string;
  };
}
interface TicketType {
  name: string;
  price: number;
  totalQuantity: number;
  availableQuantity: number;
}


 

// Route to create event
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

  const {
    name,
    description,
    date,
    startTime,
    endTime,
    imageUrl,
    category,
    organizer,
    location,
    ticketTypes,
  } = body;

  // Convert and validate the date
  const { valid, date: eventDate, message } = convertAndValidateDate(date);
  if (!valid) {
    c.status(400);
    return c.json({
      msg: message,
    });
  }

  try {
    const event = await prisma.event.create({
      data: {
        name,
        description,
        date: eventDate!,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        imageUrl,
        category,
        organizer,
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


// API to get all events
eventRouter.get('/', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const allEvents = await prisma.event.findMany({});
  return c.json(allEvents);
});

// API to get events by ID
eventRouter.get('/:id', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const eventId = c.req.param('id');
  const eventById = await prisma.event.findFirst({
    where: {
      id: eventId,
    },
    
  });
  return c.json(eventById);
});

// API to update event
eventRouter.put('/:id', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const { success, error } = createEventSchema.safeParse(body);
  const eventId = c.req.param('id');

  if (!success) {
    c.status(400); // Use 400 Bad Request for invalid inputs
    return c.json({
      msg: 'Error Invalid inputs',
      error: error.errors,
    });
  }

  const {
    name,
    description,
    date,
    startTime,
    endTime,
    imageUrl,
    category,
    organizer,
    location,
    ticketTypes,
  } = body;

  // Convert and validate the date
  const { valid, date: eventDate, message } = convertAndValidateDate(date);
  if (!valid) {
    c.status(400);
    return c.json({
      msg: message,
    });
  }

  try {
    // Update the event
    const updateEvent = await prisma.event.update({
      where: {
        id: eventId,
      },
      data: {
        name,
        description,
        date: eventDate,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        imageUrl,
        category,
        organizer,
        location,
      },
    });

    // Handle ticket types update
    if (ticketTypes && ticketTypes.length > 0) {
      for (const ticketType of ticketTypes) {
        const existingTicketType = await prisma.ticketType.findFirst({
          where: {
            eventId: eventId,
            name: ticketType.name,
          },
        });

        if (existingTicketType) {
          await prisma.ticketType.update({
            where: {
              id: existingTicketType.id,
            },
            data: {
              price: ticketType.price,
              totalQuantity: ticketType.totalQuantity,
              availableQuantity: ticketType.availableQuantity,
            },
          });
        } else {
          console.warn(
            `TicketType with name ${ticketType.name} for event ID ${eventId} not found, skipping update.`
          );
        }
      }
    }

    c.status(200);
    return c.json({
      msg: 'Event updated successfully',
      event: updateEvent,
    });
  } catch (error: any) {
    console.error(error);
    c.status(500); // Internal Server Error
    return c.json({
      msg: 'An error occurred while updating the event',
      error: error.message,
    });
  } finally {
    await prisma.$disconnect();
  }
});

// API to delete event
eventRouter.delete('/events/:id', async (c) => {
  const eventId = c.req.param('id');
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const deleteEvent = await prisma.event.delete({
      where: {
        id: eventId,
      },
    });
    return c.json({
      msg: `Event deleted successfully with ID: ${eventId}`,
    });
  } catch (error) {
    c.status(500);
    return c.json({
      msg: 'Error occurred while deleting the event',
    });
  } finally {
    await prisma.$disconnect();
  }
});

// Function to convert date into correct format
export function convertAndValidateDate(dateString: string): {
  valid: boolean;
  date?: Date;
  message?: string;
} {
  const [day, month, year] = dateString.split('/');
  const formattedDate = `${year}-${month}-${day}`;
  const date = new Date(formattedDate);

  if (isNaN(date.getTime())) {
    return { valid: false, message: 'Invalid date format. Expected DD/MM/YYYY.' };
  }

  return { valid: true, date };
}
