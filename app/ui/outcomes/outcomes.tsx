'use client';

import { saveOutcome } from "@/app/lib/actions";
import { useEffect, useState } from "react";
import Information from "../information";

export default function Outcomes({ sales }: any) {

  const [cashTotals, setCashTotals] = useState({ amount: 0, vouchers: 0 });
  const [debitTotals, setDebitTotals] = useState({ amount: 0, vouchers: 0 });
  const [creditTotals, setCreditTotals] = useState({ amount: 0, vouchers: 0 });
  const [lippigasTotals, setLippigasTotals] = useState({ amount: 0, vouchers: 0 });
  const [gascoTotals, setGascoTotals] = useState({ amount: 0, vouchers: 0 });
  const [abastibleTotals, setAbastibleTotals] = useState({ amount: 0, vouchers: 0 });
  const [totals, setTotals] = useState({ amount: 0, vouchers: 0 });
  const [backInfo, setBackInfo] = useState({type: '', message: '', title: ''});

  const getItemTotals = (method: string) => {
    const item = sales.totals.find((s: any) => s.method === method);
    return {
      amount: item ? item.amount : 0,
      vouchers: item ? item.vouchers : 0
    };
  }

  const handleButtonClick = () => {
    // Handle the button click event here
    console.log("Registrar Entrega button clicked");
    saveOutcome({
      voucher_quantity: totals.vouchers,
      coupon_quantity: totals.vouchers,
      description: 'Entrega registrada desde la app',
      amount: totals.amount,
      sales_ids: sales.openSales.map((s: any) => s.id)
    }).then((response) => {
      console.log("Outcome saved successfully:", response);
      // You can add further actions here, like showing a success message or redirecting
      setBackInfo({ type: 'info', title: 'Entrega registrada', message: 'La entrega ha sido registrada correctamente.' });
    }).catch((error) => {
      console.error("Error saving outcome:", error);
      // Handle the error appropriately
      setBackInfo({ type: 'error', title: 'Error', message: 'Hubo un error al registrar la entrega. Inténtalo de nuevo.' });
    });
  }

  useEffect(() => {
    setCashTotals(getItemTotals('Efectivo'));
    setDebitTotals(getItemTotals('Tarjeta débito'));
    setCreditTotals(getItemTotals('Tarjeta crédito'));
    setLippigasTotals(getItemTotals('Vale Lipigas'));
    setGascoTotals(getItemTotals('Vale Gasco'));
    setAbastibleTotals(getItemTotals('Vale Abastible'));
    console.log({ sales });
  }, []);

  useEffect(() => {
    setTotals({
      amount: cashTotals.amount + debitTotals.amount + creditTotals.amount + lippigasTotals.amount + gascoTotals.amount + abastibleTotals.amount,
      vouchers: debitTotals.vouchers + creditTotals.vouchers + lippigasTotals.vouchers + gascoTotals.vouchers + abastibleTotals.vouchers
    });
  }, [cashTotals, debitTotals, creditTotals, lippigasTotals, gascoTotals, abastibleTotals]);
  return (<>
        <h1 className="m-1">App / Nueva entrega</h1>
        {backInfo.type && <Information type={backInfo.type} title={backInfo.title} children={backInfo.message} />}
        <h1 className="text-2xl text-gray-900 mt-4">Entregas</h1>
        <p className="text-gray-600">Aquí puedes gestionar las entregas de dinero a tu supervisor.</p>
        <table className="min-w-full divide-y divide-gray-200 mt-6">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vales</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Efectivo</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${cashTotals.amount.toLocaleString('es-CL')}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">-</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Débito</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${debitTotals.amount.toLocaleString('es-CL')}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{debitTotals.vouchers}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Crédito</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${creditTotals.amount.toLocaleString('es-CL')}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{creditTotals.vouchers}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Vales<br />Abastible</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${abastibleTotals.amount.toLocaleString('es-CL')}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{abastibleTotals.vouchers}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Vales<br />Gasco</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${gascoTotals.amount.toLocaleString('es-CL')}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{gascoTotals.vouchers}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Vales<br />Lipigas</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${lippigasTotals.amount.toLocaleString('es-CL')}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lippigasTotals.vouchers}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">Total</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">${totals.amount.toLocaleString('es-CL')}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">{totals.vouchers}</td>
            </tr>
          </tbody>
        </table>
        <div>
            <button className="mt-6 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-500 w-full"
            onClick={() => handleButtonClick()}>Registrar Entrega</button>
        </div>
  </>);
}