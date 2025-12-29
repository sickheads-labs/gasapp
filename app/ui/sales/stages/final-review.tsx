'use client';

import Information from "../../information";
import Details from "../details";

export default function FinalReview() {
    const handleNextButton = () => {
        location.href = '/sales';
    }
    return (<>
        <p className="text-2xl mt2">Resumen Final</p>
        <Information type="info" showButton={false} title="Éxito">Venta registrada exitosamente.</Information>
        <div className="mt-4">
            <Details />
        </div>
        <div className="mt-4">
            <button
                className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded w-full"
                onClick={handleNextButton}>Volver al inicio
            </button>
        </div>
    </>)
} 