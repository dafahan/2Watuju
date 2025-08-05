<!-- src/lib/components/ProjectPageCard.svelte -->
<script>
  import { base } from '$app/paths';
  import SeeMoreButton from './SeeMoreButton.svelte';
  
  export let project;
  export let onProjectClick = () => {};
  export let onTouchStart = () => {};
  export let onTouchEnd = () => {};
  export let imagePosition = 'left'; // 'left' or 'right' for alternating layout
  export let isLast = false; // New prop to determine if this is the last card
  
  function handleClick() {
    onProjectClick(project.id);
  }

  
  function handleImageError(event) {
    // Fallback to a placeholder image if Unsplash image fails
    event.target.src = `${base}/images/dummy-desktop-400.webp`;
  }
</script>

<div class="flex w-full py-16 flex-col lg:justify-around lg:flex-row gap-12 h-fit project-page-card group touch-interactive"
     class:lg:flex-row-reverse={imagePosition === 'right'}
     class:border-b-2={!isLast}
     class:border-gray-200={!isLast}
     on:touchstart={onTouchStart}
     on:touchend={onTouchEnd}
     on:touchcancel={onTouchEnd}>
  
  <!-- Image Container with Picture Element -->
  <div class="flex max-w-lg self-center relative overflow-hidden rounded-lg bg-gray-100">
    <picture>
      <!-- Mobile screens -->
      <source 
        media="(max-width: 639px)" 
        srcset="{project.images.mobile}&w=400 400w,
                {project.images.mobile}&w=800 800w"
        sizes="(max-width: 400px) 400px, 100vw"
      />
      
      <!-- Tablet screens -->
      <source 
        media="(max-width: 1023px)" 
        srcset="{project.images.tablet}&w=600 600w,
                {project.images.tablet}&w=900 900w"
        sizes="(max-width: 768px) 100vw, 600px"
      />
      
      <!-- Desktop screens -->
      <source 
        media="(min-width: 1024px)" 
        srcset="{project.images.desktop}&w=600 600w,
                {project.images.desktop}&w=800 800w,
                {project.images.desktop}&w=1000 1000w"
        sizes="(max-width: 1280px) 500px,
               (max-width: 1536px) 600px,
               700px"
      />
      
      <!-- Fallback image -->
      <img 
        src="{project.images.thumbnail}" 
        alt="{project.name}" 
        class="aspect-4/3 w-full object-cover rounded-lg transition-transform duration-700 group-hover:scale-105"
        width="600"
        height="450"
        loading="lazy"
        decoding="async"
        on:error={handleImageError}
      />
    </picture>
    
    <!-- Hover Overlay with Project Title -->
    <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg" style="background-color: rgba(86, 170, 183, 0.6);">
      <h3 class="text-white text-2xl sm:text-3xl md:text-4xl font-bold text-center px-4 font-roboto-mono">
        {project.name}
      </h3>
    </div>
  </div>
  
  <!-- Content Container -->
  <div class="flex w-full items-stretch flex-col gap-6 self-center max-w-2xl">
    <!-- Title and Button Row -->
    <div class="flex w-full justify-between items-start font-bold h-fit gap-4">
      <div class="flex flex-col max-w-6/9 ">
        <h2 class="text-3xl md:text-4xl lg:text-5xl leading-none group-hover:text-[#56AAB7] transition-colors duration-300 mb-2">
          {project.name}
        </h2>
        
        <!-- Location and Category -->
        <!-- <div class="flex flex-wrap gap-3 text-sm font-normal text-gray-600 mb-4">
          <span class="flex items-center gap-1">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
            </svg>
            {project.location}
          </span>
          <span class="text-gray-400">•</span>
          <span>{project.year}</span>
          {#if project.client}
            <span class="text-gray-400">•</span>
            <span>{project.client}</span>
          {/if}
        </div> -->
        
        <!-- Features Tags -->
        <!-- <div class="flex flex-wrap gap-2 mb-4">
          {#each project.features.slice(0, 4) as feature}
            <span class="px-3 py-1 bg-gray-100 hover:bg-[#56AAB7] hover:text-white text-gray-600 text-xs rounded-full font-roboto transition-colors duration-300">
              {feature}
            </span>
          {/each}
          {#if project.features.length > 4}
            <span class="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-roboto">
              +{project.features.length - 4} lainnya
            </span>
          {/if}
        </div> -->
      </div>
      
      <!-- See More Button -->
       <a href="{base}/projects/{project.id}" 
          data-sveltekit-prefetch
          >
            <SeeMoreButton
              text="SELENGKAPNYA"
              onClick={handleClick}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              ariaLabel="Lihat selengkapnya {project.name}"
              variant="default"
              size="lg"
              class="h-fit text-sm sm:text-base md:text-lg px-4 py-2 font-semibold flex-shrink-0"
            />
      </a>
    </div>
    
    <!-- Description -->
    <div class="prose prose-gray max-w-none">
      <p class="text-gray-700 leading-relaxed text-base lg:text-lg group-hover:text-gray-900 transition-colors duration-300">
        {project.description}
      </p>
    </div>
    
    <!-- Project Stats (Optional) -->
    <!-- {#if project.stats}
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
        {#each Object.entries(project.stats) as [key, value]}
          <div class="text-center">
            <div class="text-2xl font-bold text-[#56AAB7]">{value}</div>
            <div class="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
          </div>
        {/each}
      </div>
    {/if} -->
  </div>
</div>

<style>
  /* Touch states for mobile */
  .touch-interactive.touch-active {
    transform: scale(0.99);
    opacity: 0.95;
  }
  
  /* Smooth hover effects */
  .project-page-card {
    transition: all 0.3s ease;
  }
  
  .project-page-card:hover {
    transform: translateY(-2px);
  }
  
  /* Ensure proper aspect ratio */
  .aspect-4\/3 {
    aspect-ratio: 4/3;
  }
  
  /* Fallback for browsers that don't support aspect-ratio */
  @supports not (aspect-ratio: 4/3) {
    .aspect-4\/3 {
      position: relative;
    }
    
    .aspect-4\/3::before {
      content: '';
      display: block;
      padding-bottom: 75%; /* 3/4 = 75% */
    }
    
    .aspect-4\/3 img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
</style>