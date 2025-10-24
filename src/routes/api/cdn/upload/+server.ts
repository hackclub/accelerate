import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        
        if (!file) {
            return new Response('No file provided', { status: 400 });
        }
        
        // Convert file to buffer and upload to CDN
        const buffer = await file.arrayBuffer();
        const base64 = Buffer.from(buffer).toString('base64');
        
        // Upload to Hack Club CDN
        const cdnResponse = await fetch('https://cdn.hackclub.com/api/v3/new', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer beans',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify([buffer])
        });
        
        if (!cdnResponse.ok) {
            const error = await cdnResponse.text();
            console.error('CDN upload failed:', error);
            return new Response('Failed to upload to CDN', { status: 500 });
        }
        
        const cdnData = await cdnResponse.json();
        return json({ url: cdnData.url });
    } catch (error) {
        console.error('Error uploading file:', error);
        return new Response('Internal server error', { status: 500 });
    }
};
