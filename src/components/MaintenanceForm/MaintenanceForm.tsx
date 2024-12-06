import React, { useState } from 'react';
import { FaTools } from 'react-icons/fa';
import {CreateMaintenanceRequestInput, Device } from '../../schemas';
import { formatDate } from '../../utils/utils';

interface MaintenanceFormProps {
  onSubmit: (request: CreateMaintenanceRequestInput) => void;
  devices: Device[];
  isSubmitting: boolean;
}

const MaintenanceForm: React.FC<MaintenanceFormProps> = ({ onSubmit, devices, isSubmitting }) => {
  const [deviceId, setDeviceId] = useState<number | ''>('');
  const [description, setDescription] = useState<string>('');
  const [interventionDate, setInterventionDate] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (deviceId === '') {
      alert("Seleziona un dispositivo.");
      return;
    }
    onSubmit({
      device: deviceId as number,
      description,
      date_intervention: formatDate(interventionDate),
    });
    setDeviceId('');
    setDescription('');
    setInterventionDate('');
  };

  return (
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-indigo-600 flex items-center">
          <FaTools className="mr-2" /> Nuova Richiesta di Manutenzione
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Selezione del dispositivo */}
          <div>
            <label htmlFor="deviceId" className="block text-gray-700 font-semibold mb-2">Dispositivo</label>
            <select
                id="deviceId"
                value={deviceId}
                onChange={(e) => setDeviceId(parseInt(e.target.value))}
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                required
            >
              <option value="">Seleziona un dispositivo</option>
              {devices.map((device) => (
                  <option key={device.id} value={device.id}>
                    {device.name} - {device.serial_number}
                  </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">Descrizione Intervento</label>
            <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                rows={4}
                placeholder="Descrivi l'intervento..."
            ></textarea>
          </div>

          {/* Intervention Date */}
          <div>
            <label htmlFor="interventionDate" className="block text-gray-700 font-semibold mb-2">Data Intervento</label>
            <input
                type="date"
                id="interventionDate"
                value={interventionDate}
                onChange={(e) => setInterventionDate(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
            />
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
};

export default MaintenanceForm;
