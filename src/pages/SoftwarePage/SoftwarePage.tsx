import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useFetch } from '../../hooks/useFetch';
import {Software, softwareFormSchema, softwareSchema, Supplier, suppliersSchema} from '../../schemas';
import { Column } from '../../components/GenericList/GenericList';
import { fetcher } from '../../services';
import { Field } from '../../components/GenericForm/GenericForm';
import {formatDate} from "../../utils/utils.ts";
import {GenericForm, GenericList} from "../../components";

const SoftwarePage: React.FC = () => {
  const { data: softwares, error, isLoading, mutate } = useFetch<Software[]>('/api/v1/accounts/softwares/', softwareSchema.array());
  const { data: suppliers } = useFetch<Supplier[]>('/api/v1/accounts/suppliers/', suppliersSchema);

  // State for form
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [editingSoftware, setEditingSoftware] = useState<Software | null>(null);

  // Form data interface
  interface SoftwareFormData {
    name: string;
    version: string;
    license_key?: string;
    max_installations: number;
    supplier?: string;
    expire_date?: string;
  }

  // Handle create
  const handleCreate = async (data: SoftwareFormData) => {
    try {
      const preparedData = {
        ...data,
        supplier: data.supplier ? parseInt(data.supplier, 10) : null,
        expire_date: data.expire_date ? formatDate(data.expire_date) : null,
      };

      const newSoftware: Software = await fetcher('/api/v1/accounts/softwares/', {
        method: 'POST',
        body: JSON.stringify(preparedData),
      });
      await mutate([...(softwares ?? []), newSoftware], false);
      toast.success('Software creato con successo');
      setIsFormOpen(false);
    } catch (err: any) {
      toast.error(err.message || 'Errore durante la creazione del software');
    }
  };

   // Handle update
  const handleUpdate = async (data: SoftwareFormData) => {
    try {
      const preparedData = {
        ...data,
        supplier: data.supplier ? parseInt(data.supplier, 10) : null,
        expire_date: data.expire_date ? formatDate(data.expire_date) : null,
      };

      const updatedSoftware: Software = await fetcher(`/api/v1/accounts/softwares/${editingSoftware?.id}/`, {
        method: 'PUT',
        body: JSON.stringify(preparedData),
      });

      const updatedSoftwares = softwares ? softwares.map(sw => sw.id === updatedSoftware.id ? updatedSoftware : sw) : [];
      await mutate(updatedSoftwares, false);
      toast.success('Software aggiornato con successo');
      setEditingSoftware(null);
    } catch (err: any) {
      toast.error(err.message || 'Errore durante l\'aggiornamento del software');
    }
  };

  // Handle delete (unchanged)
  const handleDelete = async (software: Software) => {
    if (!window.confirm(`Sei sicuro di voler eliminare il software ${software.name}?`)) return;
    try {
      await fetcher(`/api/v1/accounts/softwares/${software.id}/`, {
        method: 'DELETE',
      });

      const updatedSoftwares = softwares ? softwares.filter(sw => sw.id !== software.id) : [];
      await mutate(updatedSoftwares, false);
      toast.success('Software eliminato con successo');
    } catch (err: any) {
      toast.error(err.message || 'Errore durante l\'eliminazione del software');
    }
  };

  // Define columns
  const columns: Column<Software>[] = [
    { header: 'ID', accessor: 'id' },
    { header: 'Nome', accessor: 'name' },
    { header: 'Versione', accessor: 'version' },
    { header: 'Licenza', accessor: 'license_key' },
    { header: 'Max Installazioni', accessor: 'max_installations' },
    {
      header: 'Fornitore',
      accessor: 'supplier',
      render: (supplierId: number) => suppliers?.find(supplier => supplier.id === supplierId)?.name || '',
    },
    { header: 'Data di Scadenza', accessor: 'expire_date' },
  ];

  // Define actions (unchanged)
  const actions = [
    {
      icon: FaEdit,
      label: 'Modifica',
      onClick: (software: Software) => setEditingSoftware(software),
      color: 'bg-yellow-500 hover:bg-yellow-700',
    },
    {
      icon: FaTrash,
      label: 'Elimina',
      onClick: (software: Software) => handleDelete(software),
      color: 'bg-red-500 hover:bg-red-700',
    },
  ];

  // Form fields
  const softwareFields: Field<SoftwareFormData>[] = [
    { name: 'name', label: 'Nome', type: 'text', placeholder: 'Inserisci nome software' },
    { name: 'version', label: 'Versione', type: 'text', placeholder: 'Inserisci versione' },
    { name: 'license_key', label: 'Chiave Licenza', type: 'text', placeholder: 'Inserisci chiave licenza (opzionale)' },
    { name: 'max_installations', label: 'Max Installazioni', type: 'number', placeholder: 'Inserisci numero massimo di installazioni' },
    {
      name: 'supplier',
      label: 'Fornitore',
      type: 'select',
      options: suppliers?.map(supplier => ({ label: supplier.name, value: supplier.id.toString() })) || [],
    },
    { name: 'expire_date', label: 'Data di Scadenza', type: 'date', placeholder: 'Inserisci data di scadenza' },
  ];

  // Prepare default values for editing
  const editingDefaultValues: SoftwareFormData | undefined = editingSoftware
    ? {
        name: editingSoftware.name,
        version: editingSoftware.version,
        license_key: editingSoftware.license_key,
        max_installations: editingSoftware.max_installations,
        supplier: editingSoftware.supplier?.toString(),
        expire_date: editingSoftware.expire_date,
      }
    : undefined;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Gestione Software</h1>
      <button
        onClick={() => setIsFormOpen(true)}
        className="mb-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Aggiungi Software
      </button>
      {isLoading ? (
        <div>Caricamento...</div>
      ) : error ? (
        <div>Errore nel caricamento del software.</div>
      ) : (
        <GenericList<Software>
          columns={columns}
          data={softwares ?? []}
          actions={actions}
        />
      )}
      {(isFormOpen || editingSoftware) && (
        <GenericForm<SoftwareFormData>
          fields={softwareFields}
          schema={
            editingSoftware
              ? softwareFormSchema.partial()
              : softwareFormSchema
          }
          defaultValues={editingDefaultValues}
          onSubmit={editingSoftware ? handleUpdate : handleCreate}
          onClose={() => {
            setIsFormOpen(false);
            setEditingSoftware(null);
          }}
        />
      )}
    </div>
  );
};

export default SoftwarePage;