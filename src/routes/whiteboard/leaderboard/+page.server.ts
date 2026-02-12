import type { PageServerLoad } from './$types';
import scoresData from '../../../../accelerate_scores.json';

interface LeaderRecord {
    github_username: string;
    challenge_ranks: (number | null)[];
    overall_rank: number;
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
    srat: string;
    rrset: string;
}

export const load: PageServerLoad = async () => {
    const competitors = scoresData.competitors as unknown as Record<string, Competitor>;
    const results = scoresData.results as unknown as Record<string, Result>;
    const races = scoresData.races as unknown as Record<string, unknown>;

    const raceHandles = Object.keys(races).sort((a, b) => parseInt(a) - parseInt(b));

    // Build map: compHandle -> { raceHandle -> position }
    const compRacePos: Record<string, Record<string, number>> = {};
    for (const result of Object.values(results)) {
        if (!compRacePos[result.comHandle]) compRacePos[result.comHandle] = {};
        compRacePos[result.comHandle][result.racHandle] = parseInt(result.rpos);
    }

    const leaderboard: LeaderRecord[] = Object.entries(competitors)
        .map(([handle, comp]) => ({
            github_username: comp.comphelmname,
            overall_rank: parseInt(comp.comprank),
            challenge_ranks: raceHandles.map(rh => compRacePos[handle]?.[rh] ?? null)
        }))
        .sort((a, b) => a.overall_rank - b.overall_rank);

    return { leaderboard };
};
