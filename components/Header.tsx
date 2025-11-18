import React from 'react';
import { ArrowRightIcon, QuestionMarkCircleIcon } from './icons/Icons';

interface HeaderProps {
    onBack: () => void;
    onHelp: () => void;
}

const Header: React.FC<HeaderProps> = ({ onBack, onHelp }) => {
    return (
        <header className="flex justify-between items-center p-4 bg-gray-900">
            <button onClick={onBack} className="text-gray-300 hover:text-white">
                <ArrowRightIcon className="w-6 h-6" />
            </button>
            <button onClick={onHelp} className="text-gray-300 hover:text-white">
                <QuestionMarkCircleIcon className="w-6 h-6" />
            </button>
        </header>
    );
};

export default Header;
