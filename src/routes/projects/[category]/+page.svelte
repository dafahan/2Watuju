<!-- src/routes/projects/[category]/+page.svelte -->
<script>
  import { base } from '$app/paths';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import SeeMoreButton from '$lib/components/SeeMoreButton.svelte';
  import Cta from '$lib/components/Cta.svelte';
  import FeaturedProjects from '$lib/components/FeaturedProjects.svelte';

  export let data;
  $: ({ category, projects } = data);
  let touchStates = new Map();

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

  function handleBackToProjects() {
    goto(`${base}/projects`);
  }
  
  function handleProjectClick(projectSlug) {
    // Navigate to the project detail page using category ID and project slug
    goto(`${base}/projects/${category.id}/${projectSlug}`);
  }
  
  function handleImageError(event) {
    event.target.src = `${base}/images/dummy-desktop-400.webp`;
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

  // Event handlers
  function handleWorkflowClick() {
    console.log('Workflow clicked');
    // Navigate to workflow page or scroll to process section
    document.querySelector('.process-section')?.scrollIntoView({ behavior: 'smooth' });
  }

  function handleConsultationClick() {
    console.log('Consultation clicked');
    // Navigate to consultation page or scroll to CTA
    document.querySelector('.cta-section')?.scrollIntoView({ behavior: 'smooth' });
  }

  function handleProjectClickCategory(projectSlug) {
    console.log('Project clicked:', projectSlug);
    // Navigate to project detail page
    goto(`${base}/projects/${projectSlug}`);
  }

  function handleViewAllProjects() {
    console.log('View all projects clicked');
    // Navigate to projects page
    goto(`${base}/projects`);
  }
</script>

<svelte:head>
  <title>{category.name} - 2WATUJU Architecture</title>
  <meta name="description" content="{category.description}" />
  <meta name="keywords" content="{category.name.toLowerCase()}, arsitektur, desain rumah, interior design, 2watuju" />
  
  <!-- Open Graph Meta Tags -->
  <meta property="og:title" content="{category.name} - 2WATUJU Architecture" />
  <meta property="og:description" content="{category.description}" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="{category.images.desktop}" />
  
  <!-- Preload critical resources -->
  <link rel="dns-prefetch" href="https://images.unsplash.com">
</svelte:head>

<!-- Main content container -->
<div class="mx-auto overflow-x-hidden bg-gray-50 min-h-screen">
  <!-- Header Section -->
  <section class="bg-[#56AAB7] px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 2xl:px-64 py-6 sm:py-8">
    <div class="flex items-center justify-between text-white">
      <!-- Category Title -->
      <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold font-roboto-condensed uppercase tracking-wider leading-tight">
        STYLE-<br>
        {category.name.split(' ')[0]}
      </h1>
      
      <!-- Logo/Brand -->
      <div class="font-roboto-mono font-regular tracking-wider text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-right">
        2WATUJU<br>
        DESIGN
      </div>
    </div>
  </section>

  <!-- Projects List -->
  <section class="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 2xl:px-64 py-8 sm:py-12 flex flex-col justify-center items-center">
    {#each projects as project, index (project.id)}
      <div class="mb-8 sm:mb-12 lg:mb-16 max-w-6xl w-full">
        <!-- Project Header -->
        <div class="py-4 sm:py-6 border-b border-gray-100">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div class="order-2 sm:order-1">
              <h2 class="text-xl sm:text-2xl md:text-3xl font-normal font-roboto-mono text-gray-800 mb-1">
                {String(index + 1).padStart(2, '0')}.
              </h2>
              <h3 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-roboto-mono text-gray-800 uppercase tracking-wide leading-tight">
                {project.title.replace(/\n/g, ' ')}
              </h3>
            </div>
            <div class="text-left sm:text-right order-1 sm:order-2">
              <div class="text-lg sm:text-xl md:text-2xl lg:text-3xl font-roboto-mono text-gray-800 uppercase tracking-wide">
                {category.name}
              </div>
              <div class="text-sm sm:text-base md:text-lg lg:text-xl font-roboto-mono uppercase text-gray-800 mt-1">
                {project.location} - {project.year}
              </div>
            </div>
          </div>
        </div>
      
        <!-- Project Content -->
        <div class="flex flex-col">
          <!-- Project Image with Overlay -->
          <div class="flex w-full relative group cursor-pointer" on:click={() => handleProjectClick(project.slug)} role="button" tabindex="0" on:keydown={(e) => e.key === 'Enter' && handleProjectClick(project.slug)}>
            <picture class="w-full flex aspect-video sm:aspect-7/3 overflow-hidden">
              <!-- Mobile screens -->
              <source 
                media="(max-width: 639px)" 
                srcset="{project.images.mobile}&w=600 600w,
                        {project.images.mobile}&w=800 800w"
                sizes="100vw"
              />
              
              <!-- Tablet screens -->
              <source 
                media="(max-width: 1023px)" 
                srcset="{project.images.tablet}&w=700 700w,
                        {project.images.tablet}&w=900 900w"
                sizes="100vw"
              />
              
              <!-- Desktop screens -->
              <source 
                media="(min-width: 1024px)" 
                srcset="{project.images.desktop}&w=600 600w,
                        {project.images.desktop}&w=800 800w,
                        {project.images.desktop}&w=1000 1000w"
                sizes="50vw"
              />
              
              <!-- Fallback image -->
              <img 
                src="{project.images.thumbnail}" 
                alt="{project.title} - {project.location}" 
                class="w-full h-48 sm:h-56 md:h-64 lg:h-80 xl:h-96 object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
                decoding="async"
                on:error={handleImageError}
              />
            </picture>
            
            <!-- Overlay -->
            <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg" style="background-color: rgba(86, 170, 183, 0.8);">
              <h3 class="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-medium text-center px-4 font-chivo-mono">
                {project.title}
              </h3>
            </div>
          </div>
          
          <!-- Project Details -->
          <div class="py-4 sm:py-6 flex flex-col justify-between">
            <!-- Description -->
            <p class="text-gray-800 leading-relaxed text-base sm:text-lg md:text-xl mb-4 sm:mb-6 font-roboto text-pretty">
              {project.description}
            </p>
              
            <!-- Stats and Button Layout -->
            <div class="flex flex-col lg:flex-row lg:justify-between gap-6 lg:gap-8">
              <!-- Stats Grid - Responsive -->
              <div class="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 w-full lg:w-4/5">
                <!-- Land Area -->
                <div class="flex flex-row items-center justify-start gap-3">
                  <div class="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 flex items-center justify-center flex-shrink-0">
                    <img src={`${base}/icons/land.svg`} alt="Land area icon" class="object-contain w-full h-full">
                  </div>
                  <div class="flex flex-col font-roboto-mono">
                    <h4 class="font-bold text-sm sm:text-base leading-tight">LAND AREA</h4>
                    <span class="font-normal text-xs sm:text-sm md:text-base">{project.stats.land}</span>
                  </div>
                </div>

                <!-- Floor Area -->
                <div class="flex flex-row items-center justify-start gap-3">
                  <div class="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 flex items-center justify-center flex-shrink-0">
                    <img src={`${base}/icons/floor.svg`} alt="Floor area icon" class="object-contain w-full h-full">
                  </div>
                  <div class="flex flex-col font-roboto-mono">
                    <h4 class="font-bold text-sm sm:text-base leading-tight">FLOOR AREA</h4>
                    <span class="font-normal text-xs sm:text-sm md:text-base">{project.stats.floor}</span>
                  </div>
                </div>

                <!-- Room -->
                <div class="flex flex-row items-center justify-start gap-3">
                  <div class="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 flex items-center justify-center flex-shrink-0">
                    <img src={`${base}/icons/room.svg`} alt="Room icon" class="object-contain w-full h-full">
                  </div>
                  <div class="flex flex-col font-roboto-mono">
                    <h4 class="font-bold text-sm sm:text-base leading-tight">ROOM</h4>
                    <span class="font-normal text-xs sm:text-sm md:text-base">{project.stats.room}</span>
                  </div>
                </div>

                <!-- Bathroom -->
                <div class="flex flex-row items-center justify-start gap-3">
                  <div class="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 flex items-center justify-center flex-shrink-0">
                    <img src={`${base}/icons/bathroom.svg`} alt="Bathroom icon" class="object-contain w-full h-full">
                  </div>
                  <div class="flex flex-col font-roboto-mono">
                    <h4 class="font-bold text-sm sm:text-base leading-tight">BATHROOM</h4>
                    <span class="font-normal text-xs sm:text-sm md:text-base">{project.stats.bathroom}</span>
                  </div>
                </div>

                <!-- Garage -->
                <div class="flex flex-row items-center justify-start gap-3">
                  <div class="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 flex items-center justify-center flex-shrink-0">
                    <img src={`${base}/icons/garage.svg`} alt="Garage icon" class="object-contain w-full h-full">
                  </div>
                  <div class="flex flex-col font-roboto-mono">
                    <h4 class="font-bold text-sm sm:text-base leading-tight">GARAGE</h4>
                    <span class="font-normal text-xs sm:text-sm md:text-base">{project.stats.garage}</span>
                  </div>
                </div>

                <!-- Pool -->
                <div class="flex flex-row items-center justify-start gap-3">
                  <div class="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 flex items-center justify-center flex-shrink-0">
                    <img src={`${base}/icons/pool.svg`} alt="Pool icon" class="object-contain w-full h-full">
                  </div>
                  <div class="flex flex-col font-roboto-mono">
                    <h4 class="font-bold text-sm sm:text-base leading-tight">POOL</h4>
                    <span class="font-normal text-xs sm:text-sm md:text-base">{project.stats.pool}</span>
                  </div>
                </div>
              </div>

              <!-- Button Container -->
              <div class="flex w-full lg:w-1/5 min-h-16 sm:min-h-20 md:min-h-24 items-center lg:items-end justify-center lg:justify-end p-2 sm:p-4">
                <SeeMoreButton
                  text="SELENGKAPNYA"
                  onClick={() => handleProjectClick(project.slug)}
                  variant="default"
                  class="w-full lg:w-auto"
                  size="lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {#if index < projects.length - 1}
        <div class="border-t-2 w-full h-2 border-gray-200 pb-8 sm:pb-12"></div>
      {/if}
    {/each}
    
    <!-- Empty State -->
    {#if projects.length === 0}
      <div class="text-center py-16 sm:py-20">
        <div class="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
          <svg class="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 class="text-lg sm:text-xl font-bold text-gray-600 mb-2">Belum ada proyek</h3>
        <p class="text-sm sm:text-base text-gray-500 mb-6 px-4">Proyek dalam kategori {category.name} sedang dalam tahap pengembangan.</p>
        <SeeMoreButton
          text="LIHAT KATEGORI LAIN"
          onClick={handleBackToProjects}
          variant="primary"
          size="md"
        />
      </div>
    {/if}
  </section>

  <!-- CTA Section -->
  <section class="bg-[#56AAB7] text-white mx-4 sm:mx-6 md:mx-8 lg:mx-16 xl:mx-32 2xl:mx-64">
    <Cta className="" />
  </section>

  <section class="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 2xl:px-64 py-12">
    <FeaturedProjects 
      contentMode="imageOnly"
      onProjectClick={handleProjectClickCategory}
      onViewAllProjects={handleViewAllProjects}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    />
  </section>
</div>

<style>
  /* Additional styling for clean look */
  .project-card {
    transition: all 0.3s ease;
  }
  
  .project-card:hover {
    transform: translateY(-2px);
  }

  /* Touch states for mobile */
  .touch-interactive.touch-active {
    transform: scale(0.98);
    opacity: 0.9;
  }
</style>