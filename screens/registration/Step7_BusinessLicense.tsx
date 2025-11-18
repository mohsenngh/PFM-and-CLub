import React, { useState } from 'react';
import { Page, NavigationProps } from '../../types';
import { useRegistration } from '../../contexts/RegistrationContext';
import Layout from '../../components/Layout';
import FileUpload from '../../components/FileUpload';

const businessCategories = [
    "ارائه‌دهندگان خدمات حسابرسی، حسابداری، دفترداری و خدمات مالی",
    "ارائه‌دهندگان انواع خدمات مدیریتی و مشاوره‌ای",
    "ارائه‌دهندگان خدمات انفورماتیک و رایانه‌ای",
    "صاحبان مراکز ارتباطات رایانه‌ای و دفاتر خدمات ارتباطی و خدمات دولتی",
    "خدمات بانکی و اعتباری",
    "خدمات معاملات و تسویه اوراق بهادار و کالاها",
    "انواع خدمات پژوهشی و آموزشی",
    "فروشندگان لاستیک",
    "نمایشگاه‌های اتومبیل",
    "فروشندگان مصالح ساختمانی",
    "فروشندگان تاسیسات الکترونیکی و مکانیکی",
    "فروشندگان انواع رنگ",
    "فروشندگان مواد شیمیایی",
    "نمایندگی فروش شرکت‌های توزیع کالا",
    "نمایندگی‌های فروش شرکت‌ها و موسسات تجاری",
    "فروشندگان یخچال‌های صنعتی و ویترینی",
    "بارفروشان و فروشندگان میوه و تره‌بار",
    "سازندگان و فروشندگان طلا و جواهر",
    "فروشندگان آهن‌آلات",
    "فروشندگان لوازم صوتی و تصویری",
    "فروشندگان رایانه و قطعات سخت‌افزار",
    "فروشندگان ماشین‌های اداری",
    "فروشندگان لوازم خانگی",
    "هتل و هتل آپارتمان",
    "تالارها، رستوران‌ها",
    "چلوکبابی و اغذیه فروشی‌ها",
    "مشاور املاک و مستقلات",
    "فروشندگان اتومبیل",
    "فروشندگان لوازم یدکی خودرو",
    "صاحبان تعمیرگاه‌های مجاز خودرو",
    "فروشندگان تجهیزات و تاسیسات حرارتی و برودتی",
    "فروشندگان لوازم بهداشتی ساختمان",
    "فروشندگان تزیینات ساختمانی",
    "فروشندگان تلفن همراه و لوازم جانبی",
];

const Step7_BusinessLicense: React.FC<NavigationProps> = ({ onNavigate }) => {
    const { dispatch } = useRegistration();
    const [businessCategory, setBusinessCategory] = useState('');
    const [businessLicense, setBusinessLicense] = useState<File | null>(null);

    const handleProceed = () => {
        if (businessCategory && businessLicense) {
            dispatch({ type: 'SET_BUSINESS_LICENSE', payload: { businessCategory, businessLicense } });
            onNavigate(Page.REGISTRATION_SETTLEMENT_ACCOUNT);
        }
    };

    return (
        <Layout
            onBack={() => onNavigate(Page.REGISTRATION_ID_CARD)}
            onProceed={handleProceed}
            canProceed={!!businessCategory && !!businessLicense}
            title="پروانه کسب"
        >
            <div className="w-full space-y-6">
                 <p className="text-gray-300">صنف خود را انتخاب کرده و تصویر پروانه کسب را بارگذاری کنید.</p>
                <div className="w-full">
                    <label htmlFor="business-category" className="block text-right text-sm font-medium text-gray-400 mb-1">صنف</label>
                    <select
                        id="business-category"
                        value={businessCategory}
                        onChange={(e) => setBusinessCategory(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg h-[50px] text-lg text-right text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="" disabled>یک مورد را انتخاب کنید</option>
                        {businessCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                </div>
                <div className="pt-4">
                    <FileUpload label="بارگذاری پروانه کسب" onFileSelect={(file) => setBusinessLicense(file)} />
                </div>
            </div>
        </Layout>
    );
};

export default Step7_BusinessLicense;
