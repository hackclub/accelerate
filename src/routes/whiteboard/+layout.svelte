<script>
    let { children } = $props();
    
    let week1_2Box = $state(false);
    let week3_4Box = $state(false);
    let week5_6Box = $state(false);
    let week7_8Box = $state(false);
    let week9_10Box = $state(false);

    let currentUser = "placeholder_user";

    async function logout() {
        await fetch('/api/logout', { method: 'POST' });
        window.location.replace("/");
    }
</script>

<div class="bg" aria-hidden="true">
    <img src="/dashboard-bg.png" alt="" class="bg-image" />
</div>

<div class="relative z-[1]">
    <div class="fixed top-12 left-12 z-40 flex flex-row items-center gap-3 p-3">
        <p class="text-lg">Logged In As: <span class="font-bold">{currentUser}</span></p>
        <button
            onclick={logout}
            class="px-4 py-1 rounded-md text-neutral-700 "
        >
            <img src="/logout.png" alt="Logout" class="w-7 inline-block mr-2" />
        </button>
        <div class="flex flex-row items-center gap-2">
            {#if week1_2Box}
            <img src="/greenBox.png" alt="green week 1_2" class="w-20 h-20"/>
            {:else}
            <img src="/blackBox.png" alt="black week 1_2" class="w-20 h-20"/>
            {/if}
            {#if week3_4Box}
            <img src="/greenBox.png" alt="green week 3_4" class="w-20 h-20"/>
            {:else}
            <img src="/blackBox.png" alt="black week 3_4" class="w-20 h-20"/>
            {/if}
            {#if week5_6Box}
            <img src="/greenBox.png" alt="green week 5_6" class="w-20 h-20"/>
            {:else}
            <img src="/blackBox.png" alt="black week 5_6" class="w-20 h-20"/>
            {/if}
            {#if week7_8Box}
            <img src="/greenBox.png" alt="green week 7_8" class="w-20 h-20"/>
            {:else}
            <img src="/blackBox.png" alt="black week 7_8" class="w-20 h-20"/>
            {/if}
            {#if week9_10Box}
            <img src="/greenBox.png" alt="green week 9_10" class="w-20 h-20"/>
            {:else}
            <img src="/blackBox.png" alt="black week 9_10" class="w-20 h-20"/>
            {/if}
        </div>
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