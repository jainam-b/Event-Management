import z from "zod";

export const signupInput = z.object({
  name: z.string().optional(),
  email: z.string().email(),
  password: z.string(),
});
export type SignupInput = z.infer<typeof signupInput>;

export const signinInput = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type SigninType = z.infer<typeof signinInput>;

// Regular expression to match dd/mm/yyyy format
const dateFormatRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

const dateSchema = z
  .string()
  .regex(dateFormatRegex, "Date must be in dd/mm/yyyy format");

  export const createEventSchema = z.object({
    name: z.string().min(1, "Event name is required"),
    description: z.string().optional(),
    date: dateSchema,
    startTime: z.string(), // Ensure you handle these fields if needed
    endTime: z.string(),   // Ensure you handle these fields if needed
    location: z.string().min(1, "Location is required"),
    category: z.string().optional(), // Add category field
    organizer: z.string().optional(), // Add organizer field
    ticketTypes: z
      .array(
        z.object({
          name: z.string().min(1, "Ticket type name is required"),
          price: z.number().nonnegative("Price must be a non-negative number"),
          totalQuantity: z
            .number()
            .int()
            .nonnegative("Total quantity must be a non-negative integer"),
          availableQuantity: z
            .number()
            .int()
            .nonnegative("Available quantity must be a non-negative integer"),
        })
      )
      .min(1, "At least one ticket type is required"),
  });
  
  export type CreateEventSchemaType = z.infer<typeof createEventSchema>;
  



export const ticketType = z.object({
  id:z.string().uuid("Invalid  ID format"),
  name: z.string().min(1, "Ticket type name is required"),
  price: z.number().nonnegative().min(0, "Price must be a non-negative number"),
  totalQuantity: z
    .number()
    .int()
    .nonnegative()
    .min(0, "Total quantity must be a non-negative integer"),
  availableQuantity: z
    .number()
    .int()
    .nonnegative()
    .min(0, "Available quantity must be a non-negative integer"),
});

export type TicketType = z.infer<typeof ticketType>;

export const ticket = z.object({
  userId: z.string().uuid("Invalid user ID format").optional(),
  eventId: z.string().uuid("Invalid event ID format"),
  ticketTypesId: z.string().uuid("Invalid ticket type ID format"),
  quantity: z.number().int().positive("Quantity must be a positive integer"),
  status: z.enum(["ACTIVE", "USED", "CANCELED"]).optional(),

});
export type Ticket =z.infer<typeof ticket>
