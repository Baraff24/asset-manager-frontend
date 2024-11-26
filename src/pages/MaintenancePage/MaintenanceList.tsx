import React from 'react'
import { MaintenanceRequest } from './MaintenancePage.tsx'

interface MaintenanceListProps {
  requests: MaintenanceRequest[]
  onUpdateStatus: (id: number, status: MaintenanceRequest['status']) => void
}

const MaintenanceList: React.FC<MaintenanceListProps> = ({ requests, onUpdateStatus }) => {

  {/*Choice of color for different maintenance states*/}
  const getStatusColor = (status: MaintenanceRequest['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-200 text-yellow-800'
      case 'in-progress':
        return 'bg-blue-200 text-blue-800'
      case 'completed':
        return 'bg-green-200 text-green-800'
    }
  }

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Richieste di Manutenzione</h2>
      {requests.length === 0 ? (
        <p className="text-gray-600">Nessuna richiesta di manutenzione presente.</p>
      ) : (
        <ul className="space-y-4">
          {requests.map((request) => (
            <li key={request.id} className="border-b pb-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">{request.deviceName}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(request.status)}`}>
                  {request.status === 'pending' && 'In Attesa'}
                  {request.status === 'in-progress' && 'In Corso'}
                  {request.status === 'completed' && 'Completata'}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Tipo:</strong> {request.deviceType === 'hardware' ? 'Hardware' : 'Software'}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Descrizione:</strong> {request.issueDescription}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Data richiesta:</strong> {request.requestDate.toLocaleString()}
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={() => onUpdateStatus(request.id, 'in-progress')}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-xs"
                  disabled={request.status !== 'pending'}
                >
                  Inizia
                </button>
                <button
                  onClick={() => onUpdateStatus(request.id, 'completed')}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-xs"
                  disabled={request.status === 'completed'}
                >
                  Completa
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default MaintenanceList

