'use client';

import { useContext } from "react";
import { FormContext, StagesContext } from "../contexts";

export default function AddPayments() {
    const { setCurrentStage } = useContext<any>(StagesContext);
    const { formData, setFormData } = useContext<any>(FormContext);
    const handlePaymentMethod = (pm: String) => {
        setFormData({
            ...formData,
            payments: [...formData.payments, { method: pm, amount: 20900 }]
        });
        setCurrentStage('final-review');
    }
    return (<>
        <p className="text-2xl">Selecciona metodo de pago</p>
        <div className="my-4">
            <button
                className="bg-yellow-500 hover:bg-yellow-700 text-black font-bold py-2 px-4 rounded w-full"
                onClick={() => setCurrentStage('apply-discounts')}>
                Volver
            </button>
        </div>
        <p className="font-bold text-3xl">Total: $20.900</p>
        <div className="mt-4">
           <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
                onClick={() => handlePaymentMethod('Efectivo')}>Efectivo
            </button>
        </div>

        <div className="mt-4">
           <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-full"
                onClick={() => handlePaymentMethod('Tarjetas')}>Tarjetas
            </button>
        </div>

        <div className="mt-4">
           <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                onClick={() => handlePaymentMethod('Vales')}>Vales
            </button>
        </div>
    </>)
} 