'use client';

import { useContext } from "react";
import { StagesContext } from "../contexts";

export default function TypeAddress() {
    const { currentStage, setCurrentStage } = useContext<any>(StagesContext);
    const handleNextButton = () => {
        setCurrentStage('apply-discounts');
    }

    return (<>
        <p>Ingresa Dirección</p>
        <div className="mt-2">
            <input
                type="text"
                placeholder="Dirección"
                className="border border-gray-300 rounded w-full py-2 px-4"
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