import { z } from "zod";


export const maintenanceRequestSchema = z.object({
  id: z.number(),
  device: z.number(),
  date_intervention: z.string(),
  description: z.string(),
  technician: z.number(),
  status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"]),
});

// Schema per una lista di richieste di manutenzione
export const maintenanceRequestsSchema = z.array(maintenanceRequestSchema);

export type MaintenanceRequest = z.infer<typeof maintenanceRequestSchema>;

// Schema per una richiesta di manutenzione (Input)
export const createMaintenanceRequestInputSchema = z.object({
  device: z.number(),
  description: z.string(),
  date_intervention: z.string(),
});

export type CreateMaintenanceRequestInput = z.infer<typeof createMaintenanceRequestInputSchema>;
