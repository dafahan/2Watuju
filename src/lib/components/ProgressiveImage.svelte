<!-- ProgressiveImage.svelte - Optimized Final Version -->
<script lang="ts">
  import { onMount } from 'svelte';

  export let src: string;
  export let placeholder: string;
  export let alt = '';
  export let className = '';
  export let width = 1920;
  export let height = 1080;
  export let sizes = '100vw';
  export let srcset = '';
  export let objectFit = 'contain';
  export let priority = false; // For above-fold images

  let loaded = false;
  let imgEl: HTMLImageElement;
  let placeholderEl: HTMLImageElement;
  let imageError = false;

  // Debug states (remove in production)
  let debugInfo = '';
  let showDebug = false; // Set to true for debugging

  onMount(() => {
    console.log('ProgressiveImage mounted:', { src, placeholder, loaded });
    
    // Check if image is already loaded (cached) - CRITICAL for LCP
    checkImageStatus();

    // Optional preloading (only if not already in head)
    if (priority) {
      const existingPreload = document.querySelector(`link[href="${src}"]`);
      if (!existingPreload) {
        const preloadLink = document.createElement('link');
        preloadLink.rel = 'preload';
        preloadLink.as = 'image';
        preloadLink.href = src;
        if (srcset) {
          preloadLink.setAttribute('imagesrcset', srcset);
          preloadLink.setAttribute('imagesizes', sizes);
        }
        document.head.appendChild(preloadLink);
        
        return () => {
          if (document.head.contains(preloadLink)) {
            document.head.removeChild(preloadLink);
          }
        };
      }
    }
  });

  function checkImageStatus() {
    // Retry mechanism for cached images
    const checkImage = () => {
      if (imgEl && imgEl.complete && imgEl.naturalHeight !== 0) {
        console.log('✅ Image already loaded from cache');
        handleImageLoad({ target: imgEl });
      } else if (imgEl) {
        // Image element exists but not loaded yet
        console.log('📊 Image element ready, waiting for load...');
      } else {
        // Retry after DOM update
        setTimeout(checkImage, 10);
      }
    };
    
    checkImage();
  }

  function handleImageLoad(event) {
    console.log('🖼️ Main image loaded successfully');
    loaded = true;
    imageError = false;
    debugInfo = `Loaded: ${event.target.naturalWidth}x${event.target.naturalHeight}`;
  }

  function handleImageError(event) {
    console.error('❌ Failed to load main image:', src, event);
    imageError = true;
    loaded = false;
    debugInfo = 'Main image failed to load';
  }

  function handlePlaceholderLoad() {
    console.log('🌫️ Placeholder loaded');
  }

  function handlePlaceholderError() {
    console.warn('⚠️ Placeholder failed to load:', placeholder);
  }
</script>

<!-- Container with natural flow (no padding-bottom trick) -->
<div class="relative w-full {className}" style="contain: layout style paint;">
  
  <!-- Debug info (remove in production) -->
  {#if debugInfo && showDebug}
    <div class="absolute top-2 left-2 bg-black/70 text-white text-xs p-2 rounded z-50 font-mono">
      {debugInfo}<br>
      Loaded: {loaded ? '✅' : '❌'}<br>
      Error: {imageError ? '❌' : '✅'}
    </div>
  {/if}

  <!-- Placeholder Image - Shows immediately -->
  <img
    bind:this={placeholderEl}
    src={placeholder}
    alt=""
    width={width}
    height={height}
    class="w-full h-auto object-{objectFit} transition-all duration-500 absolute inset-0 z-10"
    class:opacity-0={loaded}
    class:opacity-100={!loaded && !imageError}
    class:blur-sm={!loaded && !imageError}
    class:scale-105={!loaded && !imageError}
    class:pointer-events-none={loaded}
    style="background-color: #f3f4f6;"
    on:load={handlePlaceholderLoad}
    on:error={handlePlaceholderError}
    loading="eager"
    decoding="sync"
    aria-hidden="true"
  />

  <!-- Main Image - LCP optimized -->
  <img
    bind:this={imgEl}
    src={src}
    srcset={srcset}
    sizes={sizes}
    alt={alt}
    width={width}
    height={height}
    class="w-full h-auto object-{objectFit} transition-all duration-500 ease-out relative z-20"
    class:opacity-0={!loaded}
    class:opacity-100={loaded}
    style="contain: layout; will-change: opacity; transform: translateZ(0);"
    on:load={handleImageLoad}
    on:error={handleImageError}
    loading={priority ? "eager" : "lazy"}
    fetchpriority={priority ? "high" : "auto"}
    decoding="async"
  />

  <!-- Error state -->
  {#if imageError}
    <div class="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500 text-sm z-30">
      <div class="text-center p-4">
        <div class="text-2xl mb-2">📷</div>
        <div>Image failed to load</div>
        <div class="text-xs mt-1 opacity-70">Using placeholder instead</div>
      </div>
    </div>
  {/if}
</div>

<!-- Critical CSS for performance -->
<svelte:head>
  <style>
    /* Critical CSS for image containers */
    .hero-container {
      contain: layout style paint;
      content-visibility: auto;
    }
    
    /* Optimize image rendering */
    .hero-image-wrapper {
      will-change: opacity;
      transform: translateZ(0);
    }
    
    /* Prevent layout shifts */
    .progressive-image-container img {
      display: block;
      max-width: 100%;
      height: auto;
    }
    
    /* Loading state optimization */
    .img-placeholder {
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
    }
    
    @keyframes shimmer {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
  </style>
</svelte:head>