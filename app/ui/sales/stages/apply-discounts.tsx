'use client';

import { useContext, useState } from "react";
import { StagesContext } from "../contexts";

export default function ApplyDiscounts() {
    const { currentStage, setCurrentStage } = useContext<any>(StagesContext);
    const [totalAmount, setTotalAmount] = useState(26900);
    const handleNextButton = () => {
        setCurrentStage('add-payments');
    }
    return (<>
        <p>Aplicar descuentos</p>
        <p className=" mt-4 font-bold text-3xl">Total: ${totalAmount.toLocaleString('es-cl')}</p>
        <div className="mt-2">
            <input
                type="text"
                placeholder="Ingresa código de descuento"
                className="border border-gray-300 rounded w-full py-2 px-4"
                onKeyUp={(e) => {
                    const code = (e.target as HTMLInputElement).value;
                    // Aquí podrías agregar lógica para validar el código y calcular el descuento
                    if (code === "descuento10") {
                        setTotalAmount(19900);
                    } else {
                        setTotalAmount(26900);
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