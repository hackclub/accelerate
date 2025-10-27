<script>
    import { onMount } from 'svelte';
    
    let { data } = $props();
    
    let innerWidth = $state(0);
    let innerHeight = $state(0);
    let mediumSize = $derived(innerWidth < 1850 || innerHeight < 1100);

    let hackatimeAcknowledged = $state(false);

    function acknowledgeHackatime() {
        hackatimeAcknowledged = true;
        document.cookie = "hackatimeAcknowledged=true; path=/; max-age=" + (30 * 24 * 60 * 60);
    }

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }

    onMount(() => {
        const acknowledged = getCookie('hackatimeAcknowledged');
        if (acknowledged === 'true') {
            hackatimeAcknowledged = true;
        }

        const updateSize = () => {
            innerWidth = window.innerWidth;
            innerHeight = window.innerHeight;
        };
        
        updateSize();
        window.addEventListener('resize', updateSize);
        
        return () => {
            window.removeEventListener('resize', updateSize);
        };
    });
</script>
{#if hackatimeAcknowledged}
<div>
    <a href="/whiteboard/leaderboard" class="fixed top-12 right-12 z-50">
        <div class="flex flex-col items-center gap-2">
            <img src="/arrow.jpg" alt="Up Arrow" class="w-16 md:w-20 -rotate-90"/>
            <p class="text-3xl font-semibold">Up to Leaderboard</p>
        </div>
    </a>
    <a href="/whiteboard/week/1&2" class="fixed bottom-12 right-12 z-50">
        <div class="flex flex-col items-center gap-2 ">
            <p class="text-3xl font-semibold">Down to Week 1&2</p>
            <img src="/arrow.jpg" alt="Down Arrow" class="w-16 md:w-20 rotate-90" />
        </div>
    </a>
</div>

<div class="container mx-auto pt-30">
    <h1 class="{mediumSize ? 'text-3xl' : 'text-8xl'} md:text-7xl font-bold text-neutral-700 mb-6">Welcome to Accelerate!!</h1>
    <h2 class="{mediumSize ? 'text-xl' : 'text-2xl'} md:text-3xl font-semibold text-neutral-700 mb-4">The <u>First</u> Physics Based YSWS</h2>
    <h3 class="{mediumSize ? 'text-xl' : 'text-2xl'} md:text-2xl font-medium text-neutral-700 mb-3">
        So what are the prizes?
        <ul class="px-12 list-inside {mediumSize ? 'text-md' : 'text-xl'}">
            <li>1st: <a href="https://www.apple.com/macbook-pro/" class="underline hover:text-neutral-400">M5 Macbook Pro</a> or a Ticket to the <a href="https://summit.aps.org/" class="underline hover:text-neutral-400">APS Global Physics Summit</a></li>
            <li>2nd: <a href="https://www.apple.com/macbook-air/" class="underline hover:text-neutral-400">M4 Macbook Air</a></li>
            <li>3rd: <a href="https://www.apple.com/ipad-air/" class="underline hover:text-neutral-400">M3 iPad Air</a> or <a href="https://www.apple.com/mac-mini/" class="underline hover:text-neutral-400">M4 Mac Mini</a></li>
            <li>4th - 10th: <a href="https://www.casio.com/us/scientific-calculators/product.FX-CG50/" class="underline hover:text-neutral-400">Casio FX-CG50 Graphing Calculator</a></li>
            <li>11th-20th: <a href="https://www.solidworks.com/product/students" class="underline hover:text-neutral-400">A Year Long Solidworks Subscription</a></li>
            <li>Everyone: A Physics Themed Sticker Sheet and Hack Club Ruler!</li>
        </ul>
    </h3>

    <!-- Project Gallery -->
    <div class="mt-3">
        <h2 class="{mediumSize ? 'text-3xl' : 'text-5xl'} font-bold text-neutral-700 mb-1">Your Recent Projects</h2>
        
        {#if data.projects.length === 0}
            <p class="{mediumSize ? 'text-xl' : 'text-3xl'} text-neutral-600">No projects</p>
            <img src="/orpheuscry.png" alt="No Projects" class="w-48 mt-4" />
        {:else}
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {#each data.projects.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 3) as project}
                    <div class="block {mediumSize ? 'max-w-sm' : ''}">
                        <div class="rounded-lg shadow-lg overflow-hidden hover:scale-105 relative">
                            <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                                {#if project.attachment_urls && project.attachment_urls.length > 0}
                                    <img src={project.attachment_urls[0]} alt={project.project_name} class="w-full {mediumSize ? 'h-24' : 'h-48'} object-cover" />
                                {:else}
                                    <img src="/orpheuscry.png" alt={project.project_name} class="w-full {mediumSize ? 'h-24' : 'h-48'} object-cover" />
                                {/if}
                            </a>
                            <div class="{mediumSize ? 'p-2 pb-10' : 'p-4 pb-12'}">
                                <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                                    <h3 class="{mediumSize ? 'text-sm' : 'text-xl'} font-bold text-neutral-800 mb-2">{project.project_name}</h3>
                                </a><a 
                                href={project.code_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                class="absolute right-10 hover:scale-110 {mediumSize ? 'text-xs' : 'text-sm'}"
                            ><img src="/repo.png" alt="repo link" class="w-20"/></a>
                                <p class="{mediumSize ? 'text-xs' : 'text-sm'} text-neutral-600">Time spent: {Math.floor(project.time_spent / 60)}h {project.time_spent % 60}m</p>
                                <p class="{mediumSize ? 'text-[10px]' : 'text-xs'} text-neutral-500 mt-1">Week {project.submission_week}</p>
                                
                            </div>
                        
                        </div>
                    </div>
                {/each}
            </div>
        {/if}
    </div>
</div>
{:else}
<h1 class="text-center mt-40 text-6xl font-bold">
    Have you installed Hackatime?
</h1>
<div class="text-center"><button onclick={() => window.location.href ="https://hackatime.hackclub.com"} class="bg-red-700/50 px-10 py-2 text-2xl rounded-xl hover:scale-105 hover:bg-red-700/30 hover:cursor-pointer mt-10 mb-10 hover:underline"><h2>If you haven't, install it now</h2></button>
<h2 class="text-2xl font-bold mb-10">If you have, acknowledge this:</h2>
<p class="text-2xl font-pangolin px-20">Don’t cheat the time tracking system. No bots, no fake key presses, no UI manipulation. If you do, you’ll be banned from Hackatime and other participating YSWS / events / programs</p>
<button onclick={acknowledgeHackatime} class="bg-green-700/50 px-10 py-2 text-2xl rounded-xl hover:scale-105 hover:bg-green-700/30 hover:cursor-pointer mt-10 mb-5 hover:underline"><p>I agree</p></button>
<img src="/please.gif" alt="Pwease" class="w-48 mx-auto mt-10"/>
</div>
{/if}