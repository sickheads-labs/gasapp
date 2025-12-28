import { headers } from "next/headers";
import { authorization } from "../../utils";

export async function GET() {
    const requestHeaders = await headers();
    await authorization(requestHeaders);
    return Response.json({
        id: 'abc123',
        amount: 1000,
    });
}
