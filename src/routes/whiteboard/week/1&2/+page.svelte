<script>
    import { onMount } from 'svelte';

    let innerHeight = $state(0);
    let innerWidth = $state(0);
    let expanded = $state(false);
    let hoverSubmit = $state(false);

    function toggleExpand() {
        expanded = !expanded;
    }

    onMount(() => {
        const now = new Date();

        //if (now.getMonth() === 12 && now.getDate() >= 20) {
        //    document.title = "Week 1 & 2 - Double Pendulum";
        //} else {
          //  window.location.replace("whiteboard");
        //}

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
<div>
    <div class="relative min-h-screen">
    <a href="/whiteboard" class="fixed top-12 right-12 z-50">
        <div class="flex flex-col items-center gap-2">
            <img src="/arrow.jpg" alt="Up Arrow" class="w-16 md:w-20 -rotate-90"/>
            <p class="text-xl font-semibold">Up to Whiteboard</p>
        </div>
    </a>
    <a href="/whiteboard/leaderboard" class="fixed bottom-12 right-12 z-50">
        <div class="flex flex-col items-center gap-2 ">
            <p class="text-xl font-semibold">Down to Leaderboard</p>
            <img src="/arrow.jpg" alt="Down Arrow" class="w-16 md:w-20 rotate-90" />
        </div>
    </a>
    <iframe 
        src="https://o0gkkkok8k08wwgksk8okgwg.a.selfhosted.hackclub.com/" 
        class="absolute w-3/4 h-[75vh] overflow-hidden scale-120 z-40 -right-100 drop-shadow-6xl" 
        scrolling="no"
        title="Simulation"
    ></iframe>
    <div class={expanded
        ? "fixed inset-0 z-50 w-screen h-screen"
        : "absolute left-10 bottom-15 w-full max-w-[20rem] h-[55vh] z-40 rounded-lg"}>
        <iframe
            src="/page.pdf"
            class={expanded ? "w-full h-full" : "w-full h-full rounded-2xl"}
            title="Embedded PDF Viewer"
        ></iframe>
        <button
            type="button"
            onclick={toggleExpand}
            class={expanded? "absolute top-0 left-30 m-2 p-2 rounded-md text-white z-50" : "absolute top-0 left-0 m-2 p-2 rounded-md text-white z-50"}
            aria-label="Expand PDF"
        >
            {#if expanded}
                <img src="/contract.svg" alt="" class="w-6 h-6 filter brightness-0 invert" />
            {:else}
                <img src="/expand.svg" alt="" class="w-6 h-6 filter brightness-0 invert" />
            {/if}
        </button>
    </div>
    <h1 class={expanded ? "hidden" : "absolute top-30 left-15 text-4xl md:text-5xl font-bold z-50 text-neutral-700 drop-shadow-lg"}>
        Week 1 & 2: The Double Pendulum
    </h1>
    <p class = "absolute bottom-15 left-100">
        <b class="text-xl">Your Task:</b> <br>
        This week you're challenged to build your own Double Pendulum simulation! <br>
        You can write it in anything, as long as you don't use a premade physics engine,<br> and it's shipped as either a web-page,
         or an executable file (think .exe or ELF).<br>
         You can also submit a paper if you feel like it, but that's completely optional.<br>
         <b class="text-xl">Ideas:</b> <br>
        What if: <br>
        <span class="relative left-10">The rods were strings?</span><br>
        <span class="relative left-10">There was air resistance?</span><br>
        <span class="relative left-10">The model was 3D?</span><br>
        <span class="relative left-10">Everything had Mass?</span><br>
        <span class="relative left-10">It was interactive?</span>
    </p>
    <button class="absolute bottom-25 left-170 hover:cursor-pointer" onclick={() => window.location.replace("/whiteboard/week/1%262/submit")} onmouseenter={() => (hoverSubmit = true)} onmouseleave={() => (hoverSubmit = false)}>
        <img src={hoverSubmit ? "/submitgreen.png" : "/submitred.png"} alt="Submit Button" class="w-70"/>
    </button>
    
</div>
</div>