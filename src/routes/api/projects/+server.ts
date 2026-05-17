import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { requirePrivateEnv } from '$lib/server/env';

export const GET: RequestHandler = async ({ url }) => {
    const skip = url.searchParams.get('skip') || '0';
    const limit = url.searchParams.get('limit') || '100';
    const backendDomainName = requirePrivateEnv('BACKEND_DOMAIN_NAME');
    const bearerTokenBackend = requirePrivateEnv('BEARER_TOKEN_BACKEND');

    try {
        const apiUrl = `https://${backendDomainName}/projects?skip=${skip}&limit=${limit}`;

        const response = await fetch(apiUrl, {
            headers: {
                'Authorization': bearerTokenBackend
            }
        });

        if (!response.ok) {
            return json({ error: 'Failed to fetch projects' }, { status: response.status });
        }

        const projects = await response.json();
        const sanitizedProjects = projects.map((project: Record<string, unknown>) => ({
            project_name: project.project_name,
            project_description: project.project_description,
            attachment_urls: project.attachment_urls,
            code_url: project.code_url,
            live_url: project.live_url
        }));
        return json(sanitizedProjects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        return json({ error: 'Internal server error' }, { status: 500 });
    }
};

export const POST: RequestHandler = async ({ request }) => {
    const backendDomainName = requirePrivateEnv('BACKEND_DOMAIN_NAME');
    const bearerTokenBackend = requirePrivateEnv('BEARER_TOKEN_BACKEND');

    try {
        const projectData = await request.json();

        const response = await fetch(`https://${backendDomainName}/projects`, {
            method: 'POST',
            headers: {
                'Authorization': bearerTokenBackend,
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
