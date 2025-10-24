import { redirect } from '@sveltejs/kit';
import { HC_OAUTH_CLIENT_SECRET, BEARER_TOKEN_BACKEND } from '$env/static/private';
import { PUBLIC_HC_OAUTH_CLIENT_ID, PUBLIC_HC_OAUTH_REDIRECT_URL } from '$env/static/public';
import type { PageServerLoad } from './$types';

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

        console.log('Access token received:', accessToken);

        const getCompositePrimaryKey = await fetch(`https://hca.dinosaurbbq.org/api/v1/me`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        // Fetch user by idv token
        const userResponse = await fetch(`https://y08gko88kskgs08kcc80c040.a.selfhosted.hackclub.com/users/by-idv-token/${accessToken}`, {
            headers: {
                'api-key': BEARER_TOKEN_BACKEND
            }
        });

        if (getCompositePrimaryKey.ok) {
            const userIDV = await userResponse.json();
            console.log("ok")
            if (userIDV !== null) {
                console.log('User fetched successfully from IDV:', userIDV);
                cookies.set('userID', userIDV.user_id, { path: '/', httpOnly: true, secure: true, sameSite: 'lax' });
            
            } else {
                console.log('User not found for the given idv token', user);
                // Logic for user not found
            }
        } else {
            console.log('Failed to fetch user:', await userResponse.json());
        }

    } catch (err) {
        console.error('Error exchanging code for token:', err);
        throw redirect(302, '/');
    }
};
