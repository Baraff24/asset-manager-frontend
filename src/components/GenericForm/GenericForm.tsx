import { useForm, SubmitHandler, DefaultValues, FieldErrors, Path } from 'react-hook-form';
import { ZodType } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface Field<T> {
    name: Path<T>;
    label: string;
    type: string;
    placeholder?: string;
    options?: { label: string; value: string }[]; // Optional per select
}

interface GenericFormProps<T> {
    fields: Field<T>[];
    schema: ZodType<any, any>;
    defaultValues?: DefaultValues<T>;
    onSubmit: (data: T) => void;
    onClose: () => void;
}

const GenericForm = <T extends Record<string, any>>({
    fields,
    schema,
    defaultValues,
    onSubmit,
    onClose,
}: GenericFormProps<T>) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<T>({
        resolver: zodResolver(schema),
        defaultValues,
    });

    const onSubmitHandler: SubmitHandler<T> = async (data) => {
        onSubmit(data);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">{defaultValues ? 'Modifica' : 'Crea'}</h2>
                <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4">
                    {fields.map((field) => (
                        <div key={String(field.name)}>
                            <label htmlFor={String(field.name)} className="block text-sm font-medium text-gray-700">
                                {field.label}
                            </label>
                            {field.type === 'select' ? (
                                <select
                                    id={String(field.name)}
                                    {...register(field.name)}
                                    className={`mt-1 block w-full border ${
                                        (errors as FieldErrors<T>)[field.name] ? 'border-red-500' : 'border-gray-300'
                                    } rounded-md shadow-sm p-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                >
                                    <option value="">Seleziona...</option>
                                    {field.options?.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            ) : field.type === 'textarea' ? (
                                <textarea
                                    id={String(field.name)}
                                    placeholder={field.placeholder}
                                    {...register(field.name)}
                                    className={`mt-1 block w-full border ${
                                        (errors as FieldErrors<T>)[field.name] ? 'border-red-500' : 'border-gray-300'
                                    } rounded-md shadow-sm p-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                />
                            ) : field.type === 'checkbox' ? (
                                <input
                                    id={String(field.name)}
                                    type="checkbox"
                                    {...register(field.name)}
                                    className={`mt-1 block border ${
                                        (errors as FieldErrors<T>)[field.name] ? 'border-red-500' : 'border-gray-300'
                                    } rounded-md shadow-sm p-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                />
                            ) : (
                                <input
                                    id={String(field.name)}
                                    type={field.type}
                                    placeholder={field.placeholder}
                                    {...register(field.name)}
                                    className={`mt-1 block w-full border ${
                                        (errors as FieldErrors<T>)[field.name] ? 'border-red-500' : 'border-gray-300'
                                    } rounded-md shadow-sm p-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                />
                            )}
                            {(errors as FieldErrors<T>)[field.name] && (
                                <p className="text-red-500 text-xs mt-1">
                                    {((errors as FieldErrors<T>)[field.name]?.message as string) || 'Campo richiesto'}
                                </p>
                            )}
                        </div>
                    ))}
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 text-white px-4 py-2 rounded"
                        >
                            Annulla
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            {isSubmitting ? 'Salvataggio...' : 'Salva'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default GenericForm;
