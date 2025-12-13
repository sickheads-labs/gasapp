import { createContext } from 'react';


export const StagesContext = createContext<any>({});
export const FormContext = createContext<any>({
    address: '',
    total: 0,
    total_discounts: 0,
    discounts: [],
    payments: [],
    details: [],
});