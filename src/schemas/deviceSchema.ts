import {userIdSchema} from "./userSchema.ts";
import {z} from "zod";

const STATUS_DEVICE_CHOICES = ["ACTIVE", "ON_MAINTENANCE", "INACTIVE"] as const;

export const deviceIdSchema = z.string().uuid();

// Schema per un dispositivo
export const deviceSchema = z.object({
  id: z.number(),
  device_id: deviceIdSchema,
  name: z.string(),
  user: userIdSchema, // Assuming userIdSchema is defined as z.number()
  brand: z.string(),
  serial_number: z.string(),
  status: z.enum(STATUS_DEVICE_CHOICES),
  purchase_date: z.string(), // ISO string date
  assigned_to: userIdSchema.nullable(),
});



// Schema per una lista di dispositivi
export const devicesSchema = z.array(deviceSchema);

export type Device = z.infer<typeof deviceSchema>;