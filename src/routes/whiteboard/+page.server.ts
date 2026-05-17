import type { PageServerLoad } from './$types';
import { requirePrivateEnv } from '$lib/server/env';

export const load: PageServerLoad = async ({ parent }) => {
    const backendDomainName = requirePrivateEnv('BACKEND_DOMAIN_NAME');
    const bearerTokenBackend = requirePrivateEnv('BEARER_TOKEN_BACKEND');
    const { userID } = await parent();

    try {
        // Fetch user's projects
        const projectsResponse = await fetch(`https://${backendDomainName}/users/${userID}/projects`, {
            headers: {
                'Authorization': bearerTokenBackend
            }
        });

        if (!projectsResponse.ok) {
            return { projects: [] };
        }

        const projects = await projectsResponse.json();
        
        return {
            projects: projects || []
        };
    } catch (error) {
        console.error('Error fetching projects:', error);
        return { projects: [] };
    }
};
