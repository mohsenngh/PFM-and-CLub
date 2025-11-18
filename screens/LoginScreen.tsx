import React, { useState } from 'react';
import { Page, NavigationProps } from '../types';
import Layout from '../components/Layout';
import Input from '../components/Input';

const LoginScreen: React.FC<NavigationProps> = ({ onNavigate }) => {
    const [nationalId, setNationalId] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // In a real app, you would validate credentials against a server.
        // For this demo, we'll navigate directly to the dashboard.
        console.log(`Logging in with National ID: ${nationalId}`);
        onNavigate(Page.PAYPARTNER_DASHBOARD);
    };
    
    const canLogin = nationalId.length === 10 && password.length > 0;

    return (
        <div className="flex flex-col h-screen max-w-md mx-auto bg-gray-900 shadow-lg">
            <Layout
                onBack={() => onNavigate(Page.LANDING)}
                onProceed={handleLogin}
                proceedLabel="ورود"
                canProceed={canLogin}
            >
                <div className="w-full flex flex-col items-center justify-center flex-grow">
                    <h2 className="text-2xl font-bold text-white mb-8">ورود به حساب کاربری</h2>
                    <div className="w-full space-y-4">
                        <Input
                            label="کد ملی"
                            type="text"
                            value={nationalId}
                            onChange={(e) => setNationalId(e.target.value)}
                            maxLength={10}
                            inputMode="numeric"
                        />
                        <Input
                            label="رمز عبور"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    
                    <button className="mt-8 text-sm text-blue-400 hover:underline">
                        فراموشی رمز عبور
                    </button>
                </div>
            </Layout>
        </div>
    );
};

export default LoginScreen;