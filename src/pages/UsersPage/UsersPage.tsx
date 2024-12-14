import React from 'react';
import { useFetch } from "../../hooks/useFetch.ts";
import { User, userSchema } from "../../schemas";
import { GenericList } from "../../components";
import {Column} from "../../components/GenericList/GenericList.tsx";


const UsersPage: React.FC = () => {
    const { data: users, error, isLoading } = useFetch<User[]>('/api/v1/accounts/users/', userSchema.array());

    const columns: Column<User>[] = [
        { header: 'ID', accessor: 'id' },
        { header: 'Username', accessor: 'username' },
        { header: 'Email', accessor: 'email' },
    ];

    return (
        <div className="container mx-auto px-4 py-20">
            <h1 className="text-3xl font-bold mb-6">Gestione Utenti</h1>
            {isLoading ? (
                <div>Caricamento...</div>
            ) : error ? (
                <div>Errore nel caricamento degli utenti.</div>
            ) : (
                <GenericList<User>
                    columns={columns}
                    data={users ?? []} // Utilizza un array vuoto se users è null
                />
            )}
        </div>
    );
};

export default UsersPage;
