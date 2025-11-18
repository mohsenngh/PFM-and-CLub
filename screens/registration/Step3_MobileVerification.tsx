import React, { useState } from 'react';
import { Page, NavigationProps } from '../../types';
import { useRegistration } from '../../contexts/RegistrationContext';
import Layout from '../../components/Layout';
import Input from '../../components/Input';
import OtpInput from '../../components/ui/OtpInput';
import { sendOtp, verifyOtp } from '../../api/registrationApi';

const Step3_MobileVerification: React.FC<NavigationProps> = ({ onNavigate }) => {
    const { dispatch } = useRegistration();
    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSendOtp = async () => {
        setIsLoading(true);
        const success = await sendOtp(mobile);
        setIsLoading(false);
        if (success) {
            setIsOtpSent(true);
        } else {
            alert('خطا در ارسال کد تایید');
        }
    };

    const handleProceed = async () => {
        setIsLoading(true);
        const success = await verifyOtp(mobile, otp);
        setIsLoading(false);
        if (success) {
            dispatch({ type: 'SET_MOBILE', payload: mobile });
            onNavigate(Page.REGISTRATION_NATIONAL_ID);
        } else {
            alert('کد تایید نامعتبر است');
        }
    };

    const isMobileValid = /^09\d{9}$/.test(mobile);
    const proceedLabel = isOtpSent ? (isLoading ? 'در حال بررسی...' : 'مرحله بعد') : (isLoading ? 'در حال ارسال...' : 'ارسال کد تایید');

    if (isOtpSent) {
        return (
            <Layout
                onBack={() => setIsOtpSent(false)}
                onProceed={handleProceed}
                canProceed={otp.length === 6 && !isLoading}
                title="کد تایید را وارد کنید"
                proceedLabel={proceedLabel}
            >
                <div className="w-full">
                    <p className="mb-4 text-gray-300">کد ۶ رقمی ارسال شده به شماره {mobile} را وارد کنید.</p>
                    <OtpInput length={6} onChange={setOtp} />
                    <button className="text-sm text-blue-400 mt-6 hover:underline">ارسال مجدد کد</button>
                </div>
            </Layout>
        );
    }

    return (
        <Layout
            onBack={() => onNavigate(Page.REGISTRATION_SERVICE_TYPE)}
            onProceed={handleSendOtp}
            canProceed={isMobileValid && !isLoading}
            proceedLabel={proceedLabel}
            title="شماره موبایل"
        >
            <div className="w-full">
                <p className="mb-4 text-gray-300">لطفا شماره موبایل خود را وارد کنید.</p>
                <Input
                    label="شماره موبایل"
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    maxLength={11}
                    inputMode="numeric"
                    placeholder="09123456789"
                />
            </div>
        </Layout>
    );
};

export default Step3_MobileVerification;
