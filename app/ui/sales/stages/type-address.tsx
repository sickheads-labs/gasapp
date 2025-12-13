'use client';

import { useContext } from "react";
import { FormContext, StagesContext } from "../contexts";
import Details from "../details";

export default function TypeAddress() {
    const { setCurrentStage } = useContext<any>(StagesContext);
    const { formData, setFormData } = useContext<any>(FormContext);
    const handleNextButton = () => {
        setCurrentStage('apply-discounts');
    }

    return (<>
        <p className="text-2xl mt-4">Ingresa Dirección</p>
        <div className="mt-2">
            <input
                type="text"
                placeholder="Dirección"
                className="border border-gray-300 rounded w-full py-2 px-4"
                value={formData.address}
                onChange={(e) => {
                    const address = (e.target as HTMLInputElement).value;
                    setFormData({
                        ...formData,
                        address: address
                    });
                }}
            />
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
                onClick={() => setCurrentStage('select-product')}>
                Volver
            </button>
        </div>
        
    </>)
} 