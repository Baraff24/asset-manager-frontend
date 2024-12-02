import { MaintenanceRequest, maintenanceRequestSchema } from "../schemas";
import { fetcher } from "./fetcher";

// Tipo per la creazione di una richiesta di manutenzione
interface CreateMaintenanceRequestData {
  deviceId: number;
  issueDescription: string;
}

// Tipo per l'aggiornamento dello stato di una richiesta
// interface UpdateMaintenanceRequestStatusData {
//   status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
// }


// Funzione per creare una nuova richiesta di manutenzione
export const createMaintenanceRequest = async (data: CreateMaintenanceRequestData): Promise<MaintenanceRequest> => {
  const response = await fetcher("/api/v1/accounts/maintenance-intervention/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return maintenanceRequestSchema.parse(response);
};

// Funzione per aggiornare lo stato di una richiesta di manutenzione
export const updateMaintenanceRequestStatus = async (id: number, status: MaintenanceRequest['status']): Promise<MaintenanceRequest> => {
  const response = await fetcher(`/api/v1/accounts/maintenance-intervention/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  return maintenanceRequestSchema.parse(response);
};
