import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center sm:items-start z-50 overflow-y-auto">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg my-8 max-h-screen overflow-y-auto">
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700 float-right">
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
