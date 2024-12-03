import React, { useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { Device, devicesSchema } from '../../schemas';
import { toast } from 'react-toastify';
import { GenericForm, GenericList } from '../../components';
import {Column} from "../../components/GenericList/GenericList.tsx";
import {FaEdit, FaTrash} from "react-icons/fa";
import {fetcher} from "../../services";

const DevicesPage: React.FC = () => {
    // Utilizza l'hook useFetch per ottenere i dispositivi
    // Rimuovi .array() perché devicesSchema è già un ZodArray<Device>
    const { data: devices, error, isLoading, mutate } = useFetch<Device[]>('/api/v1/accounts/devices/', devicesSchema);

    // Stati per la gestione del form di creazione e modifica
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [editingDevice, setEditingDevice] = useState<Device | null>(null);

    // Funzione per creare un nuovo dispositivo
    const handleCreate = async (deviceData: Omit<Device, 'id'>) => {
        try {
            const response = await fetcher('/api/v1/accounts/devices/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(deviceData),
            });
            if (!response.ok) throw new Error('Failed to create device');
            const newDevice: Device = await response.json();
            // Assicura che devices non sia null utilizzando ?? []
            await mutate([...(devices ?? []), newDevice], false);
            toast.success('Dispositivo creato con successo');
            setIsCreating(false);
        } catch (error: any) {
            toast.error(error.message || 'Errore durante la creazione del dispositivo');
        }
    };

    // Funzione per aggiornare un dispositivo esistente
    const handleUpdate = async (id: number, deviceData: Partial<Device>) => {
        try {
            const response = await fetcher(`/api/v1/accounts/devices/${id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(deviceData),
            });
            if (!response.ok) throw new Error('Failed to update device');
            const updatedDevice: Device = await response.json();
            const updatedDevices = devices ? devices.map(device => device.id === id ? updatedDevice : device) : [];
            await mutate(updatedDevices, false);
            toast.success('Dispositivo aggiornato con successo');
            setEditingDevice(null);
        } catch (error: any) {
            toast.error(error.message || 'Errore durante l\'aggiornamento del dispositivo');
        }
    };

    // Funzione per eliminare un dispositivo
    const handleDelete = async (id: number) => {
        try {
            const response = await fetcher(`/api/v1/accounts/devices/${id}/`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete device');
            const updatedDevices = devices ? devices.filter(device => device.id !== id) : [];
            await mutate(updatedDevices, false);
            toast.success('Dispositivo eliminato con successo');
        } catch (error: any) {
            toast.error(error.message || 'Errore durante l\'eliminazione del dispositivo');
        }
    };

    // Definizione delle colonne, tipizzate correttamente
    const columns: Column<Device>[] = [
        { header: 'ID', accessor: 'id' },
        { header: 'Nome', accessor: 'name' },
        { header: 'Brand', accessor: 'brand' },
        { header: 'Serial Number', accessor: 'serial_number' },
        { header: 'Status', accessor: 'status' },
        { header: 'Data Acquisto', accessor: 'purchase_date' },
        { header: 'Assegnato a', accessor: 'assigned_to' },
        // Se Device ha altre proprietà come 'supplier.name', puoi aggiungere colonne con accessor 'supplier.name'
        // {
        //     header: 'Fornitore',
        //     accessor: 'supplier.name',
        //     render: (value: string) => value
        // },
    ];

    // Definizione delle azioni per ogni riga del dispositivo
    const actions = [
        {
            icon: FaEdit,
            label: 'Modifica',
            onClick: (device: Device) => setEditingDevice(device),
            color: 'bg-yellow-500 hover:bg-yellow-700',
        },
        {
            icon: FaTrash,
            label: 'Elimina',
            onClick: (device: Device) => handleDelete(device.id),
            color: 'bg-red-500 hover:bg-red-700',
        },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Gestione Dispositivi</h1>
            <button
                onClick={() => setIsCreating(true)}
                className="bg-green-500 text-white px-4 py-2 rounded mb-4"
            >
                Aggiungi Dispositivo
            </button>
            {isLoading ? (
                <div>Caricamento...</div>
            ) : error ? (
                <div>Errore nel caricamento dei dispositivi</div>
            ) : (
                <GenericList<Device>
                    columns={columns}
                    data={devices ?? []} // Usa ?? [] per assicurare che data sia sempre un array
                    actions={actions}
                />
            )}
            {isCreating && (
                <GenericForm<Device>
                    fields={[
                        { name: 'name', label: 'Nome', type: 'text', placeholder: 'Inserisci nome dispositivo' },
                        // Aggiungi altri campi se necessario
                    ]}
                    // Utilizza devicesSchema.element() per accedere allo schema dell'oggetto Device
                    schema={devicesSchema.element.omit({ id: true })}
                    defaultValues={undefined}
                    onSubmit={handleCreate}
                    onClose={() => setIsCreating(false)}
                />
            )}
            {editingDevice && (
                <GenericForm<Device>
                    fields={[
                        { name: 'name', label: 'Nome', type: 'text', placeholder: 'Inserisci nome dispositivo' },
                        { name: 'brand', label: 'Brand', type: 'text', placeholder: 'Inserisci brand' },
                        { name: 'serial_number', label: 'Serial Number', type: 'text', placeholder: 'Inserisci serial number' },
                        { name: 'purchase_date', label: 'Data Acquisto', type: 'date', placeholder: 'Inserisci data di acquisto' },
                        { name: 'assigned_to', label: 'Assegnato a', type: 'number', placeholder: 'Inserisci ID utente (opzionale)' },
                        // Aggiungi altri campi se necessario
                    ]}
                    // Utilizza devicesSchema.element().partial() per rendere i campi opzionali durante l'aggiornamento
                    schema={devicesSchema.element.partial()}
                    defaultValues={editingDevice}
                    onSubmit={(data) => handleUpdate(editingDevice.id, data)}
                    onClose={() => setEditingDevice(null)}
                />
            )}
        </div>
    );

};

export default DevicesPage;
