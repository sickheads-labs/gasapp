import { headers } from "next/headers";
import { authorization } from "../utils";

export async function GET() {
    const requestHeaders = await headers();
    await authorization(requestHeaders);
    return Response.json({
        totalSales: 5000,
        totalOrders: 150,
        totalPages: 5,
        currentPage: 1,
        displayPerPage: 30,
        sales: []
    });
}

export async function POST() {
    const requestHeaders = await headers();
    await authorization(requestHeaders);
    return Response.json({
        message: 'sale recorded'
    });
}
