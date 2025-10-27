<script>
    let { children } = $props();
</script>

<div class="bg" aria-hidden="true">
    <img src="/dashboard-bg.png" alt="" class="bg-image" />
</div>

<style>
    .bg {
        position: fixed;
        inset: 0;
        overflow: hidden; /* hide any overflow from the image */
        z-index: 0;
    }

        .bg-image {
           
            width: 100vw; /* match innerWidth */
            height: 100vh; /* match innerHeight */
            /* modern dynamic viewport units */
            width: 100dvw;
            height: 100dvh;
        object-fit: fill; /* stretch to exactly fill both dimensions */
        display: block;
    }

    :global(html, body) {
        overflow: hidden; /* prevent scrollbars */
        height: 100%;
    }
</style>

{@render children?.()}