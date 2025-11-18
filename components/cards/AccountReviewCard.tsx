import React from 'react';

interface AccountReviewCardProps {
    accountHolder: string;
    bankName: string;
    accountType: string;
    sheba: string;
    share: string;
}

const AccountReviewCard: React.FC<AccountReviewCardProps> = ({ accountHolder, bankName, accountType, sheba, share }) => (
    <div className="w-full p-4 bg-gray-800 rounded-lg border border-gray-700 text-right space-y-2">
        <div className="flex justify-between items-baseline">
            <h3 className="font-bold text-lg text-white">{accountHolder}</h3>
            <p className="text-blue-400 font-bold">{share}%</p>
        </div>
        <p className="text-gray-300">{bankName} - {accountType}</p>
        <p className="text-gray-400 text-sm" dir="ltr">{sheba}</p>
    </div>
);

export default AccountReviewCard;
