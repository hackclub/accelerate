<script>
    import { onMount } from 'svelte';

    let innerHeight = $state(0);
    let innerWidth = $state(0);

    onMount(() => {
        document.title = "Accelerate - Build Simulations";

        const updateSize = () => {
            innerHeight = window.innerHeight;
            innerWidth = window.innerWidth;
        };

        updateSize();

        window.addEventListener('resize', updateSize);

        return () => {
            window.removeEventListener('resize', updateSize);
        };
    });
</script>

<style>
    :global(body) {
        scrollbar-width: thin;
        scrollbar-color: #404040 #1a1a1a;
    }

    :global(body::-webkit-scrollbar) {
        width: 12px;
    }

    :global(body::-webkit-scrollbar-track) {
        background: #1a1a1a;
    }

    :global(body::-webkit-scrollbar-thumb) {
        background: #404040;
        border-radius: 6px;
        border: 2px solid #1a1a1a;
    }

    :global(body::-webkit-scrollbar-thumb:hover) {
        background: #525252;
    }
</style>

<div class="relative w-full min-h-screen overflow-x-hidden">
    <div class="absolute inset-0 z-0">
        <img src="/top-whiteboard.png" alt="" class="w-full h-auto block" />
        <img src="/middle-whiteboard.png" alt="" class="w-full h-auto block" />
        <img src="/middle-2-whiteboard.png" alt="" class="w-full h-auto block" />
        <img src="/bottom-whiteboard.png" alt="" class="w-full h-auto block" />
    </div>
    
    <div class="relative z-10 p-10">
        <img src="cloud-note-2.png" alt="Cloud Note" class="absolute top-20 left-20 -rotate-6 scale-100 paper-curl-right cursor-pointer shadow-lg shadow-black" />
        <img src="cloud-note2.png" alt="Cloud Note 2" class="absolute top-25 right-13 rotate-6 scale-100 paper-curl-left cursor-pointer z-30 " />
        <img src="hand-graph.png" alt="Hand Graph" class="absolute z-20 top-20 right-30 scale-100" />
        <img src="sticky-scroll-down.png" alt="Sticky Scroll Down" class="absolute z-20 top-150 right-50 scale-100" />
        <img src="Logo.png" alt="Logo" class="absolute z-20 top-110 left-20" />
        <div>
            <div class="absolute z-20 rotate-1 w-full p-10" style="top: {innerHeight}px;">
                <img src="block-note.png" alt="Sticky Note Block Accelerate" class="relative left-30 scale-100" />
                <div class="absolute left-150 top-5 z-20 rotate-1 p-10">
                    <h1 class="text-8xl font-bold mb-4 text-neutral-700">1. Build Simulations</h1>
                    <p class="text-4xl mb-6 text-neutral-700" >Every 2 Weeks we'll give you a new simulation to build on. <br> <b><u>Improve it — or develop it from scratch.</u></b> <br>The goal is to make something that's technical, cool, and realistic.</p>
                </div>
            </div>
            <div class="absolute z-20 -rotate-2 w-full p-10" style="top: {innerHeight + innerHeight/3}px;">
                <img src="orpheus-note.png" alt="Sticky Note Block Accelerate" class="absolute right-30 scale-100" />
                <div class="absolute right-150 top-5 z-20 p-10">
                    <h1 class="text-8xl font-bold mb-4 text-neutral-700">2. Submit and Vote</h1>
                    <p class="text-4xl mb-6 text-neutral-700" >Your simulations will be voted on by your peers, and ranked every 2 weeks.<br> Your final rankings  </p>
                </div>
            </div>
        </div>
    </div>
</div>