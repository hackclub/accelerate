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

        const tokenResponse = await fetch('https://identity.hackclub.com/oauth/token', {
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

        const getCompositePrimaryKey = await fetch(`https://identity.hackclub.com/api/v1/me`, {
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

        const userResponse = await fetch(`https://${BACKEND_DOMAIN_NAME}/users/by-slack/${encodeURIComponent(userIDV.identity.slack_id)}`, {
            headers: {
                'Authorization': `${BEARER_TOKEN_BACKEND}`
            }
        });

        let user = await userResponse.json();

        if (!user || !user.user_id) {
            console.log('User not found for slack_id, creating new user');
            
            const createUserResponse = await fetch(`https://${BACKEND_DOMAIN_NAME}/users`, {
                method: 'POST',
                headers: {
                    'Authorization': `${BEARER_TOKEN_BACKEND}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    first_name: userIDV.identity.first_name || '',
                    last_name: userIDV.identity.last_name || '',
                    slack_id: userIDV.identity.slack_id || '',
                    email: userIDV.identity.primary_email,
                    is_admin: false,
                    address_line_1: userIDV.identity.addresses?.[0]?.line_1 || '',
                    address_line_2: userIDV.identity.addresses?.[0]?.line_2 || '',
                    city: userIDV.identity.addresses?.[0]?.city || '',
                    state: userIDV.identity.addresses?.[0]?.state || '',
                    country: userIDV.identity.addresses?.[0]?.country_code || '',
                    post_code: userIDV.identity.addresses?.[0]?.postal_code || '',
                    birthday: new Date().toISOString()
                })
            });

            if (!createUserResponse.ok) {
                console.error('Failed to create user');
                throw redirect(302, '/?error=' + encodeURIComponent('Error creating user, you may need to update your IDV settings in Hack Club Account'));
            }

            user = await createUserResponse.json();
        }

        if (user && user.user_id && user.first_login) {
            try {
                const patchResponse = await fetch(`https://${BACKEND_DOMAIN_NAME}/users/${user.user_id}`, {
                    method: 'PATCH',
                    headers: {
                        'Authorization': `${BEARER_TOKEN_BACKEND}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        first_name: userIDV.identity.first_name || '',
                        last_name: userIDV.identity.last_name || '',
                        slack_id: userIDV.identity.slack_id || '',
                        email: userIDV.identity.primary_email,
                        is_admin: user.is_admin ?? false,
                        address_line_1: userIDV.identity.addresses?.[0]?.line_1 || '',
                        address_line_2: userIDV.identity.addresses?.[0]?.line_2 || '',
                        city: userIDV.identity.addresses?.[0]?.city || '',
                        state: userIDV.identity.addresses?.[0]?.state || '',
                        country: userIDV.identity.addresses?.[0]?.country_code || '',
                        post_code: userIDV.identity.addresses?.[0]?.postal_code || '',
                        birthday: user.birthday || new Date().toISOString()
                    })
                });

                if (!patchResponse.ok) {
                    console.error('Failed to patch first_login user data');
                } else {
                    const updatedUser = await patchResponse.json();
                    user = updatedUser;
                }
            } catch (e) {
                console.error('Error patching first_login user', e);
            }
        }

        const hashedUserID = hashUserID(user.user_id);
        cookies.set('userID', hashedUserID, { path: '/', httpOnly: true, secure: true, sameSite: 'lax' });
        cookies.set('accessToken', accessToken, { path: '/', httpOnly: true, secure: true, sameSite: 'lax' });
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
