<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	
	let { children } = $props();

	let innerWidth = $state(0);
	let innerHeight = $state(0);
	let tooSmall = $derived(innerWidth < 1100 || innerHeight < 540);

	import { onMount } from 'svelte';

	onMount(() => {
		const updateSize = () => {
			innerWidth = window.innerWidth;
			innerHeight = window.innerHeight;
		};

		updateSize();

		window.addEventListener('resize', updateSize);

		return () => {
			window.removeEventListener('resize', updateSize);
		};
	});
</script>

<svelte:head>
	<link rel="icon" type="image/png" href="/orpheus-note.png" />
</svelte:head>

{#if tooSmall}
	<div class="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-gray-100">
		<img src="/orpheus-note.png" alt="Favicon" class="w-24 h-24 mb-4" />
		<h1 class="text-2xl font-bold mb-2">Screen Too Small</h1>
		<p class="text-lg">Please use a larger device or increase your browser window size to access the content.</p>
	</div>
{:else}

{@render children?.()}
{/if}