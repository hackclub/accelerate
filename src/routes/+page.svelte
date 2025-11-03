<script lang="ts">
	import { onMount } from "svelte";
	import { page } from "$app/state";
	import {
		PUBLIC_HC_OAUTH_CLIENT_ID,
		PUBLIC_HC_OAUTH_REDIRECT_URL,
		PUBLIC_HC_OAUTH_RESPONSE_TYPE,
		PUBLIC_SLACK_CLIENT_ID,
		PUBLIC_SLACK_OAUTH_STATE,
		PUBLIC_SLACK_OAUTH_NONCE,
		PUBLIC_SLACK_REDIRECT_URI,
	} from "$env/static/public";

	let innerHeight = $state(0);
	let innerWidth = $state(0);

	// Dynamic breakpoints - automatically generates as many as needed
	const breakpoints = [
		{ width: 1610, height: 765 },
		{ width: 1330, height: 765 },
		{ width: 1120, height: 790 },
		{ width: 1010, height: 790 },
		{ width: 940, height: 790 },
		{ width: 860, height: 790 },
		{ width: 820, height: 790 },
		{ width: 750, height: 790 },
		{ width: 705, height: 790 },
		{ width: 650, height: 790 },
		{ width: 610, height: 790 },
		{ width: 575, height: 790 },
		{ width: 540, height: 790 },
		// Add more breakpoints here as needed
	];

	// Calculate how many additional whiteboard sections we need
	let additionalSections = $derived(
		breakpoints.filter((bp) => innerWidth < bp.width || innerHeight < bp.height)
			.length
	);

	let scaleSignInButton = $state(false);

	let hcaRedirect = `https://hca.dinosaurbbq.org/oauth/authorize?client_id=${PUBLIC_HC_OAUTH_CLIENT_ID}&redirect_uri=${PUBLIC_HC_OAUTH_REDIRECT_URL}&response_type=${PUBLIC_HC_OAUTH_RESPONSE_TYPE}&scope=email`;
	let slackRedirect = `https://slack.com/openid/connect/authorize?response_type=code&scope=openid%20profile%20email&client_id=${PUBLIC_SLACK_CLIENT_ID}&state=${PUBLIC_SLACK_OAUTH_STATE}&nonce=${PUBLIC_SLACK_OAUTH_NONCE}&redirect_uri=${PUBLIC_SLACK_REDIRECT_URI}`;

	const dynamicPlacement = (
		side: "top" | "bottom" | "left" | "right",
		outputMin: number,
		outputMax: number,
		inputMin: number,
		inputMax: number,
		innerWidth: number
	) => {
		const clamped = Math.min(Math.max(innerWidth, inputMin), inputMax);
		const t = (clamped - inputMin) / (inputMax - inputMin);
		return outputMin + t * (outputMax - outputMin);
	};

	const top = (min: number, max: number) => {
		console.log(
			"Top placement:",
			dynamicPlacement("top", min, max, 600, 1700, innerWidth)
		);
		return dynamicPlacement("top", min, max, 600, 1700, innerWidth);
	};

	const bottom = (min: number, max: number) => {
		return dynamicPlacement("bottom", min, max, 600, 1700, innerWidth);
	};

	const left = (min: number, max: number) => {
		return dynamicPlacement("left", min, max, 600, 1700, innerWidth);
	};

	const right = (min: number, max: number) => {
		return dynamicPlacement("right", min, max, 600, 1700, innerWidth);
	};

	const scale = (min: number, max: number) => {
		return dynamicPlacement("right", min, max, 600, 1700, innerWidth) / 100;
	};

	const rotate = (min: number, max: number) => {
		return dynamicPlacement("right", min, max, 600, 1700, innerWidth);
	};

	onMount(() => {
		document.title = "Accelerate - Build Simulations";

		const error = page.url.searchParams.get("error");
		if (error) {
			alert(error);
		}
	});
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<!-- {#if tooSmall}
	<div class="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-gray-100">
		<img src="/orpheus-note.png" alt="Favicon" class="w-24 h-24 mb-4" />
		<h1 class="text-2xl font-bold mb-2">Screen Too Small</h1>
		<p class="text-xl">Zoom out a bit - trust me its better for you</p>
	</div>
{:else} -->

<div class="relative w-full min-h-screen overflow-x-hidden">
	<div class="absolute inset-0 z-0">
		<img src="/top-whiteboard.png" alt="" class="w-full h-auto block" />
		<img src="/middle-whiteboard.png" alt="" class="w-full h-auto block" />
		<img src="/middle-2-whiteboard.png" alt="" class="w-full h-auto block" />

		<!-- Dynamically render additional whiteboard sections based on screen size -->
		{#each Array(additionalSections) as _, i}
			{#if i === 0}
				<img
					src="/middle-2-whiteboard.png"
					alt=""
					class="w-full h-auto block scale-y-[-1]"
				/>
			{:else if i === 1}
				<img
					src="/middle-whiteboard.png"
					alt=""
					class="w-full h-auto block scale-y-[-1]"
				/>
			{:else if i % 2 === 0}
				<img
					src="/middle-2-whiteboard.png"
					alt=""
					class="w-full h-auto block"
				/>
			{:else}
				<img
					src="/middle-2-whiteboard.png"
					alt=""
					class="w-full h-auto block scale-y-[-1]"
				/>
			{/if}
		{/each}

		<img src="/bottom-whiteboard.png" alt="" class="w-full h-auto block" />
	</div>

	<div class="relative z-10 p-10">
		<img
			src="cloud-note-2.png"
			alt="Cloud Note"
			class="absolute top-20 left-20 -rotate-6 scale-100 cursor-pointer shadow-lg shadow-black"
		/>
		<img
			src="cloud-note2.png"
			alt="Cloud Note 2"
			class="absolute right-13 rotate-6 scale-100 cursor-pointer z-30"
			style="top: {top(20, 100)}px;"
		/>
		<img
			src="hand-graph.png"
			alt="Hand Graph"
			class="absolute z-20 scale-100"
			style="right: {right(10, 150)}px; top: {top(375, 250)}px;"
		/>
		<img
			src="sticky-scroll-down.png"
			alt="Sticky Scroll Down"
			class="absolute z-20"
			style="top: {top(425, 350)}px; right: {right(20, 50)}px; scale: {scale(
				70,
				100
			)};"
		/>
		<img
			src="Logo.png"
			alt="Logo"
			class="absolute z-20"
			style="top: {top(850, 500)}px;"
		/>
		<div>
			<!-- Step 1: Build Simulations -->
			<div class="absolute w-full z-20 rotate-1 p-10" style="top: 1000px;">
				<img
					src="block-note.png"
					alt="Sticky Note Block Accelerate"
					class="absolute scale-100"
					style="top: {top(150, 150)}px; left: {left(100, 15)}px;"
				/>
				<div
					class="absolute z-20 rotate-1 p-10"
					style="right: {right(200, 50)}px; top: {top(
						400,
						150
					)}px; width: {scale(7500, 7500)}%; scale: {scale(70, 100)};"
				>
					<h1 class="text-8xl font-bold mb-4 text-neutral-700">
						1. Build Simulations
					</h1>
					<p class="text-3xl mb-6 text-neutral-700 px-8">
						Every 2 Weeks we'll give you a new simulation to build on. <br />
						<b><u>Improve it — or develop it from scratch.</u></b> <br />The
						goal is to make something that's technical, cool, and realistic.
					</p>
				</div>
			</div>

			<!-- Step 2: Submit and Vote -->
			<div
				class="absolute w-full z-20 -rotate-2 p-10"
				style="top: {top(
					innerHeight + innerHeight / 3 + 100,
					innerHeight + innerHeight / 3 - 200
				)}px;"
			>
				<img
					src="orpheus-note.png"
					alt="Sticky Note Block Accelerate"
					class="absolute"
					style="top: {top(250, 150)}px; right: {right(
						50,
						200
					)}px; scale: {scale(70, 100)};"
				/>
				<div
					class="absolute z-20 -rotate-2 p-10"
					style="top: {top(450, 150)}px; width: {scale(9000, 7500)}%;"
				>
					<h1 class="text-8xl font-bold mb-4 text-neutral-700">
						2. Submit and Vote
					</h1>
					<p class="text-3xl mb-6 text-neutral-700 px-8">
						Your simulations will be voted on by us at HQ, and ranked every 2
						weeks.<br /> Your final rankings will be determined using a superscore.
					</p>
				</div>
			</div>

			<!-- Step 3: Get Prizes -->
			<div
				class="absolute w-full z-20 -rotate-2 p-10"
				style="top: {top(
					innerHeight + (4.5 * innerHeight) / 3 + 0,
					innerHeight + (2.5 * innerHeight) / 3 - 300
				)}px;"
			>
				<img
					src="prize-note.png"
					alt="Sticky Note Trophy"
					class="absolute left-25 scale-100"
					style="top: {top(-75, -50)}px;"
				/>
				<div
					class="absolute z-20 rotate-1 p-10"
					style="right: {right(225, 50)}px; top: {top(
						200,
						150
					)}px; width: {scale(7000, 7500)}%;"
				>
					<h1 class="text-8xl font-bold mb-4 text-neutral-700">
						3. Get Prizes
					</h1>
					<p class="text-3xl mb-6 text-neutral-700 px-8">
						We'll be giving away Prizes like Macbooks, iPads, and Stickers based
						off your ranking at the end of the event!
					</p>
				</div>
			</div>
			<!-- TODO: figure this out -->
			<!-- <div style="top: {innerHeight * 2.9}px;" class="absolute z-20 w-full">
				<h1 class="text-4xl text-neutral-700">Sign Up Now!</h1>
			</div> -->
			<img
				src="graph.png"
				alt="Graph"
				class="absolute right-5"
				style="top: {top(
					innerHeight * 3.2 + 75,
					innerHeight * 2.75 - 1000
				)}px; transform: rotate({rotate(0, 10)}deg);"
			/>
			<img
				src="clickme.png"
				alt="Click Me Pointer"
				class="absolute left-5"
				style="top: {top(
					innerHeight * 3.75 + 100,
					innerHeight * 2.75 - 750
				)}px; transform: rotate({rotate(-20, 0)}deg);"
			/>
			<a
				href={slackRedirect}
				class="absolute z-30"
				style="top: {top(
					innerHeight * 3.75 + 50,
					innerHeight * 2.75 - 700
				)}px; transform: rotate({rotate(35, 0)}deg); left: {left(200, 480)}px;"
				onmouseenter={() => (scaleSignInButton = true)}
				onmouseleave={() => (scaleSignInButton = false)}
			>
				<img
					src="signin.png"
					alt="Sign In Button"
					class={scaleSignInButton
						? "w-120 mt-10 mb-20 scale-120"
						: "w-120 mt-10 mb-20 scale-100"}
				/>
			</a>
		</div>
	</div>
</div>

<!-- {/if} -->

<style>
	:global(body) {
		scrollbar-width: thin;
		scrollbar-color: #404040 #1a1a1a;
	}

	:global(body::-webkit-scrollbar) {
		width: 12px;
	}

	:global(body::-webkit-scrollbar-track) {
		background: #1a1a1a;
	}

	:global(body::-webkit-scrollbar-thumb) {
		background: #404040;
		border-radius: 6px;
		border: 2px solid #1a1a1a;
	}

	:global(body::-webkit-scrollbar-thumb:hover) {
		background: #525252;
	}
</style>
