<!-- PannellumPanoramicViewer.svelte -->
<script>
  import { onMount, onDestroy } from 'svelte';
  import { Play, Maximize, RotateCcw, Home, Minimize, MousePointer, Eye, ZoomIn, ZoomOut, Compass } from 'lucide-svelte';
  import { base } from '$app/paths';

  // Props
  export let title = "MODERN HOUSE";
  export let subtitle = "JAPANDI STYLE | 2025";
  export let thumbnailUrl = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop";
  export let panoramicData = {
    exterior: 'assets/panorama/1.png',
    livingRoom: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/360_Pano_of_NOIRLab_Headquarters_Entrance_%28360Pano_Entrance-CC2%29.jpg/4096px-360_Pano_of_NOIRLab_Headquarters_Entrance_%28360Pano_Entrance-CC2%29.jpg',
    kitchen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/360_Panorama_of_NOIRLab_Machine_Shop_%28360Pano_Machine_room_3-CC%29.jpg/4096px-360_Panorama_of_NOIRLab_Machine_Shop_%28360Pano_Machine_room_3-CC%29.jpg'
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
  let pannellumContainer;
  let currentScene = 'exterior';
  let isFullscreen = false;
  let showHotspots = true;
  let showControls = true;
  let autoRotate = false;

  // Pannellum viewer instance
  let viewer = null;
  let pannellumLoaded = false;

  // Helper function to resolve image paths
  const resolveImagePath = (imagePath) => {
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://') || imagePath.startsWith('data:')) {
      return imagePath;
    }
    const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
    return `${base}/${cleanPath}`;
  };

  // Create resolved panoramic data
  $: resolvedPanoramicData = Object.fromEntries(
    Object.entries(panoramicData).map(([key, value]) => [key, resolveImagePath(value)])
  );
  $: resolvedThumbnailUrl = resolveImagePath(thumbnailUrl);

  // Scene names
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
    door: '🚪', utensils: '🍽️', bed: '🛏️', droplets: '🚿', waves: '🌊',
    music: '🎵', book: '📚', flower: '🌸', sun: '☀️', wine: '🍷',
    coffee: '☕', stairs: '🪜', home: '🏠'
  };

  // Load Pannellum library
  const loadPannellum = () => {
    return new Promise((resolve, reject) => {
      if (window.pannellum) {
        resolve();
        return;
      }

      // Load CSS
      const cssLink = document.createElement('link');
      cssLink.rel = 'stylesheet';
      cssLink.href = `${base}/assets/css/pannellum.css`;
      document.head.appendChild(cssLink);

      // Load JS
      const script = document.createElement('script');
      script.src = `${base}/assets/js/pannellum.js`;
     
      script.onload = () => {
        pannellumLoaded = true;
        resolve();
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  };

  // Initialize Pannellum viewer
  const initPannellum = async () => {
    try {
      isLoading = true;
      loadingProgress = 20;
      error = null;

      // Load Pannellum library
      await loadPannellum();
      loadingProgress = 40;

      // Convert hotspots to Pannellum format
      const pannellumHotspots = showHotspots ? hotspots.map(hotspot => ({
        pitch: (50 - hotspot.y) * 1.8 - 90, // Convert Y to pitch
        yaw: (hotspot.x - 50) * 3.6, // Convert X to yaw
        type: 'scene',
        sceneId: hotspot.scene,
        text: hotspot.label,
        attributes: {
          style: `
            background: linear-gradient(135deg, #56AAB7, #4a9aa6);
            border-radius: 50%;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            border: 2px solid rgba(255,255,255,0.3);
            transition: all 0.3s ease;
            cursor: pointer;
          `,
          'data-icon': iconMap[hotspot.icon] || '📍'
        }
      })) : [];

      loadingProgress = 60;

      // Create scenes configuration
      const scenes = {};
      for (const [sceneKey, imageUrl] of Object.entries(resolvedPanoramicData)) {
        scenes[sceneKey] = {
          type: 'equirectangular',
          panorama: imageUrl,
          autoLoad: sceneKey === currentScene,
          hotSpots: sceneKey === 'exterior' ? pannellumHotspots : [],
          title: sceneNames[sceneKey] || sceneKey,
          author: '2WATUJU Architecture',
          hfov: 100,
          pitch: 0,
          yaw: 0,
          hotSpotDebug: false
        };
      }

      loadingProgress = 80;

      // Initialize Pannellum viewer
      viewer = window.pannellum.viewer(pannellumContainer, {
        default: {
          firstScene: currentScene,
          author: '2WATUJU Architecture',
          sceneFadeDuration: 1000,
          autoLoad: true,
          showZoomCtrl: false,
          showFullscreenCtrl: false,
          showControls: false,
          mouseZoom: true,
          doubleClickZoom: true,
          draggable: true,
          keyboardZoom: true,
          friction: 0.15,
          hfov: 100,
          maxHfov: 120,
          minHfov: 50,
          pitch: 0,
          yaw: 0,
          hotSpotDebug: false,
          backgroundColor: [0, 0, 0],
          loadButtonLabel: 'Click to Load Panorama',
          noPanoramaError: 'No panorama image was specified.',
          fileAccessError: 'The file %s could not be accessed.',
          malformedURLError: 'There is something wrong with the panorama URL.',
          iOS: false
        },
        scenes: scenes
      });

      // Set up event listeners
      viewer.on('load', () => {
        loadingProgress = 100;
        isLoading = false;
        console.log('Panorama loaded successfully');
      });

      viewer.on('error', (err) => {
        console.error('Pannellum error:', err);
        error = `Failed to load panorama: ${err}`;
        isLoading = false;
      });

      viewer.on('scenechange', (sceneId) => {
        currentScene = sceneId;
        console.log('Scene changed to:', sceneId);
      });

      // Auto rotate functionality
      if (autoRotate) {
        viewer.setAutoRotate(2);
      }

    } catch (err) {
      console.error('Pannellum initialization error:', err);
      error = `Failed to initialize panoramic viewer: ${err.message || 'Unknown error'}`;
      isLoading = false;
    }
  };

  // Navigation functions
  const navigateToScene = (sceneName) => {
    if (viewer && resolvedPanoramicData[sceneName]) {
      viewer.loadScene(sceneName);
      currentScene = sceneName;
    }
  };

  const resetView = () => {
    if (viewer) {
      viewer.setPitch(0);
      viewer.setYaw(0);
      viewer.setHfov(100);
    }
  };

  const toggleAutoRotate = () => {
    autoRotate = !autoRotate;
    if (viewer) {
      if (autoRotate) {
        viewer.setAutoRotate(2);
      } else {
        viewer.setAutoRotate(false);
      }
    }
  };

  const zoomIn = () => {
    if (viewer) {
      const currentHfov = viewer.getHfov();
      viewer.setHfov(Math.max(50, currentHfov - 10));
    }
  };

  const zoomOut = () => {
    if (viewer) {
      const currentHfov = viewer.getHfov();
      viewer.setHfov(Math.min(120, currentHfov + 10));
    }
  };

  const toggleFullscreen = async () => {
    try {
      if (!isFullscreen) {
        const element = containerRef;
        if (element.requestFullscreen) {
          await element.requestFullscreen();
        } else if (element.webkitRequestFullscreen) {
          await element.webkitRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          await document.webkitExitFullscreen();
        }
      }
    } catch (err) {
      console.warn('Fullscreen not supported:', err);
    }
  };

  const togglePanoramic = () => {
    if (!isPanoramicMode) {
      isPanoramicMode = true;
      setTimeout(() => initPannellum(), 100);
    } else {
      isPanoramicMode = false;
      cleanup();
    }
  };

  const cleanup = () => {
    if (viewer) {
      viewer.destroy();
      viewer = null;
    }
    isLoading = false;
    loadingProgress = 0;
    error = null;
    currentScene = 'exterior';
    autoRotate = false;
    pannellumLoaded = false;
  };

  onMount(() => {
    const handleFullscreenChange = () => {
      isFullscreen = !!(document.fullscreenElement || document.webkitFullscreenElement);
      
      // Resize Pannellum viewer when entering/exiting fullscreen
      if (viewer) {
        setTimeout(() => {
          viewer.resize();
        }, 100);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  });

  onDestroy(() => {
    cleanup();
  });

  // Get available scenes for navigation
  $: availableScenes = Object.keys(resolvedPanoramicData).filter(scene => scene !== currentScene);
</script>

<svelte:head>
  {#if isPanoramicMode}
    <link rel="stylesheet" href={`${base}/assets/css/pannellum.css`}>
  {/if}
</svelte:head>

<div bind:this={containerRef} class="relative w-full aspect-video bg-black rounded-lg overflow-hidden shadow-2xl" class:fullscreen={isFullscreen}>
  <!-- Thumbnail View -->
  {#if !isPanoramicMode}
    <div class="relative w-full h-full group">
      <img 
        src={resolvedThumbnailUrl} 
        alt={title}
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      
      <!-- Overlay with project info -->
      <div class="absolute inset-0" style="background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, transparent 100%);">
        <div class="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div class="flex justify-between items-end">
            <div class="space-y-2">
              <h3 class="text-3xl font-bold font-roboto-condensed tracking-wider leading-tight">
                {title}
              </h3>
              <p class="text-sm font-chivo-mono opacity-90 tracking-wide">
                {subtitle}
              </p>
              <div class="flex items-center gap-2 text-xs opacity-75">
                <div class="w-1 h-1 rounded-full" style="background-color: #56AAB7;"></div>
                <span>PROFESSIONAL 360° EXPERIENCE</span>
              </div>
            </div>
            
            <button 
              on:click={togglePanoramic}
              class="flex items-center gap-3 text-white px-6 py-3 rounded-full transition-all duration-500 hover:scale-105 shadow-lg"
              style="background: linear-gradient(to right, #56AAB7, #4a9aa6);"
              disabled={isLoading}
            >
              <Eye size={20} />
              <span class="text-sm font-medium tracking-wide">
                {isLoading ? 'Loading...' : 'Explore 360°'}
              </span>
              <div class="w-2 h-2 rounded-full animate-pulse" style="background-color: rgba(255,255,255,0.3);"></div>
            </button>
          </div>
        </div>
      </div>

      <!-- Hover preview effect -->
      <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div class="absolute top-4 right-4 text-white px-3 py-1 rounded-full text-xs font-chivo-mono" style="background-color: rgba(0,0,0,0.6);">
          Professional WebGL Panoramic Viewer
        </div>
      </div>
    </div>
  {:else}
    <!-- Pannellum Panoramic View -->
    <div class="relative w-full h-full bg-black">
      <!-- Pannellum Container -->
      <div bind:this={pannellumContainer} class="w-full h-full" id="pannellum-viewer">
        <!-- Pannellum will render here -->
      </div>
      
      <!-- Loading Overlay -->
      {#if isLoading}
        <div class="absolute inset-0 flex items-center justify-center z-50" style="background: rgba(0,0,0,0.95);">
          <div class="text-center max-w-md mx-auto px-6">
            <!-- Professional Loader -->
            <div class="relative w-20 h-20 mx-auto mb-8">
              <div class="loader-container">
                <div class="loader-orbit-1"></div>
                <div class="loader-orbit-2"></div>
                <div class="loader-core"></div>
              </div>
            </div>
            
            <!-- Progress Bar -->
            <div class="w-full bg-gray-800 rounded-full h-3 mb-6 overflow-hidden">
              <div 
                class="h-full rounded-full transition-all duration-500 ease-out"
                style="width: {loadingProgress}%; background: linear-gradient(to right, #56AAB7, #4a9aa6);"
              ></div>
            </div>
            
            <!-- Loading Text -->
            <h3 class="text-xl font-bold text-white font-roboto-condensed mb-2">
              Initializing Professional 360° Viewer
            </h3>
            <p class="text-gray-300 text-sm font-roboto mb-4">
              Loading Pannellum WebGL renderer...
            </p>
            <p class="text-lg font-bold font-chivo-mono" style="color: #56AAB7;">
              {Math.round(loadingProgress)}%
            </p>
            
            <button 
              on:click={() => {
                cleanup();
                isPanoramicMode = false;
              }}
              class="mt-6 text-gray-400 hover:text-white text-sm font-roboto underline transition-colors duration-300"
            >
              Cancel Loading
            </button>
          </div>
        </div>
      {/if}
      
      <!-- Error State -->
      {#if error}
        <div class="absolute inset-0 flex items-center justify-center z-50" style="background: rgba(0,0,0,0.95);">
          <div class="text-center max-w-sm mx-auto px-6">
            <div class="text-red-400 mb-6">
              <Home size={56} class="mx-auto" />
            </div>
            <h3 class="text-xl font-bold text-red-400 font-roboto-condensed mb-3">
              Viewer Loading Failed
            </h3>
            <p class="text-red-300 font-roboto mb-8 text-sm leading-relaxed">
              {error}
            </p>
            <div class="flex gap-3 justify-center">
              <button 
                on:click={() => {
                  cleanup();
                  isPanoramicMode = false;
                }}
                class="bg-gray-600 hover:bg-gray-500 text-white px-6 py-3 rounded-full transition-all duration-300 text-sm font-medium"
              >
                Back to Thumbnail
              </button>
              <button 
                on:click={() => { 
                  error = null; 
                  loadingProgress = 0;
                  initPannellum();
                }}
                class="text-white px-6 py-3 rounded-full transition-all duration-300 text-sm font-medium"
                style="background: linear-gradient(to right, #56AAB7, #4a9aa6);"
              >
                Retry Loading
              </button>
            </div>
          </div>
        </div>
      {/if}
      
      <!-- Professional Controls -->
      {#if !isLoading && !error && showControls}
        <!-- Top Control Bar -->
        <div class="absolute top-4 left-4 flex gap-2 z-50">
          <button 
            on:click={() => {
              cleanup();
              isPanoramicMode = false;
            }}
            class="control-btn"
            title="Back to thumbnail"
          >
            <Home size={18} />
          </button>
          
          <button 
            on:click={resetView}
            class="control-btn"
            title="Reset view"
          >
            <RotateCcw size={18} />
          </button>
          
          <button 
            on:click={() => showHotspots = !showHotspots}
            class="control-btn"
            class:active={showHotspots}
            title="Toggle hotspots"
          >
            <MousePointer size={18} />
          </button>
          
          <button 
            on:click={toggleAutoRotate}
            class="control-btn"
            class:active={autoRotate}
            title="Auto-rotate"
          >
            <Play size={18} class={autoRotate ? 'animate-pulse' : ''} />
          </button>
          
          <button 
            on:click={toggleFullscreen}
            class="control-btn"
            title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {#if isFullscreen}
              <Minimize size={18} />
            {:else}
              <Maximize size={18} />
            {/if}
          </button>
        </div>

        <!-- Zoom Controls -->
        <div class="absolute top-4 right-4 flex flex-col gap-2 z-50">
          <button 
            on:click={zoomIn}
            class="control-btn"
            title="Zoom in"
          >
            <ZoomIn size={18} />
          </button>
          <button 
            on:click={zoomOut}
            class="control-btn"
            title="Zoom out"
          >
            <ZoomOut size={18} />
          </button>
        </div>
        
        <!-- Scene Navigation -->
        {#if availableScenes.length > 0}
          <div class="absolute top-20 right-4 z-50">
            <div class="glass-panel p-4 max-w-xs">
              <h4 class="text-sm font-roboto-condensed font-bold text-white mb-3 flex items-center gap-2">
                <Compass size={16} />
                Navigate Scenes
              </h4>
              <div class="space-y-1">
                {#each availableScenes as sceneName}
                  <button
                    on:click={() => navigateToScene(sceneName)}
                    class="w-full text-xs px-3 py-2 rounded-lg transition-all duration-300 text-left scene-btn"
                  >
                    {sceneNames[sceneName] || sceneName}
                  </button>
                {/each}
              </div>
            </div>
          </div>
        {/if}
        
        <!-- Info Panel -->
        <!-- <div class="absolute bottom-4 left-4 glass-panel p-4 max-w-sm z-50">
          <h3 class="text-lg font-bold font-roboto-condensed tracking-wider text-white mb-1">
            {title}
          </h3>
          <p class="text-sm font-chivo-mono text-gray-300 mb-2">
            {subtitle}
          </p>
          <p class="text-xs font-roboto-condensed font-bold mb-3" style="color: #56AAB7;">
            📍 {sceneNames[currentScene] || currentScene}
          </p>
          
          <div class="flex items-center gap-2 text-xs text-gray-400 mb-2">
            <div class="w-2 h-2 rounded-full bg-green-500"></div>
            <span>Pannellum WebGL Renderer</span>
          </div>
          
          <p class="text-xs text-gray-400 leading-relaxed">
            Drag to explore • Scroll to zoom • Click hotspots to navigate
          </p>
        </div> -->
        
        <!-- Fullscreen indicator -->
        {#if isFullscreen}
          <div class="absolute top-4 left-1/2 transform -translate-x-1/2 glass-panel px-4 py-2 z-50">
            <div class="flex items-center gap-2 text-white text-sm font-roboto-condensed">
              <div class="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              PROFESSIONAL 360° MODE
            </div>
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

  .glass-panel {
    background: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  }

  .control-btn {
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(12px);
    color: white;
    padding: 12px;
    border-radius: 50%;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.15);
  }

  .control-btn:hover {
    background: rgba(0, 0, 0, 0.9);
    transform: scale(1.1);
    box-shadow: 0 6px 24px rgba(86, 170, 183, 0.4);
  }

  .control-btn.active {
    background: linear-gradient(to right, #56AAB7, #4a9aa6);
    box-shadow: 0 6px 24px rgba(86, 170, 183, 0.6);
  }

  .scene-btn {
    background: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.9);
  }

  .scene-btn:hover {
    background: #56AAB7;
    color: white;
    transform: scale(1.02);
  }

  .loader-container {
    position: relative;
    width: 80px;
    height: 80px;
  }

  .loader-orbit-1 {
    position: absolute;
    width: 80px;
    height: 80px;
    border: 3px solid transparent;
    border-top: 3px solid #56AAB7;
    border-radius: 50%;
    animation: spin 2s linear infinite;
  }

  .loader-orbit-2 {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 60px;
    height: 60px;
    border: 2px solid transparent;
    border-right: 2px solid #4a9aa6;
    border-radius: 50%;
    animation: spin 1.5s linear infinite reverse;
  }

  .loader-core {
    position: absolute;
    top: 30px;
    left: 30px;
    width: 20px;
    height: 20px;
    background: linear-gradient(45deg, #56AAB7, #4a9aa6);
    border-radius: 50%;
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @keyframes pulse {
    0%, 100% { 
      transform: scale(1);
      opacity: 1;
    }
    50% { 
      transform: scale(1.2);
      opacity: 0.7;
    }
  }

  /* Override Pannellum default styles */
  :global(#pannellum-viewer .pnlm-container) {
    background-color: #000 !important;
  }

  :global(#pannellum-viewer .pnlm-render-container) {
    cursor: grab !important;
  }

  :global(#pannellum-viewer .pnlm-render-container:active) {
    cursor: grabbing !important;
  }

  /* Custom hotspot styling */
  :global(#pannellum-viewer .pnlm-hotspot) {
    border-radius: 50% !important;
    transition: all 0.3s ease !important;
  }

  :global(#pannellum-viewer .pnlm-hotspot:hover) {
    transform: scale(1.2) !important;
    box-shadow: 0 6px 20px rgba(86, 170, 183, 0.6) !important;
  }

  /* Mobile responsive */
  @media (max-width: 768px) {
    .control-btn {
      padding: 8px;
    }
    
    .glass-panel {
      backdrop-filter: blur(10px);
    }
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    .loader-orbit-1, .loader-orbit-2, .loader-core { 
      animation: none; 
    }
    
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
</style>