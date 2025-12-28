'use client';
import { useContext, useEffect, useState } from "react";
import { FormContext, StagesContext } from "../contexts";
import Details from "../details";
import SlideUpPanel from "../bottom";
import { saveSale } from "@/app/lib/actions";

export default function AddPayments() {
    const { setCurrentStage } = useContext<any>(StagesContext);
    const { formData, setFormData } = useContext<any>(FormContext);
    const [isSlideUpOpen, setIsSlideUpOpen] = useState(true);
    const [activeButton, setActiveButton] = useState('efectivo');
    const [paymentsMap, setPaymentsMap] = useState<any>({
        efectivo: { code: 'efe', amount: '' },
        debito: { code: 'deb', amount: '', authorizationCode: '' },
        credito: { code: 'cre', amount: '', authorizationCode: '', installments: '' },
        vale: {
            abastible: {
                code: 'val',
                amount: '',
                folio: ''
            },
            gasco: {
                code: 'val',
                amount: '',
                folio: ''
            },
            lipigas: {
                code: 'val',
                amount: '',
                folio: ''
            },
        }
    });
    const [errorMessage, setErrorMessage] = useState('');
    const handleAddPayment = () => {
        const payments = [];
        const cashAmount = parseInt((paymentsMap.efectivo.amount || '0').toString().replace(/\$|\./g, ''));
        if (cashAmount > 0) {
            payments.push({
                method: 'Efectivo',
                code: 'efe',
                amount: cashAmount
            });
        }
        const debitAmount = parseInt((paymentsMap.debito.amount || '0').toString().replace(/\$|\./g, ''));
        if (debitAmount > 0) {
            payments.push({
                method: 'Tarjeta débito',
                code: 'deb',
                amount: debitAmount,
                authorizationCode: paymentsMap.debito.authorizationCode
            });
        }
        const creditAmount = parseInt((paymentsMap.credito.amount || '0').toString().replace(/\$|\./g, ''));
        if (creditAmount > 0) {
            payments.push({
                method: 'Tarjeta crédito',
                code: 'cre',
                amount: creditAmount,
                authorizationCode: paymentsMap.credito.authorizationCode
            });
        }
        const brands = Object.keys(paymentsMap.vale);
        brands.forEach((brand) => {
            const brandAmount = parseInt((paymentsMap.vale[brand].amount || '0').toString().replace(/\$|\./g, ''));
            if (brandAmount > 0) {
                payments.push({
                    method: 'Vale ' + brand.charAt(0).toUpperCase() + brand.slice(1),
                    code: 'val',
                    brand,
                    amount: brandAmount,
                    folio: paymentsMap.vale[brand].folio
                });
            }
        });
        setPaymentsMap({
            ...paymentsMap,
            efectivo: {
                ...paymentsMap.efectivo,
                amount: 0
            },
            credito: {
                ...paymentsMap.credito,
                amount: 0,
                authorizationCode: 0
            },
            debito: {
                ...paymentsMap.debito,
                amount: 0,
                authorizationCode: 0
            },
            vale: {
                abastible: {
                    ...paymentsMap.vale.abastible,
                    amount: 0,
                    folio: 0
                },
                gasco: {
                    ...paymentsMap.vale.gasco,
                    amount: 0,
                    folio: 0
                },
                lipigas: {
                    ...paymentsMap.vale.lipigas,
                    amount: 0,
                    folio: 0
                },
            }
        });
        setFormData({
            ...formData,
            payments: [...formData.payments, ...payments]
        });
        setIsSlideUpOpen(false);
    }
    const handleFinishSale = async () => {
        console.log("Finalizando venta con datos:", formData);
        try {
            const sale = await saveSale(formData);
            console.log('Sale saved successfully', { sale });
            location.href = `/sales?t=${sale.sale_id}`;
        } catch (error) {
            setErrorMessage('Error al guardar la venta. Por favor, inténtalo de nuevo.');
            console.error('Error saving sale:', error);
        }
    }
    return (<>
        {errorMessage && <div className="bg-red-200 rounded p-3 border m-1 border-red-400">
            <p className="text-red-500 font-bold">Error</p>
            <p className="text-red-500">{errorMessage}</p>
        </div>}
        <p className="text-2xl mt-4">Agregar metodo de pago</p>
        <Details />
        <div className="mt-4">
            <button
                className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded w-full"
                onClick={() => setIsSlideUpOpen(true)}>Agregar método de pago
            </button>
        </div>
        <div className="mt-4">
            <button
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded w-full"
                onClick={() => handleFinishSale()}>Finalizar venta
            </button>
        </div>
        <div className="mt-4">
            <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-full"
                onClick={() => setCurrentStage('apply-discounts')}>
                Volver
            </button>
        </div>
        <div className="mt-2">
            <SlideUpPanel isOpen={isSlideUpOpen}>
                <div className="flex">
                    <p className="text-lg flex-1 mb-2">Selecciona método de pago.</p>
                    <p className="text-right mb-2 flex-1 font-bold">Total: ${formData.total.toLocaleString('es-CL')}</p>
                </div>
                <div className="row flex w-full">
                    <button
                        className={`rounded-md w-full rounded-r-none ${activeButton === 'efectivo' ? 'bg-indigo-500 font-bold' : 'bg-indigo-800'} py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-indigo-700 focus:shadow-none active:bg-indigo-700 hover:bg-indigo-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
                        type="button"
                        onClick={() => setActiveButton('efectivo')}
                    >
                        Efectivo
                    </button>
                    <button
                        className={`rounded-none w-full ${activeButton === 'debito' ? 'bg-indigo-500 font-bold' : 'bg-indigo-800'} py-2 px-4 border-l border-r border-indigo-700 text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-indigo-700 focus:shadow-none active:bg-indigo-700 hover:bg-indigo-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
                        type="button"
                        onClick={() => setActiveButton('debito')}
                    >
                        Débito
                    </button>
                    <button
                        className={`rounded-none w-full ${activeButton === 'credito' ? 'bg-indigo-500 font-bold' : 'bg-indigo-800'} py-2 px-4 border-l border-r border-indigo-700 text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-indigo-700 focus:shadow-none active:bg-indigo-700 hover:bg-indigo-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
                        type="button"
                        onClick={() => setActiveButton('credito')}
                    >
                        Crédito
                    </button>
                    <button
                        className={`rounded-md w-full rounded-l-none ${activeButton === 'vale' ? 'bg-indigo-500 font-bold' : 'bg-indigo-800'} py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-indigo-700 focus:shadow-none active:bg-indigo-700 hover:bg-indigo-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
                        type="button"
                        onClick={() => setActiveButton('vale')}
                    >
                        Vale
                    </button>
                </div>
                <div className="mt-4 h-80 overflow-y-auto">
                    {activeButton === 'efectivo' && <Efectivo paymentsMap={paymentsMap} setPaymentsMap={setPaymentsMap} />}
                    {activeButton === 'debito' && <Debito paymentsMap={paymentsMap} setPaymentsMap={setPaymentsMap} />}
                    {activeButton === 'credito' && <Credito paymentsMap={paymentsMap} setPaymentsMap={setPaymentsMap} />}
                    {activeButton === 'vale' && <Vale paymentsMap={paymentsMap} setPaymentsMap={setPaymentsMap} />}
                </div>
                <div className="mt-4">
                    <button
                        className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded w-full"
                        onClick={(e) => handleAddPayment()}>Agregar Pago
                    </button>
                    <button
                        className="mt-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-full"
                        onClick={() => setIsSlideUpOpen(false)}>Cerrar
                    </button>
                </div>
            </SlideUpPanel>
        </div>
    </>)
}


function Efectivo({
    paymentsMap,
    setPaymentsMap
}: any) {
    return (<>
        <p
            className="bg-green-500 text-white font-bold py-2 px-4 rounded w-full text-center"
        >Efectivo
        </p>
        <input
            type="tel"
            placeholder="Monto entregado"
            className="border border-gray-300 rounded w-full py-2 px-4 mt-2"
            value={paymentsMap.efectivo.amount || ''}
            onChange={(e) => {
                const value = (e.target as HTMLInputElement).value;
                const formattedValue = moneyFormat(value);
                setPaymentsMap({
                    ...paymentsMap,
                    efectivo: {
                        ...paymentsMap.efectivo,
                        amount: value === '$' ? '' : formattedValue,
                    }
                })
            }}
        />
    </>);
}

function moneyFormat(value: string) {
    return `$${parseInt(value.replace(/\$|\./g, '') || '0').toLocaleString('es-CL')}`;
}

function Debito({
    paymentsMap,
    setPaymentsMap
}: any) {
    return (<>
        <p
            className="bg-gray-500 text-white font-bold py-2 px-4 rounded w-full text-center"
        >Tarjeta débito
        </p>
        <input
            type="tel"
            placeholder="Monto voucher entregado"
            className="border border-gray-300 rounded w-full py-2 px-4 mt-2"
            value={paymentsMap.debito.amount || ''}
            onChange={(e) => {
                const value = (e.target as HTMLInputElement).value;
                const formattedValue = moneyFormat(value);
                setPaymentsMap({
                    ...paymentsMap,
                    debito: {
                        ...paymentsMap.debito,
                        amount: value === '$' ? '' : formattedValue,
                    }

                })
            }} />
        <input
            type="tel"
            placeholder="Código de autorización"
            className="border border-gray-300 rounded w-full py-2 px-4 mt-2"
            value={paymentsMap.debito.authorizationCode || ''}
            onChange={(e) => {
                const value = (e.target as HTMLInputElement).value;
                setPaymentsMap({
                    ...paymentsMap,
                    debito: {
                        ...paymentsMap.debito,
                        authorizationCode: value,
                    }

                })
            }} />
    </>);
}

function Credito({
    paymentsMap,
    setPaymentsMap
}: any) {
    return (<>
        <p
            className="bg-gray-600 text-white font-bold py-2 px-4 rounded w-full text-center"
        >Tarjeta crédito
        </p>
        <input
            type="tel"
            placeholder="Monto voucher entregado"
            className="border border-gray-300 rounded w-full py-2 px-4 mt-2"
            value={paymentsMap.credito.amount || ''}
            onChange={(e) => {
                const value = (e.target as HTMLInputElement).value;
                const formattedValue = moneyFormat(value);
                setPaymentsMap({
                    ...paymentsMap,
                    credito: {
                        ...paymentsMap.credito,
                        amount: value === '$' ? '' : formattedValue,
                    }

                })
            }} />
        <input
            type="tel"
            placeholder="Código de autorización"
            className="border border-gray-300 rounded w-full py-2 px-4 mt-2"
            value={paymentsMap.credito.authorizationCode || ''}
            onChange={(e) => {
                const value = (e.target as HTMLInputElement).value;
                setPaymentsMap({
                    ...paymentsMap,
                    credito: {
                        ...paymentsMap.credito,
                        authorizationCode: value,
                    }

                })
            }} />
    </>);
}

function Vale({
    paymentsMap,
    setPaymentsMap
}: any) {
    return (<>
        <div>
            <p
                className="bg-orange-500 text-white font-bold py-2 px-4 rounded w-full text-center"
            >Vales Abastible
            </p>
            <input
                type="tel"
                placeholder="Monto entregado en vale"
                className="border border-gray-300 rounded w-full py-2 px-4 mt-2"
                value={paymentsMap.vale.abastible.amount || ''}
                onChange={(e) => {
                    const value = (e.target as HTMLInputElement).value;
                    const formattedValue = moneyFormat(value);
                    setPaymentsMap({
                        ...paymentsMap,
                        vale: {
                            ...paymentsMap.vale,
                            abastible: {
                                ...paymentsMap.vale.abastible,
                                amount: value === '$' ? '' : formattedValue,
                            }
                        }
                    })
                }} />
            <input
                type="tel"
                placeholder="Folio del vale"
                className="border border-gray-300 rounded w-full py-2 px-4 mt-2"
                value={paymentsMap.vale.abastible.folio || ''}
                onChange={(e) => {
                    const value = (e.target as HTMLInputElement).value;
                    setPaymentsMap({
                        ...paymentsMap,
                        vale: {
                            ...paymentsMap.vale,
                            abastible: {
                                ...paymentsMap.vale.abastible,
                                folio: value,
                            }
                        }
                    })
                }} />

        </div>
        <div className="mt-4">
            <p
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded w-full text-center"
            >Vales Gasco
            </p>
            <input
                type="tel"
                placeholder="Monto entregado en vale"
                className="border border-gray-300 rounded w-full py-2 px-4 mt-2"
                value={paymentsMap.vale.gasco.amount || ''}
                onChange={(e) => {
                    const value = (e.target as HTMLInputElement).value;
                    const formattedValue = moneyFormat(value);
                    setPaymentsMap({
                        ...paymentsMap,
                        vale: {
                            ...paymentsMap.vale,
                            gasco: {
                                ...paymentsMap.vale.gasco,
                                amount: value === '$' ? '' : formattedValue,
                            }
                        }
                    })
                }} />
            <input
                type="tel"
                placeholder="Folio del vale"
                className="border border-gray-300 rounded w-full py-2 px-4 mt-2"
                value={paymentsMap.vale.gasco.folio || ''}
                onChange={(e) => {
                    const folio = (e.target as HTMLInputElement).value;
                    setPaymentsMap({
                        ...paymentsMap,
                        vale: {
                            ...paymentsMap.vale,
                            gasco: {
                                ...paymentsMap.vale.gasco,
                                folio,
                            }
                        }
                    })
                }} />
        </div>
        <div className="mt-4">
            <p
                className="bg-yellow-500 text-white font-bold py-2 px-4 rounded w-full text-center"
            >Vales Lipigas
            </p>
            <input
                type="tel"
                placeholder="Monto entregado en vale"
                className="border border-gray-300 rounded w-full py-2 px-4 mt-2"
                value={paymentsMap.vale.lipigas.amount || ''}
                onChange={(e) => {
                    const value = (e.target as HTMLInputElement).value;
                    const formattedValue = moneyFormat(value);
                    setPaymentsMap({
                        ...paymentsMap,
                        vale: {
                            ...paymentsMap.vale,
                            lipigas: {
                                ...paymentsMap.vale.lipigas,
                                amount: value === '$' ? '' : formattedValue,
                            }
                        }
                    })
                }} />
            <input
                type="tel"
                placeholder="Folio del vale"
                className="border border-gray-300 rounded w-full py-2 px-4 mt-2"
                value={paymentsMap.vale.lipigas.folio || ''}
                onChange={(e) => {
                    const folio = (e.target as HTMLInputElement).value;
                    setPaymentsMap({
                        ...paymentsMap,
                        vale: {
                            ...paymentsMap.vale,
                            lipigas: {
                                ...paymentsMap.vale.lipigas,
                                folio,
                            }
                        }
                    })
                }} />
        </div>
    </>);
}
