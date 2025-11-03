<script lang="ts">
    let { children } = $props();
</script>

<div
    class="profile-card"
    style="background-image: url('/dashboard-bg.png');"

>
    {@render children?.()}
</div>

<style>
    .profile-card {
        background-size: 100% 100%;
        background-position: center;
        background-repeat: no-repeat;
        color: white;
        text-shadow: 1px 1px 2px black;
        padding: 2.5rem;
        border-radius: 1rem;
        transition: all 0.3s ease;
        max-height: 100%;
    }

    .profile-card:hover {
        transform: scale(1.02);
    }
</style>