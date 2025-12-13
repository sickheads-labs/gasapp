export async function checkClientToken(token: string): Promise<boolean> {
    // Simulate an asynchronous operation, e.g., database or external API call
    return new Promise((resolve) => {
        
        setTimeout(() => {
            const isValid = token === 'valid-token'; // Example validation logic
            resolve(isValid);
        }, 100); // Simulated delay
    });
}

