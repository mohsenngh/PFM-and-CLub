import React, { useState } from 'react';
import { Page, NavigationProps } from '../../types';
import { useRegistration } from '../../contexts/RegistrationContext';
import Layout from '../../components/Layout';
import PickerColumn from '../../components/ui/PickerColumn';

const years = Array.from({ length: 100 }, (_, i) => 1390 - i);
const months = Array.from({ length: 12 }, (_, i) => i + 1);
const days = Array.from({ length: 31 }, (_, i) => i + 1);

const Step5_BirthDate: React.FC<NavigationProps> = ({ onNavigate }) => {
    const { state, dispatch } = useRegistration();
    const [date, setDate] = useState(state.birthDate || { year: 1370, month: 1, day: 1 });

    const handleProceed = () => {
        dispatch({ type: 'SET_BIRTH_DATE', payload: date });
        onNavigate(Page.REGISTRATION_ID_CARD);
    };

    return (
        <Layout
            onBack={() => onNavigate(Page.REGISTRATION_NATIONAL_ID)}
            onProceed={handleProceed}
            title="تاریخ تولد"
        >
            <div className="w-full relative">
                <p className="mb-4 text-gray-300">تاریخ تولد خود را انتخاب کنید.</p>
                
                <div className="text-center font-bold text-2xl my-4 text-white h-8 flex items-center justify-center">
                    {`${String(date.day).padStart(2, '0')} / ${String(date.month).padStart(2, '0')} / ${date.year}`}
                </div>

                <div className="relative h-48">
                    <div className="absolute inset-0 flex">
                        <PickerColumn items={days} value={date.day} onSelect={day => setDate(d => ({ ...d, day }))} />
                        <PickerColumn items={months} value={date.month} onSelect={month => setDate(d => ({ ...d, month }))} />
                        <PickerColumn items={years} value={date.year} onSelect={year => setDate(d => ({ ...d, year }))} />
                    </div>
                    <div className="absolute top-1/2 left-0 right-0 h-9 bg-gray-700/50 transform -translate-y-1/2 rounded-lg pointer-events-none border-y border-gray-600"></div>
                </div>
            </div>
        </Layout>
    );
};

export default Step5_BirthDate;