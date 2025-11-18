import React from 'react';
import { Page, NavigationProps } from '../../types';
import { useRegistration } from '../../contexts/RegistrationContext';
import Layout from '../../components/Layout';
import AddressReviewCard from '../../components/cards/AddressReviewCard';

const Step11_AddressReview: React.FC<NavigationProps> = ({ onNavigate }) => {
    const { state } = useRegistration();

    return (
        <Layout
            onBack={() => onNavigate(Page.REGISTRATION_ADDRESS)}
            onProceed={() => onNavigate(Page.REGISTRATION_SUBMIT_CONFIRM)}
            proceedLabel="تایید و ادامه"
            title="تایید آدرس‌ها"
        >
            <div className="w-full text-right space-y-6">
                <p className="mb-2 text-gray-300">لطفا آدرس‌های استعلام شده را بررسی و در صورت نیاز ویرایش کنید.</p>
                
                <div className="space-y-2">
                    <AddressReviewCard 
                        title="آدرس فروشگاه"
                        postalCode={state.storeInfo?.postalCode}
                        phone={state.storeInfo?.phone}
                        onEdit={() => onNavigate(Page.REGISTRATION_ADDRESS)}
                    />
                    <p className="px-4 text-green-400 text-sm">{state.storeAddress || 'درحال بارگذاری...'}</p>
                </div>
                
                <div className="space-y-2">
                     <AddressReviewCard 
                        title="آدرس محل سکونت"
                        postalCode={state.residenceInfo?.postalCode}
                        phone={state.residenceInfo?.phone}
                        onEdit={() => onNavigate(Page.REGISTRATION_ADDRESS)}
                    />
                     <p className="px-4 text-green-400 text-sm">{state.residenceAddress || 'درحال بارگذاری...'}</p>
                </div>
            </div>
        </Layout>
    );
};

export default Step11_AddressReview;
