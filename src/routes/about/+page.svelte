<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly, scale } from 'svelte/transition';
  import Cta from "$lib/components/Cta.svelte";
  import { base } from '$app/paths';

  let mounted = false;
  let heroInView = false;
  let teamInView = false;
  let contentInView = false;
  let scrollY = 0;

  onMount(() => {
    mounted = true;
    
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.id === 'hero-section') heroInView = true;
          if (entry.target.id === 'team-section') teamInView = true;
          if (entry.target.id === 'content-section') contentInView = true;
        }
      });
    }, { threshold: 0.1 });

    const heroEl = document.getElementById('hero-section');
    const teamEl = document.getElementById('team-section');
    const contentEl = document.getElementById('content-section');

    if (heroEl) observer.observe(heroEl);
    if (teamEl) observer.observe(teamEl);
    if (contentEl) observer.observe(contentEl);

    return () => observer.disconnect();
  });

  // Parallax scroll handler
  $: parallaxOffset = scrollY * 0.5;
</script>

<svelte:head>
  <title>Tentang Kami - 2WATUJU Arsitektur & Interior Lampung</title>
  <meta name="description" content="Kenali lebih dalam tentang nilai-nilai yang membentuk 2WATUJU sebagai studio arsitektur & interior di Lampung." />
</svelte:head>

<svelte:window bind:scrollY />

<!-- Main content container -->
<div class="mx-auto overflow-x-hidden relative">
  
  <!-- Simple Hero Section -->
  <section 
    id="hero-section"
    class="hero-critical min-h-[40vh] xl:min-h-screen 2xl:px-64 pt-24 md:pt-12 pb-12 md:pb-24 flex justify-start items-center xl:justify-center flex-col relative w-full transition-all duration-300"
  >
    <img 
      src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&h=600&q=80&fm=webp" 
      alt="Tentang kami banner" 
      class="w-full aspect-video" 
      height="644" 
      width="1196"
    />
  </section>

  <!-- Enhanced Team Section -->
  <section 
    id="team-section"
    class="xl:px-32 2xl:px-64 px-4 sm:px-8 flex flex-col gap-8 min-h-[90vh] relative overflow-hidden"
  >
    <!-- Animated background pattern -->
    <div class="absolute inset-0 opacity-5">
      <div class="absolute inset-0" style="background-image: radial-gradient(circle at 1px 1px, #56AAB7 1px, transparent 0); background-size: 50px 50px; animation: grid-drift 20s linear infinite;"></div>
    </div>

    {#if teamInView}
      <!-- Header with staggered animations -->
      <div 
        class="flex font-roboto-mono w-full justify-between items-end relative z-10"
        in:fly={{ y: 50, duration: 800, delay: 200 }}
      >
        <h1 class="text-4xl sm:text-6xl lg:text-7xl relative group/title">
          <span class="inline-block transition-all duration-300 hover:scale-105 hover:text-[#56AAB7] cursor-default">
            OUR TEAM
          </span>
          <!-- Animated underline -->
          <div class="absolute bottom-0 left-0 w-0 h-1 bg-[#56AAB7] transition-all duration-500 group-hover/title:w-full"></div>
        </h1>
        
        <h2 
          class="text-xl sm:text-2xl lg:text-3xl text-start font-bold uppercase relative group/brand"
          in:fly={{ x: 50, duration: 600, delay: 400 }}
        >
          <span class="transition-all duration-300 group-hover/brand:text-[#56AAB7]">
            2Watuju<br/>Design
          </span>
          <!-- Floating dot -->
          <div class="absolute -top-2 -right-2 w-2 h-2 bg-[#56AAB7] rounded-full opacity-0 group-hover/brand:opacity-100 transition-all duration-300 animate-bounce"></div>
        </h2>
      </div>

      <!-- Enhanced description -->
      <div 
        class="relative"
        in:fly={{ y: 30, duration: 700, delay: 600 }}
      >
        <p class="text-start text-lg sm:text-xl text-pretty font-roboto tracking-wider leading-relaxed relative z-10 group/text hover:text-gray-700 transition-colors duration-300">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        
        <!-- Reading progress bar -->
        <div class="absolute bottom-0 left-0 w-0 h-0.5 bg-[#56AAB7] transition-all duration-1000 group-hover/text:w-full"></div>
      </div>

      <!-- Enhanced logo with multiple animations -->
      <div 
        class="absolute bottom-12 left-1/2 -translate-x-1/2 group/logo"
        in:scale={{ duration: 800, delay: 800, start: 0.8 }}
      >
        <div class="relative">
          <!-- Rotating ring -->
          <div class="absolute inset-0 w-80 h-80 border border-[#56AAB7]/20 rounded-full animate-spin opacity-0 group-hover/logo:opacity-100 transition-opacity duration-500" style="animation-duration: 10s;"></div>
          
          <!-- Pulsing background -->
          <div class="absolute inset-0 w-80 h-80 bg-[#56AAB7]/5 rounded-full scale-0 group-hover/logo:scale-100 transition-transform duration-500"></div>
          
          <!-- Main logo -->
          <img 
            src="{base}/images/logo-224.webp" 
            alt="logo" 
            class="object-contain w-80 relative z-10 transition-all duration-500 group-hover/logo:scale-110 group-hover/logo:drop-shadow-lg filter group-hover/logo:brightness-110" 
            width="224" 
            height="224"
          />
          
          <!-- Floating particles -->
          <div class="absolute inset-0 pointer-events-none">
            <div class="absolute top-8 right-8 w-2 h-2 bg-[#56AAB7] rounded-full opacity-0 group-hover/logo:opacity-100 transition-all duration-700 transform group-hover/logo:translate-y-[-1rem] group-hover/logo:translate-x-4"></div>
            <div class="absolute bottom-12 left-12 w-1 h-1 bg-[#56AAB7] rounded-full opacity-0 group-hover/logo:opacity-100 transition-all duration-900 transform group-hover/logo:translate-y-4 group-hover/logo:translate-x-[-1rem]"></div>
            <div class="absolute top-1/2 left-4 w-1.5 h-1.5 bg-[#56AAB7] rounded-full opacity-0 group-hover/logo:opacity-100 transition-all duration-800 transform group-hover/logo:translate-x-[-2rem]"></div>
          </div>
        </div>
      </div>
    {/if}
  </section>

  <!-- Enhanced Content Section -->
  <section 
    id="content-section"
    class="xl:px-32 2xl:px-64 px-4 sm:px-8"
  >
    {#if contentInView}
      <!-- Content with enhanced typography -->
      <div 
        class="py-20 flex flex-col gap-8 relative font-roboto text-lg sm:text-xl tracking-wider border-b-2 border-gray-200 group/content"
        in:fly={{ y: 40, duration: 800, delay: 200 }}
      >
        <!-- Animated border -->
        <div class="absolute top-0 left-0 w-0 h-0.5 bg-[#56AAB7] transition-all duration-1000 group-hover/content:w-full"></div>
        
        <!-- Enhanced paragraphs -->
        <div class="space-y-8">
          <p 
            class="leading-relaxed relative group/para transition-all duration-300 hover:text-gray-700 "
            in:fly={{ x: -30, duration: 600, delay: 400 }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            <!-- Highlight effect -->
            <span class="absolute inset-0 bg-[#56AAB7]/5 scale-x-0 transition-transform duration-500 group-hover/para:scale-x-100 origin-left"></span>
          </p>
          
          <p 
            class="leading-relaxed relative group/para transition-all duration-300 hover:text-gray-700 "
            in:fly={{ x: 30, duration: 600, delay: 600 }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            <!-- Highlight effect -->
            <span class="absolute inset-0 bg-[#56AAB7]/5 scale-x-0 transition-transform duration-500 group-hover/para:scale-x-100 origin-left"></span>
          </p>
        </div>
      </div>

      <!-- CTA Section with entrance animation -->
      <div 
        class="py-20 flex flex-col gap-8 relative font-roboto text-xl tracking-wider"
        in:scale={{ duration: 800, delay: 800, start: 0.9 }}
      >
        <Cta/>
      </div>
    {/if}
  </section>
</div>

<style>
  /* Custom animations and effects */
  @keyframes grid-drift {
    0% { transform: translateX(0) translateY(0); }
    100% { transform: translateX(50px) translateY(50px); }
  }
  
  @keyframes float-gentle {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-5px) rotate(2deg); }
  }
  
  /* Enhanced text selection */
  ::selection {
    background-color: rgba(86, 170, 183, 0.2);
    color: inherit;
  }
  
  /* Smooth scroll behavior */
  html {
    scroll-behavior: smooth;
  }
  
  /* Custom hover states */
  .group\/image:hover .shadow-3xl {
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  }
  
  /* Micro-animation delays */
  .group\/logo:hover div:nth-child(1) {
    animation-delay: 0ms;
  }
  
  .group\/logo:hover div:nth-child(2) {
    animation-delay: 100ms;
  }
  
  .group\/logo:hover div:nth-child(3) {
    animation-delay: 200ms;
  }
  
  /* Performance optimizations */
  .group\/image img,
  .group\/logo img {
    will-change: transform;
  }
  
  /* Enhanced focus states for accessibility */
  a:focus,
  button:focus {
    outline: 2px solid #56AAB7;
    outline-offset: 2px;
  }
</style>