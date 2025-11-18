import React from 'react';
import { Page, NavigationProps } from '../../types';
import { useRegistration } from '../../contexts/RegistrationContext';
import Layout from '../../components/Layout';
import AccountReviewCard from '../../components/cards/AccountReviewCard';
import { getBankNameFromSheba } from '../../utils/bankUtils';

const Step8_5_SettlementReview: React.FC<NavigationProps> = ({ onNavigate }) => {
    const { state } = useRegistration();

    // Mocking account holder name based on National ID for demo purposes
    const accountHolderName = `آقای/خانم ${state.nationalId || 'XXXX'}`;

    return (
        <Layout
            onBack={() => onNavigate(Page.REGISTRATION_SETTLEMENT_ACCOUNT)}
            onProceed={() => onNavigate(Page.REGISTRATION_TAX_CODE)}
            proceedLabel="تایید حساب‌ها"
            title="تایید اطلاعات حساب"
        >
            <div className="w-full text-right space-y-4">
                <p className="mb-2 text-gray-300">لطفا اطلاعات حساب‌های وارد شده را بررسی و تایید کنید.</p>
                {state.settlementAccounts.map(acc => (
                     <AccountReviewCard 
                        key={acc.id}
                        accountHolder={accountHolderName}
                        bankName={getBankNameFromSheba(acc.accountIdentifier)}
                        accountType="سپرده"
                        sheba={acc.accountIdentifier}
                        share={acc.share}
                    />
                ))}
            </div>
        </Layout>
    );
};

export default Step8_5_SettlementReview;
