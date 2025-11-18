import React, { ReactNode } from 'react';
import Header from './Header';
import Button from './Button';

interface LayoutProps {
    children: ReactNode;
    onBack: () => void;
    onHelp?: () => void;
    title?: string;
    canProceed?: boolean;
    onProceed?: () => void;
    proceedLabel?: string;
    hideProceed?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
    children,
    onBack,
    onHelp = () => alert('صفحه راهنما'),
    title,
    canProceed = true,
    onProceed,
    proceedLabel = "مرحله بعد",
    hideProceed = false,
}) => {
    return (
        <div className="flex flex-col h-screen max-w-md mx-auto bg-gray-900 shadow-lg">
            <Header onBack={onBack} onHelp={onHelp} />
            <main className="flex-grow overflow-y-auto p-6 pt-4 text-center scrollbar-hide">
                {title && <h1 className="text-2xl font-bold text-white mb-6">{title}</h1>}
                <div className="flex flex-col items-center justify-start h-full">
                    {children}
                </div>
            </main>
            {!hideProceed && onProceed && (
                 <div className="p-4 bg-gray-900 border-t border-gray-700 sticky bottom-0">
                    <Button onClick={onProceed} disabled={!canProceed}>
                        {proceedLabel}
                    </Button>
                </div>
            )}
        </div>
    );
};

export default Layout;
