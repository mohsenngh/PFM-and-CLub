import React, { useState } from 'react';
import { Page, NavigationProps } from '../../types';
import Layout from '../../components/Layout';
import ProgressTracker from '../../components/ProgressTracker';

const registrationSteps = ["ثبت درخواست", "بررسی درخواست", "امضا قرارداد", "فعالسازی"];

const Step12_SubmitAndContract: React.FC<NavigationProps> = ({ onNavigate }) => {
    const [stage, setStage] = useState<'submit_confirm' | 'contract_ready'>('submit_confirm');

    if (stage === 'submit_confirm') {
        return (
            <Layout
                onBack={() => onNavigate(Page.REGISTRATION_ADDRESS_REVIEW)}
                onProceed={() => setStage('contract_ready')}
                proceedLabel="متوجه شدم"
                title="اطلاعات دریافت شد"
            >
                <div className="w-full flex flex-col items-center">
                    <p className="text-gray-300 my-8 text-center">
                        اطلاعات شما با موفقیت دریافت شد. نتیجه بررسی تا چند ساعت دیگر از طریق پیامک به شما اطلاع‌رسانی خواهد شد.
                    </p>
                    <ProgressTracker steps={registrationSteps} currentStep={1} />
                </div>
            </Layout>
        );
    }

    // stage === 'contract_ready'
    return (
        <Layout
            onBack={() => setStage('submit_confirm')}
            onProceed={() => onNavigate(Page.REGISTRATION_FINAL_SUCCESS)}
            proceedLabel="مطالعه قرارداد"
            title="قرارداد آماده امضا"
        >
            <div className="w-full flex flex-col items-center">
                 <p className="text-gray-300 my-8 text-center">
                    پذیرنده گرامی، درخواست شما بررسی و قرارداد آماده امضا می‌باشد.
                </p>
                <ProgressTracker steps={registrationSteps} currentStep={2} />
            </div>
        </Layout>
    );
};

export default Step12_SubmitAndContract;