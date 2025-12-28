export async function POST() {
    return Response.json({
        message: 'config saved'
    });
}

export async function GET() {
    return Response.json({
        featureEnabled: true,
        maxItems: 50,
    });
}

export async function PUT() {
    return Response.json({
        message: 'config updated'
    });
}