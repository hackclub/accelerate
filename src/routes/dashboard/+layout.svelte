<div class="bg" aria-hidden="true">
    <img src="/dashboard-bg.png" alt="" class="bg-image" />
    <!-- Background image only; content renders in the slot below -->
</div>

<div class="content">
    <slot />
</div>

<style>
    .bg {
        position: fixed;
        inset: 0;
        overflow: hidden; /* hide any overflow from the image */
        z-index: 0;
    }

        .bg-image {
            /* fallbacks */
            width: 100vw; /* match innerWidth */
            height: 100vh; /* match innerHeight */
            /* modern dynamic viewport units */
            width: 100dvw;
            height: 100dvh;
        object-fit: fill; /* stretch to exactly fill both dimensions */
        display: block;
    }

    .content {
        position: relative;
        z-index: 1; /* ensure content is above the background */
    }

    :global(html, body) {
        overflow: hidden; /* prevent scrollbars */
        height: 100%;
    }
</style>