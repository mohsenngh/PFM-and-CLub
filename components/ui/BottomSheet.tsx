import React from 'react';

interface BottomSheetProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const BottomSheet: React.FC<BottomSheetProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <>
            <div 
                className="fixed inset-0 bg-black bg-opacity-60 z-40 transition-opacity" 
                onClick={onClose}
                aria-hidden="true"
            ></div>
            <div 
                className="fixed bottom-0 left-0 right-0 w-full max-w-md mx-auto bg-gray-800 rounded-t-2xl p-5 shadow-lg z-50 transform transition-transform translate-y-0"
                role="dialog"
                aria-modal="true"
            >
                {children}
            </div>
        </>
    );
};

export default BottomSheet;
