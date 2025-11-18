import React from 'react';
import { Page, NavigationProps, SettlementAccount } from '../../types';
import { useRegistration } from '../../contexts/RegistrationContext';
import Layout from '../../components/Layout';
import Input from '../../components/Input';
import { PlusCircleIcon, MinusCircleIcon } from '../../components/icons/Icons';

const Step8_SettlementAccount: React.FC<NavigationProps> = ({ onNavigate }) => {
    const { state, dispatch } = useRegistration();

    const handleUpdate = (account: SettlementAccount) => {
        dispatch({ type: 'UPDATE_SETTLEMENT_ACCOUNT', payload: account });
    };
    
    const handleAdd = () => {
        dispatch({ type: 'ADD_SETTLEMENT_ACCOUNT' });
    };

    const handleRemove = (id: number) => {
        dispatch({ type: 'REMOVE_SETTLEMENT_ACCOUNT', payload: id });
    };

    const canProceed = state.settlementAccounts.every(acc => acc.accountIdentifier && acc.share) && 
                       state.settlementAccounts.reduce((sum, acc) => sum + (parseInt(acc.share, 10) || 0), 0) === 100;

    return (
        <Layout
            onBack={() => onNavigate(Page.REGISTRATION_BUSINESS_LICENSE)}
            onProceed={() => onNavigate(Page.REGISTRATION_SETTLEMENT_REVIEW)}
            canProceed={canProceed}
            title="اطلاعات سپرده تسویه"
        >
            <div className="w-full space-y-4">
                <p className="text-gray-300 mb-4">اطلاعات حساب بانکی خود برای تسویه را وارد کنید. مجموع سهم ها باید ۱۰۰٪ باشد.</p>
                {state.settlementAccounts.map((acc, index) => (
                    <div key={acc.id} className="p-4 bg-gray-800 border border-gray-700 rounded-lg space-y-3 relative">
                        {state.settlementAccounts.length > 1 && (
                             <button onClick={() => handleRemove(acc.id)} className="absolute top-2 left-2 text-red-500 hover:text-red-400">
                                <MinusCircleIcon className="w-6 h-6"/>
                            </button>
                        )}
                        <Input
                            label={`شماره کارت / شبا ${index + 1}`}
                            value={acc.accountIdentifier}
                            onChange={e => handleUpdate({ ...acc, accountIdentifier: e.target.value })}
                            inputMode="numeric"
                        />
                        <Input
                            label={`سهم (٪) ${index + 1}`}
                            value={acc.share}
                            onChange={e => handleUpdate({ ...acc, share: e.target.value })}
                            type="number"
                            min="0"
                            max="100"
                            inputMode="numeric"
                        />
                    </div>
                ))}
                 <button onClick={handleAdd} className="flex items-center justify-center gap-2 w-full p-3 text-blue-400 border-2 border-dashed border-blue-500 rounded-lg hover:bg-gray-800">
                    <PlusCircleIcon className="w-6 h-6"/>
                    <span>افزودن حساب دیگر</span>
                </button>
            </div>
        </Layout>
    );
};

export default Step8_SettlementAccount;