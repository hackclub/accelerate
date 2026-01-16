<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData;

    const leaderboard = data.leaderboard ?? [];
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

<div class="container mx-auto px-50 pb-24 pt-32 z-20 -translate-x-30 relative">
    <h1 class="text-6xl font-bold text-neutral-700 mb-10 text-center">Leaderboard</h1>

    {#if leaderboard.length}
        <table class="w-full border-collapse border border-neutral-300 bg-neutral-50/60 backdrop-blur-md shadow-lg">
            <thead>
                <tr class="bg-neutral-100/80 text-2xl">
                    <th class="border border-neutral-300 p-4 text-left">GitHub Username</th>
                    <th class="border border-neutral-300 p-4 text-center">C1</th>
                    <th class="border border-neutral-300 p-4 text-center">C2</th>
                    <th class="border border-neutral-300 p-4 text-center">C3</th>
                    <th class="border border-neutral-300 p-4 text-center">C4</th>
                    <th class="border border-neutral-300 p-4 text-center">C5</th>
                    <th class="border border-neutral-300 p-4 text-center">C6</th>
                </tr>
            </thead>
            <tbody class="bg-neutral-50/40">
                {#each leaderboard as { github_username, challenge_ranks }}
                    <tr class="hover:bg-neutral-100/70 transition-colors">
                        <td class="border border-neutral-300 p-4 text-xl text-neutral-800 font-pangolin">{github_username}</td>
                        {#each challenge_ranks as rank}
                            <td class="border border-neutral-300 p-4 text-xl text-blue-700 text-center">{rank ?? '-'}</td>
                        {/each}
                    </tr>
                {/each}
            </tbody>
        </table>
    {:else}
        <p class="text-2xl text-neutral-700 text-center mt-6">No rankings available yet.</p>
    {/if}
</div>
