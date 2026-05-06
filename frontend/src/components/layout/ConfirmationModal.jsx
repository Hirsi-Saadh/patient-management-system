import React from 'react';

const ConfirmationModal = ({isOpen, onClose, onConfirm, message}) => {
    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
                <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
                    <h3 className="text-lg font-semibold">Confirmation</h3>
                    <p className="mt-2">{message}</p>
                    <div className="mt-4 flex justify-between">
                        <button
                            onClick={onClose}
                            className="bg-gray-400 text-white px-4 py-2 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ConfirmationModal;