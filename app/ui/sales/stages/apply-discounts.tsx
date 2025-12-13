'use client';

import { useContext, useState } from "react";
import { FormContext, StagesContext } from "../contexts";
import Details from "../details";

export default function ApplyDiscounts() {
    const { setCurrentStage } = useContext<any>(StagesContext);
    const { formData, setFormData } = useContext<any>(FormContext);
    const [discountCode, setDiscountCode] = useState('');
    const handleNextButton = () => {
        setCurrentStage('add-payments');
    }
    const handleApplyDiscount = () => {
        if (discountCode.trim() === '') return;
        if (discountCode.toUpperCase() !== 'DESC500') return;
        const quantity = formData.details.reduce((acc: number, item: any) => acc + item.quantity, 0);
        const newDiscount = {
            code: discountCode,
            amount: 500,
            description: `Dcto 500 x balon`,
            quantity,
            total: 500 * quantity
        };
        const updatedDiscounts = [...formData.discounts, newDiscount];
        const updatedTotalDiscounts = formData.total_discounts + newDiscount.total;
        setFormData({
            ...formData,
            discounts: updatedDiscounts,
            total_discounts: updatedTotalDiscounts,
            total_original: formData.total,
            total: formData.total - updatedTotalDiscounts
        });
        setDiscountCode('');
    }
    return (<>
        <p className="text-2xl mt-4">Aplicar descuentos</p>
        <div className="mt-2">
            <input
                type="text"
                placeholder="Ingresa código de descuento"
                className="border border-gray-300 rounded w-full py-2 px-4"
                value={discountCode}
                onChange={(e) => {
                    const code = (e.target as HTMLInputElement).value;
                    setDiscountCode(code);
                }}
            />
        </div>
        <div className="mt-4">
            <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
                onClick={() => handleApplyDiscount()}>Aplicar
            </button>
        </div>
        <Details />
        <div className="mt-4">
            <button
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded w-full"
                onClick={handleNextButton}>Continuar
            </button>
        </div>
        <div className="my-4">
            <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-full"
                onClick={() => setCurrentStage('type-address')}>
                Volver
            </button>
        </div>
        
    </>)
} 