'use client';

import { useContext } from "react";
import { FormContext, StagesContext } from "../contexts";

export default function FinalReview() {
    const { setCurrentStage } = useContext<any>(StagesContext);
    const { formData } = useContext<any>(FormContext);
    const handleNextButton = () => {
        console.log("Finalizando venta con datos:", formData);
        setCurrentStage('final-review');
    }
    return (<>
        <p className="text-2xl mt2">Revisión y confirmación</p>
        <div className="mt-4">
            <table className="table-auto w-full font-bold">
                <tbody>
                    <tr>
                        <td>Gas Abastible</td>
                        <td>15kg</td>
                        <td>$29.900</td>
                    </tr>
                    <tr>
                        <td>Descuento</td>
                        <td>Abastible al paso</td>
                        <td>-$7.000</td>
                    </tr>
                </tbody>
            </table>
            <p className=" mt-6 font-bold text-xl">Total: $22.900</p>
            <p className=" mt-2 font-bold text-xl">M. Pago: Efectivo</p>
        </div>
        <div className="mt-4">
            <button
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded w-full"
                onClick={handleNextButton}>Finalizar Venta
            </button>
        </div>
    </>)
} 