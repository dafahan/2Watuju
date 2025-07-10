<!-- src/routes/+page.svelte -->
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { Code, Palette, Zap, ExternalLink, Twitter, ArrowRight } from 'lucide-svelte';

  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);

  // Animation cleanup function
  let cleanup: (() => void) | null = null;

  onMount(() => {
    // Set up animations
    initializeAnimations();
  });

  onDestroy(() => {
    // Clean up animations on component destroy
    if (cleanup) {
      cleanup();
    }
  });

  function initializeAnimations() {
    // Hero section animations
    const heroImageTl = gsap.timeline();
    heroImageTl
      .fromTo('.hero-image', 
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power2.out' }
      )
      .fromTo('.hero-buttons', 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.5'
      );

    // About section animations
    gsap.fromTo('.about-title', 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.about-title',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // About cards staggered animation
    gsap.fromTo('.about-cards', 
      { opacity: 0, x: -30 },
      { 
        opacity: 1, 
        x: 0, 
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.about-cards',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Project cards staggered animation
    gsap.fromTo('.project-card', 
      { opacity: 0, y: 40 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.project-grid',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // "Lihat Semua Proyek" animation
    gsap.fromTo('.view-all-projects', 
      { opacity: 0, scale: 0.9 },
      { 
        opacity: 1, 
        scale: 1, 
        duration: 0.8,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.view-all-projects',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Cleanup function
    cleanup = () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }

  // Event handlers
  function handleWorkflowClick() {
    console.log('Workflow clicked');
    // Add your workflow navigation logic here
  }

  function handleConsultationClick() {
    console.log('Consultation clicked');
    // Add your consultation navigation logic here
  }

  function handleProjectClick(projectId: string) {
    console.log('Project clicked:', projectId);
    // Add your project navigation logic here
  }

  function handleViewAllProjects() {
    console.log('View all projects clicked');
    // Add your view all projects navigation logic here
  }
</script>

<svelte:head>
  <title>Architecture Studio - Collaborative Design</title>
  <meta name="description" content="Dirancang secara kolaboratif dan penuh makna, dari awal hingga generasi berikutnya." />
</svelte:head>

<!-- Main content container -->
<div class="mx-auto overflow-x-hidden">
  <!-- Hero Section with split layout -->
  <section class="min-h-screen xl:px-64 flex items-start justify-center flex-col relative w-full bg-gradient-to-br from-[#56AAB7] to-[#4A9AA8] transition-all duration-300">
    <!-- Hero Image Container -->
    <div class="flex bg-contain w-full h-fit bg-no-repeat bg-center hero-image group">
      <img 
        src="/images/hero.png" 
        class="object-contain w-full transition-transform duration-700 group-hover:scale-[1.02]" 
        alt="Architecture Studio Hero"
        loading="eager"
      />
    </div>
    
    <!-- Hero Buttons -->
    <div class="flex w-full h-24 justify-center items-center gap-8 sm:gap-16 lg:gap-24 hero-buttons px-4">
      <!-- Workflow Button -->
      <button 
        class="flex h-full font-roboto-condensed text-white gap-4 sm:gap-6 items-center group hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded-lg p-2"
        on:click={handleWorkflowClick}
        aria-label="Lihat alur kerja proyek"
      >
        <div class="w-12 h-12 sm:w-14 sm:h-14 bg-white text-[#56AAB7] rounded-full cursor-pointer hover:bg-transparent hover:text-white hover:border-2 hover:border-white transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl">
          <ArrowRight class="group-hover:scale-110 group-hover:rotate-12 duration-300 transition-all" size={32}/>
        </div>
        <div class="flex flex-col text-lg sm:text-2xl">
          <h3 class="font-bold transition-all duration-300 group-hover:tracking-wider">ALUR KERJA</h3>
          <h3 class="transition-all duration-300 group-hover:tracking-wider">PROYEK KITA</h3>
        </div>
      </button>

      <!-- Consultation Button -->
      <button 
        class="flex h-full font-roboto-condensed text-white gap-4 sm:gap-6 items-center group hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded-lg p-2"
        on:click={handleConsultationClick}
        aria-label="Jadwalkan konsultasi"
      >
        <div class="w-12 h-12 sm:w-14 sm:h-14 bg-white text-[#56AAB7] rounded-full cursor-pointer hover:bg-transparent hover:text-white hover:border-2 hover:border-white transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl">
          <ArrowRight class="group-hover:scale-110 group-hover:rotate-12 duration-300 transition-all" size={32}/>
        </div>
        <div class="flex flex-col text-lg sm:text-2xl">
          <h3 class="transition-all duration-300 group-hover:tracking-wider">JADWALKAN</h3>
          <h3 class="font-bold transition-all duration-300 group-hover:tracking-wider">KONSULTASI</h3>
        </div>
      </button>
    </div>
  </section>

  <!-- About Section with elegant styling -->
  <section class="py-20 xl:px-64 px-4 sm:px-8">
    <div class="flex w-full flex-col gap-16 sm:gap-24">
      <div class="flex flex-col lg:flex-row items-start justify-between gap-12">
        <!-- Main Title -->
        <div class="lg:flex-1">
          <h1 class="text-2xl sm:text-3xl lg:text-4xl about-title leading-tight hover:text-[#56AAB7] transition-colors duration-500 cursor-default">
            DIRANCANG SECARA KOLABORATIF <br/>
            <span class="tracking-wide">DAN PENUH MAKNA.— DARI AWAL</span><br/> 
            HINGGA GENERASI BERIKUTNYA.
          </h1>
        </div>

        <!-- About Cards -->
        <div class="flex flex-col sm:flex-row gap-8 lg:gap-8">
          <div class="flex flex-col gap-4 max-w-xs sm:max-w-sm md:max-w-md about-cards group">
            <h3 class="font-chivo-mono text-balance uppercase tracking-wide group-hover:text-[#56AAB7] transition-colors duration-300">
              LOCAL INTELLIGENCE
            </h3>
            <div class="flex flex-col gap-2 text-balance">
              <p class="font-roboto text-sm leading-relaxed group-hover:text-gray-600 transition-colors duration-300">
                Setiap ruang kami hadirkan bukan<br/>
                hanya untuk ditinggali, tapi juga <br/>
                menyatu dengan nilai dan narasi<br/>
                lokal yang hidup di sekitarnya.
              </p>
              <p class="font-roboto text-sm leading-relaxed group-hover:text-gray-600 transition-colors duration-300">
                Dengan mengintegrasikan gaya<br/>
                hidup setiap keluarga ke dalam<br/>
                setiap rumah yang kami rancang<br/>
                terutama Masyarakat Lampung.
              </p>
            </div>
          </div>

          <div class="flex flex-col gap-4 max-w-xs sm:max-w-sm md:max-w-md about-cards group">
            <h3 class="font-chivo-mono text-balance uppercase tracking-wide group-hover:text-[#56AAB7] transition-colors duration-300">
              PREMIUM & PERSONAL
            </h3>
            <div class="flex flex-col gap-2 text-balance">
              <p class="font-roboto text-sm leading-relaxed group-hover:text-gray-600 transition-colors duration-300">
                Kami memulai setiap rancangan<br/>
                dengan mendengarkan seluruh<br/>
                kisah dan Cerita. 
              </p>
              <p class="font-roboto text-sm leading-relaxed group-hover:text-gray-600 transition-colors duration-300">
                Bukan sekadar sebagai arsitek,<br/>
                tapi sebagai Sahabat Anda yang<br/>
                berjalan bersama sejak awal<br/>
                hingga rumah itu hidup <br/>sepenuhnya.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Project Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-6 sm:gap-8 project-grid">
        {#each Array(5) as _, index}
          <div class="flex w-full px-4 py-6 border-b-2 border-gray-200 flex-col gap-4 font-roboto-mono h-144 overflow-hidden text-balance project-card group hover:border-[#56AAB7] hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white hover:bg-gradient-to-br hover:from-white hover:to-gray-50">
            <div class="relative overflow-hidden rounded-lg">
              <img 
                src="/images/dummy.png" 
                alt="Classic Style Project {index + 1}" 
                class="object-cover w-full rounded-lg h-48 sm:h-64 transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
            </div>
            
            <div class="flex justify-between items-center font-bold">
              <h2 class="text-xl sm:text-2xl leading-none group-hover:text-[#56AAB7] transition-colors duration-300">
                CLASSIC<br/>STYLE
              </h2>
              <button 
                class="flex border-2 border-gray-200 rounded-full text-black bg-white px-4 hover:bg-[#56AAB7] hover:text-white hover:border-[#56AAB7] py-2 items-center transition-all duration-300 justify-between gap-2 text-sm group/btn cursor-pointer hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#56AAB7] focus:ring-opacity-50"
                on:click={() => handleProjectClick(`project-${index + 1}`)}
                aria-label="Lihat selengkapnya project {index + 1}"
              >
                <span class="group-hover/btn:tracking-wider transition-all duration-300">SELENGKAPNYA</span>
                <ArrowRight class="rotate-45 group-hover/btn:rotate-0 transition-transform duration-300" size={20}/>
              </button> 
            </div>
            
            <p class="leading-relaxed text-gray-600 group-hover:text-gray-800 transition-colors duration-300 line-clamp-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            </p>
          </div>
        {/each}

        <!-- View All Projects Card -->
        <div class="flex w-full p-8 sm:p-12 gap-4 h-144 relative view-all-projects group hover:bg-gradient-to-br hover:from-[#56AAB7] hover:to-[#4A9AA8] transition-all duration-500 bg-gray-50 hover:shadow-2xl hover:-translate-y-2 cursor-pointer border-2 border-transparent hover:border-[#56AAB7]"
             on:click={handleViewAllProjects}
             role="button"
             tabindex="0"
             aria-label="Lihat semua proyek"
             on:keydown={(e) => e.key === 'Enter' && handleViewAllProjects()}
        >
          <div class="flex flex-col items-end justify-end gap-6 absolute top-[10%] right-8 sm:right-12 transition-all duration-300 group-hover:right-6">
            <h2 class="font-medium text-end font-chivo-mono text-4xl sm:text-5xl lg:text-7xl subpixel-antialiased uppercase group-hover:text-white transition-all duration-300 group-hover:tracking-wider">
              Lihat<br/>
              Semua<br/>
              Proyek<br/>
            </h2>
            <button class="w-12 h-12 sm:w-14 sm:h-14 bg-[#56AAB7] text-white rounded-full cursor-pointer hover:bg-white hover:text-[#56AAB7] hover:border-2 hover:border-[#56AAB7] transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50">
              <ArrowRight class="text-center m-auto transition-transform duration-300" size={32}/>
            </button>
          </div>
          
          <!-- Decorative elements -->
          <div class="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-[#56AAB7] group-hover:border-white transition-colors duration-300"></div>
          <div class="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-[#56AAB7] group-hover:border-white transition-colors duration-300"></div>
        </div>
      </div>
    </div>
  </section>
</div>

<style>
  .line-clamp-4 {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  /* Ensure smooth font rendering */
  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  /* Custom scrollbar for webkit browsers */
  :global(::-webkit-scrollbar) {
    width: 8px;
  }
  
  :global(::-webkit-scrollbar-track) {
    background: #f1f1f1;
  }
  
  :global(::-webkit-scrollbar-thumb) {
    background: #56AAB7;
    border-radius: 4px;
  }
  
  :global(::-webkit-scrollbar-thumb:hover) {
    background: #4A9AA8;
  }
</style>