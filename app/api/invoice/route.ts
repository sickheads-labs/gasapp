import { checkClientToken } from "../utils";

export async function POST() {
    await checkClientToken('valid-token');
    return Response.json({
        message: 'invoice created'
    });
}


export async function GET() {
    await checkClientToken('valid-token');
    return Response.json({
        message: 'invoices list',
        invoices: [],
    });
}
