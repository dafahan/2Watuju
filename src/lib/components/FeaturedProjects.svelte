<!-- src/lib/components/FeaturedProjects.svelte -->
<script>
  import { ArrowRight } from 'lucide-svelte';
  import ProjectCard from './ProjectCard.svelte';
  import { getAllCategories, getCategoryById ,getFeaturedCategories} from '$lib/data/category-projects.js';
  import { base } from '$app/paths';

  export let onProjectClick = () => {};
  export let onCategoryClick = () => {};
  export let onViewAllProjects = () => {};
  export let onTouchStart = () => {};
  export let onTouchEnd = () => {};
  export let showCategories = false; // Toggle between projects and categories
  export let contentMode = 'full'; // 'full', 'nameOnly', 'imageOnly'
  
  const featuredProjects = getFeaturedCategories();
  const categories = getAllCategories();
  
  function handleProjectClick(projectSlug) {
    console.log('Project clicked:', projectSlug);
    onProjectClick(projectSlug);
  }
  
  function handleCategoryClick(categorySlug) {
    console.log('Category clicked:', categorySlug);
    onCategoryClick(categorySlug);
  }
  
  function handleViewAllClick() {
    console.log('View all projects clicked');
    onViewAllProjects();
  }

  // Get category name for project
  function getCategoryName(categoryId) {
    const category = getCategoryById(categoryId);
    return category ? category.name : 'Unknown Category';
  }
</script>

<!-- Project Cards Grid with fixed dimensions -->
<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full gap-6 sm:gap-8 project-grid">
  {#if showCategories}
    <!-- Category Cards -->
    {#each categories.slice(0, 5) as category (category.id)}
      <div 
        class="flex w-full px-4 py-6 border-b-2 border-gray-200 flex-col gap-4 font-roboto-mono overflow-hidden text-balance project-card group mobile-card touch-interactive hover:border-[#56AAB7] hover:shadow-xl active:border-[#56AAB7] active:shadow-xl transition-all duration-300 hover:-translate-y-2 active:-translate-y-2 bg-white hover:bg-gradient-to-br hover:from-white hover:to-gray-50 active:bg-gradient-to-br active:from-white active:to-gray-50 cursor-pointer"
        style="contain: layout; min-height: 28rem;"
        on:click={() => handleCategoryClick(category.id)}
        on:touchstart={onTouchStart}
        on:touchend={onTouchEnd}
        on:touchcancel={onTouchEnd}
        role="button"
        tabindex="0"
        on:keydown={(e) => e.key === 'Enter' && handleCategoryClick(category.id)}
      >
        <!-- Category Image -->
        <div class="relative overflow-hidden rounded-lg bg-gray-100" style="contain: layout;">
          <img 
            src="{base}{category.thumbnail}" 
            alt="{category.name}" 
            class="object-cover w-full h-full rounded-lg transition-transform duration-700 group-hover:scale-110 group-active:scale-110"
            width="400"
            height="250"
            loading="lazy"
            decoding="async"
            style="contain: layout;"
          />
          
          <!-- Category Overlay -->
          <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg" style="background-color: rgba(86, 170, 183, 0.6);">
            <h3 class="text-white text-xl sm:text-2xl font-bold text-center px-4 font-roboto-mono">
              {category.name}
            </h3>
          </div>
          
          <!-- Project Count Badge -->
          <div class="absolute top-2 right-2 px-2 py-1 bg-[#56AAB7] text-white text-xs rounded-full font-roboto-condensed uppercase tracking-wide z-10">
            {category.projectCount} Proyek
          </div>
        </div>
        
        <!-- Category Content -->
        <div class="flex flex-col gap-2 sm:gap-0 sm:flex-row sm:justify-between items-start sm:items-center font-bold" style="min-height: 4rem;">
          <div class="flex flex-col w-full xl:w-4/7">
            <h2 class="text-xl sm:text-2xl leading-none group-hover:text-[#56AAB7] group-active:text-[#56AAB7] transition-colors duration-300">
              {category.name}
            </h2>
          </div>
          
          <button
            class="px-4 py-2 text-sm bg-[#56AAB7] text-white rounded-lg hover:bg-[#4A9AA8] transition-colors duration-300 font-roboto-condensed uppercase tracking-wide"
            on:click|stopPropagation={() => handleCategoryClick(category.id)}
            on:touchstart={onTouchStart}
            on:touchend={onTouchEnd}
            aria-label="Lihat kategori {category.name}"
          >
            LIHAT KATEGORI
          </button>
        </div>
        
        <!-- Category Description -->
        <div style="min-height: 6rem; contain: layout;">
          <p class="leading-relaxed text-gray-600 group-hover:text-gray-800 group-active:text-gray-800 transition-colors duration-300 line-clamp-4 text-sm">
            {category.description}
          </p>
        </div>
      </div>
    {/each}
  {:else}
    <!-- Project Cards -->
    {#each featuredProjects as project (project.id)}
      <ProjectCard 
        {project}
        {contentMode}
        onProjectClick={handleProjectClick}
        {onTouchStart}
        {onTouchEnd}
      />
    {/each}
  {/if}

  <!-- View All Projects/Categories Card -->
  <a 
    href="{base}/{showCategories ? 'categories' : 'projects'}" 
    class="flex w-full h-full p-8 sm:p-12 gap-4 relative view-all-projects group mobile-card touch-interactive hover:bg-gradient-to-br hover:from-[#56AAB7] hover:to-[#4A9AA8] active:bg-gradient-to-br active:from-[#56AAB7] active:to-[#4A9AA8] transition-all duration-500 bg-gray-50 hover:shadow-2xl hover:-translate-y-2 active:shadow-2xl active:-translate-y-2 cursor-pointer border-2 border-transparent hover:border-[#56AAB7] active:border-[#56AAB7] no-underline"
    style="contain: layout; {contentMode === 'full' ? 'min-height: 28rem; aspect-ratio: 1/1;' : 'min-height: auto;'}"
    on:click={handleViewAllClick}
    on:touchstart={onTouchStart}
    on:touchend={onTouchEnd}
    on:touchcancel={onTouchEnd}
    aria-label="Lihat semua {showCategories ? 'kategori' : 'proyek'}"
    data-sveltekit-preload-data="hover"
  >
    <div class="flex flex-col items-end justify-end gap-6 absolute self-center right-8 sm:right-12 transition-all duration-300 group-hover:right-6 group-active:right-6">
      <h2 class="font-medium text-end font-chivo-mono text-4xl sm:text-5xl lg:text-6xl subpixel-antialiased uppercase group-hover:text-white group-active:text-white transition-all duration-300 group-hover:tracking-wider group-active:tracking-wider" style="contain: layout;">
        {#if showCategories}
          Lihat<br/>
          Semua<br/>
          Kategori<br/>
        {:else}
          Lihat<br/>
          Semua<br/>
          Proyek<br/>
        {/if}
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
  /* Line clamp utility */
  .line-clamp-4 {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
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