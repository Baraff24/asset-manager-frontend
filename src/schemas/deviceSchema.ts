import {userIdSchema} from "./userSchema.ts";
import {z} from "zod";

const STATUS_DEVICE_CHOICES = ["ACTIVE", "ON_MAINTENANCE", "INACTIVE"] as const;

export const deviceIdSchema = z.string().uuid();

// Schema per un dispositivo
export const deviceSchema = z.object({
  id: z.number(),
  device_id: deviceIdSchema,
  name: z.string(),
  user: userIdSchema,
  brand: z.string(),
  serial_number: z.string(),
  status: z.enum(STATUS_DEVICE_CHOICES),
  purchase_date: z.string(),
  assigned_to: z.union([z.string(), z.number(), z.null()]).optional(),
  softwares: z.array(z.union([z.string(), z.number()])).optional(),
});


// Define a new schema for the form data
export const deviceFormSchema = z.object({
  name: z.string(),
  brand: z.string(),
  serial_number: z.string(),
  purchase_date: z.string(),
  assigned_to: z.string().optional(),
  softwares: z.array(z.string()).optional(),
});

// Update devicesSchema if needed
export const devicesSchema = z.array(deviceSchema);

// TypeScript type
export type Device = z.infer<typeof deviceSchema>;