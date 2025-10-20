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
    Week 1 & 2
</div>