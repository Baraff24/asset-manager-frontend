import React from 'react';

interface TableProps<T> {
    columns: { header: string, accessor: keyof T }[];
    data: T[];
    renderRow: (item: T) => React.ReactNode;
}

const Table = <T extends {}>({ columns, data, renderRow }: TableProps<T>) => {
    return (
        <table className="min-w-full bg-white">
            <thead>
                <tr>
                    {columns.map(col => (
                        <th key={String(col.accessor)} className="py-2 px-4 bg-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            {col.header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map(item => (
                    <tr key={String((item as any).id)}>
                        {columns.map(col => (
                            <td key={String(col.accessor)} className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                                {(item as any)[col.accessor]}
                            </td>
                        ))}
                        {renderRow(item)}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
