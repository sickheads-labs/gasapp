'use client';
import { StagesContext, FormContext } from "./contexts";
import { useEffect, useState } from "react";
import SelectProduct from "./stages/select-product";
import TypeAddress from "./stages/type-address";
import ApplyDiscounts from "./stages/apply-discounts";
import AddPayments from "./stages/add-payments";
import FinalReview from "./stages/final-review";

export default function Wrap() {
  const [currentStage, setCurrentStage] = useState('select-product');
  const [formData, setFormData] = useState({
    address: '',
    total: 0,
    total_discounts: 0,
    discounts: [],
    payments: [],
    details: [],
  });
  useEffect(() => {
    console.log('form data:', formData);
  }, [formData]);
  return (<>
    <h1>App / Venta</h1>
    <StagesContext value={{currentStage, setCurrentStage}}>
      <FormContext value={{formData, setFormData}}>
          {(currentStage === 'select-product') && <SelectProduct />}
          {(currentStage === 'type-address') && <TypeAddress />}
          {(currentStage === 'apply-discounts') && <ApplyDiscounts />}
          {(currentStage === 'add-payments') && <AddPayments />}
          {(currentStage === 'final-review') && <FinalReview />}
      </FormContext>
    </StagesContext>
  </>);
}