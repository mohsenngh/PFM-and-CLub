
// Fix: Add necessary type definitions and exports to make this a valid module.
export enum Page {
    LANDING,
    LOGIN,
    REGISTRATION_INTRO,
    REGISTRATION_SERVICE_TYPE,
    REGISTRATION_MOBILE,
    REGISTRATION_NATIONAL_ID,
    REGISTRATION_BIRTH_DATE,
    REGISTRATION_ID_CARD,
    REGISTRATION_BUSINESS_LICENSE,
    REGISTRATION_SETTLEMENT_ACCOUNT,
    REGISTRATION_SETTLEMENT_REVIEW,
    REGISTRATION_TAX_CODE,
    REGISTRATION_ADDRESS,
    REGISTRATION_ADDRESS_REVIEW,
    REGISTRATION_SUBMIT_CONFIRM,
    REGISTRATION_FINAL_SUCCESS,
    PAYPARTNER_DASHBOARD,
}

export interface NavigationProps {
    onNavigate: (page: Page) => void;
}

export interface SettlementAccount {
    id: number;
    accountIdentifier: string;
    share: string;
}

export interface RegistrationData {
    serviceType?: 'pos' | 'gateway';
    personType?: 'natural' | 'legal';
    mobile?: string;
    nationalId?: string;
    birthDate?: { year: number; month: number; day: number };
    idCardType?: 'smart' | 'certificate';
    idCardFront?: File;
    idCardBack?: File;
    businessCategory?: string;
    businessLicense?: File;
    settlementAccounts: SettlementAccount[];
    taxCode?: string;
    storeInfo?: { postalCode: string; phone: string };
    residenceInfo?: { postalCode: string; phone: string };
    storeAddress?: string;
    residenceAddress?: string;
}

export type RegistrationAction =
    | { type: 'SET_SERVICE_TYPE'; payload: { serviceType: 'pos' | 'gateway'; personType: 'natural' | 'legal' } }
    | { type: 'SET_MOBILE'; payload: string }
    | { type: 'SET_NATIONAL_ID'; payload: string }
    | { type: 'SET_BIRTH_DATE'; payload: { year: number; month: number; day: number } }
    | { type: 'SET_ID_CARD_INFO'; payload: { idCardType: 'smart' | 'certificate'; idCardFront: File; idCardBack: File } }
    | { type: 'SET_BUSINESS_LICENSE'; payload: { businessCategory: string; businessLicense: File } }
    | { type: 'ADD_SETTLEMENT_ACCOUNT' }
    | { type: 'REMOVE_SETTLEMENT_ACCOUNT'; payload: number }
    | { type: 'UPDATE_SETTLEMENT_ACCOUNT'; payload: SettlementAccount }
    | { type: 'SET_TAX_CODE'; payload: string }
    | { type: 'SET_ADDRESS'; payload: { storeInfo: { postalCode: string; phone: string }; residenceInfo: { postalCode: string; phone: string } } }
    | { type: 'SET_FETCHED_ADDRESSES'; payload: { storeAddress: string; residenceAddress: string } }
    | { type: 'RESET' };
