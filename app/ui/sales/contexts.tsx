import { createContext } from 'react';


export const StagesContext = createContext<any>({});
export const BrandsContext = createContext<any>({});
export const ProductsContext = createContext<any>({});
export const FormContext = createContext<any>({
    brand: '',
    product: '',
    address: '',
    total: 0,
    discounts: [],
    payments: [],
    details: [],
});