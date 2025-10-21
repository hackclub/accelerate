<script>
    import { page } from '$app/stores';
    
    let projectName = $state('');
    let projectDescription = $state('');
    let screenshot = $state(null);
    let codeUrl = $state('');
    let liveUrl = $state('');
    let paperUrl = $state('');
    
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
</script>

<div class="min-h-screen p-8 flex flex-col items-center">
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
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {#if screenshot}
                <p class="text-sm text-gray-600 mt-2">Selected: {screenshot.name}</p>
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
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
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
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://link-to-paper.com"
            />
        </div>
        
        <!-- Submit Button -->
        <button
            type="submit"
            class="w-full  text-black font-bold py-3 px-6 rounded-lg"
        >
            Submit Project
        </button>
    </form>
</div>
