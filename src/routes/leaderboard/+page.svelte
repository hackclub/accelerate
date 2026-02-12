<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData;

    const leaderboard = data.leaderboard ?? [];
    const loggedIn = data.loggedIn;
</script>

<style>
    :global(html, body) {
        overflow: auto !important;
        height: auto !important;
    }
</style>

<div class="absolute inset-0 z-0">
    <img src="/top-whiteboard.png" alt="" class="w-full h-auto block" />
    <img src="/middle-whiteboard.png" alt="" class="w-full h-auto block" />
    <img src="/middle-2-whiteboard.png" alt="" class="w-full h-auto block" />
    <img src="/bottom-whiteboard.png" alt="" class="w-full h-auto block" />
</div>

{#if loggedIn}
<div>
    <a href="/whiteboard/week/11&12" class="fixed top-12 right-12 z-50">
        <div class="flex flex-col items-center gap-2">
            <img src="/arrow.jpg" alt="Up Arrow" class="w-16 md:w-20 -rotate-90" />
            <p class="text-3xl font-semibold">Up to Week 11&12</p>
        </div>
    </a>
    <a href="/whiteboard/gallery" class="fixed bottom-12 right-12 z-50">
        <div class="flex flex-col items-center gap-2">
            <p class="text-3xl font-semibold">Down to Gallery</p>
            <img src="/arrow.jpg" alt="Down Arrow" class="w-16 md:w-20 rotate-90" />
        </div>
    </a>
</div>
{/if}

<div class="container mx-auto px-50 pb-24 pt-32 z-20 -translate-x-30 relative">
    <h1 class="text-6xl font-bold text-neutral-700 mb-10 text-center">Leaderboard</h1>

    {#if leaderboard.length}
        <table class="w-full border-collapse border border-neutral-300 bg-neutral-50/60 backdrop-blur-md shadow-lg">
            <thead>
                <tr class="bg-neutral-100/80 text-2xl">
                    <th class="border border-neutral-300 p-4 text-center">Rank</th>
                    <th class="border border-neutral-300 p-4 text-left">GitHub Username</th>
                    <th class="border border-neutral-300 p-4 text-center">C1</th>
                    <th class="border border-neutral-300 p-4 text-center">C2</th>
                    <th class="border border-neutral-300 p-4 text-center">C3</th>
                    <th class="border border-neutral-300 p-4 text-center">C4</th>
                    <th class="border border-neutral-300 p-4 text-center">C5</th>
                    <th class="border border-neutral-300 p-4 text-center">C6</th>
                    <th class="border border-neutral-300 p-4 text-center">Total</th>
                    <th class="border border-neutral-300 p-4 text-center">Nett</th>
                </tr>
            </thead>
            <tbody class="bg-neutral-50/40">
                {#each leaderboard as { github_username, profile_url, overall_rank, challenge_results, total, nett }}
                    <tr class="hover:bg-neutral-100/70 transition-colors">
                        <td class="border border-neutral-300 p-4 text-xl text-neutral-500 text-center font-semibold">#{overall_rank}</td>
                        <td class="border border-neutral-300 p-4 text-xl text-neutral-800 font-pangolin">
                            {#if profile_url}
                                <a href={profile_url} target="_blank" rel="noopener noreferrer"
                                   class="underline underline-offset-2 hover:opacity-70 transition-opacity">
                                    {github_username}
                                </a>
                            {:else}
                                {github_username}
                            {/if}
                        </td>
                        {#each challenge_results as result}
                            <td class="border border-neutral-300 p-4 text-xl text-center {result?.discarded ? 'text-neutral-400 italic' : 'text-blue-700'}">
                                {#if result === null}
                                    -
                                {:else}
                                    {@const label = result.dnc
                                        ? (result.discarded ? '(DNC)' : 'DNC')
                                        : (result.discarded ? `(${result.pos})` : `${result.pos}`)}
                                    {#if result.live_url}
                                        <a href={result.live_url} target="_blank" rel="noopener noreferrer"
                                           class="underline underline-offset-2 hover:opacity-70 transition-opacity">
                                            {label}
                                        </a>
                                    {:else}
                                        {label}
                                    {/if}
                                {/if}
                            </td>
                        {/each}
                        <td class="border border-neutral-300 p-4 text-xl text-neutral-600 text-center">{total}</td>
                        <td class="border border-neutral-300 p-4 text-xl font-semibold text-neutral-800 text-center">{nett}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    {:else}
        <p class="text-2xl text-neutral-700 text-center mt-6">No rankings available yet.</p>
    {/if}
</div>
