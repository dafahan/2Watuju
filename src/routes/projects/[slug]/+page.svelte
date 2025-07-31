<!-- src/routes/projects/[slug]/+page.svelte -->
<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import { ArrowLeft, ArrowRight, MapPin, Calendar, User, Building, Clock, Layers, Home } from 'lucide-svelte';
  import SeeMoreButton from '$lib/components/SeeMoreButton.svelte';
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import PanoramicViewer from '$lib/components/PanoramicViewer.svelte';
  import { projectStatuses } from '$lib/data/projects.js';
  
  /** @type {import('./$types').PageData} */
  export let data;
  
  $: project = data.project;
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
  
  function handleBackToProjects() {
    goto('/projects');
  }
  
  function handleContactClick() {
    goto('/contact');
  }
  
  function handleRelatedProjectClick(projectSlug) {
    goto(`/projects/${projectSlug}`);
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
    goto('/');
  }
</script>

<svelte:head>
  <title>{project.title.replace('\n', ' ')} - 2WATUJU Architecture</title>
  <meta name="description" content="{project.description}" />
  <meta name="keywords" content="proyek {project.title.toLowerCase()}, arsitektur {project.location.toLowerCase()}, {project.category.toLowerCase()}, 2watuju" />
  
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
  <section class="relative pt-16 xl:px-32 2xl:px-64 px-4 sm:px-8">
    <!-- Panoramic Viewer -->
    <div class="w-full">
      <PanoramicViewer 
        title={project.title.replace('\n', ' ')}
        subtitle="{project.category.toUpperCase()} | {project.year}"
        thumbnailUrl={project.images.desktop}
        panoramicData={project.panoramic || {}}
        hotspots={project.hotspots || []}
      />
    </div>

    <!-- Project Info -->
    <div class="flex font-roboto-mono text-4xl w-full justify-between items-center py-12 border-b-2 border-gray-200">
      <h1 class="font-semibold">{project.title.replace('\n', ' ')}</h1>
      <h2 class="uppercase">{project.category} | {project.year}</h2>
    </div>
  </section>
  
  <!-- Project Details Section -->
  <section class="py-16 xl:px-32 2xl:px-64 px-4 sm:px-8 font-roboto-mono border-b-2 border-gray-200">
    <div class="flex w-full border-b-2 border-gray-200 pb-12">
      <div class="max-w-5xl mx-auto flex flex-col gap-y-8 justify-center items-center">
        
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
          <div class="w-full pt-8 mt-8">
            <!-- Use flexbox with justify-between for 3 columns -->
            <div class="flex w-full justify-between">
              <!-- Column 1: Land Area & Room -->
              <div class="flex flex-col gap-6">
                <!-- Land Area -->
                <div class="flex flex-row items-center justify-start gap-3">
                  <div class="w-16 h-16  flex items-center justify-center flex-shrink-0">
                    <img src={`${base}/icons/land.webp`} alt="icon" class="object-contain w-16 h-16">
                  </div>
                  <div class="flex flex-col font-roboto-mono">
                    <h1 class="font-bold text-lg leading-tight">LAND AREA</h1>
                    <h2 class="font-normal text-base">{project.stats.land}</h2>
                  </div>
                </div>

                <!-- Room -->
                <div class="flex flex-row items-center justify-start gap-3">
                  <div class="w-16 h-16  flex items-center justify-center flex-shrink-0">
                    <img src={`${base}/icons/room.webp`} alt="icon" class="object-contain w-16 h-16">
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
                    <img src={`${base}/icons/floor.webp`} alt="icon" class="object-contain w-16 h-16">
                  </div>
                  <div class="flex flex-col font-roboto-mono">
                    <h1 class="font-bold text-lg leading-tight">FLOOR AREA</h1>
                    <h2 class="font-normal text-base">{project.stats.floor}</h2>
                  </div>
                </div>

                <!-- Bathroom -->
                <div class="flex flex-row items-center justify-start gap-3">
                  <div class="w-16 h-16  flex items-center justify-center flex-shrink-0">
                    <img src={`${base}/icons/bathroom.webp`} alt="icon" class="object-contain w-16 h-16">
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
                    <img src={`${base}/icons/garage.webp`} alt="icon" class="object-contain w-16 h-16">
                  </div>
                  <div class="flex flex-col font-roboto-mono">
                    <h1 class="font-bold text-lg leading-tight">GARAGE</h1>
                    <h2 class="font-normal text-base">{project.stats.garage}</h2>
                  </div>
                </div>

                <!-- Pool -->
                <div class="flex flex-row items-center justify-start gap-3">
                  <div class="w-16 h-16  flex items-center justify-center flex-shrink-0">
                    <img src={`${base}/icons/pool.webp`} alt="icon" class="object-contain w-16 h-16">
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
    <div class="flex w-full border-b-2 border-gray-200 py-12">
        <div class="flex w-full py-8 flex-col gap-4" >
          <img src={project.images.desktop} alt="thumb" class="object-cover flex aspect-video w-full shadow-lg rounded-sm mb-12"/>
          <h1 class="font-bold font-roboto-mono text-xl lg:text-3xl xl:text-5xl">Fasad Yang Mencerminkan Kehangatan</h1>

          <p class="text-pretty text-sm lg:text-base xl:text-xl font-roboto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            <br/> <br/>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
    </div>
  

  </section>
  
  
  <!-- Related Projects Section -->
  {#if relatedProjects && relatedProjects.length > 0}
    <section class="py-16 xl:px-32 2xl:px-64 px-4 sm:px-8 bg-gray-50">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <h3 class="text-3xl font-bold font-roboto-condensed text-gray-800 mb-4">
            RELATED PROJECTS
          </h3>
          <p class="text-gray-600 font-roboto max-w-2xl mx-auto">
            Explore other architectural projects with similar style or concept
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {#each relatedProjects as relatedProject}
            <div class="touch-interactive cursor-pointer group" on:click={() => handleRelatedProjectClick(relatedProject.slug)}>
              <ProjectCard 
                project={relatedProject}
                showCategory={true}
                className="h-full transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl"
              />
            </div>
          {/each}
        </div>
        
        <div class="text-center mt-12">
          <SeeMoreButton 
            text="View All Projects"
            href="/projects"
            className="touch-interactive"
          />
        </div>
      </div>
    </section>
  {/if}
  
  <!-- Call to Action Section -->
  <section class="py-16 xl:px-32 2xl:px-64 px-4 sm:px-8 bg-[#56AAB7]">
    <div class="max-w-4xl mx-auto text-center text-white">
      <h3 class="text-3xl md:text-4xl font-bold font-roboto-condensed mb-6">
        READY TO START YOUR PROJECT?
      </h3>
      <p class="text-lg font-roboto mb-8 opacity-90">
        Let's discuss your vision and create something extraordinary together. 
        Our team is ready to bring your architectural dreams to life.
      </p>
      
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <button 
          on:click={handleContactClick}
          class="touch-interactive group flex items-center gap-3 px-8 py-4 bg-white text-[#56AAB7] rounded-full font-bold transition-all duration-300 hover:bg-gray-100 hover:scale-105 hover:shadow-lg"
        >
          <span>Start Your Consultation</span>
          <ArrowRight size={20} />
        </button>
        
        <a 
          href="tel:+6285383839900"
          class="touch-interactive group flex items-center gap-3 px-8 py-4 border-2 border-white text-white rounded-full font-medium transition-all duration-300 hover:bg-white hover:text-[#56AAB7]"
        >
          <span>Call: 0853-8383-9900</span>
        </a>
      </div>
      
      <div class="mt-8 pt-8 border-t border-white/20">
        <p class="text-sm opacity-75 font-roboto">
          📧 2watujudesign@gmail.com | 📍 Bandar Lampung, Indonesia
        </p>
      </div>
    </div>
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

  /* Mobile optimizations */
  @media (max-width: 768px) {
    .font-roboto-mono.text-4xl {
      font-size: 1.5rem;
    }
    
    .flex.justify-between {
      flex-direction: column;
      gap: 1rem;
      text-align: center;
    }
  }

    .stat-card {
    min-height: 120px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
  
  /* Mobile adjustments */
  @media (max-width: 768px) {
    .grid-cols-3 {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .grid-cols-3 > :last-child:nth-child(odd) {
      grid-column: 1 / -1;
      justify-self: center;
    }
  }
</style>