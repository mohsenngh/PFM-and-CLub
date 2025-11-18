import React, { ReactNode } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', ...props }) => {
    const baseClasses = "w-full text-center rounded-lg h-[50px] font-bold text-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900";

    const variantClasses = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:bg-gray-500 disabled:cursor-not-allowed",
        secondary: "bg-transparent text-blue-400 border border-blue-400 hover:bg-blue-500 hover:text-white focus:ring-blue-400 disabled:bg-gray-800 disabled:text-gray-500 disabled:border-gray-700",
    };

    return (
        <button className={`${baseClasses} ${variantClasses[variant]}`} {...props}>
            {children}
        </button>
    );
};

export default Button;
