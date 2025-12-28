'use client';

import { useState, useContext, useEffect } from "react";
import { useSearchParams, useRouter } from 'next/navigation'
import { StagesContext, FormContext } from "../contexts";

export default function SelectProduct() {

    const router = useRouter()
    const { setCurrentStage } = useContext<any>(StagesContext);
    const { formData, setFormData } = useContext<any>(FormContext);
    const [saleDetails, setSaleDetails] = useState<any>({
        abastible: { '5kg': 0, '11kg': 0, '15kg': 0, '45kg': 0 },
        gasco: { '5kg': 0, '11kg': 0, '15kg': 0, '45kg': 0 },
        lipigas: { '5kg': 0, '11kg': 0, '15kg': 0, '45kg': 0 },
    });

    const [salePrices] = useState<any>({
        abastible: { '5kg': 19900, '11kg': 29900, '15kg': 39900, '45kg': 69900 },
        gasco: { '5kg': 18900, '11kg': 28900, '15kg': 38900, '45kg': 68900 },
        lipigas: { '5kg': 17900, '11kg': 27900, '15kg': 37900, '45kg': 67900 },
    });

    const handleNextButton = () => {

        const details = Object.entries(saleDetails).map(([brand, products]: [string, any]) => {
            return Object.entries(products).map(([product, quantity]: [string, any]) => {
                if (quantity > 0) {
                    return {
                        brand: brand,
                        product: product,
                        quantity: quantity,
                        unitPrice: salePrices[brand][product],
                        total: salePrices[brand][product] * quantity,
                    }
                }
            }).filter((item: any) => item !== undefined);
        }).flat().filter((item: any) => item !== undefined);
        setFormData({
            ...formData,
            details,
            total: details.reduce((acc: number, item: any) => acc + item.total, 0),
        });
        console.log('formData:', formData);
        setCurrentStage('type-address');
    }

    const addProductToDetails = (brand: string, product: string, quantity: number) => {
        setSaleDetails({
            ...saleDetails,
            [brand.toLowerCase()]: {
                ...saleDetails[brand.toLowerCase()],
                [product]: saleDetails[brand.toLowerCase()][product] + quantity
            }
        });
    }

    const subtractProductFromDetails = (brand: string, product: string, quantity: number) => {
        if (saleDetails[brand.toLowerCase()][product] + quantity === 1) {
            return;
        }
        setSaleDetails({
            ...saleDetails,
            [brand.toLowerCase()]: {
                ...saleDetails[brand.toLowerCase()],
                [product]: saleDetails[brand.toLowerCase()][product] - quantity
            }
        });
    }

    return (<>
        {false && <div className="bg-blue-200 rounded p-2 border m-1 border-blue-400">
            <p className="text-blue-700 font-bold text-xl">Exito</p>
            <p className="text-blue-700 text-xl">Venta guardada con éxito</p>
            <div className="mt-2 flex justify-start">
                <button className="bg-gray-200 border-gray-400 hover:bg-gray-300 text-gray-800 border py-1 px-3 mt-3 rounded w-full" 
                onClick={() => {
                    router.replace('/sales');
                }}>Cerrar</button>
            </div>
        </div>}
        <p className="text-2xl">Selecciona Producto</p>
        <div className="mt-2">
            <p className="bg-orange-500 text-white font-bold flex items-center justify-center rounded-full p-2 text-xl">Abastible</p>
            <table className="ml-8">
                <tbody>
                    <tr>
                        <td className="text-lg font-bold p-1">
                            5kg
                            <br />
                            <small>${salePrices['abastible']['5kg'].toLocaleString('es-cl')}</small>
                        </td>
                        <td className="p-1">
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mx-2 rounded"
                                onClick={() => subtractProductFromDetails('abastible', '5kg', 1)}>
                                -</button>
                            <input type="text"
                                className="border border-gray-300 rounded py-2 px-2 m-4 w-12 font-bold text-2xl"
                                value={saleDetails.abastible['5kg']}
                                onChange={(e) => {
                                    const quantity = (e.target as HTMLInputElement).value;
                                    setSaleDetails({
                                        ...saleDetails,
                                        abastible: {
                                            ...saleDetails.abastible,
                                            '5kg': parseInt(quantity)
                                        }
                                    });
                                }}
                            />
                            <button
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mx-2 rounded"
                                onClick={() => addProductToDetails('abastible', '5kg', 1)}>
                                +</button>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-lg font-bold p-1">
                            11kg
                            <br />
                            <small>${salePrices['abastible']['11kg'].toLocaleString('es-cl')}</small>
                        </td>
                        <td className="p-1">
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mx-2 rounded"
                                onClick={() => subtractProductFromDetails('abastible', '11kg', 1)}>
                                -</button>
                            <input type="text"
                                className="border border-gray-300 rounded py-2 px-2 m-4 w-12 font-bold text-2xl"
                                value={saleDetails.abastible['11kg']}
                                onChange={(e) => {
                                    const quantity = (e.target as HTMLInputElement).value;
                                    if (parseInt(quantity) >= 0) {
                                        setSaleDetails({
                                            ...saleDetails,
                                            abastible: {
                                                ...saleDetails.abastible,
                                                '11kg': parseInt(quantity)
                                            }
                                        });
                                    }
                                }}
                            />
                            <button
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mx-2 rounded"
                                onClick={() => addProductToDetails('abastible', '11kg', 1)}>
                                +</button>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-lg font-bold p-1">
                            15kg
                            <br />
                            <small>${salePrices['abastible']['15kg'].toLocaleString('es-cl')}</small>
                        </td>
                        <td className="p-1">
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mx-2 rounded"
                                onClick={() => subtractProductFromDetails('abastible', '15kg', 1)}>
                                -</button>
                            <input type="text"
                                className="border border-gray-300 rounded py-2 px-2 m-4 w-12 font-bold text-2xl"
                                value={saleDetails.abastible['15kg']}
                                onChange={(e) => {
                                    const quantity = (e.target as HTMLInputElement).value;
                                    if (parseInt(quantity) >= 0) {
                                        setSaleDetails({
                                            ...saleDetails,
                                            abastible: {
                                                ...saleDetails.abastible,
                                                '15kg': parseInt(quantity)
                                            }
                                        });
                                    }
                                }}
                            />
                            <button
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mx-2 rounded"
                                onClick={() => addProductToDetails('abastible', '15kg', 1)}>
                                +</button>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-lg font-bold p-1">
                            45kg
                            <br />
                            <small>${salePrices['abastible']['45kg'].toLocaleString('es-cl')}</small>
                        </td>
                        <td className="p-1">
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mx-2 rounded"
                                onClick={() => subtractProductFromDetails('abastible', '45kg', 1)}>
                                -</button>
                            <input type="text"
                                className="border border-gray-300 rounded py-2 px-2 m-4 w-12 font-bold text-2xl"
                                value={saleDetails.abastible['45kg']}
                                onChange={(e) => {
                                    const quantity = (e.target as HTMLInputElement).value;
                                    if (parseInt(quantity) >= 0) {
                                        setSaleDetails({
                                            ...saleDetails,
                                            abastible: {
                                                ...saleDetails.abastible,
                                                '45kg': parseInt(quantity)
                                            }
                                        });
                                    }
                                }}
                            />
                            <button
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mx-2 rounded"
                                onClick={() => addProductToDetails('abastible', '45kg', 1)}>
                                +</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div className="mt-2">
            <p className="bg-blue-500 text-white font-bold flex items-center justify-center rounded-full p-2 text-xl">Gasco</p>
            <table className="ml-8">
                <tbody>
                    <tr>
                        <td className="text-lg font-bold p-1">
                            5kg
                            <br />
                            <small>${salePrices['gasco']['5kg'].toLocaleString('es-cl')}</small>
                        </td>
                        <td className="p-1">
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mx-2 rounded"
                                onClick={() => subtractProductFromDetails('gasco', '5kg', 1)}>
                                -</button>
                            <input type="text"
                                className="border border-gray-300 rounded py-2 px-2 m-4 w-12 font-bold text-2xl"
                                value={saleDetails.gasco['5kg']}
                                onChange={(e) => {
                                    const quantity = (e.target as HTMLInputElement).value;
                                    setSaleDetails({
                                        ...saleDetails,
                                        gasco: {
                                            ...saleDetails.gasco,
                                            '5kg': parseInt(quantity)
                                        }
                                    });
                                }}
                            />
                            <button
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mx-2 rounded"
                                onClick={() => addProductToDetails('gasco', '5kg', 1)}>
                                +</button>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-lg font-bold p-1">
                            11kg
                            <br />
                            <small>${salePrices['gasco']['11kg'].toLocaleString('es-cl')}</small>
                        </td>
                        <td className="p-1">
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mx-2 rounded"
                                onClick={() => subtractProductFromDetails('gasco', '11kg', 1)}>
                                -</button>
                            <input type="text"
                                className="border border-gray-300 rounded py-2 px-2 m-4 w-12 font-bold text-2xl"
                                value={saleDetails.gasco['11kg']}
                                onChange={(e) => {
                                    const quantity = (e.target as HTMLInputElement).value;
                                    if (parseInt(quantity) >= 0) {
                                        setSaleDetails({
                                            ...saleDetails,
                                            gasco: {
                                                ...saleDetails.gasco,
                                                '11kg': parseInt(quantity)
                                            }
                                        });
                                    }
                                }}
                            />
                            <button
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mx-2 rounded"
                                onClick={() => addProductToDetails('gasco', '11kg', 1)}>
                                +</button>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-lg font-bold p-1">15kg
                            <br />
                            <small>${salePrices['gasco']['15kg'].toLocaleString('es-cl')}</small>
                        </td>
                        <td className="p-1">
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mx-2 rounded"
                                onClick={() => subtractProductFromDetails('gasco', '15kg', 1)}>
                                -</button>
                            <input type="text"
                                className="border border-gray-300 rounded py-2 px-2 m-4 w-12 font-bold text-2xl"
                                value={saleDetails.gasco['15kg']}
                                onChange={(e) => {
                                    const quantity = (e.target as HTMLInputElement).value;
                                    if (parseInt(quantity) >= 0) {
                                        setSaleDetails({
                                            ...saleDetails,
                                            gasco: {
                                                ...saleDetails.gasco,
                                                '15kg': parseInt(quantity)
                                            }
                                        });
                                    }
                                }}
                            />
                            <button
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mx-2 rounded"
                                onClick={() => addProductToDetails('gasco', '15kg', 1)}>
                                +</button>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-lg font-bold p-1">45kg
                            <br />
                            <small>${salePrices['gasco']['45kg'].toLocaleString('es-cl')}</small>
                        </td>
                        <td className="p-1">
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mx-2 rounded"
                                onClick={() => subtractProductFromDetails('gasco', '45kg', 1)}>
                                -</button>
                            <input type="text"
                                className="border border-gray-300 rounded py-2 px-2 m-4 w-12 font-bold text-2xl"
                                value={saleDetails.gasco['45kg']}
                                onChange={(e) => {
                                    const quantity = (e.target as HTMLInputElement).value;
                                    if (parseInt(quantity) >= 0) {
                                        setSaleDetails({
                                            ...saleDetails,
                                            gasco: {
                                                ...saleDetails.gasco,
                                                '45kg': parseInt(quantity)
                                            }
                                        });
                                    }
                                }}
                            />
                            <button
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mx-2 rounded"
                                onClick={() => addProductToDetails('gasco', '45kg', 1)}>
                                +</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div className="mt-2">
            <p className="bg-yellow-500 text-white font-bold flex items-center justify-center rounded-full p-2 text-xl">Lipigas</p>
            <table className="ml-8">
                <tbody>
                    <tr>
                        <td className="text-lg font-bold p-1">5kg
                            <br />
                            <small>${salePrices['lipigas']['5kg'].toLocaleString('es-cl')}</small>
                        </td>
                        <td className="p-1">
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mx-2 rounded"
                                onClick={() => subtractProductFromDetails('lipigas', '5kg', 1)}>
                                -</button>
                            <input type="text"
                                className="border border-gray-300 rounded py-2 px-2 m-4 w-12 font-bold text-2xl"
                                value={saleDetails.lipigas['5kg']}
                                onChange={(e) => {
                                    const quantity = (e.target as HTMLInputElement).value;
                                    setSaleDetails({
                                        ...saleDetails,
                                        lipigas: {
                                            ...saleDetails.lipigas,
                                            '5kg': parseInt(quantity)
                                        }
                                    });
                                }}
                            />
                            <button
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mx-2 rounded"
                                onClick={() => addProductToDetails('lipigas', '5kg', 1)}>
                                +</button>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-lg font-bold p-1">11kg
                            <br />
                            <small>${salePrices['lipigas']['11kg'].toLocaleString('es-cl')}</small>
                        </td>
                        <td className="p-1">
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mx-2 rounded"
                                onClick={() => subtractProductFromDetails('lipigas', '11kg', 1)}>
                                -</button>
                            <input type="text"
                                className="border border-gray-300 rounded py-2 px-2 m-4 w-12 font-bold text-2xl"
                                value={saleDetails.lipigas['11kg']}
                                onChange={(e) => {
                                    const quantity = (e.target as HTMLInputElement).value;
                                    if (parseInt(quantity) >= 0) {
                                        setSaleDetails({
                                            ...saleDetails,
                                            lipigas: {
                                                ...saleDetails.lipigas,
                                                '11kg': parseInt(quantity)
                                            }
                                        });
                                    }
                                }}
                            />
                            <button
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mx-2 rounded"
                                onClick={() => addProductToDetails('lipigas', '11kg', 1)}>
                                +</button>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-lg font-bold p-1">15kg
                            <br />
                            <small>${salePrices['lipigas']['15kg'].toLocaleString('es-cl')}</small>
                        </td>
                        <td className="p-1">
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mx-2 rounded"
                                onClick={() => subtractProductFromDetails('lipigas', '15kg', 1)}>
                                -</button>
                            <input type="text"
                                className="border border-gray-300 rounded py-2 px-2 m-4 w-12 font-bold text-2xl"
                                value={saleDetails.lipigas['15kg']}
                                onChange={(e) => {
                                    const quantity = (e.target as HTMLInputElement).value;
                                    if (parseInt(quantity) >= 0) {
                                        setSaleDetails({
                                            ...saleDetails,
                                            lipigas: {
                                                ...saleDetails.lipigas,
                                                '15kg': parseInt(quantity)
                                            }
                                        });
                                    }
                                }}
                            />
                            <button
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mx-2 rounded"
                                onClick={() => addProductToDetails('lipigas', '15kg', 1)}>
                                +</button>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-lg font-bold p-1">45kg
                            <br />
                            <small>${salePrices['lipigas']['45kg'].toLocaleString('es-cl')}</small>
                        </td>
                        <td className="p-1">
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mx-2 rounded"
                                onClick={() => subtractProductFromDetails('lipigas', '45kg', 1)}>
                                -</button>
                            <input type="text"
                                className="border border-gray-300 rounded py-2 px-2 m-4 w-12 font-bold text-2xl"
                                value={saleDetails.lipigas['45kg']}
                                onChange={(e) => {
                                    const quantity = (e.target as HTMLInputElement).value;
                                    if (parseInt(quantity) >= 0) {
                                        setSaleDetails({
                                            ...saleDetails,
                                            lipigas: {
                                                ...saleDetails.lipigas,
                                                '45kg': parseInt(quantity)
                                            }
                                        });
                                    }
                                }}
                            />
                            <button
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mx-2 rounded"
                                onClick={() => addProductToDetails('lipigas', '45kg', 1)}>
                                +</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div className="mt-2">
            <button
                className="bg-fuchsia-500 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded w-full h-12"
                onClick={() => handleNextButton()}>Continuar
            </button>
        </div>
    </>)
}