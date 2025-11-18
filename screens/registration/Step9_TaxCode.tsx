import React, { useState } from 'react';
import { Page, NavigationProps } from '../../types';
import { useRegistration } from '../../contexts/RegistrationContext';
import Layout from '../../components/Layout';
import Input from '../../components/Input';

const Step9_TaxCode: React.FC<NavigationProps> = ({ onNavigate }) => {
    const { state, dispatch } = useRegistration();
    const [taxCode, setTaxCode] = useState(state.taxCode || '');

    const handleProceed = () => {
        dispatch({ type: 'SET_TAX_CODE', payload: taxCode });
        onNavigate(Page.REGISTRATION_ADDRESS);
    };

    const isTaxCodeValid = /^\d{10}$/.test(taxCode);

    return (
        <Layout
            onBack={() => onNavigate(Page.REGISTRATION_SETTLEMENT_REVIEW)}
            onProceed={handleProceed}
            canProceed={isTaxCodeValid}
            title="کد مالیاتی"
        >
            <div className="w-full">
                <p className="mb-4 text-gray-300">کد رهگیری ۱۰ رقمی ثبت نام مالیاتی خود را وارد کنید.</p>
                <Input
                    label="کد مالیاتی"
                    type="text"
                    value={taxCode}
                    onChange={(e) => setTaxCode(e.target.value)}
                    maxLength={10}
                    inputMode="numeric"
                />
            </div>
        </Layout>
    );
};

export default Step9_TaxCode;