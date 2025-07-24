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
  <section class="py-16 xl:px-32 2xl:px-64 px-4 sm:px-8 font-roboto-mono">
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
        <div class="w-full border-t border-gray-200 pt-8 mt-8">
          <h3 class="text-2xl font-bold mb-6 text-center">PROJECT STATISTICS</h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            {#each Object.entries(project.stats) as [key, value]}
              <div class="text-center bg-gray-50 p-4 rounded-lg">
                <h4 class="uppercase text-sm font-bold text-gray-600 mb-2">{key}</h4>
                <p class="text-2xl font-bold text-[#56AAB7]">{value}</p>
              </div>
            {/each}
          </div>
        </div>
      {/if}
      
      <!-- Project Features -->
      {#if project.features && project.features.length > 0}
        <div class="w-full border-t border-gray-200 pt-8 mt-8">
          <h3 class="text-2xl font-bold mb-6 text-center">KEY FEATURES</h3>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            {#each project.features as feature}
              <div class="flex items-center gap-3 bg-white border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow duration-300">
                <div class="w-3 h-3 bg-[#56AAB7] rounded-full flex-shrink-0"></div>
                <span class="text-sm font-medium">{feature}</span>
              </div>
            {/each}
          </div>
        </div>
      {/if}
      
      <!-- Project Description -->
      <div class="w-full border-t border-gray-200 pt-8 mt-8">
        <h3 class="text-2xl font-bold mb-6 text-center">PROJECT DESCRIPTION</h3>
        <div class="max-w-3xl mx-auto">
          <p class="text-lg leading-relaxed text-gray-700 font-roboto text-center">
            {project.description}
          </p>
        </div>
      </div>
      
      <!-- Project Status -->
      <div class="w-full border-t border-gray-200 pt-8 mt-8">
        <div class="text-center">
          <h3 class="text-2xl font-bold mb-4">PROJECT STATUS</h3>
          <div class="inline-flex items-center gap-3">
            <div class="w-4 h-4 rounded-full {project.status === 'completed' ? 'bg-green-500' : project.status === 'in-progress' ? 'bg-yellow-500' : 'bg-blue-500'}"></div>
            <span class="text-lg font-semibold text-gray-800">
              {projectStatuses[project.status] || project.status}
            </span>
          </div>
          {#if project.client}
            <p class="text-gray-600 mt-2">Client: {project.client}</p>
          {/if}
        </div>
      </div>
      
      <!-- Image Gallery -->
      <div class="w-full border-t border-gray-200 pt-8 mt-8">
        <h3 class="text-2xl font-bold mb-6 text-center">PROJECT GALLERY</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {#each projectImages as imageUrl, index}
            <div class="group relative overflow-hidden rounded-lg aspect-video bg-gray-100 hover:shadow-lg transition-shadow duration-300">
              <img 
                src={imageUrl} 
                alt="{project.title} - Image {index + 1}"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                on:error={handleImageError}
              />
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
            </div>
          {/each}
        </div>
      </div>
      
      <!-- Navigation Actions -->
      <div class="w-full border-t border-gray-200 pt-8 mt-8">
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            on:click={handleBackToProjects}
            class="touch-interactive group flex items-center gap-3 px-8 py-4 border-2 border-[#56AAB7] text-[#56AAB7] rounded-full font-medium transition-all duration-300 hover:bg-[#56AAB7] hover:text-white hover:scale-105"
          >
            <ArrowLeft size={20} />
            <span>Back to Projects</span>
          </button>
          
          <button 
            on:click={handleContactClick}
            class="touch-interactive group flex items-center gap-3 px-8 py-4 bg-[#56AAB7] text-white rounded-full font-medium transition-all duration-300 hover:bg-[#4a9aa6] hover:scale-105 hover:shadow-lg"
          >
            <span>Contact Us for Similar Project</span>
            <ArrowRight size={20} />
          </button>
          
          <button 
            on:click={handleBackToHome}
            class="touch-interactive group flex items-center gap-3 px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-full font-medium transition-all duration-300 hover:border-gray-400 hover:bg-gray-50"
          >
            <Home size={20} />
            <span>Back to Home</span>
          </button>
        </div>
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
</style>