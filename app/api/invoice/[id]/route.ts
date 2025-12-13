import { headers } from "next/headers";
import { checkClientToken } from "../../utils";

export async function GET() {
    const requestHeaders = headers();
    const authorizationHeader = (await requestHeaders).get('Authorization') || '';
    if(authorizationHeader === '') {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const token = authorizationHeader.replace('Bearer ', '');
    const isValid = await checkClientToken(token);
    if(!isValid) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return Response.json({
        id: 'abc123',
        amount: 1000,
    });
}
