import type { PageServerLoad } from './$types';
import { BACKEND_DOMAIN_NAME, BEARER_TOKEN_BACKEND, ENCRYPTION_KEY } from '$env/static/private';
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
        return { projects: null };
    }

    try {
        const userID = unhashUserID(hashedUserID);

        // Get user data to fetch slack_id
        const userResponse = await fetch(`https://${BACKEND_DOMAIN_NAME}/users/${userID}`, {
            headers: {
                'Authorization': `${BEARER_TOKEN_BACKEND}`
            }
        });

        if (!userResponse.ok) {
            return { projects: null };
        }

        const user = await userResponse.json();
        
        if (!user.slack_id) {
            return { projects: null };
        }

        // Fetch Hackatime projects
        const hackatimeResponse = await fetch(`https://hackatime.hackclub.com/api/v1/users/${user.slack_id}/stats?features=projects&start_date=2025-10-18`);

        if (!hackatimeResponse.ok) {
            return { projects: null };
        }

        const hackatimeData = await hackatimeResponse.json();
        
        return {
            projects: hackatimeData.data?.projects || []
        };
    } catch (error) {
        console.error('Error fetching projects:', error);
        return { projects: null };
    }
};
