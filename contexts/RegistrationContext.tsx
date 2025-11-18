import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import { RegistrationData, RegistrationAction } from '../types';

const initialState: RegistrationData = {
    settlementAccounts: [{ id: 1, accountIdentifier: '', share: '100' }],
};

const RegistrationContext = createContext<{
    state: RegistrationData;
    dispatch: React.Dispatch<RegistrationAction>;
} | undefined>(undefined);

const registrationReducer = (state: RegistrationData, action: RegistrationAction): RegistrationData => {
    switch (action.type) {
        case 'SET_SERVICE_TYPE':
            return { ...state, serviceType: action.payload.serviceType, personType: action.payload.personType };
        case 'SET_MOBILE':
            return { ...state, mobile: action.payload };
        case 'SET_NATIONAL_ID':
            return { ...state, nationalId: action.payload };
        case 'SET_BIRTH_DATE':
            return { ...state, birthDate: action.payload };
        case 'SET_ID_CARD_INFO':
            return { ...state, ...action.payload };
        case 'SET_BUSINESS_LICENSE':
            return { ...state, ...action.payload };
        case 'ADD_SETTLEMENT_ACCOUNT':
            const newId = state.settlementAccounts.length > 0 ? Math.max(...state.settlementAccounts.map(a => a.id)) + 1 : 1;
            return { ...state, settlementAccounts: [...state.settlementAccounts, { id: newId, accountIdentifier: '', share: '' }] };
        case 'REMOVE_SETTLEMENT_ACCOUNT':
             if (state.settlementAccounts.length <= 1) return state; // Prevent removing the last one
            return { ...state, settlementAccounts: state.settlementAccounts.filter(acc => acc.id !== action.payload) };
        case 'UPDATE_SETTLEMENT_ACCOUNT':
            return { ...state, settlementAccounts: state.settlementAccounts.map(acc => acc.id === action.payload.id ? action.payload : acc) };
        case 'SET_TAX_CODE':
            return { ...state, taxCode: action.payload };
        case 'SET_ADDRESS':
            return { ...state, ...action.payload };
        case 'SET_FETCHED_ADDRESSES':
            return { ...state, ...action.payload };
        case 'RESET':
            return initialState;
        default:
            return state;
    }
};

export const RegistrationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(registrationReducer, initialState);

    return (
        <RegistrationContext.Provider value={{ state, dispatch }}>
            {children}
        </RegistrationContext.Provider>
    );
};

export const useRegistration = () => {
    const context = useContext(RegistrationContext);
    if (context === undefined) {
        throw new Error('useRegistration must be used within a RegistrationProvider');
    }
    return context;
};
