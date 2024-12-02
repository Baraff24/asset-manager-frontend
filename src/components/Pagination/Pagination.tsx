import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const pages = [];
    for(let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return (
        <div className="flex justify-center mt-4">
            <nav>
                <ul className="inline-flex -space-x-px">
                    {pages.map(page => (
                        <li key={page}>
                            <button
                                onClick={() => onPageChange(page)}
                                className={`px-3 py-2 ml-0 leading-tight ${page === currentPage ? 'text-blue-600 bg-blue-50 border border-blue-300' : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'}`}
                            >
                                {page}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Pagination;
