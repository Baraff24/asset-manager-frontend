import { z } from "zod";
import { deviceIdSchema } from "./deviceSchema";
import { userIdSchema } from "./userSchema";

export const maintenanceInterventionSchema = z.object({
  id: z.number(),
  device: deviceIdSchema,
  description: z.string(),
  date_intervention: z.string(),
  technician: userIdSchema.nullable(),
});

export type MaintenanceIntervention = z.infer<typeof maintenanceInterventionSchema>;
