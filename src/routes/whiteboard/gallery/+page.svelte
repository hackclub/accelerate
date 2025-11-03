<script lang="ts">
	import { onMount } from 'svelte';
	import ProfileCard from '$lib/components/ProfileCard.svelte';
	import { filterProjectProfanity } from '$lib/utils/profanityFilter';

	interface Project {
		project_name: string;
		project_description: string;
		attachment_urls: string[];
		code_url: string;
		live_url: string;
		submission_week: string;
		paper_url: string;
		shipped: boolean;
		sent_to_airtable: boolean;
		review_ids: string[];
		time_spent: number;
		project_id: string;
		user_id: string;
		created_at: string;
		updated_at: string;
	}

	let iframeUrl = $state<string | null>(null);
	let showModal = $state(false);
	let allProjects = $state<Project[]>([]);
	
	let innerWidth = $state(0);
	let innerHeight = $state(0);

	// Responsive breakpoints
	let isSmallWidth = $derived(innerWidth < 768);
	let isMediumWidth = $derived(innerWidth >= 768 && innerWidth < 1024);
	let isLargeWidth = $derived(innerWidth >= 1024);
	
	let isSmallHeight = $derived(innerHeight < 700);
	let isLargeHeight = $derived(innerHeight >= 700);

	// Calculate number of projects to show
	let cols = $derived(isSmallWidth ? 1 : isMediumWidth ? 2 : 3);
	let rows = $derived(isSmallHeight ? 1 : 2);
	let projectCount = $derived(cols * rows);

	// Get displayed projects - 1 random for small screens, 3 random for medium/large screens
	let displayedProjects = $derived.by(() => {
		if (allProjects.length === 0) return [];
		
		// Filter profanity from all projects
		const filteredProjects = allProjects.map(filterProjectProfanity);
		
		if (isSmallWidth) {
			// 1 random project for small screens
			const randomIndex = Math.floor(Math.random() * filteredProjects.length);
			return [filteredProjects[randomIndex]];
		} else {
			// 3 random projects for medium/large screens
			const shuffled = [...filteredProjects].sort(() => Math.random() - 0.5);
			return shuffled.slice(0, 3);
		}
	});

	let expandedProject = $state<Project | null>(null);

	function toggleExpand(project: Project) {
		if (expandedProject?.project_id === project.project_id) {
			expandedProject = null;
		} else {
			expandedProject = project;
		}
	}

	function closeExpanded() {
		expandedProject = null;
	}

	function openIframe(url: string, event: MouseEvent) {
		event.preventDefault();
		iframeUrl = url;
		showModal = true;
	}

	function closeModal() {
		showModal = false;
		iframeUrl = null;
	}

	async function loadProjects() {
		try {
			const response = await fetch('/api/projects?limit=100');
			if (!response.ok) {
				throw new Error('Failed to fetch projects');
			}
			const data = await response.json();
			allProjects = data || [];
		} catch (error) {
			console.error('Failed to load projects:', error);
			allProjects = [];
		}
	}

	onMount(() => {
		// Load projects from API
		loadProjects();

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

<div>
	<a href="/whiteboard/leaderboard" class="fixed top-12 right-12 z-50">
		<div class="flex flex-col items-center gap-2">
			<img src="/arrow.jpg" alt="Up Arrow" class="w-16 md:w-20 -rotate-90"/>
			<p class="text-3xl font-semibold">Up to Leaderboard</p>
		</div>
	</a>
	<a href="/whiteboard/" class="fixed bottom-12 right-12 z-50">
		<div class="flex flex-col items-center gap-2">
			<p class="text-3xl font-semibold">Down to Whiteboard</p>
			<img src="/arrow.jpg" alt="Down Arrow" class="w-16 md:w-20 rotate-90" />
		</div>
	</a>
</div>

<section class="min-h-screen mt-40 px-8 relative z-10">

	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
		{#each displayedProjects as project (project.project_id)}
			{@const description = project.project_description || 'No description'}
			{@const needsTruncate = description.length > 120}
			{@const displayDescription = needsTruncate ? description.slice(0, 120) + '...' : description}
			
			<div class="h-full flex">
				<ProfileCard>
					<a href={project.live_url} onclick={(e) => openIframe(project.live_url, e)} class="block">
						{#if project.attachment_urls && project.attachment_urls.length > 0}
							<img src={project.attachment_urls[0]} alt={project.project_name} class="mb-4 rounded-lg shadow-lg w-full h-48 object-cover" />
						{:else}
							<img src="/orpheuscry.png" alt={project.project_name} class="mb-4 rounded-lg shadow-lg w-full h-48 object-cover" />
						{/if}
						<h2 class="text-3xl font-medium mb-2 text-neutral-600">{project.project_name}</h2>
					</a>
					
					<div class="relative mb-2">
						<p class="text-lg font-pangolin text-neutral-700">{displayDescription}</p>
						{#if needsTruncate}
							<button 
								onclick={() => toggleExpand(project)}
								class="text-sm text-blue-400 hover:cursor-pointer hover:text-blue-300 underline mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
								aria-label="Show full description"
							>
								Show more
							</button>
						{/if}
					</div>
					
					<div class="flex gap-4 items-center mt-auto pt-0 flex-wrap text-neutral-700">
						{#if project.code_url}
							<a 
								href={project.code_url} 
								target="_blank" 
								rel="noopener noreferrer" 
								class="text-sm underline  hover:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-white rounded"
								onclick={(e) => e.stopPropagation()}
							>
								Code
							</a>
						{/if}
						<p class="text-sm">Week {project.submission_week}</p>
						<p class="text-sm">{Math.floor(project.time_spent / 60)}h {project.time_spent % 60}m</p>
					</div>
				</ProfileCard>
			</div>
		{/each}
	</div>
</section>

<!-- Expanded Description Modal -->
{#if expandedProject}
	<div class="iframe-modal" onclick={closeExpanded}>
		<div class="expanded-container" onclick={(e) => e.stopPropagation()}>
			<button class="close-button-expanded" onclick={closeExpanded} aria-label="Close expanded view">
				X
			</button>
			<div class="expanded-content">
				{#if expandedProject.attachment_urls && expandedProject.attachment_urls.length > 0}
					<img src={expandedProject.attachment_urls[0]} alt={expandedProject.project_name} class="w-full h-64 object-cover rounded-lg mb-6" />
				{:else}
					<img src="/orpheuscry.png" alt={expandedProject.project_name} class="w-full h-64 object-cover rounded-lg mb-6" />
				{/if}
				<h2 class="text-4xl font-bold mb-4 text-neutral-800">{expandedProject.project_name}</h2>
				<p class="text-xl text-neutral-700 font-pangolin mb-6 whitespace-pre-wrap">{expandedProject.project_description || 'No description'}</p>
				<div class="flex gap-6 items-center flex-wrap border-t pt-4 border-neutral-300">
					{#if expandedProject.code_url}
						<a 
							href={expandedProject.code_url} 
							target="_blank" 
							rel="noopener noreferrer" 
							class="text-lg underline text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded px-2 py-1"
						>
							View Code
						</a>
					{/if}
					{#if expandedProject.live_url}
						<a 
							href={expandedProject.live_url} 
							target="_blank" 
							rel="noopener noreferrer" 
							class="text-lg underline text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded px-2 py-1"
						>
							View Live Project
						</a>
					{/if}
					<p class="text-lg text-neutral-600">Week {expandedProject.submission_week}</p>
					<p class="text-lg text-neutral-600">Time: {Math.floor(expandedProject.time_spent / 60)}h {expandedProject.time_spent % 60}m</p>
				</div>
			</div>
		</div>
	</div>
{/if}

<!-- iframe Modal -->
{#if showModal && iframeUrl}
	<div class="iframe-modal" onclick={closeModal}>
		<div class="iframe-container" onclick={(e) => e.stopPropagation()}>
			<button class="close-button" onclick={closeModal} aria-label="Close modal">
				✕
			</button>
			<iframe src={iframeUrl} title="Project Preview" class="project-iframe"></iframe>
		</div>
	</div>
{/if}

<style>
	.iframe-modal {
		position: fixed;
		top: -20px;
		left: 0;
		width: 100vw;
		height: 103vh;
		background: rgba(0, 0, 0, 0.8);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
	}

	.iframe-container {
		position: relative;
		width: 100%;
	height: 90%;
	background: white;
	border-radius: 0;
	overflow: hidden;
	box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
}

	.close-button {
		position: absolute;
		top: 1rem;
		right: 1rem;
		width: 3rem;
		height: 3rem;
		background: rgba(0, 0, 0, 0.08);
		color: white;
		border: none;
		border-radius: 0%;
		font-size: 1.5rem;
		cursor: pointer;
		z-index: 1001;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.2s ease;
	}

	.close-button:hover {
		background: rgba(193, 14, 145, 0.628);
		transform: scale(1.1);
	}

	.project-iframe {
		width: 100%;
		height: 100%;
		border: none;
	}

	.expanded-container {
		position: relative;
		width: 90%;
		max-width: 90%;
		height: 90%;
		border-radius: 1rem;
		overflow-y: auto;
		overflow-x: hidden;
		box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
		scrollbar-width: thin;
		scrollbar-color: #404040 #f5f5f5;
		background: transparent;
	}

	.expanded-container::-webkit-scrollbar {
		width: 8px;
	}

	.expanded-container::-webkit-scrollbar-track {
		background: #f5f5f5;
	}

	.expanded-container::-webkit-scrollbar-thumb {
		background: #404040;
		border-radius: 4px;
	}

	.expanded-container::-webkit-scrollbar-thumb:hover {
		background: #525252;
	}

	.expanded-content {
		padding: 3rem;
		background-image: url('/dashboard-bg.png');
		background-size: 100% 100%;
		background-position: top center;
		background-repeat: no-repeat;
		min-height: 100%;
	}

	.close-button-expanded {
		position: absolute;
		top: 1rem;
		right: 1rem;
		width: 3rem;
		height: 3rem;
		background: rgba(0, 0, 0, 0.08);
		color: #333;
		border: none;
		border-radius: 0%;
		font-size: 2rem;
		font-family: 'Permanent Marker', cursive;
		font-weight: bold;
		cursor: pointer;
		z-index: 1001;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.2s ease;
	}

	.close-button-expanded:hover {
		background: rgba(48, 36, 45, 0.628);
		color: white;
		transform: scale(1.1) rotate(5deg);
	}
</style>
