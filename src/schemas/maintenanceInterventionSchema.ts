import { z } from "zod";
import {deviceSchema} from "./deviceSchema";


export const maintenanceRequestSchema = z.object({
  id: z.number(),
  device: deviceSchema, // Inclusione del dispositivo associato
  issueDescription: z.string(),
  requestDate: z.string(), // ISO string date
  status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED']),
});

// Schema per una lista di richieste di manutenzione
export const maintenanceRequestsSchema = z.array(maintenanceRequestSchema);

export type MaintenanceRequest = z.infer<typeof maintenanceRequestSchema>;

// Schema per una richiesta di manutenzione (Input)
export const createMaintenanceRequestInputSchema = z.object({
  deviceId: z.number(),
  issueDescription: z.string(),
});

export type CreateMaintenanceRequestInput = z.infer<typeof createMaintenanceRequestInputSchema>;

// Schema per l'aggiornamento dello stato di una richiesta
export const updateMaintenanceRequestStatusDataSchema = z.object({
  status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED']),
});

export type UpdateMaintenanceRequestStatusData = z.infer<typeof updateMaintenanceRequestStatusDataSchema>;
