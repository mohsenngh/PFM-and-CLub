import React from 'react';
import { Page, NavigationProps } from '../types';

const PayPartnerDashboard: React.FC<NavigationProps> = ({ onNavigate }) => {
    return (
        <div className="flex flex-col h-screen max-w-md mx-auto bg-gray-900 shadow-lg">
            <header className="flex justify-between items-center p-4 bg-gray-800 border-b border-gray-700">
                <h1 className="text-xl font-bold text-white">پی‌پارتنر</h1>
                <button 
                    onClick={() => onNavigate(Page.LANDING)} 
                    className="text-sm bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                    خروج
                </button>
            </header>
            <main className="flex-grow p-6 overflow-y-auto">
                <h1 className="text-2xl font-bold text-white mb-6">داشبورد پی‌پارتنر</h1>
                <p className="text-gray-300 mb-8">
                    خوش آمدید! در اینجا می‌توانید گزارشات فروش و تراکنش‌های خود را مشاهده کنید.
                </p>
                <div className="space-y-4">
                    <div className="bg-gray-800 p-4 rounded-lg">
                        <h2 className="font-bold text-lg text-blue-400">گزارش فروش امروز</h2>
                        <p className="text-3xl font-mono mt-2">۱۲,۵۴۰,۰۰۰ ریال</p>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg">
                        <h2 className="font-bold text-lg text-blue-400">تراکنش‌های اخیر</h2>
                        <ul className="mt-2 space-y-2 text-sm text-gray-400">
                            <li>#۱۲۳۴۵ - موفق - ۲۵۰,۰۰۰ ریال</li>
                            <li>#۱۲۳۴۴ - ناموفق - ۱,۱۲۰,۰۰۰ ریال</li>
                            <li>#۱۲۳۴۳ - موفق - ۸۰۰,۰۰۰ ریال</li>
                        </ul>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PayPartnerDashboard;