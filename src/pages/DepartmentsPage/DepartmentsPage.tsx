import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import {useFetch} from "../../hooks/useFetch.ts";
import {Department, departmentSchema} from "../../schemas";
import {GenericForm, GenericList} from "../../components";
import {Column} from "../../components/GenericList/GenericList.tsx";


const DepartmentsPage: React.FC = () => {
    // Utilizza l'hook useFetch per ottenere i dipartimenti
    const { data: departments, error, isLoading, mutate } = useFetch<Department[]>('/api/v1/accounts/departments/', departmentSchema.array());

    // Stati per la gestione del form di creazione e modifica
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
    const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);

    // Funzione per creare un nuovo dipartimento
    const handleCreate = async (data: Omit<Department, 'id'>) => {
        try {
            const response = await fetch('/api/v1/accounts/departments/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error('Errore durante la creazione del dipartimento');
            const newDepartment: Department = await response.json();
            // Assicura che departments non sia null utilizzando ?? []
            await mutate([...(departments ?? []), newDepartment], false);
            toast.success('Dipartimento creato con successo');
            setIsFormOpen(false);
        } catch (err: any) {
            toast.error(err.message || 'Errore durante la creazione del dipartimento');
        }
    };

    // Funzione per aggiornare un dipartimento esistente
    const handleUpdate = async (data: Department) => {
        try {
            const response = await fetch(`/api/v1/accounts/departments/${data.id}/`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error('Errore durante l\'aggiornamento del dipartimento');
            const updatedDepartment: Department = await response.json();
            const updatedDepartments = departments ? departments.map(dep => dep.id === updatedDepartment.id ? updatedDepartment : dep) : [];
            await mutate(updatedDepartments, false);
            toast.success('Dipartimento aggiornato con successo');
            setEditingDepartment(null);
        } catch (err: any) {
            toast.error(err.message || 'Errore durante l\'aggiornamento del dipartimento');
        }
    };

    // Funzione per eliminare un dipartimento
    const handleDelete = async (department: Department) => {
        if (!window.confirm(`Sei sicuro di voler eliminare il dipartimento ${department.name}?`)) return;
        try {
            const response = await fetch(`/api/v1/departments/${department.id}/`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Errore durante l\'eliminazione del dipartimento');
            const updatedDepartments = departments ? departments.filter(dep => dep.id !== department.id) : [];
            await mutate(updatedDepartments, false);
            toast.success('Dipartimento eliminato con successo');
        } catch (err: any) {
            toast.error(err.message || 'Errore durante l\'eliminazione del dipartimento');
        }
    };

    // Definizione delle colonne, allineate con le chiavi del tipo Department
    const columns: Column<Department>[] = [
        { header: 'ID', accessor: 'id' },
        { header: 'Nome', accessor: 'name' },
        // Rimuovi la colonna 'Descrizione' se non esiste nel tipo Department
        // { header: 'Descrizione', accessor: 'description' },
    ];

    // Definizione delle azioni per ogni riga del dipartimento
    const actions = [
        {
            icon: FaEdit,
            label: 'Modifica',
            onClick: (department: Department) => setEditingDepartment(department),
            color: 'bg-yellow-500 hover:bg-yellow-700',
        },
        {
            icon: FaTrash,
            label: 'Elimina',
            onClick: (department: Department) => handleDelete(department),
            color: 'bg-red-500 hover:bg-red-700',
        },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Gestione Dipartimenti</h1>
            <button
                onClick={() => setIsFormOpen(true)}
                className="mb-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
                Aggiungi Dipartimento
            </button>
            {isLoading ? (
                <div>Caricamento...</div>
            ) : error ? (
                <div>Errore nel caricamento dei dipartimenti.</div>
            ) : (
                <GenericList<Department>
                    columns={columns}
                    data={departments ?? []} // Usa ?? [] per assicurare che data sia sempre un array
                    actions={actions}
                />
            )}
            {(isFormOpen || editingDepartment) && (
                <GenericForm<Department>
                    fields={[
                        { name: 'name', label: 'Nome', type: 'text', placeholder: 'Inserisci nome dipartimento' },
                        // Aggiungi altri campi se necessario, ad esempio 'description'
                    ]}
                    schema={editingDepartment ? departmentSchema.partial().extend({ id: departmentSchema.shape.id }) : departmentSchema.omit({ id: true })}
                    defaultValues={editingDepartment || undefined}
                    onSubmit={editingDepartment ? handleUpdate : handleCreate}
                    onClose={() => {
                        setIsFormOpen(false);
                        setEditingDepartment(null);
                    }}
                />
            )}
        </div>
    );

};

export default DepartmentsPage;