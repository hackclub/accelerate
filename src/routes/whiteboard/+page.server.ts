import type { PageServerLoad } from './$types';
import { BACKEND_DOMAIN_NAME, BEARER_TOKEN_BACKEND } from '$env/static/private';

export const load: PageServerLoad = async ({ parent }) => {
    const { userID } = await parent();

    try {
        // Fetch user's projects
        const projectsResponse = await fetch(`https://${BACKEND_DOMAIN_NAME}/users/${userID}/projects`, {
            headers: {
                'Authorization': `${BEARER_TOKEN_BACKEND}`
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
