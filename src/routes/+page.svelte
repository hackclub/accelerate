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
        <img src="cloud-note-2.png" alt="Cloud Note" class="absolute top-20 left-20 -rotate-6 scale-100  cursor-pointer shadow-lg shadow-black" />
        <img src="cloud-note2.png" alt="Cloud Note 2" class="absolute top-25 right-13 rotate-6 scale-100  cursor-pointer z-30 " />
        <img src="hand-graph.png" alt="Hand Graph" class="absolute z-20 top-20 right-30 scale-100" />
        <img src="sticky-scroll-down.png" alt="Sticky Scroll Down" class="absolute z-20 top-150 right-50 scale-100" />
        <img src="Logo.png" alt="Logo" class="absolute z-20 top-110 left-20" />
        <div>
            <div class="absolute z-20 rotate-1 w-full p-10" style="top: {innerHeight}px;">
                <img src="block-note.png" alt="Sticky Note Block Accelerate" class="relative left-30 scale-100" />
                <div class="absolute left-150 top-5 z-20 rotate-1 p-10">
                    <h1 class="text-8xl font-bold mb-4 text-neutral-700">1. Build Simulations</h1>
                    <p class="text-3xl mb-6 text-neutral-700 px-8" >Every 2 Weeks we'll give you a new simulation to build on. <br> <b><u>Improve it — or develop it from scratch.</u></b> <br>The goal is to make something that's technical, cool, and realistic.</p>
                </div>
            </div>
            <div class="absolute z-20 -rotate-2 w-full p-10 py-40" style="top: {innerHeight + innerHeight/3}px;">
                <img src="orpheus-note.png" alt="Sticky Note Block Accelerate" class="absolute right-30 scale-100" />
                <div class="absolute right-150 top-5 z-20 px-10 py-30">
                    <h1 class="text-8xl font-bold mb-4 text-neutral-700">2. Submit and Vote</h1>
                    <p class="text-3xl mb-6 text-neutral-700 px-8" >Your simulations will be voted on by your peers, and ranked every 2 weeks.<br> Your final rankings  </p>
                </div>
            </div>
            <div class="absolute z-20 rotate-1 w-full p-10" style="top: {innerHeight + 2.5*innerHeight/3}px;">
                <img src="prize-note.png" alt="Sticky Note Trophy" class="relative left-30 -rotate-5 scale-100" />
                <div class="absolute left-150 top-5 z-20 rotate-1 p-10">
                    <h1 class="text-8xl font-bold mb-4 text-neutral-700">3. Get Prizes</h1>
                    <p class="text-3xl mb-6 text-neutral-700 px-8" >We'll be giving away Prizes like Macbooks, iPads, and Stickers based off your ranking at the end of the event!</p>
                </div>
            </div>
            <div style="top: {innerHeight *2.3}px;" class="absolute z-20 text-center w-full">
                <h1 class="text-4xl text-neutral-700">Sign Up Now!</h1>
            </div>
            <img src="graph.png" alt="Graph" class="absolute right-15 rotate-10" style="top: {innerHeight* 2.35}px"/>
            <img src="clickme.png" alt="Click Me Pointer" class="absolute left-15 rotate-10" style="top: {innerHeight* 2.35}px"/>
        </div>
    </div>
</div>