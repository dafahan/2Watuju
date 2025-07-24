<!-- src/routes/projects/+page.svelte -->
<script lang="ts">
  import { base } from '$app/paths';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import ProjectPageCard from '$lib/components/ProjectPageCard.svelte';
  import SeeMoreButton from '$lib/components/SeeMoreButton.svelte';
  import { getAllProjects, getProjectsByCategory, projectCategories } from '$lib/data/projects.js';
  import Cta from '$lib/components/Cta.svelte';
  
  let selectedCategory = 'All';
  let filteredProjects = getAllProjects();
  let touchStates = new Map();
  
  // Filter projects when category changes
  $: {
    filteredProjects = getProjectsByCategory(selectedCategory);
  }
  
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
  
  function handleTouchStart(event: TouchEvent) {
    const element = event.currentTarget as HTMLElement;
    element.classList.add('touch-active');
    touchStates.set(element, true);
  }
  
  function handleTouchEnd(event: TouchEvent) {
    const element = event.currentTarget as HTMLElement;
    setTimeout(() => {
      element.classList.remove('touch-active');
      touchStates.delete(element);
    }, 150);
  }
  
  function handleCategoryChange(category: string) {
    selectedCategory = category;
  }
  
  
  function handleBackToHome() {
    goto('/');
  }
</script>

<svelte:head>
  <title>Proyek Pilihan Kami - 2WATUJU Architecture</title>
  <meta name="description" content="Jelajahi koleksi proyek arsitektur dan interior terbaik dari 2WATUJU. Dari rumah minimalis modern hingga desain klasik elegant, lihat karya-karya yang menginspirasi." />
  <meta name="keywords" content="proyek arsitektur, portfolio arsitek, desain rumah lampung, interior design, modern house, 2watuju projects" />
  
  <!-- Open Graph Meta Tags -->
  <meta property="og:title" content="Proyek Pilihan Kami - 2WATUJU Architecture" />
  <meta property="og:description" content="Jelajahi koleksi proyek arsitektur dan interior terbaik dari 2WATUJU." />
  <meta property="og:type" content="website" />
  
  <!-- Preload critical resources -->
  <link rel="dns-prefetch" href="https://images.unsplash.com">
</svelte:head>

<!-- Main content container -->
<div class="mx-auto overflow-x-hidden">
  <!-- Hero Section -->
  <section class="h-40 md:h-60 flex w-full bg-[#56AAB7] font-roboto-condensed text-center items-center justify-center text-4xl md:text-5xl lg:text-6xl uppercase text-white font-bold tracking-widest relative">
    <div class="absolute inset-0 bg-gradient-to-r from-[#56AAB7] via-[#4A9AA8] to-[#56AAB7] opacity-50"></div>
    <h1 class="relative z-10">PROYEK PILIHAN KAMI</h1>
    
    <!-- Back to Home Button -->
    <div class="absolute top-4 left-4 z-20">

    </div>  
  </section>
  
  <!-- Filter Section -->
  <!-- <section class="py-8 xl:px-32 2xl:px-64 px-4 sm:px-8 bg-gray-50">
    <div class="flex flex-wrap gap-3 justify-center md:justify-start">
      {#each projectCategories as category}
        <button
          class="px-4 py-2 rounded-full border-2 transition-all duration-300 font-roboto-condensed text-sm font-medium"
          class:bg-[#56AAB7]={selectedCategory === category}
          class:text-white={selectedCategory === category}
          class:border-[#56AAB7]={selectedCategory === category}
          class:bg-white={selectedCategory !== category}
          class:text-[#56AAB7]={selectedCategory !== category}
          class:border-gray-300={selectedCategory !== category}
          class:hover:border-[#56AAB7]={selectedCategory !== category}
          class:hover:text-[#56AAB7]={selectedCategory !== category}
          on:click={() => handleCategoryChange(category)}
        >
          {category === 'All' ? 'Semua' : category}
        </button>
      {/each}
    </div> -->
    
    <!-- Project Count -->
    <!-- <div class="mt-4 text-center md:text-left">
      <p class="text-gray-600 font-roboto text-sm">
        Menampilkan {filteredProjects.length} proyek
        {selectedCategory !== 'All' ? `dalam kategori ${selectedCategory}` : ''}
      </p>
    </div>
  </section> -->

  <!-- Projects Section -->
  <section class="py-20 xl:px-32 2xl:px-64 px-4 sm:px-8 flex flex-col">
    <!-- Projects Cards with Alternating Layout -->
    {#each filteredProjects as project, index (project.id)}
      <ProjectPageCard
        {project}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        imagePosition='left'
      />
    {/each}
    
    <!-- Empty State -->
    {#if filteredProjects.length === 0}
      <div class="text-center py-20">
        <div class="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
          <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-600 mb-2">Belum ada proyek</h3>
        <p class="text-gray-500 mb-6">Proyek dalam kategori ini sedang dalam tahap pengembangan.</p>
        <SeeMoreButton
          text="LIHAT SEMUA PROYEK"
          onClick={() => handleCategoryChange('All')}
          variant="primary"
          class="py-2 px-4"
          size="md"
        />
      </div>
    {/if}
    
    <!-- Call to Action -->
    <Cta className="mt-12"/>
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
  
  /* Filter button hover effects */
  button:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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