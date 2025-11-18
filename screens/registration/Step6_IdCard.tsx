import React, { useState } from 'react';
import { Page, NavigationProps } from '../../types';
import { useRegistration } from '../../contexts/RegistrationContext';
import Layout from '../../components/Layout';
import FileUpload from '../../components/FileUpload';

const Step6_IdCard: React.FC<NavigationProps> = ({ onNavigate }) => {
    const { dispatch } = useRegistration();
    const [stage, setStage] = useState<'select_type' | 'upload_docs'>('select_type');
    const [idCardType, setIdCardType] = useState<'smart' | 'certificate' | null>(null);
    const [idCardFront, setIdCardFront] = useState<File | null>(null);
    const [idCardBack, setIdCardBack] = useState<File | null>(null);
    
    const handleTypeSelect = (type: 'smart' | 'certificate') => {
        setIdCardType(type);
        setStage('upload_docs');
    }

    const handleProceed = () => {
        if (idCardType && idCardFront && idCardBack) {
            dispatch({ type: 'SET_ID_CARD_INFO', payload: { idCardType, idCardFront, idCardBack } });
            onNavigate(Page.REGISTRATION_BUSINESS_LICENSE);
        }
    };

    const handleBack = () => {
        if (stage === 'upload_docs') {
            setStage('select_type');
        } else {
            onNavigate(Page.REGISTRATION_BIRTH_DATE);
        }
    }

    if (stage === 'select_type') {
        return (
             <Layout
                onBack={handleBack}
                hideProceed={true}
                title="مدارک هویتی"
            >
                <div className="w-full max-w-sm space-y-6 flex flex-col items-center justify-center flex-grow">
                    <button onClick={() => handleTypeSelect('smart')} className="w-full p-6 text-xl font-semibold rounded-lg bg-gray-800 border border-gray-600 hover:bg-gray-700">
                        کارت ملی هوشمند
                    </button>
                    <button onClick={() => handleTypeSelect('certificate')} className="w-full p-6 text-xl font-semibold rounded-lg bg-gray-800 border border-gray-600 hover:bg-gray-700">
                        گواهی کارت ملی هوشمند
                    </button>
                </div>
            </Layout>
        )
    }

    return (
        <Layout
            onBack={handleBack}
            onProceed={handleProceed}
            canProceed={!!idCardFront && !!idCardBack}
            title="بارگذاری مدارک"
        >
            <div className="w-full space-y-6">
                <p className="text-gray-300">تصویر پشت و روی کارت ملی خود را بارگذاری کنید.</p>
                <FileUpload label="تصویر روی کارت" onFileSelect={(file) => setIdCardFront(file)} />
                <FileUpload label="تصویر پشت کارت" onFileSelect={(file) => setIdCardBack(file)} />
            </div>
        </Layout>
    );
};

export default Step6_IdCard;