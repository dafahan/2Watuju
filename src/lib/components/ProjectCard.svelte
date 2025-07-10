<!-- src/lib/components/ProjectCard.svelte -->
<script>
  import { ExternalLink } from 'lucide-svelte';
  export let project;
</script>

<div
  class="project-card group bg-white/90 border-2 border-gray-200 rounded-2xl p-8 hover:border-blue-400 transition-all duration-500 backdrop-blur-sm cursor-pointer hover:bg-gradient-to-br hover:from-blue-50/80 hover:to-purple-50/80 shadow-lg hover:shadow-xl hover:shadow-blue-500/10"
>
  <div class="flex items-start justify-between mb-4">
    <h4 class="text-2xl font-bold text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
      {project.title}
    </h4>
    <div class="px-3 py-1 rounded-full text-xs font-medium transform group-hover:scale-110 transition-transform duration-300 border-2 {project.status === 'Live' 
      ? 'bg-green-100 text-green-800 border-green-300' 
      : 'bg-amber-100 text-amber-800 border-amber-300'}">
      {project.status}
    </div>
  </div>
  
  <p class="text-gray-600 mb-6 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
    {project.description}
  </p>
  
  <div class="flex flex-wrap gap-2 mb-6">
    {#each project.tech as tech}
      <span class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm border border-gray-200 group-hover:border-blue-300 group-hover:bg-blue-50 group-hover:text-blue-700 transition-all duration-300">
        {tech}
      </span>
    {/each}
  </div>
  
  {#if project.status === 'Live'}
    <a 
      href={project.link} 
      target="_blank" 
      rel="noopener noreferrer"
      class="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors duration-300 font-medium group-hover:transform group-hover:translate-x-2"
    >
      <span>Visit Project</span>
      <ExternalLink class="w-4 h-4 transform group-hover:rotate-45 transition-transform duration-300" />
    </a>
  {:else}
    <span class="text-gray-500 font-medium">Coming Soon...</span>
  {/if}
</div>