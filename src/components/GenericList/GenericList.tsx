import React from 'react';
import { IconType } from 'react-icons';
import { Path } from 'react-hook-form';

export interface Column<T> {
    header: string;
    accessor: Path<T>;
    render?: (value: any, item: T) => React.ReactNode;
}

interface Action<T> {
    icon: IconType;
    label: string;
    onClick: (item: T) => void;
    color?: string;
}

interface GenericListProps<T> {
    columns: Column<T>[];
    data: T[];
    actions?: Action<T>[];
}

const GenericList = <T extends { id: number }>({
    columns,
    data,
    actions,
}: GenericListProps<T>) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        {columns.map((col) => (
                            <th
                                key={String(col.accessor)}
                                className="py-2 px-4 bg-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                            >
                                {col.header}
                            </th>
                        ))}
                        {actions && <th className="py-2 px-4 bg-gray-200"></th>}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-100">
                            {columns.map((col) => (
                                <td key={String(col.accessor)} className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                                    {col.render
                                        ? col.render(item[col.accessor as keyof T], item)
                                        : String(item[col.accessor as keyof T])}
                                </td>
                            ))}
                            {actions && (
                                <td className="py-2 px-4 border-b border-gray-200">
                                    <div className="flex space-x-2">
                                        {actions.map((action, index) => (
                                            <button
                                                key={index}
                                                onClick={() => action.onClick(item)}
                                                className={`flex items-center justify-center text-white px-2 py-1 rounded ${action.color || 'bg-blue-500 hover:bg-blue-700'}`}
                                                aria-label={action.label}
                                            >
                                                <action.icon className="mr-1" />
                                                <span className="text-sm">{action.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GenericList;
