// src/components/MaintenanceForm.tsx

import React, { useState } from 'react';
import { FaTools } from 'react-icons/fa';
import {CreateMaintenanceRequestInput, Device} from "../../schemas";

interface MaintenanceFormProps {
  onSubmit: (request: CreateMaintenanceRequestInput) => void;
  devices: Device[];
  isSubmitting: boolean;
}

const MaintenanceForm: React.FC<MaintenanceFormProps> = ({ onSubmit, isSubmitting }) => {
  const [deviceId, setDeviceId] = useState<number | "">('');
  const [issueDescription, setIssueDescription] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (deviceId === "") {
      alert("Seleziona un dispositivo.");
      return;
    }
    onSubmit({ deviceId: deviceId as number, issueDescription });
    setDeviceId('');
    setIssueDescription('');
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-bold mb-6 text-indigo-600 flex items-center">
        <FaTools className="mr-2" /> Nuova Richiesta di Manutenzione
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/*/!* Device Selection *!/*/}
        {/*<div>*/}
        {/*  <label htmlFor="deviceId" className="block text-gray-700 font-semibold mb-2">Dispositivo</label>*/}
        {/*  <select*/}
        {/*    id="deviceId"*/}
        {/*    value={deviceId}*/}
        {/*    onChange={(e) => setDeviceId(Number(e.target.value))}*/}
        {/*    className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"*/}
        {/*    required*/}
        {/*  >*/}
        {/*    <option value="">Seleziona un dispositivo</option>*/}
        {/*    {devices.map(device => (*/}
        {/*      <option key={device.id} value={device.id}>*/}
        {/*        {device.name} ({device.type === 'hardware' ? 'Hardware' : 'Software'})*/}
        {/*      </option>*/}
        {/*    ))}*/}
        {/*  </select>*/}
        {/*</div>*/}

        {/* Issue Description */}
        <div>
          <label htmlFor="issueDescription" className="block text-gray-700 font-semibold mb-2">Descrizione del Problema</label>
          <textarea
            id="issueDescription"
            value={issueDescription}
            onChange={(e) => setIssueDescription(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
            rows={4}
            required
            placeholder="Descrivi il problema..."
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex items-center bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isSubmitting ? (
              <>
                {/* Puoi aggiungere un'icona di caricamento qui */}
                Inviando...
              </>
            ) : (
              "Invia Richiesta"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default MaintenanceForm;
