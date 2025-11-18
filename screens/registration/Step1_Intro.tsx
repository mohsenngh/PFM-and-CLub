import React from 'react';
import { Page, NavigationProps } from '../../types';
import Layout from '../../components/Layout';
import ProgressTracker from '../../components/ProgressTracker';

const registrationSteps = ["ثبت درخواست", "بررسی درخواست", "امضا قرارداد", "فعالسازی"];

// A more modern, abstract graphic representing digital finance.
const INTRO_IMAGE_URL = "https://i.imgur.com/gC5aa1L.png";

const Step1_Intro: React.FC<NavigationProps> = ({ onNavigate }) => {
    return (
        <Layout
            onBack={() => onNavigate(Page.LANDING)}
            onProceed={() => onNavigate(Page.REGISTRATION_SERVICE_TYPE)}
            proceedLabel="شروع"
            title="ثبت نام فروشندگان"
        >
            <div className="w-full flex flex-col items-center justify-between flex-grow">
                <div className="w-full">
                    <img src={INTRO_IMAGE_URL} alt="Digital Finance" className="rounded-lg mb-8 w-full h-auto object-cover aspect-video" />
                    <p className="text-gray-300 mb-8">
                        به سامانه ثبت نام آنلاین پرداخت الکترونیک سامان خوش آمدید. لطفا مراحل زیر را برای ثبت نام تکمیل کنید.
                    </p>
                    <ProgressTracker steps={registrationSteps} currentStep={0} />
                </div>
            </div>
        </Layout>
    );
};

export default Step1_Intro;