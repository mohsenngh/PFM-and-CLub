import React from 'react';
import { Page, NavigationProps } from '../types';
import Button from '../components/Button';

const LandingScreen: React.FC<NavigationProps> = ({ onNavigate }) => {
    return (
        <div className="flex flex-col h-screen max-w-md mx-auto p-8 bg-cover bg-center" style={{backgroundImage: "url('https://i.imgur.com/example-bg.png')", backgroundColor: '#2c3e50'}}>
            <div className="flex flex-col items-center justify-center flex-grow text-center">
                <h2 className="text-3xl font-bold text-white mt-12">به پی‌پارتنر خوش آمدید!</h2>
                <p className="text-gray-300 mt-4 max-w-xs">
                    با عضویت در جمع دارندگان روش‌های پرداخت سپ کسب و کار خود را با سهولت مدیریت کنید.
                </p>
            </div>
            <div className="flex items-center gap-4">
                <div className="w-1/2">
                    <Button onClick={() => onNavigate(Page.LOGIN)} variant="primary">
                        ورود به پی‌پارتنر
                    </Button>
                </div>
                <div className="w-1/2">
                    <Button onClick={() => onNavigate(Page.REGISTRATION_INTRO)} style={{backgroundColor: 'white', color: '#005EB8'}}>
                        ثبت نام فروشندگان
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default LandingScreen;