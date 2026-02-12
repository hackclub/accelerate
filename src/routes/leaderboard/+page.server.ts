import type { PageServerLoad } from './$types';
import scoresData from '../../../accelerate_scores.json';
import { BACKEND_DOMAIN_NAME, BEARER_TOKEN_BACKEND } from '$env/static/private';

// C1 = weeks 1&2, C2 = weeks 3&4, etc.
const CHALLENGE_WEEKS = ['1&2', '3&4', '5&6', '7&8', '9&10', '11&12'];

interface RaceResult {
    pos: number;
    discarded: boolean;
    dnc: boolean;
    code_url: string | null;
    live_url: string | null;
}

interface LeaderRecord {
    github_username: string;
    profile_url: string | null;
    challenge_results: (RaceResult | null)[];
    overall_rank: number;
    total: number;
    nett: number;
}

interface Competitor {
    comptotal: string;
    compnett: string;
    comprank: string;
    comptally: string;
    compexclude: string;
    compalias: string;
    compmedicalflag: string;
    comphelmname: string;
    comphigh: string;
}

interface Result {
    comHandle: string;
    racHandle: string;
    rpts: string;
    rpos: string;
    rdisc: string;
    rrecpos: string;
    rrestyp: string;
    rcod?: string;
    srat: string;
    rrset: string;
}

interface Project {
    code_url: string;
    live_url: string;
    submission_week: string;
}

export const load: PageServerLoad = async ({ cookies }) => {
    const loggedIn = !!cookies.get('userID');
    const competitors = scoresData.competitors as unknown as Record<string, Competitor>;
    const results = scoresData.results as unknown as Record<string, Result>;
    const races = scoresData.races as unknown as Record<string, unknown>;

    const raceHandles = Object.keys(races).sort((a, b) => parseInt(a) - parseInt(b));

    // Fetch all projects from backend
    // Map: lowercase username -> { profile_url, weeks: { submission_week -> { code_url, live_url } } }
    const projectsByUser: Record<string, { profile_url: string; weeks: Record<string, { code_url: string; live_url: string }> }> = {};
    try {
        const projectsRes = await fetch(`https://${BACKEND_DOMAIN_NAME}/projects`, {
            headers: { 'Authorization': BEARER_TOKEN_BACKEND }
        });
        if (projectsRes.ok) {
            const projects: Project[] = await projectsRes.json();
            for (const project of projects) {
                if (!project.code_url || !project.submission_week) continue;
                // Match github.com or gitlab.com profile: extract host + first path segment
                const match = project.code_url.match(/^(https?:\/\/(?:github|gitlab)\.com\/[^/?#]+)/i);
                if (!match) continue;
                const profileUrl = match[1];
                const username = profileUrl.split('/').pop()!.toLowerCase();
                if (!projectsByUser[username]) {
                    projectsByUser[username] = { profile_url: profileUrl, weeks: {} };
                }
                // Keep the first project found per user per week
                if (!projectsByUser[username].weeks[project.submission_week]) {
                    projectsByUser[username].weeks[project.submission_week] = {
                        code_url: project.code_url,
                        live_url: project.live_url
                    };
                }
            }
        }
    } catch (e) {
        console.error('Failed to fetch projects for leaderboard:', e);
    }

    // Build map: compHandle -> { raceHandle -> RaceResult }
    const compRaceResults: Record<string, Record<string, Omit<RaceResult, 'code_url' | 'live_url'>>> = {};
    for (const result of Object.values(results)) {
        if (!compRaceResults[result.comHandle]) compRaceResults[result.comHandle] = {};
        compRaceResults[result.comHandle][result.racHandle] = {
            pos: parseInt(result.rpos),
            discarded: result.rdisc === '1',
            dnc: result.rrestyp === '3' && result.rcod === 'DNC'
        };
    }

    const leaderboard: LeaderRecord[] = Object.entries(competitors)
        .map(([handle, comp]) => {
            const username = comp.comphelmname.toLowerCase();
            const userData = projectsByUser[username] ?? null;
            return {
                github_username: comp.comphelmname,
                profile_url: userData?.profile_url ?? null,
                overall_rank: parseInt(comp.comprank),
                total: parseInt(comp.comptotal),
                nett: parseInt(comp.compnett),
                challenge_results: raceHandles.map((rh, i) => {
                    const base = compRaceResults[handle]?.[rh];
                    if (!base) return null;
                    const week = CHALLENGE_WEEKS[i];
                    const project = userData?.weeks[week] ?? null;
                    return {
                        ...base,
                        code_url: project?.code_url ?? null,
                        live_url: project?.live_url ?? null
                    };
                })
            };
        })
        .sort((a, b) => a.overall_rank - b.overall_rank);

    return { leaderboard, loggedIn };
};
