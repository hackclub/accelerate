<script>
    import { onMount } from 'svelte';
    
    let { data } = $props();
    
    let innerWidth = $state(0);
    let mediumSize = $derived(innerWidth < 1850);
    
    onMount(() => {
        const updateSize = () => {
            innerWidth = window.innerWidth;
        };
        
        updateSize();
        window.addEventListener('resize', updateSize);
        
        return () => {
            window.removeEventListener('resize', updateSize);
        };
    });
</script>

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

<div class="container mx-auto pt-30 -translate-x-20 px-15">
    <h1 class="{mediumSize ? 'text-3xl' : 'text-8xl'} md:text-7xl font-bold text-neutral-700 mb-6">Welcome to Accelerate!!</h1>
    <h2 class="{mediumSize ? 'text-xl' : 'text-2xl'} md:text-3xl font-semibold text-neutral-700 mb-4">The <u>only</u> Physics Based YSWS</h2>
    <h3 class="{mediumSize ? 'text-xl' : 'text-2xl'} md:text-2xl font-medium text-neutral-700 mb-8">
        So what are the prizes?
        <ul class="px-12 list-inside {mediumSize ? 'text-sm' : 'text-xl'}">
            <li>1st: <a href="https://www.apple.com/macbook-pro/" class="underline hover:text-neutral-400">M5 Macbook Pro</a> or a Ticket to the <a href="https://summit.aps.org/" class="underline hover:text-neutral-400">APS Global Physics Summit</a></li>
            <li>2nd: <a href="https://www.apple.com/macbook-air/" class="underline hover:text-neutral-400">M4 Macbook Air</a></li>
            <li>3rd: <a href="https://www.apple.com/ipad-air/" class="underline hover:text-neutral-400">M3 iPad Air</a> or <a href="https://www.apple.com/mac-mini/" class="underline hover:text-neutral-400">M4 Mac Mini</a></li>
            <li>4th - 10th: <a href="https://www.casio.com/us/scientific-calculators/product.FX-CG50/" class="underline hover:text-neutral-400">Casio FX-CG50 Graphing Calculator</a></li>
            <li>11th-20th: <a href="https://www.solidworks.com/product/students" class="underline hover:text-neutral-400">A Year Long Solidworks Subscription</a></li>
            <li>Everyone: A Physics Themed Sticker Sheet!</li>
        </ul>
    </h3>

    <!-- Project Gallery -->
    <div class="mt-16">
        <h2 class="{mediumSize ? 'text-3xl' : 'text-5xl'} font-bold text-neutral-700 mb-8">Your Recent Projects</h2>
        
        {#if data.projects.length === 0}
            <p class="{mediumSize ? 'text-xl' : 'text-3xl'} text-neutral-600">No projects</p>
        {:else}
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {#each data.projects.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 3) as project}
                    <a href={project.code_url} target="_blank" rel="noopener noreferrer" class="block {mediumSize ? 'max-w-sm' : ''}">
                        <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow">
                            {#if project.attachment_urls && project.attachment_urls.length > 0}
                                <img src={project.attachment_urls[0]} alt={project.project_name} class="w-full {mediumSize ? 'h-24' : 'h-48'} object-cover" />
                            {:else}
                                <div class="w-full {mediumSize ? 'h-24' : 'h-48'} bg-neutral-200 flex items-center justify-center">
                                    <p class="{mediumSize ? 'text-xs' : 'text-sm'} text-neutral-500">No image</p>
                                </div>
                            {/if}
                            <div class="{mediumSize ? 'p-2' : 'p-4'}">
                                <h3 class="{mediumSize ? 'text-sm' : 'text-xl'} font-bold text-neutral-800 mb-2">{project.project_name}</h3>
                                <p class="{mediumSize ? 'text-xs' : 'text-sm'} text-neutral-600">Time spent: {Math.floor(project.time_spent / 60)}h {project.time_spent % 60}m</p>
                                <p class="{mediumSize ? 'text-[10px]' : 'text-xs'} text-neutral-500 mt-1">Week {project.submission_week}</p>
                            </div>
                        </div>
                    </a>
                {/each}
            </div>
        {/if}
    </div>
</div>