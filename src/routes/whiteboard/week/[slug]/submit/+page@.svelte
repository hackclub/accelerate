<script>
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    
    let projectName = $state('');
    let projectDescription = $state('');
    let screenshot = $state(null);
    let codeUrl = $state('');
    let liveUrl = $state('');
    let paperUrl = $state('');
    let hoverbutton = $state(false);
    let innerWidth = $state(0);
    let middle2 = $derived(innerWidth < 1755);
    
    const slug = $derived($page.params.slug);
    
    let fileInput;
    
    function handleFileChange(event) {
        const file = event.target.files?.[0];
        if (file) {
            screenshot = file;
        }
    }
    
    async function handleSubmit(event) {
        event.preventDefault();
        
        const formData = {
            projectName,
            projectDescription,
            screenshot,
            codeUrl,
            liveUrl,
            submissionWeek: slug,
            paperUrl
        };
        
        console.log('Form submitted:', formData);
        // TODO: Add submission logic here
    }

    onMount(() => {
        const updateSize = () => {
            innerWidth = window.innerWidth;
        };

        updateSize();

        window.addEventListener('resize', updateSize);

        return () => {
            window.removeEventListener('resize', updateSize);
        };
    });
</script>
 <div class="absolute inset-0 z-0">
        <img src="/top-whiteboard.png" alt="" class="w-full h-auto block" />
        {#if middle2}
        <img src="/middle-whiteboard.png" alt="" class="w-full h-auto block" />
        {:else}
        <img src="/middle-2-whiteboard.png" alt="" class="w-full h-auto block" />
        {/if}
        <img src="/bottom-whiteboard.png" alt="" class="w-full h-auto block" />
</div>
<div class="min-h-screen p-20 flex flex-col items-center z-50 relative">
    <h1 class="text-5xl font-bold mb-8">Let's go!!! You're ready to submit!!</h1>
    
    <form onsubmit={handleSubmit} class="w-full max-w-2xl space-y-6">
        <!-- Project Name -->
        <div>
            <label for="projectName" class="block text-lg font-semibold mb-2">
                Project Name *
            </label>
            <input
                id="projectName"
                type="text"
                bind:value={projectName}
                required
                class={projectName ? "w-full px-4 py-2 rounded-lg ring-2 ring-green-400 focus:ring-blue-500" : "w-full px-4 py-2 rounded-lg focus:outline-none ring-2 ring-black focus:ring-blue-500"}
                placeholder="Enter your project name"
            />
        </div>
        
        <!-- Project Description -->
        <div>
            <label for="projectDescription" class="block text-lg font-semibold mb-2">
                Project Description *
            </label>
            <textarea
                id="projectDescription"
                bind:value={projectDescription}
                required
                rows="6"
                class={projectDescription ? "w-full px-4 py-2 rounded-lg ring-2 ring-green-400 focus:ring-blue-500" : "w-full px-4 py-2 rounded-lg focus:outline-none ring-2 ring-black focus:ring-blue-500"}
                placeholder="Describe your project in detail"
            ></textarea>
        </div>
        
        <!-- Screenshot -->
        <div>
            <label for="screenshot" class="block text-lg font-semibold mb-2">
                Screenshot *
            </label>
            <input
                id="screenshot"
                type="file"
                accept="image/*"
                onchange={handleFileChange}
                bind:this={fileInput}
                required
                class={screenshot ? "w-full px-4 py-2 rounded-lg ring-2 ring-green-400 focus:ring-blue-500" : "w-full px-4 py-2 rounded-lg focus:outline-none ring-2 ring-black focus:ring-blue-500"}
            />
            {#if screenshot}
                <p class="text-sm text-gray-600 mt-2">Selected: <span class="font-bold">{screenshot.name}</span></p>
            {/if}
        </div>
        
        <!-- Code URL -->
        <div>
            <label for="codeUrl" class="block text-lg font-semibold mb-2">
                Code URL *
            </label>
            <input
                id="codeUrl"
                type="url"
                bind:value={codeUrl}
                required
                class={codeUrl ? "w-full px-4 py-2 rounded-lg ring-2 ring-green-400 focus:ring-blue-500" : "w-full px-4 py-2 rounded-lg focus:outline-none ring-2 ring-black focus:ring-blue-500"}
                placeholder="https://github.com/username/repo"
            />
        </div>
        
        <!-- Live URL -->
        <div>
            <label for="liveUrl" class="block text-lg font-semibold mb-2">
                Live URL *
            </label>
            <input
                id="liveUrl"
                type="url"
                bind:value={liveUrl}
                required
                class={liveUrl ? "w-full px-4 py-2 rounded-lg ring-2 ring-green-400 focus:ring-blue-500" : "w-full px-4 py-2 rounded-lg focus:outline-none ring-2 ring-black focus:ring-blue-500"}
                placeholder="https://your-project.com"
            />
        </div>
        
        <!-- Submission Week (Display Only) -->
        <div>
            <label class="block text-lg font-semibold mb-2">
                Submission Week
            </label>
            <input
                type="text"
                value={slug}
                disabled
                class={slug ? "w-full px-4 py-2 rounded-lg ring-2 ring-green-400 focus:ring-blue-500" : "w-full px-4 py-2 rounded-lg focus:outline-none ring-2 ring-black focus:ring-blue-500"}
            />
        </div>
        
        <!-- Paper URL (Optional) -->
        <div>
            <label for="paperUrl" class="block text-lg font-semibold mb-2">
                Paper URL <span class="text-sm font-normal text-gray-500">(Optional)</span>
            </label>
            <input
                id="paperUrl"
                type="url"
                bind:value={paperUrl}
                class={paperUrl ? "w-full px-4 py-2 rounded-lg ring-2 ring-green-400 focus:ring-blue-500" : "w-full px-4 py-2 rounded-lg focus:outline-none ring-2 ring-black focus:ring-blue-500"}
                placeholder="https://link-to-paper.com"
            />
        </div>
        
        <!-- Submit Button -->
        <button
            type="submit"
            class="w-full text-black font-bold  rounded-lg"
            onmouseenter={() => (hoverbutton = true)}
            onmouseleave={() => (hoverbutton = false)}
        >
            <img src={hoverbutton ? "/yay.png" : "/submit.png"} alt="Submit Project" class={middle2 ? "mx-auto w-80" : "mx-auto w-30"} />
        </button>
    </form>
</div>
<button class="hover:cursor-pointer absolute top-20 left-20 z-50" onclick={() => history.back()}>
    <img src="/back.png" alt="Back Button" class=" w-20"/>
</button>