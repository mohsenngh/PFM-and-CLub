import React from 'react';

interface AddressReviewCardProps {
    title: string;
    postalCode?: string;
    phone?: string;
    onEdit: () => void;
}

const AddressReviewCard: React.FC<AddressReviewCardProps> = ({ title, postalCode, phone, onEdit }) => (
    <div className="w-full p-4 bg-gray-800 rounded-lg border border-gray-700 text-right">
        <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-lg text-white">{title}</h3>
            <button onClick={onEdit} className="text-sm text-blue-400 hover:underline">ویرایش</button>
        </div>
        <p className="text-gray-300">کدپستی: {postalCode || '-'}</p>
        <p className="text-gray-400 text-sm mt-1">تلفن: {phone || '-'}</p>
    </div>
);

export default AddressReviewCard;
