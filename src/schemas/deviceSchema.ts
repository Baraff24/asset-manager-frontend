import { z } from "zod";
// Importing userSchema may cause circular dependency; consider importing a simplified version or just the ID
import { userIdSchema } from "./userSchema";

const STATUS_DEVICE_CHOICES = ["Active", "On Maintenance", "Inactive"] as const;
export const deviceIdSchema = z.string().uuid();

export const deviceSchema = z.object({
  device_id: deviceIdSchema,
  user: userIdSchema, // Assuming you define userIdSchema as z.number()
  brand: z.string(),
  serial_number: z.string(),
  status: z.enum(STATUS_DEVICE_CHOICES),
  purchase_date: z.string(), // Use z.string() if dates are ISO strings
  assigned_to: userIdSchema.nullable(),
});

export type Device = z.infer<typeof deviceSchema>;
