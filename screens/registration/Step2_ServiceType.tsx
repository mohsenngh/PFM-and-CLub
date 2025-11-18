import React, { useState } from 'react';
import { Page, NavigationProps } from '../../types';
import { useRegistration } from '../../contexts/RegistrationContext';
import Layout from '../../components/Layout';
import Button from '../../components/Button';
import BottomSheet from '../../components/ui/BottomSheet';

const SERVICE_TYPE_IMAGE_URL = "https://i.imgur.com/Zk8dJ3T.png";

const Step2_ServiceType: React.FC<NavigationProps> = ({ onNavigate }) => {
    const { dispatch } = useRegistration();
    const [serviceType, setServiceType] = useState<'pos' | 'gateway' | null>(null);
    const [selectedPersonType, setSelectedPersonType] = useState<'natural' | 'legal' | null>(null);
    const [isSheetOpen, setSheetOpen] = useState(false);

    const handleServiceSelect = (type: 'pos' | 'gateway') => {
        setServiceType(type);
        setSelectedPersonType(null); // Reset person type when service type changes
        setSheetOpen(true);
    };

    const handlePersonSelect = (type: 'natural' | 'legal') => {
        setSheetOpen(false);
        setSelectedPersonType(type);
        if (serviceType) {
            dispatch({ type: 'SET_SERVICE_TYPE', payload: { serviceType, personType: type } });
            onNavigate(Page.REGISTRATION_MOBILE);
        }
    };

    const OptionCard: React.FC<{ label: string, onSelect: () => void, selected: boolean }> = 
    ({ label, onSelect, selected }) => (
        <div onClick={onSelect} className={`w-full p-6 border-2 rounded-lg cursor-pointer transition-all duration-200 text-right ${selected ? 'border-blue-500 bg-gray-700' : 'border-gray-600 bg-gray-800'}`}>
            <p className="font-semibold text-lg text-white">{label}</p>
        </div>
    );

    return (
        <Layout
            onBack={() => onNavigate(Page.REGISTRATION_INTRO)}
            hideProceed={true}
            title="انتخاب نوع سرویس"
        >
            <div className="w-full space-y-6">
                 <img src={SERVICE_TYPE_IMAGE_URL} alt="POS and Gateway Services" className="rounded-lg mb-6 w-full h-auto object-cover aspect-video" />
                <OptionCard 
                    label="درخواست کارتخوان"
                    onSelect={() => handleServiceSelect('pos')}
                    selected={serviceType === 'pos' && !!selectedPersonType}
                />
                 <OptionCard 
                    label="درخواست درگاه پرداخت"
                    onSelect={() => handleServiceSelect('gateway')}
                    selected={serviceType === 'gateway' && !!selectedPersonType}
                />
                {selectedPersonType && <p className="text-green-400 text-center">شخصیت {selectedPersonType === 'natural' ? 'حقیقی' : 'حقوقی'} انتخاب شد.</p>}
            </div>

            <BottomSheet isOpen={isSheetOpen} onClose={() => setSheetOpen(false)}>
                <h3 className="text-lg font-bold mb-6 text-center text-white">نوع شخصیت خود را انتخاب کنید</h3>
                <div className="space-y-3">
                    <Button onClick={() => handlePersonSelect('natural')} variant='secondary'>شخصیت حقیقی</Button>
                    <Button onClick={() => handlePersonSelect('legal')} variant='secondary'>شخصیت حقوقی</Button>
                </div>
            </BottomSheet>
        </Layout>
    );
};

export default Step2_ServiceType;