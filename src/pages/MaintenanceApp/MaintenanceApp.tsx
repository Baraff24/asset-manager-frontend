import React, { useState } from 'react'
import MaintenanceForm from './MaintenanceForm'
import MaintenanceList from './MaintenanceList'

export interface MaintenanceRequest {
  id: number
  deviceType: string
  deviceName: string
  issueDescription: string
  requestDate: Date
  status: 'pending' | 'in-progress' | 'completed'
}

const MaintenanceApp: React.FC = () => {
  const [requests, setRequests] = useState<MaintenanceRequest[]>([])

  {/*Adds a request. This function takes the entire MaintenanceRequest as a parameter, omitting 
    id, requestDate and status which are also managed for the MaintenanceList but which are not required for filling out the form*/}
  const addRequest = (request: Omit<MaintenanceRequest, 'id' | 'requestDate' | 'status'>) => {
    const newRequest: MaintenanceRequest = {
      ...request,
      id: Date.now(),
      requestDate: new Date(),
      status: 'pending',
    }
    setRequests([newRequest, ...requests])
  }

  {/*Update the status of the request (pending,in-progress,completed*/}
  const updateRequestStatus = (id: number, status: MaintenanceRequest['status']) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status } : req
    ))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Richieste di Manutenzione</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <MaintenanceForm onSubmit={addRequest} />
        <MaintenanceList requests={requests} onUpdateStatus={updateRequestStatus} />
      </div>
    </div>
  )
}

export default MaintenanceApp