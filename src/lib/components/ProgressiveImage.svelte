<!-- PanoramicViewer.svelte - Three.js 360° Panoramic Viewer -->
<script>
  import { onMount, onDestroy } from 'svelte';
  import { Play, Maximize, RotateCcw, Home, Minimize, MousePointer, Map, Eye } from 'lucide-svelte';
  import * as THREE from 'three';

  // Props
  export let title = "MODERN HOUSE";
  export let subtitle = "JAPANDI STYLE | 2025";
  export let thumbnailUrl = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop";
  export let panoramicData = {
    exterior: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=4096&h=2048&fit=crop',
    livingRoom: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=4096&h=2048&fit=crop',
    kitchen: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=4096&h=2048&fit=crop'
  };
  export let hotspots = [
    { x: 45, y: 50, scene: 'livingRoom', label: 'Enter Living Room', icon: 'door' },
    { x: 75, y: 45, scene: 'kitchen', label: 'View Kitchen', icon: 'utensils' }
  ];

  // State
  let isPanoramicMode = false;
  let isLoading = false;
  let loadingProgress = 0;
  let error = null;
  let containerRef;
  let currentScene = 'exterior';
  let isFullscreen = false;
  let showHotspots = true;

  // Three.js objects
  let scene, camera, renderer, sphere, texture;
  let mouse = { x: 0, y: 0 };
  let isMouseDown = false;
  let phi = 0, theta = 0;
  let onPointerDownPointerX = 0, onPointerDownPointerY = 0;
  let onPointerDownPhi = 0, onPointerDownTheta = 0;
  let animationId;

  // Scene navigation
  const sceneNames = {
    exterior: 'Exterior View',
    livingRoom: 'Living Room',
    kitchen: 'Kitchen',
    bedroom: 'Bedroom',
    bathroom: 'Bathroom',
    poolArea: 'Pool Area',
    diningRoom: 'Dining Room',
    masterBedroom: 'Master Bedroom',
    studyRoom: 'Study Room',
    mainArea: 'Main Area',
    mezzanine: 'Mezzanine',
    grandHall: 'Grand Hall',
    ballroom: 'Ballroom',
    library: 'Library',
    masterSuite: 'Master Suite',
    garden: 'Garden',
    solarDeck: 'Solar Deck',
    verticalGarden: 'Vertical Garden',
    courtyard: 'Courtyard',
    wineCellar: 'Wine Cellar',
    genkan: 'Genkan (Entrance)',
    teaRoom: 'Tea Room',
    zenGarden: 'Zen Garden',
    tatamiRoom: 'Tatami Room'
  };

  // Icon mapping
  const iconMap = {
    door: '🚪',
    utensils: '🍽️',
    bed: '🛏️',
    droplets: '🚿',
    waves: '🌊',
    music: '🎵',
    book: '📚',
    flower: '🌸',
    sun: '☀️',
    wine: '🍷',
    coffee: '☕',
    stairs: '🪜',
    home: '🏠'
  };

  const initThreeJS = () => {
    if (!containerRef) return;

    // Create scene
    scene = new THREE.Scene();

    // Create camera
    camera = new THREE.PerspectiveCamera(75, containerRef.clientWidth / containerRef.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 0.1);

    // Create renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.clientWidth, containerRef.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.appendChild(renderer.domElement);

    // Create sphere geometry for panorama
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    // Flip the geometry inside out
    geometry.scale(-1, 1, 1);

    // Create material placeholder
    const material = new THREE.MeshBasicMaterial({ color: 0x222222 });
    sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Setup controls
    setupThreeJSControls();

    // Start render loop
    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef || !camera || !renderer) return;
      camera.aspect = containerRef.clientWidth / containerRef.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.clientWidth, containerRef.clientHeight);
    };
    window.addEventListener('resize', handleResize);
  };

  const setupThreeJSControls = () => {
    const canvas = renderer.domElement;

    const onPointerDown = (event) => {
      isMouseDown = true;
      onPointerDownPointerX = event.clientX;
      onPointerDownPointerY = event.clientY;
      onPointerDownPhi = phi;
      onPointerDownTheta = theta;
      canvas.style.cursor = 'grabbing';
    };

    const onPointerMove = (event) => {
      if (!isMouseDown) return;

      const deltaX = event.clientX - onPointerDownPointerX;
      const deltaY = event.clientY - onPointerDownPointerY;

      theta = onPointerDownTheta + deltaX * 0.01;
      phi = onPointerDownPhi + deltaY * 0.01;

      // Constrain phi to prevent flipping
      phi = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, phi));

      updateCamera();
    };

    const onPointerUp = () => {
      isMouseDown = false;
      canvas.style.cursor = 'grab';
    };

    // Mouse events
    canvas.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    // Touch events
    canvas.addEventListener('touchstart', (event) => {
      if (event.touches.length === 1) {
        onPointerDown({
          clientX: event.touches[0].clientX,
          clientY: event.touches[0].clientY
        });
      }
    }, { passive: true });

    canvas.addEventListener('touchmove', (event) => {
      if (event.touches.length === 1) {
        event.preventDefault();
        onPointerMove({
          clientX: event.touches[0].clientX,
          clientY: event.touches[0].clientY
        });
      }
    }, { passive: false });

    canvas.addEventListener('touchend', onPointerUp, { passive: true });

    canvas.style.cursor = 'grab';
  };

  const updateCamera = () => {
    if (!camera) return;
    
    const x = Math.cos(phi) * Math.cos(theta);
    const y = Math.sin(phi);
    const z = Math.cos(phi) * Math.sin(theta);
    
    camera.lookAt(x, y, z);
  };

  const loadPanoramicTexture = async (imageUrl) => {
    return new Promise((resolve, reject) => {
      const loader = new THREE.TextureLoader();
      loader.load(
        imageUrl,
        (texture) => {
          texture.minFilter = THREE.LinearFilter;
          texture.magFilter = THREE.LinearFilter;
          texture.format = THREE.RGBFormat;
          resolve(texture);
        },
        (progress) => {
          if (progress.total > 0) {
            const progressPercent = (progress.loaded / progress.total) * 100;
            loadingProgress = progressPercent;
          }
        },
        (error) => {
          console.error('Failed to load texture:', error);
          reject(error);
        }
      );
    });
  };

  const initPanoramic = async () => {
    try {
      isLoading = true;
      loadingProgress = 0;
      error = null;

      // Initialize Three.js
      initThreeJS();

      // Load initial panoramic texture
      const panoramicTexture = await loadPanoramicTexture(panoramicData[currentScene]);
      
      // Apply texture to sphere
      if (sphere && sphere.material) {
        sphere.material.map = panoramicTexture;
        sphere.material.needsUpdate = true;
      }

      isLoading = false;

    } catch (err) {
      console.error('Panoramic initialization error:', err);
      error = `Failed to load panoramic images: ${err.message || 'Unknown error'}`;
      isLoading = false;
    }
  };

  const animate = () => {
    if (!renderer || !scene || !camera) return;
    animationId = requestAnimationFrame(animate);
    renderer.render(scene, camera);
  };

  const navigateToScene = async (sceneName) => {
    if (!panoramicData[sceneName] || !sphere) return;
    
    try {
      isLoading = true;
      loadingProgress = 0;
      
      currentScene = sceneName;
      
      // Load new texture
      const newTexture = await loadPanoramicTexture(panoramicData[sceneName]);
      
      // Apply new texture
      sphere.material.map = newTexture;
      sphere.material.needsUpdate = true;
      
      // Reset camera position
      phi = 0;
      theta = 0;
      updateCamera();
      
      isLoading = false;
    } catch (err) {
      console.error('Scene navigation error:', err);
      error = `Failed to load scene: ${err.message}`;
      isLoading = false;
    }
  };

  const toggleFullscreen = async () => {
    try {
      if (!isFullscreen) {
        const element = containerRef.parentElement;
        if (element.requestFullscreen) {
          await element.requestFullscreen();
        } else if (element.webkitRequestFullscreen) {
          await element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
          await element.msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          await document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          await document.msExitFullscreen();
        }
      }
    } catch (err) {
      console.warn('Fullscreen not supported:', err);
    }
  };

  const resetView = () => {
    phi = 0;
    theta = 0;
    updateCamera();
  };

  const togglePanoramic = () => {
    if (!isPanoramicMode) {
      isPanoramicMode = true;
      setTimeout(() => initPanoramic(), 50);
    } else {
      isPanoramicMode = false;
      cleanup();
    }
  };

  const cleanup = () => {
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
    
    if (renderer) {
      renderer.dispose();
      if (containerRef && renderer.domElement) {
        containerRef.removeChild(renderer.domElement);
      }
    }
    
    if (scene) {
      scene.clear();
    }
    
    scene = null;
    camera = null;
    renderer = null;
    sphere = null;
    texture = null;
    
    isLoading = false;
    loadingProgress = 0;
    error = null;
    currentScene = 'exterior';
    phi = 0;
    theta = 0;
    isMouseDown = false;
  };

  onMount(() => {
    const handleFullscreenChange = () => {
      isFullscreen = !!(document.fullscreenElement || 
                       document.webkitFullscreenElement || 
                       document.msFullscreenElement);
      
      if (renderer && camera && containerRef) {
        camera.aspect = containerRef.clientWidth / containerRef.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(containerRef.clientWidth, containerRef.clientHeight);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  });

  onDestroy(() => {
    cleanup();
  });

  // Get current scene hotspots
  $: currentHotspots = hotspots.filter(hotspot => 
    currentScene === 'exterior' || hotspot.scene !== currentScene
  );

  // Get available scenes for navigation
  $: availableScenes = Object.keys(panoramicData).filter(scene => scene !== currentScene);

  // Calculate hotspot positions based on current view (simplified for Three.js)
  $: adjustedHotspots = currentHotspots.map(hotspot => {
    // For Three.js implementation, we'll use static positions for now
    // In a full implementation, you'd project 3D world positions to screen space
    return {
      ...hotspot,
      visible: true // Show all hotspots for now
    };
  });
</script>

<div class="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden shadow-lg" class:fullscreen={isFullscreen}>
  <!-- Thumbnail View -->
  {#if !isPanoramicMode}
    <div class="relative w-full h-full">
      <img 
        src={thumbnailUrl} 
        alt={title}
        class="w-full h-full object-cover"
      />
      
      <!-- Overlay with project info -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
        <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div class="flex justify-between items-end">
            <div>
              <h3 class="text-2xl font-bold font-roboto-condensed tracking-wider">
                {title}
              </h3>
              <p class="text-sm font-chivo-mono opacity-90">
                {subtitle}
              </p>
            </div>
            
            <button 
              on:click={togglePanoramic}
              class="flex items-center gap-2 bg-[#56AAB7] hover:bg-[#4a9aa6] text-white px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
              disabled={isLoading}
            >
              <Eye size={16} />
              <span class="text-sm font-medium">
                {isLoading ? 'Loading...' : 'Explore 360°'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  {:else}
    <!-- Panoramic View -->
    <div class="relative w-full h-full">
      <!-- Three.js Container -->
      <div bind:this={containerRef} class="w-full h-full bg-black relative">
        <!-- Hotspots overlay -->
        {#if showHotspots && currentScene === 'exterior' && !isLoading && !error}
          {#each adjustedHotspots as hotspot}
            {#if hotspot.visible}
              <button
                class="absolute transform -translate-x-1/2 -translate-y-1/2 hotspot-button group z-30"
                style="left: {hotspot.x}%; top: {hotspot.y}%;"
                on:click={() => navigateToScene(hotspot.scene)}
                title={hotspot.label}
              >
                <div class="w-10 h-10 bg-[#56AAB7] rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300 group-hover:scale-125 group-hover:bg-[#4a9aa6] animate-pulse">
                  <span class="text-lg">{iconMap[hotspot.icon] || '📍'}</span>
                </div>
                <div class="absolute top-12 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-3 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  {hotspot.label}
                </div>
              </button>
            {/if}
          {/each}
        {/if}
      </div>
      
      <!-- Loading Overlay -->
      {#if isLoading}
        <div class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50/95 to-gray-100/95 backdrop-blur-sm z-50">
          <div class="text-center max-w-sm mx-auto px-6">
            <!-- Three.js Loader -->
            <div class="relative w-16 h-16 mx-auto mb-6">
              <div class="threejs-loader">
                <div class="loader-sphere"></div>
                <div class="loader-ring"></div>
              </div>
            </div>
            
            <!-- Progress Bar -->
            <div class="w-full bg-gray-200 rounded-full h-3 mb-4 overflow-hidden shadow-inner">
              <div 
                class="bg-gradient-to-r from-[#56AAB7] to-[#4a9aa6] h-full rounded-full transition-all duration-300 ease-out relative"
                style="width: {loadingProgress}%"
              >
                <div class="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
              </div>
            </div>
            
            <!-- Loading Text -->
            <p class="text-gray-700 font-roboto font-medium mb-2">
              Loading 360° panoramic experience...
            </p>
            <p class="text-gray-500 text-sm font-roboto">
              Powered by Three.js • {Math.round(loadingProgress)}% Complete
            </p>
            
            <!-- Cancel Button -->
            <button 
              on:click={() => {
                cleanup();
                isPanoramicMode = false;
              }}
              class="mt-4 text-gray-500 hover:text-gray-700 text-sm font-roboto underline transition-colors duration-300"
            >
              Cancel Loading
            </button>
          </div>
        </div>
      {/if}
      
      <!-- Error State -->
      {#if error}
        <div class="absolute inset-0 flex items-center justify-center bg-gray-100/95 backdrop-blur-sm z-50">
          <div class="text-center max-w-sm mx-auto px-6">
            <div class="text-red-500 mb-4">
              <Home size={48} class="mx-auto" />
            </div>
            <h3 class="text-lg font-bold text-red-600 font-roboto-condensed mb-2">
              3D Loading Failed
            </h3>
            <p class="text-red-600 font-roboto mb-6 text-sm leading-relaxed">
              {error}
            </p>
            <div class="flex gap-2 justify-center">
              <button 
                on:click={() => {
                  cleanup();
                  isPanoramicMode = false;
                }}
                class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-full transition-all duration-300 text-sm"
              >
                Back to Thumbnail
              </button>
              <button 
                on:click={() => { 
                  error = null; 
                  loadingProgress = 0;
                  initPanoramic();
                }}
                class="bg-[#56AAB7] hover:bg-[#4a9aa6] text-white px-4 py-2 rounded-full transition-all duration-300 text-sm"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      {/if}
      
      <!-- Controls -->
      {#if !isLoading && !error}
        <!-- Top Controls -->
        <div class="absolute top-4 left-4 flex gap-2 z-40">
          <button 
            on:click={() => {
              cleanup();
              isPanoramicMode = false;
            }}
            class="bg-white/90 hover:bg-white text-gray-700 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
            title="Back to thumbnail"
          >
            <Home size={20} />
          </button>
          
          <button 
            on:click={resetView}
            class="bg-white/90 hover:bg-white text-gray-700 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
            title="Reset view"
          >
            <RotateCcw size={20} />
          </button>
          
          <button 
            on:click={() => showHotspots = !showHotspots}
            class="bg-white/90 hover:bg-white text-gray-700 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
            class:bg-[#56AAB7]={showHotspots}
            class:text-white={showHotspots}
            title="Toggle hotspots"
          >
            <MousePointer size={20} />
          </button>
          
          <button 
            on:click={toggleFullscreen}
            class="bg-white/90 hover:bg-white text-gray-700 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
            title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {#if isFullscreen}
              <Minimize size={20} />
            {:else}
              <Maximize size={20} />
            {/if}
          </button>
        </div>
        
        <!-- Scene Navigation -->
        {#if availableScenes.length > 0}
          <div class="absolute top-4 right-4 z-40">
            <div class="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg max-w-xs">
              <h4 class="text-sm font-roboto-condensed font-bold text-gray-800 mb-2">Navigate Scenes</h4>
              <div class="grid grid-cols-1 gap-1">
                {#each availableScenes as sceneName}
                  <button
                    on:click={() => navigateToScene(sceneName)}
                    class="text-xs px-3 py-2 bg-gray-100 hover:bg-[#56AAB7] hover:text-white rounded transition-all duration-300 text-left"
                  >
                    {sceneNames[sceneName] || sceneName}
                  </button>
                {/each}
              </div>
            </div>
          </div>
        {/if}
        
        <!-- Current Scene Info -->
        <div class="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg z-40">
          <h3 class="text-lg font-bold font-roboto-condensed tracking-wider text-gray-800">
            {title}
          </h3>
          <p class="text-sm font-chivo-mono text-gray-600">
            {subtitle}
          </p>
          <p class="text-xs text-[#56AAB7] font-roboto-condensed font-bold mt-1">
            Current: {sceneNames[currentScene] || currentScene}
          </p>
          <p class="text-xs text-gray-500 mt-2">
            Drag to look around 360° • Click hotspots to navigate {isFullscreen ? '• ESC to exit fullscreen' : ''}
          </p>
          <div class="flex items-center gap-2 mt-2">
            <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span class="text-xs text-gray-500">Powered by Three.js WebGL</span>
          </div>
        </div>
        
        <!-- Fullscreen indicator -->
        {#if isFullscreen}
          <div class="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-roboto-condensed z-40">
            360° IMMERSIVE MODE • THREE.JS
          </div>
        {/if}
      {/if}
    </div>
  {/if}
</div>

<style>
  .fullscreen {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    z-index: 9999 !important;
    border-radius: 0 !important;
  }

  .threejs-loader {
    position: relative;
    width: 64px;
    height: 64px;
  }

  .loader-sphere {
    width: 48px;
    height: 48px;
    background: linear-gradient(45deg, #56AAB7, #4a9aa6);
    border-radius: 50%;
    position: absolute;
    top: 8px;
    left: 8px;
    animation: threejs-pulse 2s ease-in-out infinite;
  }

  .loader-ring {
    width: 64px;
    height: 64px;
    border: 3px solid transparent;
    border-top: 3px solid #56AAB7;
    border-radius: 50%;
    animation: threejs-spin 1s linear infinite;
  }

  @keyframes threejs-spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @keyframes threejs-pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.1); opacity: 0.8; }
  }

  .hotspot-button {
    z-index: 30;
    pointer-events: auto;
  }

  button:hover { transform: translateY(-1px); }
  button:active { transform: translateY(0); }
  button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none !important;
  }

  @media (max-width: 768px) {
    .threejs-loader {
      width: 48px;
      height: 48px;
    }
    
    .loader-sphere {
      width: 36px;
      height: 36px;
      top: 6px;
      left: 6px;
    }
    
    .loader-ring {
      width: 48px;
      height: 48px;
      border-width: 2px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .loader-sphere, .loader-ring { animation: none; }
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
</style>