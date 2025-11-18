import React, { useState } from 'react';
import { Page, NavigationProps } from '../../types';
import Layout from '../../components/Layout';
import Button from '../../components/Button';
import { useRegistration } from '../../contexts/RegistrationContext';
import ProgressTracker from '../../components/ProgressTracker';

const registrationSteps = ["ثبت درخواست", "بررسی درخواست", "امضا قرارداد", "فعالسازی"];

const Step13_FinalSuccess: React.FC<NavigationProps> = ({ onNavigate }) => {
    const { dispatch } = useRegistration();
    const [stage, setStage] = useState<'contract_sign' | 'final_success'>('contract_sign');
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [isAuthenticating, setIsAuthenticating] = useState(false);

    const handleConfirm = () => {
        setIsAuthenticating(true);
        // Simulate biometric authentication
        setTimeout(() => {
            setIsAuthenticating(false);
            setStage('final_success');
        }, 2000);
    };

    const handleLoginRedirect = () => {
        dispatch({ type: 'RESET' }); // Clear registration data
        onNavigate(Page.LOGIN);
    };

    if (stage === 'contract_sign') {
        return (
             <Layout
                onBack={() => onNavigate(Page.REGISTRATION_SUBMIT_CONFIRM)}
                hideProceed={true}
                title="مطالعه و تایید قرارداد"
            >
                <div className="w-full h-full flex flex-col">
                    <p className="text-gray-300 mb-4">لطفا قرارداد زیر را با دقت مطالعه و سپس تایید نمایید.</p>
                    <div className="flex-grow border rounded-lg bg-gray-800 p-4 overflow-y-auto scrollbar-hide">
                        <h3 className="font-bold text-white">نمونه قرارداد پذیرندگی</h3>
                        <p className="text-sm text-gray-300 mt-2 leading-relaxed">
                            این یک متن نمونه برای قرارداد است. در اپلیکیشن واقعی، محتوای کامل قرارداد یا یک فایل PDF در اینجا نمایش داده می‌شود.
                            <br/><br/>ماده ۱: طرفین قرارداد...<br/>ماده ۲: موضوع قرارداد...
                        </p>
                    </div>
                    <div className="mt-4 flex items-center">
                        <input type="checkbox" id="confirm" checked={isConfirmed} onChange={(e) => setIsConfirmed(e.target.checked)} className="ml-2 w-4 h-4 accent-blue-500" />
                        <label htmlFor="confirm" className="text-sm">قرارداد را مطالعه کرده و با تمام مفاد آن موافقم.</label>
                    </div>
                    <div className="mt-6">
                        <Button onClick={handleConfirm} disabled={!isConfirmed || isAuthenticating}>
                            {isAuthenticating ? 'در حال احراز هویت...' : 'تایید قرارداد'}
                        </Button>
                    </div>
                </div>
            </Layout>
        );
    }
    
    // stage === 'final_success'
    return (
        <Layout
            onBack={() => {
                dispatch({ type: 'RESET' });
                onNavigate(Page.LANDING);
            }}
            hideProceed={true}
            title="ثبت نام شما تکمیل شد"
        >
            <div className="w-full flex flex-col items-center justify-between flex-grow">
                <div>
                     <h2 className="text-2xl font-bold text-green-400 my-4 text-center">
                        تبریک! به جمع پذیرندگان سپ خوش آمدید.
                    </h2>
                     <p className="text-gray-300 mb-8 text-center">
                       درخواست شما درحال آماده‌سازی می‌باشد و نتیجه خدمتتان پیامک می‌گردد.
                    </p>
                    <ProgressTracker steps={registrationSteps} currentStep={3} />
                </div>
                <div className="w-full mt-8">
                    <Button onClick={handleLoginRedirect}>
                        ورود به پی‌پارتنر
                    </Button>
                </div>
            </div>
        </Layout>
    );
};

export default Step13_FinalSuccess;