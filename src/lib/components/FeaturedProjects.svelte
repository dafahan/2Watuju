<!-- src/lib/components/FeaturedProjects.svelte -->
<script>
  import { ArrowRight } from 'lucide-svelte';
  import ProjectCard from './ProjectCard.svelte';
  import { getFeaturedProjects } from '$lib/data/projects.js';
  import { base } from '$app/paths';

  
  export let onProjectClick = () => {};
  export let onViewAllProjects = () => {};
  export let onTouchStart = () => {};
  export let onTouchEnd = () => {};
  
  const featuredProjects = getFeaturedProjects();
  
  function handleProjectClick(projectSlug) {
    console.log('Project clicked:', projectSlug);
    onProjectClick(projectSlug);
  }
  
  function handleViewAllClick() {
    console.log('View all projects clicked');
    onViewAllProjects();
  }
</script>

<!-- Project Cards Grid with fixed dimensions -->
<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full gap-6 sm:gap-8 project-grid">
  {#each featuredProjects as project (project.id)}
    <ProjectCard 
      {project}
      onProjectClick={handleProjectClick}
      {onTouchStart}
      {onTouchEnd}
    />
  {/each}

  <!-- View All Projects Card with prefetching -->
  <a 
    href="{base}/projects"
    class="flex w-full h-full p-8 sm:p-12 gap-4 relative view-all-projects group mobile-card touch-interactive hover:bg-gradient-to-br hover:from-[#56AAB7] hover:to-[#4A9AA8] active:bg-gradient-to-br active:from-[#56AAB7] active:to-[#4A9AA8] transition-all duration-500 bg-gray-50 hover:shadow-2xl hover:-translate-y-2 active:shadow-2xl active:-translate-y-2 cursor-pointer border-2 border-transparent hover:border-[#56AAB7] active:border-[#56AAB7] no-underline"
    style="contain: layout; min-height: 28rem; aspect-ratio: 1/1;"
    on:click={handleViewAllClick}
    on:touchstart={onTouchStart}
    on:touchend={onTouchEnd}
    on:touchcancel={onTouchEnd}
    aria-label="Lihat semua proyek"
    data-sveltekit-preload-data="hover"
  >
    <div class="flex flex-col items-end justify-end gap-6 absolute self-center right-8 sm:right-12 transition-all duration-300 group-hover:right-6 group-active:right-6">
      <h2 class="font-medium text-end font-chivo-mono text-4xl sm:text-5xl lg:text-6xl subpixel-antialiased uppercase group-hover:text-white group-active:text-white transition-all duration-300 group-hover:tracking-wider group-active:tracking-wider" style="contain: layout;">
        Lihat<br/>
        Semua<br/>
        Proyek<br/>
      </h2>
      <div class="w-12 h-12 sm:w-14 sm:h-14 bg-[#56AAB7] text-white rounded-full cursor-pointer hover:bg-white hover:text-[#56AAB7] hover:border-2 hover:border-[#56AAB7] active:bg-white active:text-[#56AAB7] active:border-2 active:border-[#56AAB7] transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 group-active:scale-110 group-active:rotate-12 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 flex-shrink-0 flex items-center justify-center" style="contain: layout;">
        <ArrowRight class="transition-transform duration-300" size={28}/>
      </div>
    </div>
    
    <!-- Decorative elements -->
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
      <!-- Grid pattern -->
      <div class="absolute inset-0 opacity-10 group-hover:opacity-20 group-active:opacity-20 transition-opacity duration-300" 
           style="background-image: linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), 
                  linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px);
                  background-size: 20px 20px;">
      </div>
      

    </div>
  </a>
</div>

<style>
  /* Touch states for mobile */
  .touch-interactive.touch-active {
    transform: scale(0.98);
    opacity: 0.9;
  }
  
  /* Performance optimizations */
  .contain-layout {
    contain: layout style paint;
  }
  
  /* Remove default link styling */
  .no-underline {
    text-decoration: none;
  }
  
  .no-underline:hover,
  .no-underline:focus,
  .no-underline:active {
    text-decoration: none;
  }
</style>