<script>
    import { onMount } from 'svelte';

    let innerHeight = $state(0);
    let innerWidth = $state(0);

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
    <div>
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
        class="absolute w-3/4 h-[75vh] overflow-hidden scale-120 z-50 -right-100 drop-shadow-6xl" 
        scrolling="no"
        title="Simulation"
    ></iframe>
    <iframe
        src="/page.pdf"
        class="absolute left-20 top-40 w-100 h-200 z-50 rounded-2xl"
        title="Embedded PDF Viewer"
    ></iframe>
</div>
</div>