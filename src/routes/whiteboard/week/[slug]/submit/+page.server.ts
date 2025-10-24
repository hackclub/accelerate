import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { ENCRYPTION_KEY, BACKEND_DOMAIN_NAME, BEARER_TOKEN_BACKEND } from '$env/static/private';
import { createDecipheriv } from 'crypto';

function unhashUserID(hashedUserID: string): string {
    const parts = hashedUserID.split(':');
    const iv = Buffer.from(parts[0], 'hex');
    const encrypted = parts[1];
    const decipher = createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

export const load: PageServerLoad = async ({ cookies }) => {
    const hashedUserID = cookies.get('userID');

    if (!hashedUserID) {
        throw redirect(303, '/');
    }

    const userID = unhashUserID(hashedUserID);

    try {
        // Get user data to fetch slack_id
        const userResponse = await fetch(`https://${BACKEND_DOMAIN_NAME}/users/${userID}`, {
            headers: {
                'Authorization': `${BEARER_TOKEN_BACKEND}`
            }
        });

        if (!userResponse.ok) {
            return { userID, projects: [] };
        }

        const user = await userResponse.json();
        
        if (!user.slack_id) {
            return { userID, projects: [] };
        }

        // Fetch Hackatime projects
        const hackatimeResponse = await fetch(`https://hackatime.hackclub.com/api/v1/users/${user.slack_id}/stats?features=projects&start_date=2025-10-18`);

        if (!hackatimeResponse.ok) {
            return { userID, projects: [] };
        }

        const hackatimeData = await hackatimeResponse.json();
        
        return {
            userID,
            projects: hackatimeData.data?.projects || []
        };
    } catch (error) {
        console.error('Error fetching projects:', error);
        return { userID, projects: [] };
    }
};
