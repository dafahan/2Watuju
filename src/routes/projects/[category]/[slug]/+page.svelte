<!-- src/routes/projects/[slug]/+page.svelte -->
<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import FeaturedProjects from '$lib/components/FeaturedProjects.svelte';
  import PanoramicViewer from '$lib/components/PanoramicViewer.svelte';
  import Cta from "$lib/components/Cta.svelte";
  

  /** @type {import('./$types').PageData} */
  export let data;
  
  $: project = data.project;
  $: category = data.category;
  $: relatedProjects = data.relatedProjects;
  
  let currentImageIndex = 0;
  let touchStates = new Map();
  
  // Image gallery (for now using the same image, but you can expand this)
  $: projectImages = [
    project.images.desktop,
    project.images.tablet,
    project.images.mobile
  ];
  
  onMount(() => {
    setupMobileTouch();
  });
  
  function setupMobileTouch() {
    const interactiveElements = document.querySelectorAll('.touch-interactive');
    
    interactiveElements.forEach(element => {
      element.addEventListener('touchstart', handleTouchStart, { passive: true });
      element.addEventListener('touchend', handleTouchEnd, { passive: true });
      element.addEventListener('touchcancel', handleTouchEnd, { passive: true });
    });
  }

  function handleViewAllProjects() {
    console.log('View all projects clicked');
    // Navigate to projects page
    goto('/projects');
  }


  function handleProjectClick(projectId) {
    console.log('Project clicked:', projectId);
    // Navigate to project detail page
    goto(`/projects/${projectId}`);
  }

  function handleTouchStart(event) {
    const element = event.currentTarget;
    element.classList.add('touch-active');
    touchStates.set(element, true);
  }
  
  function handleTouchEnd(event) {
    const element = event.currentTarget;
    setTimeout(() => {
      element.classList.remove('touch-active');
      touchStates.delete(element);
    }, 150);
  }
  
  function handleBackToCategory() {
    goto(`${base}/projects/${project.categoryId}`);
  }
  
  function handleBackToProjects() {
    goto(`${base}/projects`);
  }
  
  function handleContactClick() {
    goto(`${base}/contact`);
  }
  
  function handleRelatedProjectClick(projectSlug) {
    goto(`${base}/projects/${project.categoryId}/${projectSlug}`);
  }
  
  function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % projectImages.length;
  }
  
  function prevImage() {
    currentImageIndex = currentImageIndex === 0 ? projectImages.length - 1 : currentImageIndex - 1;
  }
  
  function handleImageError(event) {
    event.target.src = `${base}/images/dummy-desktop-400.webp`;
  }

  function handleBackToHome() {
    goto(`${base}/`);
  }
</script>

<svelte:head>
  <title>{project.title.replace('\n', ' ')} - 2WATUJU Architecture</title>
  <meta name="description" content="{project.description}" />
  <meta name="keywords" content="proyek {project.title.toLowerCase()}, arsitektur {project.location.toLowerCase()}, {category.name.toLowerCase()}, 2watuju" />
  
  <!-- Open Graph Meta Tags -->
  <meta property="og:title" content="{project.title.replace('\n', ' ')} - 2WATUJU Architecture" />
  <meta property="og:description" content="{project.description}" />
  <meta property="og:image" content="{project.images.desktop}" />
  <meta property="og:type" content="article" />
  
  <!-- Preload hero image -->
  <link rel="preload" as="image" href="{project.images.desktop}" fetchpriority="high">
</svelte:head>

<!-- Main content container -->
<div class="mx-auto overflow-x-hidden">
  <!-- Panoramic Hero Section -->
  <section class="relative pt-8 sm:pt-12 md:pt-16 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
    <!-- Panoramic Viewer -->
    <div class="w-full">
      <PanoramicViewer 
        title={project.title.replace('\n', ' ')}
        subtitle="{category.name.toUpperCase()} | {project.year}"
        thumbnailUrl={project.images.desktop}
        panoramicData={project.panoramic || {}}
        hotspots={project.hotspots || []}
      />
    </div>

    <!-- Project Info -->
    <div class="flex flex-col sm:flex-row font-roboto-mono w-full justify-between items-start sm:items-center py-8 sm:py-12 border-b-2 border-gray-200 gap-4">
      <h1 class="font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight">{project.title.replace('\n', ' ')}</h1>
      <h2 class="uppercase text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-600">{category.name} | {project.year}</h2>
    </div>
  </section>
  
  <!-- Project Details Section -->
  <section class="py-12 sm:py-16 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 2xl:px-64 font-roboto-mono ">
    <div class="flex w-full border-b-2 border-gray-200 pb-8 sm:pb-12">
      <div class="max-w-5xl mx-auto flex flex-col gap-y-6 sm:gap-y-8 justify-center items-center w-full">
        
        <!-- Project Details Grid -->
        {#each Object.entries(project.projectDetails || {}) as [key, value], i}
          {#if i % 2 === 0} 
            <div class="flex w-full justify-between"> <!-- Row container -->
              <!-- Current item (left side) -->
              <div class="flex w-fit flex-col">
                <h1 class="uppercase font-bold text-3xl">
                  {key}
                </h1>
                <h2 class="text-xl">
                  {value}
                </h2>
              </div>
              
              <!-- Next item (right side) -->
              {#if Object.entries(project.projectDetails || {})[i + 1]}
                {@const [nextKey, nextValue] = Object.entries(project.projectDetails || {})[i + 1]}
                <div class="flex w-fit flex-col">
                  <h1 class="uppercase font-bold text-3xl">
                    {nextKey}
                  </h1>
                  <h2 class="text-xl">
                    {nextValue}
                  </h2>
                </div>
              {/if}
            </div>
          {/if}
        {/each}
        
        <!-- Project Statistics -->
        {#if project.stats}
          <div class="w-full pt-6 sm:pt-8 mt-6 sm:mt-8">
            <!-- Responsive grid for stats -->
            <div class="flex w-full justify-between">
              <!-- Column 1: Land Area & Room -->
              <div class="flex flex-col gap-6">
                <!-- Land Area -->
                <div class="flex flex-row items-center justify-start gap-3">
                  <div class="w-16 h-16  flex items-center justify-center flex-shrink-0">
                    <img src={`${base}/icons/land.svg`} alt="icon" class="object-contain w-16 h-16">
                  </div>
                  <div class="flex flex-col font-roboto-mono">
                    <h1 class="font-bold text-lg leading-tight">LAND AREA</h1>
                    <h2 class="font-normal text-base">{project.stats.land}</h2>
                  </div>
                </div>

                <!-- Room -->
                <div class="flex flex-row items-center justify-start gap-3">
                  <div class="w-16 h-16  flex items-center justify-center flex-shrink-0">
                    <img src={`${base}/icons/room.svg`} alt="icon" class="object-contain w-16 h-16">
                  </div>
                  <div class="flex flex-col font-roboto-mono">
                    <h1 class="font-bold text-lg leading-tight">ROOM</h1>
                    <h2 class="font-normal text-base">{project.stats.room}</h2>
                  </div>
                </div>
              </div>

              <!-- Column 2: Floor Area & Bathroom -->
              <div class="flex flex-col gap-6">
                <!-- Floor Area -->
                <div class="flex flex-row items-center justify-start gap-3">
                  <div class="w-16 h-16  flex items-center justify-center flex-shrink-0">
                    <img src={`${base}/icons/floor.svg`} alt="icon" class="object-contain w-16 h-16">
                  </div>
                  <div class="flex flex-col font-roboto-mono">
                    <h1 class="font-bold text-lg leading-tight">FLOOR AREA</h1>
                    <h2 class="font-normal text-base">{project.stats.floor}</h2>
                  </div>
                </div>

                <!-- Bathroom -->
                <div class="flex flex-row items-center justify-start gap-3">
                  <div class="w-16 h-16  flex items-center justify-center flex-shrink-0">
                    <img src={`${base}/icons/bathroom.svg`} alt="icon" class="object-contain w-16 h-16">
                  </div>
                  <div class="flex flex-col font-roboto-mono">
                    <h1 class="font-bold text-lg leading-tight">BATHROOM</h1>
                    <h2 class="font-normal text-base">{project.stats.bathroom}</h2>
                  </div>
                </div>
              </div>

              <!-- Column 3: Garage & Pool -->
              <div class="flex flex-col gap-6">
                <!-- Garage -->
                <div class="flex flex-row items-center justify-start gap-3">
                  <div class="w-16 h-16  flex items-center justify-center flex-shrink-0">
                    <img src={`${base}/icons/garage.svg`} alt="icon" class="object-contain w-16 h-16">
                  </div>
                  <div class="flex flex-col font-roboto-mono">
                    <h1 class="font-bold text-lg leading-tight">GARAGE</h1>
                    <h2 class="font-normal text-base">{project.stats.garage}</h2>
                  </div>
                </div>

                <!-- Pool -->
                <div class="flex flex-row items-center justify-start gap-3">
                  <div class="w-16 h-16  flex items-center justify-center flex-shrink-0">
                    <img src={`${base}/icons/pool.svg`} alt="icon" class="object-contain w-16 h-16">
                  </div>
                  <div class="flex flex-col font-roboto-mono">
                    <h1 class="font-bold text-lg leading-tight">POOL</h1>
                    <h2 class="font-normal text-base">{project.stats.pool}</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        {/if}

      </div>
    </div>

    <!-- Dynamic Project Content Sections -->
    <div class="flex w-full border-b-2 border-gray-200 py-8 sm:py-12 flex-col gap-12">
      {#if project.contentSections && project.contentSections.length > 0}
        {#each project.contentSections as section, index}
          <div class="flex w-full flex-col gap-6 sm:gap-8">
            <img 
              src={section.image} 
              alt={section.imageDescription || section.title} 
              class="object-cover flex aspect-video w-full shadow-lg rounded-sm"
              on:error={handleImageError}
            />
            
            <div class="space-y-4 sm:space-y-6">
              <h1 class="font-bold font-roboto-mono text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                {section.title}
              </h1>

              <div class="space-y-4 sm:space-y-6">
                <p class="text-pretty text-sm sm:text-base md:text-lg lg:text-xl font-roboto leading-relaxed">
                  {section.content}
                </p>
                
                {#if section.imageDescription}
                  <p class="text-xs sm:text-sm text-gray-600 italic font-roboto leading-relaxed">
                    {section.imageDescription}
                  </p>
                {/if}
              </div>
            </div>
          </div>
        {/each}
      {:else}
        <!-- Fallback content if no contentSections available -->
        <div class="flex w-full flex-col gap-6 sm:gap-8">
          <img 
            src={project.images.thumbnail} 
            alt="{project.title} main view" 
            class="object-cover flex aspect-video w-full shadow-lg rounded-sm"
            on:error={handleImageError}
          />
          
          <div class="space-y-4 sm:space-y-6">
            <h1 class="font-bold font-roboto-mono text-xl sm:text-2xl md:text-3xl lg:text-4xl">
              Fasad Yang Mencerminkan Kehangatan
            </h1>

            <div class="space-y-4 sm:space-y-6">
              <p class="text-pretty text-sm sm:text-base md:text-lg lg:text-xl font-roboto leading-relaxed">
                {project.description}
              </p>
              
              <p class="text-pretty text-sm sm:text-base md:text-lg lg:text-xl font-roboto leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
              
              <p class="text-pretty text-sm sm:text-base md:text-lg lg:text-xl font-roboto leading-relaxed">
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
              </p>
            </div>
          </div>
        </div>
      {/if}
    </div>
  </section>
  
  
  <section class="py-20 xl:px-32 2xl:px-64 px-4 sm:px-8 cta-section">
      <Cta/>
  </section>

  <section class="pb-20 xl:px-32 2xl:px-64 px-4 sm:px-8 cta-section">
      <FeaturedProjects 
        contentMode="nameOnly"
        onProjectClick={handleProjectClick}
        onViewAllProjects={handleViewAllProjects}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      />
  </section>

</div>

<style>
  /* Touch states for mobile */
  .touch-interactive.touch-active {
    transform: scale(0.98);
    opacity: 0.9;
  }
  
  /* Smooth transitions */
  .transition-all {
    transition: all 0.3s ease;
  }

  /* Enhanced hover effects */
  .group:hover .group-hover\:scale-105 {
    transform: scale(1.05);
  }
  
  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
</style>