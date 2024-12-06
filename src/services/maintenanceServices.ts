import { MaintenanceRequest, maintenanceRequestSchema } from "../schemas";
import { fetcher } from "./fetcher";

// Tipo per la creazione di una richiesta di manutenzione
interface CreateMaintenanceRequestData {
  device: number;
  description: string;
  date_intervention: string;
}

// Tipo per l'aggiornamento dello stato di una richiesta
interface UpdateMaintenanceRequestData {
  device: number;
  description: string;
  date_intervention: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
}


// Funzione per creare una nuova richiesta di manutenzione
export const createMaintenanceRequest = async (data: CreateMaintenanceRequestData): Promise<MaintenanceRequest> => {
  const response = await fetcher("/api/v1/accounts/maintenance-interventions/", {
    method: "POST",
    body: JSON.stringify(data),
  });

  return maintenanceRequestSchema.parse(response);
};

// Funzione per aggiornare lo stato di una richiesta di manutenzione
export const updateMaintenanceRequest = async (id: number, data: UpdateMaintenanceRequestData): Promise<MaintenanceRequest> => {
  const response = await fetcher(`/api/v1/accounts/maintenance-interventions/${id}/`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  return maintenanceRequestSchema.parse(response);
};
