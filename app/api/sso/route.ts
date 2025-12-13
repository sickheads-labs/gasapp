export async function GET() {
    return Response.json({
        token: 'valid-token',
        expires: new Date(Date.now() + 3600 * 1000).toISOString(),
    });
}
