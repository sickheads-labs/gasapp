'use server';

import prisma from "./prisma";
import { redirect } from 'next/navigation'
import { revalidatePath, refresh } from 'next/cache'


export async function saveSale(saleData: any): Promise<any> {

    const savedSale = await prisma.sale.create({
        data: {
            bill_type: 'default',
            bill_id: 'default',
            details: {
                create: saleData.details.map((detail: any) => ({
                    brand: detail.brand,
                    product: detail.product,
                    quantity: detail.quantity,
                    unit_price: detail.unitPrice,
                    total: detail.total,
                })),
            },
            payments: {
                create: saleData.payments.map((payment: any) => ({
                    method: payment.method,
                    code: payment.code,
                    amount: payment.amount,
                    authorization_code: payment.authorizationCode,
                    folio: payment.folio,
                    brand: payment.brand,
                })),
            },
            discounts: {
                create: saleData.discounts.map((discount: any) => ({
                    type: 'default',
                    code: discount.code,
                    description: discount.description,
                    amount: discount.amount,
                    quantity: discount.quantity,
                    total: discount.total,
                })),
            },
            total: saleData.total,
            total_original: saleData.total_original,
            total_discounts: saleData.total_discounts,
            address: saleData.address,
            seller_id: 'charlie'
        }
    });
    return Promise.resolve({ success: true, sale_id: savedSale.id });
}


export async function saveOutcome(incomeData: any): Promise<any> {
    try {
        const savedOutcome = await prisma.outcome.create({
            data: {
                voucher_quantity: incomeData.voucher_quantity,
                coupon_quantity: incomeData.coupon_quantity,
                description: incomeData.description,
                amount: incomeData.amount,
                seller_id: 'charlie',
                manager_id: 'charlie',
                sales: {
                    connect: incomeData.sales_ids.map((sale_id: string) => ({ id: sale_id }))
                }
            }
        });
        return Promise.resolve({ success: true, outcome_id: savedOutcome.id });

    } catch (error) {
        console.error("Error saving outcome:", error);
        return Promise.reject({ success: false, error: 'Failed to save outcome' });
    }
}
