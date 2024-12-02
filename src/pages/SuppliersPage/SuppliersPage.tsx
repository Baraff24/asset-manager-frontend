import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import {useFetch} from "../../hooks/useFetch.ts";
import {Supplier, supplierSchema} from "../../schemas";
import {GenericForm, GenericList} from "../../components";
import {Column} from "../../components/GenericList/GenericList.tsx";

const SuppliersPage: React.FC = () => {
    // Utilizza l'hook useFetch per ottenere i fornitori
    const { data: suppliers, error, isLoading, mutate } = useFetch<Supplier[]>('/api/v1/accounts/suppliers/', supplierSchema.array());

    // Stati per la gestione del form di creazione e modifica
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
    const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);

    // Funzione per creare un nuovo fornitore
    const handleCreate = async (data: Omit<Supplier, 'id'>) => {
        try {
            const response = await fetch('/api/v1/accounts/suppliers/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error('Errore durante la creazione del fornitore');
            const newSupplier: Supplier = await response.json();
            // Assicura che suppliers non sia null utilizzando ?? []
            await mutate([...(suppliers ?? []), newSupplier], false);
            toast.success('Fornitore creato con successo');
            setIsFormOpen(false);
        } catch (err: any) {
            toast.error(err.message || 'Errore durante la creazione del fornitore');
        }
    };

    // Funzione per aggiornare un fornitore esistente
    const handleUpdate = async (data: Supplier) => {
        try {
            const response = await fetch(`/api/v1/accounts/suppliers/${data.id}/`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error('Errore durante l\'aggiornamento del fornitore');
            const updatedSupplier: Supplier = await response.json();
            const updatedSuppliers = suppliers ? suppliers.map(supplier => supplier.id === updatedSupplier.id ? updatedSupplier : supplier) : [];
            await mutate(updatedSuppliers, false);
            toast.success('Fornitore aggiornato con successo');
            setEditingSupplier(null);
        } catch (err: any) {
            toast.error(err.message || 'Errore durante l\'aggiornamento del fornitore');
        }
    };

    // Funzione per eliminare un fornitore
    const handleDelete = async (supplier: Supplier) => {
        if (!window.confirm(`Sei sicuro di voler eliminare il fornitore ${supplier.name}?`)) return;
        try {
            const response = await fetch(`/api/v1/suppliers/${supplier.id}/`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Errore durante l\'eliminazione del fornitore');
            const updatedSuppliers = suppliers ? suppliers.filter(s => s.id !== supplier.id) : [];
            await mutate(updatedSuppliers, false);
            toast.success('Fornitore eliminato con successo');
        } catch (err: any) {
            toast.error(err.message || 'Errore durante l\'eliminazione del fornitore');
        }
    };

    // Definizione delle colonne, allineate con le chiavi del tipo Supplier
    const columns: Column<Supplier>[] = [
        { header: 'ID', accessor: 'id' },
        { header: 'Nome', accessor: 'name' },
        { header: 'Telefono', accessor: 'telephone' },
        // Se Supplier ha altre proprietà come 'contact_email', 'phone_number', 'address', assicurati che siano incluse nel tipo e aggiungi le colonne corrispondenti
        // Ad esempio:
        // { header: 'Email Contatto', accessor: 'contact_email' },
        // { header: 'Indirizzo', accessor: 'address' },
    ];

    // Definizione delle azioni per ogni riga del fornitore
    const actions = [
        {
            icon: FaEdit,
            label: 'Modifica',
            onClick: (supplier: Supplier) => setEditingSupplier(supplier),
            color: 'bg-yellow-500 hover:bg-yellow-700',
        },
        {
            icon: FaTrash,
            label: 'Elimina',
            onClick: (supplier: Supplier) => handleDelete(supplier),
            color: 'bg-red-500 hover:bg-red-700',
        },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Gestione Fornitori</h1>
            <button
                onClick={() => setIsFormOpen(true)}
                className="mb-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
                Aggiungi Fornitore
            </button>
            {isLoading ? (
                <div>Caricamento...</div>
            ) : error ? (
                <div>Errore nel caricamento dei fornitori.</div>
            ) : (
                <GenericList<Supplier>
                    columns={columns}
                    data={suppliers ?? []} // Usa ?? [] per assicurare che data sia sempre un array
                    actions={actions}
                />
            )}
            {(isFormOpen || editingSupplier) && (
                <GenericForm<Supplier>
                    fields={[
                        { name: 'name', label: 'Nome', type: 'text', placeholder: 'Inserisci nome fornitore' },
                        { name: 'telephone', label: 'Telefono', type: 'text', placeholder: 'Inserisci telefono fornitore' },
                        // Aggiungi altri campi se necessario, ad esempio 'contact_email', 'address', ecc.
                    ]}
                    schema={editingSupplier ? supplierSchema.partial().extend({ id: supplierSchema.shape.id }) : supplierSchema.omit({ id: true })}
                    defaultValues={editingSupplier || undefined}
                    onSubmit={editingSupplier ? handleUpdate : handleCreate}
                    onClose={() => {
                        setIsFormOpen(false);
                        setEditingSupplier(null);
                    }}
                />
            )}
        </div>
    );

};

export default SuppliersPage;