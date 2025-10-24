import type { RequestHandler } from './$types';
import { BACKEND_DOMAIN_NAME, BEARER_TOKEN_BACKEND } from '$env/static/private';
import { json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
    try {
        const body = await request.json();
        
        const response = await fetch(`https://${BACKEND_DOMAIN_NAME}/projects`, {
            method: 'POST',
            headers: {
                'Authorization': `${BEARER_TOKEN_BACKEND}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        
        if (!response.ok) {
            const error = await response.text();
            return new Response(error, { status: response.status });
        }
        
        const data = await response.json();
        return json(data);
    } catch (error) {
        console.error('Error creating project:', error);
        return new Response('Internal server error', { status: 500 });
    }
};
