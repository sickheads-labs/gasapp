'use client';

import { useContext } from "react";
import { StagesContext, FormContext } from "../contexts";

export default function SelectProduct() {

    const { setCurrentStage } = useContext<any>(StagesContext);
    const { formData, setFormData } = useContext<any>(FormContext);

    const handleSelectProduct = (product: string) => {
        setCurrentStage('type-address');
        setFormData({
            ...formData,
            product: product,
            details: [...formData.details, { brand: formData.brand, product: product, price: 29900 }]
        });
    }

    return (<>
        <p className="text-2xl">Selecciona Producto</p>
        <div className="my-4">
            <button
                className="bg-yellow-500 hover:bg-yellow-700 text-black font-bold py-2 px-4 rounded w-full"
                onClick={() => setCurrentStage('select-brand')}>
                Volver
            </button>
        </div>
        <div className="mt-2">
            <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
                onClick={() => handleSelectProduct('5kg')}>5kg
            </button>
        </div>
        <div className="mt-2">
            <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
                onClick={() => handleSelectProduct('11kg')}>11kg
            </button>
        </div>
        <div className="mt-2">
            <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
                onClick={() => handleSelectProduct('15kg')}>15kg
            </button>
        </div>

        <div className="mt-2">
            <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
                onClick={() => handleSelectProduct('45kg')}>45kg
            </button>
        </div>
    </>)
}