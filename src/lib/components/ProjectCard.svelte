<!-- src/lib/components/ProjectCard.svelte -->
<script>
  import { base } from '$app/paths';
  import SeeMoreButton from './SeeMoreButton.svelte';
  
  export let project;
  export let onProjectClick = () => {};
  export let onTouchStart = () => {};
  export let onTouchEnd = () => {};
  export let contentMode = 'full'; // 'full', 'nameOnly', 'imageOnly'
  
  console.log(project);
  
  function handleClick() {
    onProjectClick(project.id);
  }
  
  function handleImageError(event) {
    // Fallback to a placeholder image if Unsplash image fails
    event.target.src = `${base}/images/dummy-desktop-400.webp`;
  }

  // Determine styling based on content mode
  $: showFullContent = contentMode === 'full';
  $: showNameOnly = contentMode === 'nameOnly';
  $: showImageOnly = contentMode === 'imageOnly';
  
  // Calculate minimum height based on content mode
  $: minHeight = showImageOnly ? 'auto' : showNameOnly ? '20rem' : '28rem';
</script>

<div 
  class="flex w-full flex-col gap-4 font-roboto-mono overflow-hidden text-balance project-card group mobile-card touch-interactive hover:border-[#56AAB7] hover:shadow-xl active:border-[#56AAB7] active:shadow-xl transition-all duration-300 hover:-translate-y-2 active:-translate-y-2 bg-white hover:bg-gradient-to-br hover:from-white hover:to-gray-50 active:bg-gradient-to-br active:from-white active:to-gray-50 cursor-pointer"
  class:px-4={!showImageOnly}
  class:py-6={!showImageOnly}
  class:border-b-2={!showImageOnly}
  class:border-gray-200={!showImageOnly}
  class:p-0={showImageOnly}
  style="contain: layout; min-height: {minHeight};"
  on:click={handleClick}
  on:touchstart={onTouchStart}
  on:touchend={onTouchEnd}
  on:touchcancel={onTouchEnd}
>
  <!-- Image container with fixed aspect ratio -->
  <div class="relative overflow-hidden rounded-lg bg-gray-100" style="contain: layout;">
    <picture>
      <!-- Mobile screens -->
      <source 
        media="(max-width: 639px)" 
        srcset="{project.images.mobile},
                {project.images.mobile}"
        sizes="(max-width: 400px) 300px, 400px"
      />
      
      <!-- Tablet screens -->
      <source 
        media="(max-width: 1023px)" 
        srcset="{project.images.tablet},
                {project.images.tablet}"
        sizes="(max-width: 640px) 100vw,
               (max-width: 768px) 50vw,
               33vw"
      />
      
      <!-- Desktop screens -->
      <source 
        media="(min-width: 1024px)" 
        srcset="{project.images.desktop},
                {project.images.desktop},
                {project.images.desktop}"
        sizes="(max-width: 1280px) 400px,
               (max-width: 1536px) 500px,
               600px"
      />
      
      <!-- Fallback image -->
      <img 
        src="{project.images.thumbnail}" 
        alt="{project.name} - {project.location}" 
        class="object-cover w-full h-full rounded-lg transition-transform duration-700 group-hover:scale-110 group-active:scale-110"
        width="400"
        height="250"
        loading="lazy"
        decoding="async"
        style="contain: layout;"
        on:error={handleImageError}
      />
    </picture>
    
    <!-- Hover Overlay with Project name -->
    <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg" style="background-color: rgba(86, 170, 183, 0.8);">
      <h3 class="text-white text-xl sm:text-2xl md:text-3xl font-medium text-center px-4 font-chivo-mono uppercase">
        {project.name.replace(/\n/g, ' ')}
      </h3>
    </div>
    
    <!-- Project Status Badge -->
    <!-- {#if project.status !== 'completed'}
      <div class="absolute top-2 right-2 px-2 py-1 bg-[#56AAB7] text-white text-xs rounded-full font-roboto-condensed uppercase tracking-wide z-10">
        {project.status === 'in-progress' ? 'Dalam Proses' : 'Perencanaan'}
      </div>
    {/if} -->
  </div>
  
  <!-- Content based on mode -->
  {#if showFullContent}
    <!-- Full Content: Name + Description + Button -->
    <div class="flex flex-col gap-2 sm:gap-0 sm:flex-row sm:justify-between items-start sm:items-center font-bold" style="min-height: 4rem;">
      <div class="flex flex-col w-full xl:w-4/7">
        <h2 class="text-xl sm:text-2xl leading-none group-hover:text-[#56AAB7] group-active:text-[#56AAB7] transition-colors duration-300 uppercase">
          {project.name.replace(/\n/g, ' ')}
        </h2>
        <!-- <p class="text-sm text-gray-500 font-roboto font-normal mt-1">
          {project.location} • {project.year}
        </p> -->
      </div>
      
      <!-- Updated to use SeeMoreButton component -->
      <SeeMoreButton
        text="SELENGKAPNYA"
        onClick={handleClick}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        ariaLabel="Lihat selengkapnya {project.name.replace(/\n/g, ' ')}"
        variant="default"
        class="px-4 py-2 text-sm"
        size="md"
      />
    </div>
    
    <!-- Description with fixed height -->
    <div style="min-height: 6rem; contain: layout;">
      <p class="leading-relaxed text-gray-600 group-hover:text-gray-800 group-active:text-gray-800 transition-colors duration-300 line-clamp-4 text-sm">
        {project.description}
      </p>
    </div>
  {:else if showNameOnly}
    <!-- Name Only: Name + Button -->
    <div class="flex flex-col gap-2 sm:gap-0 sm:flex-row sm:justify-between items-start sm:items-center font-bold" style="min-height: 4rem;">
      <div class="flex flex-col w-full xl:w-4/7">
        <h2 class="text-xl sm:text-2xl leading-none group-hover:text-[#56AAB7] group-active:text-[#56AAB7] transition-colors duration-300 uppercase">
          {project.name.replace(/\n/g, ' ')}
        </h2>
        <!-- <p class="text-sm text-gray-500 font-roboto font-normal mt-1">
          {project.location} • {project.year}
        </p> -->
      </div>
      
      <!-- Updated to use SeeMoreButton component -->
      <SeeMoreButton
        text="SELENGKAPNYA"
        onClick={handleClick}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        ariaLabel="Lihat selengkapnya {project.name.replace(/\n/g, ' ')}"
        variant="default"
        class="px-4 py-2 text-sm"
        size="md"
      />
    </div>
  {/if}
  <!-- showImageOnly shows nothing additional - just the image with overlay -->
  
  <!-- Project Features -->
  <!-- <div class="flex flex-wrap gap-2">
    {#each project.features.slice(0, 3) as feature}
      <span class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-roboto">
        {feature}
      </span>
    {/each}
    {#if project.features.length > 3}
      <span class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-roboto">
        +{project.features.length - 3} lainnya
      </span>
    {/if}
  </div> -->
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
</style>