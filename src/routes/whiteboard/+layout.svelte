<script>
    let { children } = $props();

    let currentUser = "placeholder_user";

    function logout() {
        console.log("Logging out...");
        window.location.replace("/");
    }
</script>

<div class="bg" aria-hidden="true">
    <img src="/dashboard-bg.png" alt="" class="bg-image" />
</div>

<div class="relative z-[1]">
    <div class="fixed top-12 left-12 z-40 flex flex-col p-3">
        <p class="text-lg ">Logged In As: <span class="text-bold">{currentUser}</span></p>
        <button
            onclick={logout}
            class="px-4 py-2 "
        >
            Logout
        </button>
    </div>

    {@render children?.()}
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