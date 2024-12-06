import React, { useState } from 'react';
import { MaintenanceRequest } from "../../schemas";
import { FaPlay, FaCheck } from 'react-icons/fa';

interface MaintenanceListProps {
  requests: MaintenanceRequest[];
  onUpdateStatus: (id: number, status: 'IN_PROGRESS' | 'COMPLETED') => void;
}

const MaintenanceList: React.FC<MaintenanceListProps> = ({ requests, onUpdateStatus }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 3; // numero di elementi per pagina

  // Scelta del colore per i diversi stati di manutenzione
  const getStatusColor = (status: MaintenanceRequest['status']) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-200 text-yellow-800';
      case 'IN_PROGRESS':
        return 'bg-blue-200 text-blue-800';
      case 'COMPLETED':
        return 'bg-green-200 text-green-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  }

  // Converti lo stato in una stringa di visualizzazione
  const getStatusDisplay = (status: MaintenanceRequest['status']) => {
    switch (status) {
      case 'PENDING':
        return 'In Attesa';
      case 'IN_PROGRESS':
        return 'In Corso';
      case 'COMPLETED':
        return 'Completata';
      default:
        return status;
    }
  }

  // Calcolo degli elementi da mostrare in base alla pagina corrente
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedRequests = requests.slice(startIndex, endIndex);

  const totalPages = Math.ceil(requests.length / pageSize);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-indigo-600">Elenco Richieste di Manutenzione</h2>
      {requests.length === 0 ? (
        <p className="text-gray-600">Nessuna richiesta di manutenzione presente.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {paginatedRequests.map((request) => (
              <li key={request.id} className="border-b pb-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold">Dispositivo #{request.device}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(request.status)}`}>
                    {getStatusDisplay(request.status)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Descrizione:</strong> {request.description}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Data richiesta:</strong> {new Date(request.date_intervention).toLocaleDateString('it-IT')}
                </p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => onUpdateStatus(request.id, 'IN_PROGRESS')}
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-xs ${request.status !== 'PENDING' ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={request.status !== 'PENDING'}
                  >
                    <FaPlay className="inline-block mr-1" />
                    Inizia
                  </button>
                  <button
                    onClick={() => onUpdateStatus(request.id, 'COMPLETED')}
                    className={`bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-xs ${request.status === 'COMPLETED' ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={request.status === 'COMPLETED' || request.status === 'PENDING'}
                  >
                    <FaCheck className="inline-block mr-1" />
                    Completa
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Paginazione */}
          <div className="flex items-center justify-center mt-4 space-x-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`px-3 py-1 border rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'}`}
            >
              Precedente
            </button>
            <span>Pagina {currentPage} di {totalPages}</span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 border rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'}`}
            >
              Successiva
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default MaintenanceList;
