import { useContext, useEffect } from "react";
import { FormContext } from "./contexts";

export default function Details() {
    const { formData, setFormData } = useContext<any>(FormContext);
    return (<>
        <h2 className="text-xl mt-6 mb-2">Detalles de la Venta</h2>
        <table className="min-w-full divide-y divide-gray-200">
            <tbody className="bg-white divide-y divide-gray-200">
                {formData.details.map((item: any, index: number) => (   
                    <tr key={index}>
                        <td className="px-1 py-4 whitespace-nowrap text-sm font-medium text-gray-900 capitalize">
                            {item.brand} {item.product}
                        </td>
                        <td className="px-1 py-4 whitespace-nowrap text-sm text-gray-500">
                             ${item.unitPrice.toLocaleString('es-cl')} x {item.quantity}
                        </td>
                        <td className="px-1 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${item.total .toLocaleString('es-cl')}
                        </td>
                    </tr>
                ))}
                {formData.discounts.map((item: any, index: number) => (   
                    <tr key={100+index}>
                        <td className="px-1 py-4 whitespace-nowrap text-sm font-medium text-gray-900 capitalize">
                            {item.description}
                            <br/>
                            <small>{item.code}</small>
                        </td>
                        <td className="px-1 py-4 whitespace-nowrap text-sm text-gray-500">
                             ${item.amount.toLocaleString('es-cl')} x {item.quantity}
                        </td>
                        <td className="px-1 py-4 whitespace-nowrap text-sm text-gray-900">
                            -${item.total .toLocaleString('es-cl')}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        <p className="mt-4 font-bold">Total: ${(formData.details.reduce((acc: number, item: any) => acc + item.total, 0) - formData.total_discounts).toLocaleString('es-cl')}</p>
        {formData.payments.length > 0 && <h2 className="text-xl mt-6 mb-2">Detalles del Pago</h2>}
        <table className="min-w-full divide-y divide-gray-200">
            <tbody className="bg-white divide-y divide-gray-200">
                {formData.payments.map((item: any, index: number) => (
                    <tr key={index}>
                        <td className="px-1 py-4 whitespace-nowrap text-sm font-medium text-gray-900 capitalize">
                            {item.method}
                        </td>
                        <td className="px-1 py-4 whitespace-nowrap text-sm text-gray-500">
                            ${item.amount.toLocaleString('es-cl')}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        {formData.payments.length > 0 && <p className="mt-4 font-bold">Total: ${(formData.payments.reduce((acc: number, item: any) => acc + item.amount, 0)).toLocaleString('es-cl')}</p>}
    </>);
}