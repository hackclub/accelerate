import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { BACKEND_DOMAIN_NAME, BEARER_TOKEN_BACKEND } from '$env/static/private';

export const GET: RequestHandler = async ({ url }) => {
    const skip = url.searchParams.get('skip') || '0';
    const limit = url.searchParams.get('limit') || '100';
    const user_id = url.searchParams.get('user_id');

    try {
        let apiUrl = `https://${BACKEND_DOMAIN_NAME}/projects?skip=${skip}&limit=${limit}`;
        if (user_id) {
            apiUrl += `&user_id=${user_id}`;
        }

        const response = await fetch(apiUrl, {
            headers: {
                'Authorization': `${BEARER_TOKEN_BACKEND}`
            }
        });

        if (!response.ok) {
            return json({ error: 'Failed to fetch projects' }, { status: response.status });
        }

        const projects = await response.json();
        return json(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        return json({ error: 'Internal server error' }, { status: 500 });
    }
};
