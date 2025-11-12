<script>
    import { onMount } from 'svelte';

    let innerHeight = $state(0);
    let innerWidth = $state(0);
    let expanded = $state(false);
    let hoverSubmit = $state(false);
    let countdown = $state('');

    function toggleExpand() {
        expanded = !expanded;
    }

    onMount(() => {
        const targetDate = new Date('2025-11-25T00:00:00-05:00'); // November 10, 2025, 12:00 AM EST

        const updateCountdown = () => {
            const now = new Date();
            const diff = targetDate - now;

            if (diff <= 0) {
                countdown = 'Deadline passed!';
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            countdown = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        };

        const updateSize = () => {
            innerHeight = window.innerHeight;
            innerWidth = window.innerWidth;
        };

        updateSize();
        updateCountdown();

        const countdownInterval = setInterval(updateCountdown, 1000);
        window.addEventListener('resize', updateSize);

        return () => {
            clearInterval(countdownInterval);
            window.removeEventListener('resize', updateSize);
        };
    });

</script>
<div>
    <div class="relative min-h-screen">
    <a href="/whiteboard" class="fixed top-12 right-12 z-50">
        <div class="flex flex-col items-center gap-2">
            <img src="/arrow.jpg" alt="Up Arrow" class="w-16 md:w-20 -rotate-90"/>
            <p class="text-3xl font-semibold">Up to Whiteboard</p>
        </div>
    </a>
    <a href="/whiteboard/leaderboard" class="fixed bottom-12 right-12 z-50">
        <div class="flex flex-col items-center gap-2 ">
            <p class="text-3xl font-semibold">Down to Leaderboard</p>
            <img src="/arrow.jpg" alt="Down Arrow" class="w-16 md:w-20 rotate-90" />
        </div>
    </a>
    <iframe 
        src="https://is4gsgks4ww4gw4wo0gsokw4.a.selfhosted.hackclub.com/" 
        class="absolute w-3/4 h-[75vh] overflow-hidden scale-120 z-40 -right-100 drop-shadow-6xl" 
        scrolling="no"
        title="Simulation"
    ></iframe>
    <!--<video src="/pendulumbid.mp4" autoplay loop muted class="absolute w-3/4 h-[75vh] overflow-hidden scale-120 z-40 -right-100 drop-shadow-6xl" style="mix-blend-mode: lighten;"></video>-->
    <div class={expanded
        ? "fixed inset-0 z-50 w-screen h-screen"
        : "absolute left-10 bottom-15 w-full max-w-[20rem] h-[55vh] z-40 rounded-lg"}>
        <iframe
            src="/Weeks_3_4__The_Three_Body_Problem.pdf"
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
        Week 3&4: The Three Body Problem
    </h1>
    <p class={expanded ? "hidden" : "absolute top-45 left-15 text-3xl md:text-3xl z-50 text-neutral-700 drop-shadow-lg hover:text-neutral-400 underline hover:font-bold hover:cursor-pointer"}> <a href="/whiteboard/rules">Rules + Judging Rubric + scoring Info</a></p>
    <p class={expanded ? "hidden" : "absolute top-55 left-15 text-2xl md:text-2xl z-50 text-neutral-700 drop-shadow-lg"}>Submission Deadline:  T-{countdown}</p>
    <p class = "absolute bottom-57 left-100 text-xl font-pangolin">
        <b class="text-4xl font-pangolin">Your Task:</b> <br>
        This week you're challenged to build your own Three Body Problem simulation! <br>
        You can write it in anything, as long as you don't use a premade physics engine,<br> and it's shipped as either a web-page,
         or an executable file (think .exe or ELF).<br>
         You can also submit a paper if you feel like it, but that's completely optional.<br>
         <b class="text-4xl font-pangolin">Ideas:</b> <br>
        <span class="text-2xl font-pangolin">What if:</span> <br>
        <span class="relative left-10 text-2xl font-pangolin">You made a page showing every period solution?</span><br>
        <span class="relative left-10 text-2xl font-pangolin">The bodies could collide and smash into each other?</span><br>
        <span class="relative left-10 text-2xl font-pangolin">The model was 3D?</span><br>
        <span class="relative left-10 text-2xl font-pangolin">The bodies had different charges?</span><br>
        <span class="relative left-10 text-2xl font-pangolin">It was interactive?</span>
    </p>
    <button class="absolute bottom-25 left-120 hover:cursor-pointer" onclick={() => window.location.replace("/whiteboard/week/3%264/submit")} onmouseenter={() => (hoverSubmit = true)} onmouseleave={() => (hoverSubmit = false)}>
        <img src={hoverSubmit ? "/submitgreen.png" : "/submitred.png"} alt="Submit Button" class="w-70"/>
    </button>
    
</div>
</div>
