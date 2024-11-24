import React, { useState } from 'react'
import { MaintenanceRequest } from './MaintenanceApp'

interface MaintenanceFormProps {
  onSubmit: (request: Omit<MaintenanceRequest, 'id' | 'requestDate' | 'status'>) => void
}

const MaintenanceForm: React.FC<MaintenanceFormProps> = ({ onSubmit }) => {
  const [deviceType, setDeviceType] = useState<string>('')
  const [deviceName, setDeviceName] = useState<string>('')
  const [issueDescription, setIssueDescription] = useState<string>('')

  {/*Management of form submission*/}
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ deviceType, deviceName, issueDescription })
    setDeviceType('')
    setDeviceName('')
    setIssueDescription('')
  }

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Nuova Richiesta di Manutenzione</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="deviceType">
            Tipo di Dispositivo
          </label>
          <select
            id="deviceType"
            value={deviceType}
            onChange={(e) => setDeviceType(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="">Seleziona un tipo</option>
            <option value="hardware">Hardware</option>
            <option value="software">Software</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="deviceName">
            Nome del Dispositivo
          </label>
          <input
            type="text"
            id="deviceName"
            value={deviceName}
            onChange={(e) => setDeviceName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="issueDescription">
            Descrizione del Problema
          </label>
          <textarea
            id="issueDescription"
            value={issueDescription}
            onChange={(e) => setIssueDescription(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows={4}
            required
          ></textarea>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Invia Richiesta
          </button>
        </div>
      </form>
    </div>
  )
}

export default MaintenanceForm

