import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
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

export const load: LayoutServerLoad = async ({ cookies }) => {
    const hashedUserID = cookies.get('userID');

    if (!hashedUserID) {
        throw redirect(303, '/');
    }

    const userID = unhashUserID(hashedUserID);

    if (!userID) {
        throw redirect(303, '/');
    }

    // Make request to API to verify user access
    const response = await fetch(`https://${BACKEND_DOMAIN_NAME}/users/${userID}/exists`, {
        headers: {
            'Authorization': `${BEARER_TOKEN_BACKEND}`
        }
    });

    const data = await response.json();

    if (!data || !data.exists) {
        throw redirect(303, '/');
    }

    // Send logged in notification
    const loginResponse = await fetch(`https://${BACKEND_DOMAIN_NAME}/users/${userID}/loggedin`, {
        method: 'POST',
        headers: {
            'Authorization': `${BEARER_TOKEN_BACKEND}`
        }
    });
    console.log(`Logged in notification sent for user ${userID}`, loginResponse);

    // Fetch user data
    const userDataResponse = await fetch(`https://${BACKEND_DOMAIN_NAME}/users/${userID}`, {
        headers: {
            'Authorization': `${BEARER_TOKEN_BACKEND}`
        }
    });

    let userName = '';
    if (userDataResponse.ok) {
        const userData = await userDataResponse.json();
        userName = `${userData.first_name} ${userData.last_name}`;
    }

    // Fetch user's projects
    const projectsResponse = await fetch(`https://${BACKEND_DOMAIN_NAME}/users/${userID}/projects`, {
        headers: {
            'Authorization': `${BEARER_TOKEN_BACKEND}`
        }
    });

    let weekStatus = {
        week1_2: false,
        week3_4: false,
        week5_6: false,
        week7_8: false,
        week9_10: false
    };

    if (projectsResponse.ok) {
        const projects = await projectsResponse.json();
        
        // Check which weeks have submitted projects
        weekStatus.week1_2 = projects.some((p: any) => p.submission_week === '1&2');
        weekStatus.week3_4 = projects.some((p: any) => p.submission_week === '3&4');
        weekStatus.week5_6 = projects.some((p: any) => p.submission_week === '5&6');
        weekStatus.week7_8 = projects.some((p: any) => p.submission_week === '7&8');
        weekStatus.week9_10 = projects.some((p: any) => p.submission_week === '9&10');
    }

    return {
        userID,
        userName,
        weekStatus
    };
};
