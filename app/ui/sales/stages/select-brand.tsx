'use client';

import { useContext } from "react";
import { StagesContext, FormContext } from "../contexts";

export default function SelectBrand() {
  const { setCurrentStage } = useContext<any>(StagesContext);
  const { formData, setFormData } = useContext<any>(FormContext);
  const handleSelectBrand = (brand: string) => {
    setCurrentStage('select-product');
    setFormData({
      ...formData,
      brand: brand,
    });
  }

  return (<>
    <p className="text-2xl">Selecciona Marca</p>

    <div className="mt-2">
      <button
        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded w-full"
        onClick={() => handleSelectBrand('Abastible')}>Abastible
      </button>
    </div>
    <div className="mt-2">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        onClick={() => handleSelectBrand('Gasco')}>Gasco
      </button>
    </div>
    <div className="mt-2">
      <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded w-full"
        onClick={() => handleSelectBrand('Lippigas')}>Lippigas</button>
    </div>
  </>)
}