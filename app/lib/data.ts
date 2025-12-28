import prisma from "./prisma";

export async function getMyOpenSales(seller_id: string): Promise<any[]> {
    const sales = await prisma.sale.findMany({
        where: {
            seller_id,
            outcome_id: null
        },
        include: {
            details: true,
        },
        orderBy: {
            created_at: 'desc'
        }
    });
    return sales;
}

export async function getMyTotals(seller_id: string) {
  const payments = await prisma.salePaymentLine.groupBy({
    where: {
      sale: {
        seller_id: seller_id,
        outcome_id: null
      }
    },
    _sum: {
      amount: true
    },
    _count: {
      id: true,   
    },
    by: "method",
  });
  return payments.map(payment => ({
    method: payment.method,
    amount: payment._sum.amount,
    vouchers: payment._count.id
  }));
}

export async function getMyOutcomes(seller_id: string): Promise<any[]> {
    const outcomes = await prisma.outcome.findMany({
        where: {
            seller_id
        },
        include: {
            sales: true,
        },
        orderBy: {
            created_at: 'desc'
        }
    });
    return outcomes;
}

export async function getMySales(seller_id: string): Promise<any> {
  return Promise.all([
    getMyOpenSales(seller_id),
    getMyTotals(seller_id),
  ]).then(([openSales, totals]) => {
    return {
      openSales,
      totals
    };  
  });
};