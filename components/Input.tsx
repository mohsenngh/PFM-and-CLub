import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

const Input: React.FC<InputProps> = ({ label, ...props }) => {
    return (
        <div className="w-full">
            <label htmlFor={props.id || props.name} className="block text-right text-sm font-medium text-gray-400 mb-1">{label}</label>
            <input
                {...props}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg h-[50px] text-lg text-right text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
        </div>
    );
};

export default Input;
