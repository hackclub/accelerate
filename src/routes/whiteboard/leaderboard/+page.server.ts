import type { PageServerLoad } from './$types';
import { BACKEND_DOMAIN_NAME, BEARER_TOKEN_BACKEND } from '$env/static/private';

interface LeaderRecord {
    github_username: string;
    challenge_ranks: (number | null)[];
    overall_rank: number;
}

export const load: PageServerLoad = async () => {
    if (!BACKEND_DOMAIN_NAME) {
        console.error('BACKEND_DOMAIN_NAME not configured');
        return { leaderboard: [] };
    }

    try {
        const rankingsRes = await fetch(`https://${BACKEND_DOMAIN_NAME}/rankings`, {
            headers: {
                'Authorization': `${BEARER_TOKEN_BACKEND}`
            }
        });

        if (!rankingsRes.ok) {
            console.error('Failed to fetch rankings:', rankingsRes.status);
            return { leaderboard: [] };
        }

        const leaderboard: LeaderRecord[] = await rankingsRes.json();
        return { leaderboard };
    } catch (e) {
        console.error('Error fetching rankings:', e);
        return { leaderboard: [] };
    }
};
