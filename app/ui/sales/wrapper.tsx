'use client';
import { StagesContext, BrandsContext, ProductsContext } from "./contexts";
import { useState } from "react";
import SelectBrand from "./stages/select-brand";
import SelectProduct from "./stages/select-product";
import TypeAddress from "./stages/type-address";
import ApplyDiscounts from "./stages/apply-discounts";
import AddPayments from "./stages/add-payments";
import FinalReview from "./stages/final-review";

export default function Wrap() {
  const [currentStage, setCurrentStage] = useState('select-brand');
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  return (<>
    <h1>App / Nueva venta{!!selectedBrand && ` / ${selectedBrand}`}{!!selectedProduct && ` / ${selectedProduct}`}</h1>
    <StagesContext value={{currentStage, setCurrentStage}}>
      <BrandsContext value={{selectedBrand, setSelectedBrand}}>
        <ProductsContext value={{selectedProduct, setSelectedProduct}}>
          {(currentStage === 'select-brand') && <SelectBrand />}
          {(currentStage === 'select-product') && <SelectProduct />}
          {(currentStage === 'type-address') && <TypeAddress />}
          {(currentStage === 'apply-discounts') && <ApplyDiscounts />}
          {(currentStage === 'add-payments') && <AddPayments />}
          {(currentStage === 'final-review') && <FinalReview />}
        </ProductsContext>
      </BrandsContext>
    </StagesContext>
  </>);
}