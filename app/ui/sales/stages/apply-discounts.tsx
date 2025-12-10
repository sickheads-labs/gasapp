'use client';

import { useContext, useState } from "react";
import { FormContext, StagesContext } from "../contexts";

export default function ApplyDiscounts() {
    const { setCurrentStage } = useContext<any>(StagesContext);
    const { formData, setFormData } = useContext<any>(FormContext);
    const [totalAmount, setTotalAmount] = useState(29900);
    const handleNextButton = () => {
        setCurrentStage('add-payments');
    }
    return (<>
        <p className="text-2xl">Aplicar descuentos</p>
        <div className="my-4">
            <button
                className="bg-yellow-500 hover:bg-yellow-700 text-black font-bold py-2 px-4 rounded w-full"
                onClick={() => setCurrentStage('type-address')}>
                Volver
            </button>
        </div>
        <p className="font-bold text-3xl">Total: ${totalAmount.toLocaleString('es-cl')}</p>
        <div className="mt-2">
            <input
                type="text"
                placeholder="Ingresa código de descuento"
                className="border border-gray-300 rounded w-full py-2 px-4"
                onChange={(e) => {
                    const code = (e.target as HTMLInputElement).value;
                    if (code === "descuento10") {
                        setTotalAmount(22900);
                        setFormData({
                            ...formData,
                            discounts: [...formData.discounts, { code: code, amount: 7000, details: 'Descuento Al paso' }]
                        }); 
                    } else {
                        setTotalAmount(29900);
                    }
                }}
            />
        </div>
        <div className="mt-4">
            <button
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded w-full"
                onClick={handleNextButton}>Continuar
            </button>
        </div>
    </>)
} 