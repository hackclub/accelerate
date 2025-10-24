import { redirect, isRedirect, isHttpError } from '@sveltejs/kit';
import { HC_OAUTH_CLIENT_SECRET, BEARER_TOKEN_BACKEND, BACKEND_DOMAIN_NAME, ENCRYPTION_KEY } from '$env/static/private';
import { PUBLIC_HC_OAUTH_CLIENT_ID, PUBLIC_HC_OAUTH_REDIRECT_URL } from '$env/static/public';
import type { PageServerLoad } from './$types';
import { createCipheriv, randomBytes } from 'crypto';

function hashUserID(userID: string): string {
    const iv = randomBytes(16);
    const cipher = createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
    let encrypted = cipher.update(userID, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted;
}

export const load: PageServerLoad = async ({ url, cookies }) => {
    const code = url.searchParams.get('code');
    const error = url.searchParams.get('error');
    const errorDescription = url.searchParams.get('error_description');

    if (error) {
        console.error('OAuth error:', error, errorDescription);
        throw redirect(302, '/');
    }

    if (!code) {
        console.error('No authorization code received');
        throw redirect(302, '/');
    }

    try {
        const params = new URLSearchParams({
            client_id: PUBLIC_HC_OAUTH_CLIENT_ID,
            client_secret: HC_OAUTH_CLIENT_SECRET,
            redirect_uri: PUBLIC_HC_OAUTH_REDIRECT_URL,
            code: code,
            grant_type: 'authorization_code'
        });

        const tokenResponse = await fetch('https://hca.dinosaurbbq.org/oauth/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params.toString()
        });

        if (!tokenResponse.ok) {
            const errorData = await tokenResponse.text();
            console.error('Token exchange failed:', errorData);
            throw redirect(302, '/');
        }

    const data = await tokenResponse.json();
    const accessToken = data.access_token;

        const getCompositePrimaryKey = await fetch(`https://hca.dinosaurbbq.org/api/v1/me`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (!getCompositePrimaryKey.ok) {
            console.error('Failed to fetch user from IDV');
            throw redirect(302, '/');
        }

        const userIDV = await getCompositePrimaryKey.json();
        console.log('User fetched successfully from IDV:', userIDV);

        const userResponse = await fetch(`https://${BACKEND_DOMAIN_NAME}/users/by-email/${encodeURIComponent(userIDV.identity.primary_email)}`, {
            headers: {
                'Authorization': `${BEARER_TOKEN_BACKEND}`
            }
        });
        
        if (!userResponse.ok) {
            console.log('User response status:', userResponse.status);
            console.error('Failed to fetch user from backend');
            throw redirect(302, '/');
        }

        const user = await userResponse.json();

        if (!user || !user.user_id) {
            console.error('User not found for email:', userIDV.email);
            throw redirect(302, '/');
        }

        const hashedUserID = hashUserID(user.user_id);
        cookies.set('userID', hashedUserID, { path: '/', httpOnly: true, secure: true, sameSite: 'lax' });
        throw redirect(302, '/whiteboard');

    } catch (err) {
        // If this is an intentional redirect or an HTTP error from SvelteKit, rethrow it untouched
        if (isRedirect(err) || isHttpError(err)) {
            throw err;
        }
        console.error('Error exchanging code for token:', err);
        throw redirect(302, '/');
    }
};
