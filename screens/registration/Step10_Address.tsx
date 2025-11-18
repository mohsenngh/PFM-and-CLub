import React, { useState } from 'react';
import { Page, NavigationProps } from '../../types';
import { useRegistration } from '../../contexts/RegistrationContext';
import Layout from '../../components/Layout';
import Input from '../../components/Input';
import { lookupPostalCode } from '../../api/registrationApi';

const Step10_Address: React.FC<NavigationProps> = ({ onNavigate }) => {
    const { state, dispatch } = useRegistration();
    const [storeInfo, setStoreInfo] = useState(state.storeInfo || { postalCode: '', phone: '' });
    const [residenceInfo, setResidenceInfo] = useState(state.residenceInfo || { postalCode: '', phone: '' });
    const [isLoading, setIsLoading] = useState(false);

    const handleProceed = async () => {
        setIsLoading(true);
        dispatch({ type: 'SET_ADDRESS', payload: { storeInfo, residenceInfo } });

        // Simulate fetching both addresses
        const [storeAddressResult, residenceAddressResult] = await Promise.all([
            lookupPostalCode(storeInfo.postalCode),
            lookupPostalCode(residenceInfo.postalCode),
        ]);
        
        setIsLoading(false);

        if (storeAddressResult && residenceAddressResult) {
            dispatch({
                type: 'SET_FETCHED_ADDRESSES',
                payload: {
                    storeAddress: storeAddressResult.address,
                    residenceAddress: residenceAddressResult.address,
                },
            });
            onNavigate(Page.REGISTRATION_ADDRESS_REVIEW);
        } else {
            alert('خطا در استعلام کد پستی');
        }
    };

    const canProceed =
        /^\d{10}$/.test(storeInfo.postalCode) &&
        /^\d{11}$/.test(storeInfo.phone) &&
        /^\d{10}$/.test(residenceInfo.postalCode) &&
        /^\d{11}$/.test(residenceInfo.phone);

    return (
        <Layout
            onBack={() => onNavigate(Page.REGISTRATION_TAX_CODE)}
            onProceed={handleProceed}
            canProceed={canProceed && !isLoading}
            proceedLabel={isLoading ? "در حال استعلام..." : "استعلام"}
            title="اطلاعات فروشگاه و محل سکونت"
        >
            <div className="w-full space-y-6">
                <div className="p-4 bg-gray-800 border border-gray-700 rounded-lg">
                    <h3 className="font-bold mb-3 text-right text-white">اطلاعات فروشگاه</h3>
                    <div className="space-y-3">
                        <Input label="کد پستی" value={storeInfo.postalCode} onChange={e => setStoreInfo({ ...storeInfo, postalCode: e.target.value })} maxLength={10} inputMode="numeric" />
                        <Input label="تلفن ثابت" value={storeInfo.phone} onChange={e => setStoreInfo({ ...storeInfo, phone: e.target.value })} maxLength={11} inputMode="numeric" placeholder="همراه با کد شهر" />
                    </div>
                </div>
                <div className="p-4 bg-gray-800 border border-gray-700 rounded-lg">
                    <h3 className="font-bold mb-3 text-right text-white">اطلاعات محل سکونت</h3>
                    <div className="space-y-3">
                        <Input label="کد پستی" value={residenceInfo.postalCode} onChange={e => setResidenceInfo({ ...residenceInfo, postalCode: e.target.value })} maxLength={10} inputMode="numeric" />
                        <Input label="تلفن ثابت" value={residenceInfo.phone} onChange={e => setResidenceInfo({ ...residenceInfo, phone: e.target.value })} maxLength={11} inputMode="numeric" placeholder="همراه با کد شهر" />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Step10_Address;
