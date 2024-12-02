import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import {useFetch} from "../../hooks/useFetch.ts";
import {Software, softwareSchema} from "../../schemas";
import {GenericForm, GenericList} from "../../components";
import {Column} from "../../components/GenericList/GenericList.tsx";

const SoftwarePage: React.FC = () => {
    // Utilizza l'hook useFetch per ottenere i software
    const { data: softwares, error, isLoading, mutate } = useFetch<Software[]>('/api/v1/accounts/softwares/', softwareSchema.array());

    // Stati per la gestione del form di creazione e modifica
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
    const [editingSoftware, setEditingSoftware] = useState<Software | null>(null);

    // Funzione per creare un nuovo software
    const handleCreate = async (data: Omit<Software, 'id'>) => {
        try {
            const response = await fetch('/api/v1/accounts/softwares/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error('Errore durante la creazione del software');
            const newSoftware: Software = await response.json();
            // Assicura che softwares non sia null utilizzando ?? []
            await mutate([...(softwares ?? []), newSoftware], false);
            toast.success('Software creato con successo');
            setIsFormOpen(false);
        } catch (err: any) {
            toast.error(err.message || 'Errore durante la creazione del software');
        }
    };

    // Funzione per aggiornare un software esistente
    const handleUpdate = async (data: Software) => {
        try {
            const response = await fetch(`/api/v1/accounts/softwares/${data.id}/`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error('Errore durante l\'aggiornamento del software');
            const updatedSoftware: Software = await response.json();
            const updatedSoftwares = softwares ? softwares.map(sw => sw.id === updatedSoftware.id ? updatedSoftware : sw) : [];
            await mutate(updatedSoftwares, false);
            toast.success('Software aggiornato con successo');
            setEditingSoftware(null);
        } catch (err: any) {
            toast.error(err.message || 'Errore durante l\'aggiornamento del software');
        }
    };

    // Funzione per eliminare un software
    const handleDelete = async (software: Software) => {
        if (!window.confirm(`Sei sicuro di voler eliminare il software ${software.name}?`)) return;
        try {
            const response = await fetch(`/api/v1/accounts/softwares/${software.id}/`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Errore durante l\'eliminazione del software');
            const updatedSoftwares = softwares ? softwares.filter(sw => sw.id !== software.id) : [];
            await mutate(updatedSoftwares, false);
            toast.success('Software eliminato con successo');
        } catch (err: any) {
            toast.error(err.message || 'Errore durante l\'eliminazione del software');
        }
    };

    // Definizione delle colonne, tipizzate correttamente
    const columns: Column<Software>[] = [
        { header: 'ID', accessor: 'id' },
        { header: 'Nome', accessor: 'name' },
        { header: 'Versione', accessor: 'version' },
        { header: 'Licenza', accessor: 'license_key' },
        { header: 'Max Installazioni', accessor: 'max_installations' },
        // Se Software ha altre proprietà, aggiungile qui con accessor validi
        // Ad esempio, se vuoi mostrare 'supplier.name', puoi aggiungere una colonna con accessor 'supplier.name' e una funzione di render
        // { header: 'Fornitore', accessor: 'supplier.name', render: (value) => value },
    ];

    // Definizione delle azioni per ogni riga del software
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
                    data={softwares ?? []} // Usa ?? [] per assicurare che data sia sempre un array
                    actions={actions}
                />
            )}
            {(isFormOpen || editingSoftware) && (
                <GenericForm<Software>
                    fields={[
                        { name: 'name', label: 'Nome', type: 'text', placeholder: 'Inserisci nome software' },
                        { name: 'version', label: 'Versione', type: 'text', placeholder: 'Inserisci versione' },
                        { name: 'license_key', label: 'Chiave Licenza', type: 'text', placeholder: 'Inserisci chiave licenza (opzionale)' },
                        { name: 'max_installations', label: 'Max Installazioni', type: 'number', placeholder: 'Inserisci numero massimo di installazioni' },
                        // Aggiungi altri campi se necessario, ad esempio 'supplier', 'expire_date', ecc.
                    ]}
                    schema={
                        editingSoftware
                            ? softwareSchema.partial().extend({ id: softwareSchema.shape.id })
                            : softwareSchema.omit({ id: true })
                    }
                    defaultValues={editingSoftware || undefined}
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
