export async function checkClientToken(token: string): Promise<boolean> {
    // Simulate an asynchronous operation, e.g., database or external API call
    return new Promise((resolve) => {
        
        setTimeout(() => {
            const isValid = token === 'valid-token'; // Example validation logic
            resolve(isValid);
        }, 100); // Simulated delay
    });
}


export async function authorization(requestHeaders: any) {
    const authorizationHeader = requestHeaders.get('Authorization') || '';
    if (authorizationHeader === '') {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const token = authorizationHeader.replace('Bearer ', '');
    const isValid = await checkClientToken(token);
    if (!isValid) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }
}

