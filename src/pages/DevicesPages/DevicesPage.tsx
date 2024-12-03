import React, { useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import {
  Device,
  deviceFormSchema,
  devicesSchema,
  Software,
  softwaresSchema,
  User,
  usersSchema,
} from '../../schemas';
import { toast } from 'react-toastify';
import { GenericForm, GenericList } from '../../components';
import { Column } from '../../components/GenericList/GenericList';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { fetcher } from '../../services';
import { Field } from '../../components/GenericForm/GenericForm';
import { useAuthContext } from '../../context/authContext';
import {formatDate} from "../../utils/utils.ts";

const DevicesPage: React.FC = () => {
  // Ottieni l'utente corrente
  const { user: currentUser } = useAuthContext();

  // Stati e fetch
  const { data: devices, error, isLoading, mutate } = useFetch<Device[]>('/api/v1/accounts/devices/', devicesSchema);
  const { data: availableSoftwares } = useFetch<Software[]>('/api/v1/accounts/softwares/', softwaresSchema);
  const { data: users } = useFetch<User[]>('/api/v1/accounts/users/', usersSchema);

  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [editingDevice, setEditingDevice] = useState<Device | null>(null);

  // Funzioni helper
  const parseSoftwareIds = (softwares?: string[]): number[] | undefined => {
    return softwares?.map((id) => parseInt(id, 10));
  };

  interface DeviceFormData {
    name: string;
    brand: string;
    serial_number: string;
    purchase_date: string;
    assigned_to?: string;
    softwares?: string[];
  }

  // Funzioni di gestione
  const handleCreate = async (deviceData: DeviceFormData) => {
    try {
      const preparedData = {
        ...deviceData,
        user: currentUser?.id,
        purchase_date: formatDate(deviceData.purchase_date),
        assigned_to: deviceData.assigned_to ? parseInt(deviceData.assigned_to, 10) : null,
        softwares: parseSoftwareIds(deviceData.softwares),
      };

      console.log('Prepared data:', preparedData);

      const newDevice = await fetcher('/api/v1/accounts/devices/', {
        method: 'POST',
        body: JSON.stringify(preparedData),
      });

      await mutate([...(devices ?? []), newDevice], false);
      toast.success('Dispositivo creato con successo');
      setIsCreating(false);
    } catch (error: any) {
      console.error('Error in handleCreate:', error);
      toast.error(error.message || 'Errore durante la creazione del dispositivo');
    }
  };

  const handleUpdate = async (id: number, deviceData: DeviceFormData) => {
    try {
      const preparedData = {
        ...deviceData,
        user: currentUser?.id,
        purchase_date: formatDate(deviceData.purchase_date),
        assigned_to: deviceData.assigned_to ? parseInt(deviceData.assigned_to, 10) : null,
        softwares: parseSoftwareIds(deviceData.softwares),
      };

      console.log('Prepared data:', preparedData);

      const updatedDevice = await fetcher(`/api/v1/accounts/devices/${id}/`, {
        method: 'PUT',
        body: JSON.stringify(preparedData),
      });

      const updatedDevices = devices
          ? devices.map((device) => (device.id === id ? updatedDevice : device))
          : [];
      await mutate(updatedDevices, false);
      toast.success('Dispositivo aggiornato con successo');
      setEditingDevice(null);
    } catch (error: any) {
      console.error('Error in handleUpdate:', error);
      toast.error(error.message || "Errore durante l'aggiornamento del dispositivo");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetcher(`/api/v1/accounts/devices/${id}/`, {
        method: 'DELETE',
      });
      const updatedDevices = devices ? devices.filter((device) => device.id !== id) : [];
      await mutate(updatedDevices, false);
      toast.success('Dispositivo eliminato con successo');
    } catch (error: any) {
      console.error('Error in handleDelete:', error);
      toast.error(error.message || "Errore durante l'eliminazione del dispositivo");
    }
  };

  // Definizione delle colonne
  const columns: Column<Device>[] = [
    { header: 'ID', accessor: 'id' },
    { header: 'Nome', accessor: 'name' },
    { header: 'Brand', accessor: 'brand' },
    { header: 'Serial Number', accessor: 'serial_number' },
    { header: 'Status', accessor: 'status' },
    { header: 'Data Acquisto', accessor: 'purchase_date' },
    {
      header: 'Assegnato a',
      accessor: 'assigned_to',
      render: (assignedTo: number) => {
        const assignedUser = users?.find((user) => user.id === assignedTo);
        return assignedUser ? assignedUser.username : '';
      },
    },
    {
      header: 'Softwares',
      accessor: 'softwares',
      render: (softwares: number[]) => softwares?.join(', '),
    },
  ];

  // Definizione delle azioni
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

  // Definizione dei campi del form
  const createFields: Field<DeviceFormData>[] = [
    {
      name: 'name',
      label: 'Nome',
      type: 'text',
      placeholder: 'Inserisci nome dispositivo',
    },
    {
      name: 'brand',
      label: 'Brand',
      type: 'text',
      placeholder: 'Inserisci brand',
    },
    {
      name: 'serial_number',
      label: 'Serial Number',
      type: 'text',
      placeholder: 'Inserisci serial number',
    },
    {
      name: 'purchase_date',
      label: 'Data Acquisto',
      type: 'date',
      placeholder: 'Inserisci data di acquisto',
    },
    {
      name: 'assigned_to',
      label: 'Assegnato a',
      type: 'select',
      options:
          users?.map((user) => ({
            label: user.username,
            value: user.id.toString(),
          })) || [],
    },
    {
      name: 'softwares',
      label: 'Softwares',
      type: 'multiselect',
      options:
          availableSoftwares?.map((software) => ({
            label: `${software.name} v${software.version}`,
            value: software.id.toString(),
          })) || [],
    },
  ];

  // Valori predefiniti per la modifica
  const editingDefaultValues: DeviceFormData | undefined = editingDevice
      ? {
        name: editingDevice.name,
        brand: editingDevice.brand,
        serial_number: editingDevice.serial_number,
        purchase_date: editingDevice.purchase_date,
        assigned_to: editingDevice.assigned_to?.toString(),
        softwares: editingDevice.softwares?.map((id) => id.toString()),
      }
      : undefined;

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
            <GenericList<Device> columns={columns} data={devices ?? []} actions={actions} />
        )}
        {isCreating && (
            <GenericForm<DeviceFormData>
                fields={createFields}
                schema={deviceFormSchema}
                onSubmit={handleCreate}
                onClose={() => setIsCreating(false)}
            />
        )}
        {editingDevice && (
            <GenericForm<DeviceFormData>
                fields={createFields}
                schema={deviceFormSchema.partial()}
                defaultValues={editingDefaultValues}
                onSubmit={(data) => handleUpdate(editingDevice.id, data)}
                onClose={() => setEditingDevice(null)}
            />
        )}
      </div>
  );
};

export default DevicesPage;
