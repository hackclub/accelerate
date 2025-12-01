import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { BACKEND_DOMAIN_NAME, BEARER_TOKEN_BACKEND } from '$env/static/private';

export const GET: RequestHandler = async ({ url }) => {
    const skip = url.searchParams.get('skip') || '0';
    const limit = url.searchParams.get('limit') || '100';

    try {
        const apiUrl = `https://${BACKEND_DOMAIN_NAME}/projects?skip=${skip}&limit=${limit}`;

        const response = await fetch(apiUrl, {
            headers: {
                'Authorization': `${BEARER_TOKEN_BACKEND}`
            }
        });

        if (!response.ok) {
            return json({ error: 'Failed to fetch projects' }, { status: response.status });
        }

        const projects = await response.json();
        const sanitizedProjects = projects.map(({ user_id, ...rest }: { user_id: string; [key: string]: unknown }) => rest);
        return json(sanitizedProjects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        return json({ error: 'Internal server error' }, { status: 500 });
    }
};

export const POST: RequestHandler = async ({ request }) => {
    try {
        const projectData = await request.json();

        const response = await fetch(`https://${BACKEND_DOMAIN_NAME}/projects`, {
            method: 'POST',
            headers: {
                'Authorization': `${BEARER_TOKEN_BACKEND}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projectData)
        });

        if (!response.ok) {
            const errorText = await response.text();
            return json({ error: errorText || 'Failed to create project' }, { status: response.status });
        }

        const project = await response.json();
        return json(project);
    } catch (error) {
        console.error('Error creating project:', error);
        return json({ error: 'Internal server error' }, { status: 500 });
    }
};
