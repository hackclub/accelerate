import { redirect, isRedirect, isHttpError } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { PUBLIC_SLACK_CLIENT_ID, PUBLIC_SLACK_OAUTH_STATE, PUBLIC_SLACK_OAUTH_NONCE, PUBLIC_SLACK_REDIRECT_URI } from '$env/static/public';
import { SLACK_CLIENT_SECRET, BEARER_TOKEN_BACKEND, BACKEND_DOMAIN_NAME, ENCRYPTION_KEY, npm_config_cache } from '$env/static/private';
import { createCipheriv, randomBytes } from 'crypto';

function hashUserID(userID: string): string {
    const iv = randomBytes(16);
    const cipher = createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
    let encrypted = cipher.update(userID, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted;
}

export const load: PageServerLoad = async ({ url, cookies }) => {
    const code1 = url.searchParams.get('code');
    const error = url.searchParams.get('error');

    if (error) {
        console.error('Slack OAuth error:', error);
        throw redirect(302, '/');
    }

    if (!code1) {
        console.error('No authorization code received');
        throw redirect(302, '/');
    }

    try {
        const params = new URLSearchParams({
            code: code1,
            client_id: PUBLIC_SLACK_CLIENT_ID,
            client_secret: SLACK_CLIENT_SECRET,
            redirect_uri: PUBLIC_SLACK_REDIRECT_URI
        });

        const slackResponse = await fetch('https://slack.com/api/openid.connect.token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params.toString()
        });

        if (!slackResponse.ok) {
            const errorText = await slackResponse.text();
            console.error('Slack HTTP error:', slackResponse.status, errorText);
            throw redirect(302, '/');
        }

        const data = await slackResponse.json();
        console.log('Full Slack OpenID Connect response:', JSON.stringify(data, null, 2));
        console.log('id_token present?', !!data.id_token);
        console.log('Response keys:', Object.keys(data));

        if (!data.ok) {
            console.error('Slack API error:', data.error);
            throw redirect(302, '/');
        }

        // For OpenID Connect, decode the id_token instead of calling API
        const idToken = data.id_token;
        
        if (!idToken) {
            console.error('No id_token in OpenID Connect response');
            console.error('Full response for debugging:', data);
            throw redirect(302, '/');
        }

        // Decode JWT (id_token) - split by '.' and decode the payload (middle part)
        const tokenPayload = JSON.parse(Buffer.from(idToken.split('.')[1], 'base64').toString());
        console.log('OpenID token payload:', tokenPayload);

        const slackID = tokenPayload.sub?.replace('https://slack.com/user_id/', '');
        const email = tokenPayload.email;
        const firstName = tokenPayload.name;

        const userResponse = await fetch(`https://${BACKEND_DOMAIN_NAME}/users/by-email/${encodeURIComponent(email)}`, {
            headers: {
                'Authorization': `${BEARER_TOKEN_BACKEND}`
            }
        });

        let user1 = await userResponse.json();
        console.log('User fetched by email:', user1);
        if (!user1 || !user1.user_id) {
            console.log('User not found for email, creating new user');
            
            const requestBody = {
                first_name: firstName || null,
                last_name: ' ',
                slack_id: slackID,
                email: email,
                is_admin: false,
                address_line_1: null,
                address_line_2: null,
                city: null,
                state: null,
                country: null,
                post_code: null,
                birthday: null,
            };

            console.log('Creating user with request body:', requestBody);
            console.log('Request URL:', `https://${BACKEND_DOMAIN_NAME}/users`);
            
            const createUserResponse = await fetch(`https://${BACKEND_DOMAIN_NAME}/users`, {
                method: 'POST',
                headers: {
                    'Authorization': `${BEARER_TOKEN_BACKEND}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            console.log('Create user response status:', createUserResponse.status);

            if (!createUserResponse.ok) {
                const errorBody = await createUserResponse.text();
                console.error('Failed to create user. Response:', errorBody);
                throw redirect(302, '/?error=' + encodeURIComponent('Error creating user, you may need to update your IDV settings in Hack Club Account'));
            }

            const responseBody = await createUserResponse.text();
            console.log('Create user response body:', responseBody);
            user1 = JSON.parse(responseBody);
        }

        ////console.log('User logged in:', user1.user_id);
        const hashedUserID = hashUserID(user1.user_id);
        cookies.set('userID', hashedUserID, { path: '/', httpOnly: true, secure: true, sameSite: 'lax' });
        throw redirect(302, '/whiteboard');


    } catch (err) {
        if (isRedirect(err) || isHttpError(err)) {
            throw err;
        }
        console.error('Error processing Slack OAuth:', err);
        throw redirect(302, '/');
    }
};
