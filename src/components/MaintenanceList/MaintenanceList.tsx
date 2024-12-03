import React from 'react';
import {MaintenanceRequest} from "../../schemas";

interface MaintenanceListProps {
  requests: MaintenanceRequest[];
}

const MaintenanceList: React.FC<MaintenanceListProps> = ({ requests }) => {

  // Scelta del colore per i diversi stati di manutenzione
  // const getStatusColor = (status: MaintenanceRequest['status']) => {
  //   switch (status) {
  //     case 'PENDING':
  //       return 'bg-yellow-200 text-yellow-800';
  //     case 'IN_PROGRESS':
  //       return 'bg-blue-200 text-blue-800';
  //     case 'COMPLETED':
  //       return 'bg-green-200 text-green-800';
  //     default:
  //       return 'bg-gray-200 text-gray-800';
  //   }
  // }

  // Converti lo stato in una stringa di visualizzazione
  // const getStatusDisplay = (status: MaintenanceRequest['status']) => {
  //   switch (status) {
  //     case 'PENDING':
  //       return 'In Attesa';
  //     case 'IN_PROGRESS':
  //       return 'In Corso';
  //     case 'COMPLETED':
  //       return 'Completata';
  //     default:
  //       return status;
  //   }
  // }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-indigo-600">Elenco Richieste di Manutenzione</h2>
      {requests.length === 0 ? (
        <p className="text-gray-600">Nessuna richiesta di manutenzione presente.</p>
      ) : (
        <ul className="space-y-4">
          {requests.map((request) => (
            <li key={request.id} className="border-b pb-4">
              {/*<div className="flex justify-between items-center mb-2">*/}
              {/*  <h3 className="text-lg font-semibold">{request.device.name}</h3>*/}
              {/*  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(request.status)}`}>*/}
              {/*    {getStatusDisplay(request.status)}*/}
              {/*  </span>*/}
              {/*</div>*/}
              {/*<p className="text-sm text-gray-600 mb-2">*/}
              {/*  <strong>Tipo:</strong> {request.device.type === 'hardware' ? 'Hardware' : 'Software'}*/}
              {/*</p>*/}
              <p className="text-sm text-gray-600 mb-2">
                <strong>Descrizione:</strong> {request.description}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Data richiesta:</strong> {new Date(request.date_intervention).toLocaleString()}
              </p>
              {/*<div className="flex space-x-2">*/}
              {/*  <ButtonWithIcon*/}
              {/*    onClick={() => onUpdateStatus(request.id, 'IN_PROGRESS')}*/}
              {/*    icon={FaPlay}*/}
              {/*    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-xs ${request.status !== 'PENDING' ? "opacity-50 cursor-not-allowed" : ""}`}*/}
              {/*    disabled={request.status !== 'PENDING'}*/}
              {/*  >*/}
              {/*    Inizia*/}
              {/*  </ButtonWithIcon>*/}
              {/*  <ButtonWithIcon*/}
              {/*    onClick={() => onUpdateStatus(request.id, 'COMPLETED')}*/}
              {/*    icon={FaCheck}*/}
              {/*    className={`bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-xs ${request.status === 'COMPLETED' ? "opacity-50 cursor-not-allowed" : ""}`}*/}
              {/*    disabled={request.status === 'COMPLETED'}*/}
              {/*  >*/}
              {/*    Completa*/}
              {/*  </ButtonWithIcon>*/}
              {/*</div>*/}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MaintenanceList;
