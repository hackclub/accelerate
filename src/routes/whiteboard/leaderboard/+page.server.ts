import type { PageServerLoad } from './$types';
import { AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME } from '$env/static/private';

interface LeaderRecord {
    github_username: string;
    final_score: number;
    rank: number;
}

export const load: PageServerLoad = async () => {
    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID || !AIRTABLE_TABLE_NAME) {
        console.error('Airtable env vars missing: AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME');
        return { leaderboard: [] };
    }

    const params = new URLSearchParams();
    // Filter where GitHub Username and Final Score are not empty
    params.append('filterByFormula', "AND(NOT({GitHub Username}=''), NOT({final_score}=''))");
    params.append('fields[]', 'GitHub Username');
    params.append('fields[]', 'Score');
    params.append('fields[]', 'final_score');
    params.append('pageSize', '100');

    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}?${params.toString()}`;

    try {
        const res = await fetch(url, {
            headers: {
                Authorization: `Bearer ${AIRTABLE_API_KEY}`
            }
        });
        if (!res.ok) {
            console.error('Failed Airtable fetch', await res.text());
            return { leaderboard: [] };
        }
        const data = await res.json();
        const rawRecords = (data.records || []) as Array<{ fields: Record<string, any> }>; 

        const filtered = rawRecords.map(r => ({
            github_username: r.fields['GitHub Username'],
            // Keep both score and final_score mapped from "Final Score" for compatibility
            score: r.fields['Score'],
            final_score: r.fields['final_score']
        })).filter(r => r.github_username && r.final_score != null);

        // Sort by final_score DESC
        filtered.sort((a, b) => Number(b.final_score) - Number(a.final_score));

        // Apply SQL RANK semantics (ties share rank, gaps after ties)
        let lastScore: number | null = null;
        let lastRank = 0;
        let index = 0;
        const leaderboard: LeaderRecord[] = filtered.map(rec => {
            index += 1;
            const fs = Number(rec.final_score);
            if (lastScore === null || fs !== lastScore) {
                lastRank = index;
                lastScore = fs;
            }
            return {
                github_username: rec.github_username,
                final_score: fs,
                rank: lastRank
            };
        });

        // Log the rankings to the console
        console.log('Leaderboard Rankings:', leaderboard);

        return { leaderboard };
    } catch (e) {
        console.error('Error building leaderboard', e);
        return { leaderboard: [] };
    }
};
