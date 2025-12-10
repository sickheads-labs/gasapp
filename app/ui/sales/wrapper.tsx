'use client';
import { StagesContext, FormContext } from "./contexts";
import { useState } from "react";
import SelectBrand from "./stages/select-brand";
import SelectProduct from "./stages/select-product";
import TypeAddress from "./stages/type-address";
import ApplyDiscounts from "./stages/apply-discounts";
import AddPayments from "./stages/add-payments";
import FinalReview from "./stages/final-review";

export default function Wrap() {
  const [currentStage, setCurrentStage] = useState('select-brand');
  const [formData, setFormData] = useState({
    brand: '',
    product: '',
    address: '',
    total: 0,
    discounts: [],
    payments: [],
    details: [],
  });
  return (<>
    <h1>App / Nueva venta{!!formData.brand && ` / ${formData?.brand}`}{!!formData.product && ` / ${formData?.product}`}</h1>
    <StagesContext value={{currentStage, setCurrentStage}}>
      <FormContext value={{formData, setFormData}}>
          {(currentStage === 'select-brand') && <SelectBrand />}
          {(currentStage === 'select-product') && <SelectProduct />}
          {(currentStage === 'type-address') && <TypeAddress />}
          {(currentStage === 'apply-discounts') && <ApplyDiscounts />}
          {(currentStage === 'add-payments') && <AddPayments />}
          {(currentStage === 'final-review') && <FinalReview />}
      </FormContext>
    </StagesContext>
  </>);
}