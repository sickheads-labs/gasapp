'use client';

import { useContext, useState } from "react";
import { StagesContext } from "../contexts";

export default function AddPayments() {
    const { currentStage, setCurrentStage } = useContext<any>(StagesContext);
    const handleNextButton = () => {
        setCurrentStage('final-review');
    }
    return (<>
        <p>Selecciona metodos de pago</p>
        <p className=" mt-4 font-bold text-3xl">Total: $20.900</p>
        <div className="mt-4">
           <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
                onClick={() => handleNextButton()}>Efectivo
            </button>
        </div>

        <div className="mt-4">
           <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
                onClick={() => handleNextButton()}>Tarjetas
            </button>
        </div>

        <div className="mt-4">
           <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
                onClick={() => handleNextButton()}>Vales
            </button>
        </div>
    </>)
} 