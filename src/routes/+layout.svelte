<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" type="image/png" href="/orpheus-note.png" />
</svelte:head>

{@render children?.()}
