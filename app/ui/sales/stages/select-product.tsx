'use client';

import { useContext } from "react";
import { ProductsContext, StagesContext } from "../contexts";

export default function SelectProduct() {

    const { currentStage, setCurrentStage } = useContext<any>(StagesContext);
    const { selectedProduct, setSelectedProduct } = useContext<any>(ProductsContext);

    const handleSelectProduct = (product: string) => {
        setCurrentStage('type-address');
        setSelectedProduct(product);
    }


    return (<>
        <p>Selecciona Producto</p>
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