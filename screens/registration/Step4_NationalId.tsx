import React, { useState } from 'react';
import { Page, NavigationProps } from '../../types';
import { useRegistration } from '../../contexts/RegistrationContext';
import Layout from '../../components/Layout';
import Input from '../../components/Input';

const Step4_NationalId: React.FC<NavigationProps> = ({ onNavigate }) => {
    const { state, dispatch } = useRegistration();
    const [nationalId, setNationalId] = useState(state.nationalId || '');

    const handleProceed = () => {
        dispatch({ type: 'SET_NATIONAL_ID', payload: nationalId });
        onNavigate(Page.REGISTRATION_BIRTH_DATE);
    };

    const isNationalIdValid = /^\d{10}$/.test(nationalId);

    return (
        <Layout
            onBack={() => onNavigate(Page.REGISTRATION_MOBILE)}
            onProceed={handleProceed}
            canProceed={isNationalIdValid}
            title="کد ملی"
        >
            <div className="w-full">
                <p className="mb-4 text-gray-300">لطفا کد ملی ۱۰ رقمی خود را وارد کنید.</p>
                <Input
                    label="کد ملی"
                    type="text"
                    value={nationalId}
                    onChange={(e) => setNationalId(e.target.value)}
                    maxLength={10}
                    inputMode="numeric"
                />
            </div>
        </Layout>
    );
};

export default Step4_NationalId;
