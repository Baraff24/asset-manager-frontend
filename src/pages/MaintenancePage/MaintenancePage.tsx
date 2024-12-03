// src/pages/MaintenancePage.tsx

import React, { useState } from 'react';
import { Helmet } from "react-helmet";
import MaintenanceForm from "../../components/MaintenanceForm";
import MaintenanceList from '../../components/MaintenanceList';
import { useFetch } from "../../hooks/useFetch";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Device, devicesSchema, MaintenanceRequest, maintenanceRequestsSchema, CreateMaintenanceRequestInput } from "../../schemas";
import {createMaintenanceRequest} from "../../services/maintenanceServices.ts";


const MaintenancePage: React.FC = () => {
  // Fetch user devices
  const {
    data: devices,
    error: devicesError,
    isLoading: devicesLoading,
  } = useFetch<Device[]>(`/api/v1/accounts/devices/`, devicesSchema);

  // Fetch maintenance requests
  const {
    data: requests,
    error: requestsError,
    isLoading: requestsLoading,
    mutate: mutateRequests
  } = useFetch<MaintenanceRequest[]>(`/api/v1/accounts/maintenance-interventions/`, maintenanceRequestsSchema);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Funzione per aggiungere una richiesta
  const addRequest = async (request: CreateMaintenanceRequestInput) => {
    setIsSubmitting(true);
    try {
      const newRequest = await createMaintenanceRequest(request);
      await mutateRequests([newRequest, ...(requests || [])], false);
      toast.success("Richiesta di manutenzione aggiunta con successo!");
    } catch (err: any) {
      toast.error(err.message || "Errore durante l'aggiunta della richiesta.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Gestione degli stati di caricamento ed errori
  if (devicesLoading || requestsLoading) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <p className="text-xl">Caricamento...</p>
        </div>
    );
  }

  if (devicesError || requestsError || !devices || !requests) { // Aggiungi !devices e !requests
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <p className="text-xl text-red-500">
            {devicesError ? "Errore nel caricamento dei dispositivi." : "Errore nel caricamento delle richieste di manutenzione."}
          </p>
        </div>
    );
  }

  return (
      <>
        <Helmet>
          <title>ITAM - Manutenzioni</title>
          <meta name="description"
                content="Gestisci le tue risorse aziendali in modo efficiente e sicuro con ITAM."/>
        </Helmet>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-8 text-center text-indigo-600">Richieste di Manutenzione</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <MaintenanceForm onSubmit={addRequest} isSubmitting={isSubmitting} devices={devices} />
            <MaintenanceList requests={requests} />
          </div>
        </div>
        <ToastContainer />
      </>
  );
}

export default MaintenancePage;
