<!-- Optimized +page.svelte with immediate image rendering -->
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { ArrowRight } from 'lucide-svelte';
  import { base } from '$app/paths';
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);

  let cleanup: (() => void) | null = null;
  let touchStates = new Map();

  onMount(() => {
    // Delay animations until fonts are loaded
    if (document.fonts) {
      document.fonts.ready.then(() => {
        initializeAnimations();
      });
    } else {
      // Fallback for browsers without font loading API
      setTimeout(initializeAnimations, 100);
    }
    
    setupMobileTouch();
  });

  onDestroy(() => {
    if (cleanup) {
      cleanup();
    }
  });

  function initializeAnimations() {
    // Hero section animations with reduced motion
    const heroImageTl = gsap.timeline();
    heroImageTl
      .fromTo('.hero-image', 
        { opacity: 0, y: 20, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power2.out' }
      )
      .fromTo('.hero-buttons', 
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.3'
      );

    // Other animations...
    cleanup = () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }

  function setupMobileTouch() {
    const interactiveElements = document.querySelectorAll('.touch-interactive');
    
    interactiveElements.forEach(element => {
      element.addEventListener('touchstart', handleTouchStart, { passive: true });
      element.addEventListener('touchend', handleTouchEnd, { passive: true });
      element.addEventListener('touchcancel', handleTouchEnd, { passive: true });
    });
  }
  // @ts-ignore

  function handleTouchStart(event) {
    const element = event.currentTarget;
    element.classList.add('touch-active');
    touchStates.set(element, true);
  }
  // @ts-ignore
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
  }

  function handleConsultationClick() {
    console.log('Consultation clicked');
  }
  // @ts-ignore

  function handleProjectClick(projectId) {
    console.log('Project clicked:', projectId);
  }

  function handleViewAllProjects() {
    console.log('View all projects clicked');
  }

  function handleImageLoad() {
    console.log('✅ Hero image loaded successfully');
  }

  function handleImageError() {
    console.error('❌ Hero image failed to load');
  }
</script>

<svelte:head>
  <title>2WATUJU - Arsitektur & Interior Lampung</title>
  <meta name="description" content="Dirancang secara kolaboratif dan penuh makna, dari awal hingga generasi berikutnya." />
  
  <!-- Critical resource hints for faster loading -->
  <link rel="preload" as="image" href="https://pub-da54bf79f89f4f2980788c758f380531.r2.dev/hero.webp" fetchpriority="high">
  <link rel="dns-prefetch" href="https://pub-da54bf79f89f4f2980788c758f380531.r2.dev">
  
  <!-- Critical inline CSS for immediate rendering -->
  <style>
    .hero-critical {
      background-color: #56AAB7;
      min-height: 60vh;
      contain: layout style paint;
    }
    
    .hero-image-container {
      position: relative;
      width: 100%;
      height: auto;
      contain: layout style paint;
    }
    
    .hero-image-critical {
      width: 100%;
      height: auto;
      display: block;
      object-fit: contain;
    }
    
    @media (min-width: 1280px) {
      .hero-critical {
        min-height: 100vh;
      }
    }
  </style>
</svelte:head>

<!-- Main content container -->
<div class="mx-auto overflow-x-hidden">
  <!-- Hero Section with immediate image visibility -->
  <section class="hero-critical h-[90vh] xl:min-h-screen 2xl:px-64 pt-24 md:pt-12 pb-12 md:pb-24 flex justify-start items-center xl:justify-center flex-col relative w-full transition-all duration-300">
    
    <!-- Image Container - Simplified, no layering -->
    <div class="hero-image-container w-full md:max-w-7xl xl:max-w-none">
      <!-- Main Image - Direct render, no placeholder -->
<picture>
  <!-- Mobile screens -->
  <source 
    media="(max-width: 767px)" 
    srcset="{base}/images/hero-mobile-400.webp 400w,
            {base}/images/hero-mobile-800.webp 800w"
    sizes="100vw"
  />
  
  <!-- Tablet screens -->
  <source 
    media="(max-width: 1023px)" 
    srcset="{base}/images/hero-tablet-800.webp 800w,
            {base}/images/hero-tablet-1200.webp 1200w"
    sizes="100vw"
  />
  
  <!-- Desktop screens -->
  <source 
    media="(min-width: 1024px)" 
    srcset="{base}/images/hero-desktop-1200.webp 1200w,
            {base}/images/hero-desktop-1600.webp 1600w,
            {base}/images/hero-desktop-2000.webp 2000w"
    sizes="(max-width: 1400px) 1200px,
           (max-width: 1800px) 1600px,
           2000px"
  />
  
  <!-- Fallback image -->
  <img 
    src="{base}/images/hero-desktop-1200.webp" 
    alt="2WATUJU Architecture Hero" 
    class="object-contain w-full"
    loading="eager"
    fetchpriority="high"
    decoding="async"
  />
</picture>
    </div>
    
    <!-- Buttons with better loading state -->
    <div class="hero-buttons flex w-full justify-center items-center gap-8 sm:gap-16 lg:gap-24 px-4 mt-8" style="min-height: 6rem;">
      <button 
        class="flex font-roboto-condensed text-white gap-4 sm:gap-6 items-center group p-2 rounded-lg transition-transform duration-200 hover:scale-105 touch-interactive"
        on:click={handleWorkflowClick}
        on:touchstart={handleTouchStart}
        on:touchend={handleTouchEnd}>
        <div class="w-12 h-12 sm:w-14 sm:h-14 bg-white text-[#56AAB7] rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:bg-transparent hover:text-white hover:border-2 hover:border-white">
          <ArrowRight class="group-hover:rotate-12 duration-300 w-5 h-5 sm:w-7 sm:h-7" />
        </div>
        <div class="flex flex-col text-sm sm:text-lg">
          <span class="font-bold">ALUR KERJA</span>
          <span>PROYEK KITA</span>
        </div>
      </button>

      <button 
        class="flex font-roboto-condensed text-white gap-4 sm:gap-6 items-center group p-2 rounded-lg transition-transform duration-200 hover:scale-105 touch-interactive"
        on:click={handleConsultationClick}
        on:touchstart={handleTouchStart}
        on:touchend={handleTouchEnd}>
        <div class="w-12 h-12 sm:w-14 sm:h-14 bg-white text-[#56AAB7] rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:bg-transparent hover:text-white hover:border-2 hover:border-white">
          <ArrowRight class="group-hover:rotate-12 duration-300 w-5 h-5 sm:w-7 sm:h-7" />
        </div>
        <div class="flex flex-col text-sm sm:text-lg">
          <span>JADWALKAN</span>
          <span class="font-bold">KONSULTASI</span>
        </div>
      </button>
    </div>
  </section>

  <!-- About Section with CLS prevention -->
  <section class="py-20 xl:px-32 2xl:px-64 px-4 sm:px-8" style="contain: layout; min-height: 60vh;">
    <div class="flex w-full flex-col gap-16 sm:gap-24">
      <div class="flex flex-col lg:flex-row items-start justify-between gap-12">
        <!-- Main Title with reserved space -->
        <div class="lg:flex-1" style="contain: layout;">
          <h1 class="text-2xl sm:text-3xl lg:text-4xl about-title leading-tight hover:text-[#56AAB7] active:text-[#56AAB7] transition-colors duration-500 cursor-default" style="min-height: 8rem;">
            DIRANCANG SECARA KOLABORATIF <br/>
            <span class="tracking-wide">DAN PENUH MAKNA.— DARI AWAL</span><br/> 
            HINGGA GENERASI BERIKUTNYA.
          </h1>
        </div>

        <!-- About Cards with fixed dimensions -->
        <div class="flex flex-col sm:flex-row gap-8 lg:gap-8">
          <div class="flex flex-col gap-4 w-full max-w-xs sm:max-w-sm md:max-w-md about-cards group touch-interactive" style="contain: layout; min-height: 16rem;">
            <h3 class="font-chivo-mono text-balance uppercase tracking-wide group-hover:text-[#56AAB7] group-active:text-[#56AAB7] transition-colors duration-300">
              LOCAL INTELLIGENCE
            </h3>
            <div class="flex flex-col gap-2 text-balance">
              <p class="font-roboto text-sm leading-relaxed group-hover:text-gray-600 group-active:text-gray-600 transition-colors duration-300">
                Setiap ruang kami hadirkan bukan<br/>
                hanya untuk ditinggali, tapi juga <br/>
                menyatu dengan nilai dan narasi<br/>
                lokal yang hidup di sekitarnya.
              </p>
              <p class="font-roboto text-sm leading-relaxed group-hover:text-gray-600 group-active:text-gray-600 transition-colors duration-300">
                Dengan mengintegrasikan gaya<br/>
                hidup setiap keluarga ke dalam<br/>
                setiap rumah yang kami rancang<br/>
                terutama Masyarakat Lampung.
              </p>
            </div>
          </div>

          <div class="flex flex-col gap-4 w-full max-w-xs sm:max-w-sm md:max-w-md about-cards group touch-interactive" style="contain: layout; min-height: 16rem;">
            <h3 class="font-chivo-mono text-balance uppercase tracking-wide group-hover:text-[#56AAB7] group-active:text-[#56AAB7] transition-colors duration-300">
              PREMIUM & PERSONAL
            </h3>
            <div class="flex flex-col gap-2 text-balance">
              <p class="font-roboto text-sm leading-relaxed group-hover:text-gray-600 group-active:text-gray-600 transition-colors duration-300">
                Kami memulai setiap rancangan<br/>
                dengan mendengarkan seluruh<br/>
                kisah dan Cerita. 
              </p>
              <p class="font-roboto text-sm leading-relaxed group-hover:text-gray-600 group-active:text-gray-600 transition-colors duration-300">
                Bukan sekadar sebagai arsitek,<br/>
                tapi sebagai Sahabat Anda yang<br/>
                berjalan bersama sejak awal<br/>
                hingga rumah itu hidup <br/>sepenuhnya.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Project Cards Grid with fixed dimensions -->
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full gap-6 sm:gap-8 project-grid">
        {#each Array(5) as _, index}
          <div class="flex w-full px-4 py-6 border-b-2 border-gray-200 flex-col gap-4 font-roboto-mono overflow-hidden text-balance project-card group mobile-card touch-interactive hover:border-[#56AAB7] hover:shadow-xl active:border-[#56AAB7] active:shadow-xl transition-all duration-300 hover:-translate-y-2 active:-translate-y-2 bg-white hover:bg-gradient-to-br hover:from-white hover:to-gray-50 active:bg-gradient-to-br active:from-white active:to-gray-50"
               style="contain: layout; min-height: 28rem;"
               on:touchstart={handleTouchStart}
               on:touchend={handleTouchEnd}
               on:touchcancel={handleTouchEnd}>
            
            <!-- Image container with fixed aspect ratio -->
            <div class="relative overflow-hidden rounded-lg bg-gray-100" style="aspect-ratio: 16/10; contain: layout;">
<picture>
  <!-- Mobile screens -->
  <source 
    media="(max-width: 639px)" 
    srcset="{base}/images/dummy-mobile-300.webp 300w,
            {base}/images/dummy-mobile-600.webp 600w"
    sizes="(max-width: 400px) 300px, 400px"
  />
  
  <!-- Tablet screens -->
  <source 
    media="(max-width: 1023px)" 
    srcset="{base}/images/dummy-tablet-400.webp 400w,
            {base}/images/dummy-tablet-600.webp 600w"
    sizes="(max-width: 640px) 100vw,
           (max-width: 768px) 50vw,
           33vw"
  />
  
  <!-- Desktop screens -->
  <source 
    media="(min-width: 1024px)" 
    srcset="{base}/images/dummy-desktop-400.webp 400w,
            {base}/images/dummy-desktop-600.webp 600w,
            {base}/images/dummy-desktop-800.webp 800w"
    sizes="(max-width: 1280px) 400px,
           (max-width: 1536px) 500px,
           600px"
  />
  
  <!-- Fallback image -->
  <img 
    src="{base}/images/dummy-desktop-400.webp" 
    alt="Classic Style Project {index + 1}" 
    class="object-cover w-full h-full rounded-lg transition-transform duration-700 group-hover:scale-110 group-active:scale-110"
    width="400"
    height="250"
    loading="lazy"
    decoding="async"
    style="contain: layout;"
  />
</picture>
            </div>
            
            <!-- Content with fixed minimum height -->
            <div class="flex justify-between items-center font-bold" style="min-height: 4rem;">
              <h2 class="text-xl sm:text-2xl leading-none group-hover:text-[#56AAB7] group-active:text-[#56AAB7] transition-colors duration-300">
                CLASSIC<br/>STYLE
              </h2>
              <button 
                class="flex border-2 border-gray-200 rounded-full text-black bg-white px-4 hover:bg-[#56AAB7] hover:text-white hover:border-[#56AAB7] active:bg-[#56AAB7] active:text-white active:border-[#56AAB7] py-2 items-center transition-all duration-300 justify-between gap-2 text-sm group/btn cursor-pointer hover:shadow-lg hover:scale-105 active:shadow-lg active:scale-105 focus:outline-none focus:ring-2 focus:ring-[#56AAB7] focus:ring-opacity-50 touch-interactive whitespace-nowrap flex-shrink-0"
                on:click={() => handleProjectClick(`project-${index + 1}`)}
                on:touchstart={handleTouchStart}
                on:touchend={handleTouchEnd}
                on:touchcancel={handleTouchEnd}
                aria-label="Lihat selengkapnya project {index + 1}"
              >
                <span class="group-hover/btn:tracking-wider group-active/btn:tracking-wider transition-all duration-300">SELENGKAPNYA</span>
                <ArrowRight class="rotate-45 group-hover/btn:rotate-0 group-active/btn:rotate-0 transition-transform duration-300" size={20}/>
              </button> 
            </div>
            
            <!-- Description with fixed height -->
            <div style="min-height: 6rem; contain: layout;">
              <p class="leading-relaxed text-gray-600 group-hover:text-gray-800 group-active:text-gray-800 transition-colors duration-300 line-clamp-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>
            </div>
          </div>
        {/each}

        <!-- View All Projects Card with fixed dimensions -->
        <div class="flex w-full p-8 sm:p-12 gap-4 relative view-all-projects group mobile-card touch-interactive hover:bg-gradient-to-br hover:from-[#56AAB7] hover:to-[#4A9AA8] active:bg-gradient-to-br active:from-[#56AAB7] active:to-[#4A9AA8] transition-all duration-500 bg-gray-50 hover:shadow-2xl hover:-translate-y-2 active:shadow-2xl active:-translate-y-2 cursor-pointer border-2 border-transparent hover:border-[#56AAB7] active:border-[#56AAB7]"
             style="contain: layout; min-height: 28rem; aspect-ratio: 1/1;"
             on:click={handleViewAllProjects}
             on:touchstart={handleTouchStart}
             on:touchend={handleTouchEnd}
             on:touchcancel={handleTouchEnd}
             role="button"
             tabindex="0"
             aria-label="Lihat semua proyek"
             on:keydown={(e) => e.key === 'Enter' && handleViewAllProjects()}
        >
          <div class="flex flex-col items-end justify-end gap-6 absolute top-[10%] right-8 sm:right-12 transition-all duration-300 group-hover:right-6 group-active:right-6">
            <h2 class="font-medium text-end font-chivo-mono text-4xl sm:text-5xl lg:text-6xl subpixel-antialiased uppercase group-hover:text-white group-active:text-white transition-all duration-300 group-hover:tracking-wider group-active:tracking-wider" style="contain: layout;">
              Lihat<br/>
              Semua<br/>
              Proyek<br/>
            </h2>
            <button class="w-12 h-12 sm:w-14 sm:h-14 bg-[#56AAB7] text-white rounded-full cursor-pointer hover:bg-white hover:text-[#56AAB7] hover:border-2 hover:border-[#56AAB7] active:bg-white active:text-[#56AAB7] active:border-2 active:border-[#56AAB7] transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 group-active:scale-110 group-active:rotate-12 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 flex-shrink-0" style="contain: layout;">
              <ArrowRight class="text-center m-auto transition-transform duration-300" size={28}/>
            </button>
          </div>
          
          <!-- Decorative elements -->
          <div class="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-[#56AAB7] group-hover:border-white group-active:border-white transition-colors duration-300"></div>
          <div class="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-[#56AAB7] group-hover:border-white group-active:border-white transition-colors duration-300"></div>
        </div>
      </div>
    </div>
  </section>
  <!-- PROSES KERJA Section with Responsive Connected Lines -->
  <section class="py-20 xl:px-32 2xl:px-64 px-4 sm:px-8 bg-[#56AAB7] text-white">
    <div class="flex flex-col h-fit items-stretch w-full lg:flex-row gap-8 lg:gap-12">
      <!-- Left Column - Process Steps -->
      <div class="space-y-8 min-w-sm flex flex-col">
        <h2 class="text-4xl sm:text-5xl font-bold font-roboto-condensed mb-12">
          PROSES KERJA
        </h2>
        
        <div class="relative flex flex-col h-full justify-between">
          {#each [
            { number: '1', title: 'Konsultasi' },
            { number: '2', title: 'Eksplorasi' },
            { number: '3', title: 'Rencana Desain Awal' },
            { number: '4', title: 'Development' },
            { number: '5', title: 'Finalisasi' },
            { number: '6', title: 'Handling' }
          ] as step, index}
            <div class="flex items-center group process-step touch-interactive relative" 
                 style="animation-delay: {index * 0.1}s;"
                 class:mb-12={index < 5}
                 class:lg:mb-0={index < 5}
                 class:mb-0={index === 5}
                 on:touchstart={handleTouchStart}
                 on:touchend={handleTouchEnd}
                 on:touchcancel={handleTouchEnd}>
              
              <!-- Number Circle -->
              <div class="process-number w-12 h-12 sm:w-16 sm:h-16 border-2 border-white rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold group-hover:bg-white group-hover:text-[#56AAB7] group-active:bg-white group-active:text-[#56AAB7] transition-all duration-300 bg-[#56AAB7] relative z-10 mr-4 sm:mr-6 flex-shrink-0">
                {step.number}
                
                <!-- Vertical Connecting Line - Connected to circle center -->
                {#if index < 5}
                  <div class="absolute left-1/2 top-full w-0.5 bg-white/40 z-0 process-line -translate-x-0.5" 
                       style="height: 3rem; animation-delay: {(index + 1) * 0.2}s;">
                  </div>
                {/if}
              </div>
              
              <!-- Step Title -->
              <h3 class="process-title text-xl sm:text-2xl font-medium font-roboto group-hover:translate-x-2 group-active:translate-x-2 transition-transform duration-300">
                {step.title}
              </h3>
            </div>
          {/each}
        </div>
      </div>

      <!-- Vertical Divider -->
      <div class="hidden lg:flex w-0.5 bg-white/30 self-stretch min-h-96"></div>
      
      <!-- Mobile Horizontal Divider -->
      <div class="lg:hidden w-full h-0.5 bg-white/30 my-8"></div>
      
      <!-- Right Column - Deliverables -->
      <div class="space-y-8 flex flex-col w-full">
        <h2 class="text-3xl sm:text-4xl font-bold font-roboto-condensed mb-12">
          HASIL PRODUK<br/>
          YANG ANDA DAPAT
        </h2>
        
        <!-- Deliverables Grid -->
        <div class="flex flex-col w-full font-roboto-condensed text-base sm:text-lg lg:text-base xl:text-lg 2xl:text-xl gap-2">
          <!-- First Row -->
          <div class="grid grid-cols-4 gap-2">
            <div class="aspect-square flex w-full items-center justify-start border-2 border-white rounded-md hover:bg-white/10 transition-colors duration-300 cursor-pointer"
                 on:touchstart={handleTouchStart}
                 on:touchend={handleTouchEnd}
                 on:touchcancel={handleTouchEnd}>
              <div class="flex flex-col gap-y-2 items-start justify-start p-2 sm:p-3 lg:p-2 xl:p-4">
                <h2 class="uppercase leading-tight">Desain 3D<br/>Interior</h2>
                <img src="{base}/icons/001_computer.webp" alt="icons 1" class="w-6 h-6 sm:w-8 sm:h-8 lg:w-6 lg:h-6 xl:w-8 xl:h-8 object-contain"/>
              </div>
            </div>
            
            <div class="aspect-square flex w-full items-center justify-start border-2 border-white rounded-md hover:bg-white/10 transition-colors duration-300 cursor-pointer"
                 on:touchstart={handleTouchStart}
                 on:touchend={handleTouchEnd}
                 on:touchcancel={handleTouchEnd}>
              <div class="flex flex-col gap-y-2 items-start justify-center p-2 sm:p-3 lg:p-2 xl:p-4">
                <h2 class="uppercase leading-tight">Desain 3D<br/>Eksterior</h2>
                <img src="{base}/icons/029_computer_2.webp" alt="icons 1" class="w-6 h-6 sm:w-8 sm:h-8 lg:w-6 lg:h-6 xl:w-8 xl:h-8 object-contain"/>
              </div>
            </div>
            
            <div class="flex w-full col-span-2 items-center justify-start border-2 border-white rounded-md hover:bg-white/10 transition-colors duration-300 cursor-pointer"
                 on:touchstart={handleTouchStart}
                 on:touchend={handleTouchEnd}
                 on:touchcancel={handleTouchEnd}>
              <div class="flex flex-col items-start justify-center gap-y-2 p-2 sm:p-3 lg:p-2 xl:p-4">
                <h2 class="uppercase leading-tight">Hasil Cetak Printout<br/>A3 Berwarna</h2>
                <img src="{base}/icons/006_plan.webp" alt="icons 1" class="w-6 h-6 sm:w-8 sm:h-8 lg:w-6 lg:h-6 xl:w-8 xl:h-8 object-contain"/>
              </div>
            </div>
          </div>

          <!-- Second Row -->
          <div class="grid grid-cols-3 gap-2">
            <div class="aspect-square flex w-full items-center justify-start border-2 border-white rounded-md hover:bg-white/10 transition-colors duration-300 cursor-pointer"
                 on:touchstart={handleTouchStart}
                 on:touchend={handleTouchEnd}
                 on:touchcancel={handleTouchEnd}>
              <div class="flex flex-col gap-y-2 items-start justify-center p-2 sm:p-3 lg:p-2 xl:p-4">
                <h2 class="uppercase leading-tight">Gambar Kerja<br/>Perencanaan</h2>
                <img src="{base}/icons/033_compass_1.webp" alt="icons 1" class="w-6 h-6 sm:w-8 sm:h-8 lg:w-6 lg:h-6 xl:w-8 xl:h-8 object-contain"/>
              </div>
            </div>
            
            <div class="aspect-square flex w-full items-center justify-start border-2 border-white rounded-md hover:bg-white/10 transition-colors duration-300 cursor-pointer"
                 on:touchstart={handleTouchStart}
                 on:touchend={handleTouchEnd}
                 on:touchcancel={handleTouchEnd}>
              <div class="flex flex-col gap-y-2 items-start justify-center p-2 sm:p-3 lg:p-2 xl:p-4">
                <h2 class="uppercase leading-tight">Rencana Anggaran<br/>Biaya</h2>
                <img src="{base}/icons/043_project_2.webp" alt="icons 1" class="w-6 h-6 sm:w-8 sm:h-8 lg:w-6 lg:h-6 xl:w-8 xl:h-8 object-contain"/>
              </div>
            </div>
            
            <div class="aspect-square flex w-full items-center justify-start border-2 border-white rounded-md hover:bg-white/10 transition-colors duration-300 cursor-pointer"
                 on:touchstart={handleTouchStart}
                 on:touchend={handleTouchEnd}
                 on:touchcancel={handleTouchEnd}>
              <div class="flex flex-col gap-y-2 items-start justify-center p-2 sm:p-3 lg:p-2 xl:p-4">
                <h2 class="uppercase leading-tight">Perhitungan<br/>Struktur</h2>
                <img src="{base}/icons/041_workspace.webp" alt="icons 1" class="w-6 h-6 sm:w-8 sm:h-8 lg:w-6 lg:h-6 xl:w-8 xl:h-8 object-contain"/>
              </div>
            </div>
          </div>

          <!-- Third Row -->
          <div class="grid grid-cols-4 gap-2">
            <div class="flex w-full col-span-2 items-center justify-start border-2 border-white rounded-md hover:bg-white/10 transition-colors duration-300 cursor-pointer"
                 on:touchstart={handleTouchStart}
                 on:touchend={handleTouchEnd}
                 on:touchcancel={handleTouchEnd}>
              <div class="flex flex-col items-start justify-center gap-y-2 p-2 sm:p-3 lg:p-2 xl:p-4">
                <h2 class="uppercase leading-tight">Soft File Dokumen<br/>Perencanaan</h2>
                <img src="{base}/icons/006_plan.webp" alt="icons 1" class="w-6 h-6 sm:w-8 sm:h-8 lg:w-6 lg:h-6 xl:w-8 xl:h-8 object-contain"/>
              </div>
            </div>

            <div class="aspect-square flex w-full items-center justify-start border-2 border-white rounded-md hover:bg-white/10 transition-colors duration-300 cursor-pointer"
                 on:touchstart={handleTouchStart}
                 on:touchend={handleTouchEnd}
                 on:touchcancel={handleTouchEnd}>
              <div class="flex flex-col gap-y-2 items-start justify-center p-2 sm:p-3 lg:p-2 xl:p-4">
                <h2 class="uppercase leading-tight">Animasi<br/>Video</h2>
                <img src="{base}/icons/001_computer.webp" alt="icons 1" class="w-6 h-6 sm:w-8 sm:h-8 lg:w-6 lg:h-6 xl:w-8 xl:h-8 object-contain"/>
              </div>
            </div>
            
            <div class="aspect-square flex w-full items-center justify-start border-2 border-white rounded-md hover:bg-white/10 transition-colors duration-300 cursor-pointer"
                 on:touchstart={handleTouchStart}
                 on:touchend={handleTouchEnd}
                 on:touchcancel={handleTouchEnd}>
              <div class="flex flex-col gap-y-2 items-start justify-center p-2 sm:p-3 lg:p-2 xl:p-4">
                <h2 class="uppercase leading-tight">Katalog<br/>Desain 3D</h2>
                <img src="{base}/icons/029_computer_2.webp" alt="icons 1" class="w-6 h-6 sm:w-8 sm:h-8 lg:w-6 lg:h-6 xl:w-8 xl:h-8 object-contain"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>

<style>
  /* Line clamp utility */
  .line-clamp-4 {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  /* Performance optimizations */
  .contain-layout {
    contain: layout style paint;
  }
  
  /* Mobile optimizations */
  @media (max-width: 640px) {
    .hero-section {
      min-height: 50vh;
    }
    
    .hero-buttons-container {
      min-height: 5rem;
    }
  }
  
  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  /* Touch states for mobile */
  .touch-interactive.touch-active {
    transform: scale(0.98);
    opacity: 0.9;
  }
</style>