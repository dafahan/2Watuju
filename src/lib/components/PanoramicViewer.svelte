<!-- Complete Fixed PannellumPanoramicViewer.svelte -->
<script>
  import { onMount, onDestroy } from 'svelte';
  import { Maximize, RotateCcw, Home, Minimize, MousePointer, Eye, ZoomIn, ZoomOut, Compass, Info, Navigation, AlertTriangle, ToggleLeft, ToggleRight } from 'lucide-svelte';
  import { base } from '$app/paths';

  // Props
  export let title = "MODERN HOUSE";
  export let subtitle = "JAPANDI STYLE | 2025";
  export let thumbnailUrl = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop";
  export let panoramicData = {
    outside: 'assets/panorama/2.png',
    courtyard: 'assets/panorama/5.png',
    bedroom: 'assets/panorama/3.png',
    terrace: 'assets/panorama/4.png'
  };
  export let hotspots = [
    {
      x: 79.02,
      y: 51.94,
      scene: "outside",
      label: "Enter House",
      type: "nav",
      targetScene: "courtyard",
      icon: "door"
    },
    {
      x: 53.86,
      y: 49.99,
      scene: "courtyard",
      label: "Leave House",
      type: "nav",
      targetScene: "outside",
      icon: "door"
    },
    {
      x: 72.43,
      y: 46.25,
      scene: "courtyard",
      label: "Terrace",
      type: "nav",
      targetScene: "terrace",
      icon: "door"
    },
    {
      x: 80.46,
      y: 48.1,
      scene: "courtyard",
      label: "Bedroom",
      type: "nav",
      targetScene: "bedroom",
      icon: "door"
    },
    {
      x: 62.42,
      y: 50,
      scene: "bedroom",
      label: "Terrace",
      type: "nav",
      targetScene: "terrace",
      icon: "door"
    },
    {
      x: 12.92,
      y: 48.23,
      scene: "bedroom",
      label: "Courtyard",
      type: "nav",
      targetScene: "courtyard",
      icon: "door"
    },
    {
      x: 73.8,
      y: 51.95,
      scene: "terrace",
      label: "Bedroom",
      type: "nav",
      targetScene: "bedroom",
      icon: "door"
    },
    {
      x: 3.31,
      y: 47.37,
      scene: "terrace",
      label: "Courtyard",
      type: "nav",
      targetScene: "courtyard",
      icon: "door"
    }
  ];

  // State
  let isPanoramicMode = false;
  let isLoading = false;
  let loadingProgress = 0;
  let loadingText = 'Initializing...';
  let error = null;
  let containerRef;
  let pannellumContainer;
  let currentScene = 'outside';
  let isFullscreen = false;
  let showHotspots = true;
  let showControls = true;
  let showAllControls = true;
  let autoRotate = false;

  // Pannellum viewer instance
  let viewer = null;
  let pannellumLoaded = false;
  let imageValidationResults = {};

  // Helper function to resolve image paths
  const resolveImagePath = (imagePath) => {
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://') || imagePath.startsWith('data:')) {
      return imagePath;
    }
    const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
    return `${base}/${cleanPath}`;
  };

  // Create resolved panoramic data with validation
  $: resolvedPanoramicData = Object.fromEntries(
    Object.entries(panoramicData).map(([key, value]) => [key, resolveImagePath(value)])
  );
  $: resolvedThumbnailUrl = resolveImagePath(thumbnailUrl);

  // Debug logging
  $: {
    console.log('=== DEBUG: Resolved Panoramic Data ===');
    Object.entries(resolvedPanoramicData).forEach(([key, value]) => {
      console.log(`${key}:`, value);
    });
    console.log('Current scene:', currentScene);
    console.log('Available scenes:', Object.keys(resolvedPanoramicData));
  }

  // Scene names
  const sceneNames = {
    outside: 'Outside View',
    courtyard: 'Courtyard',
    bedroom: 'Bedroom',
    terrace: 'Terrace',
    livingRoom: 'Living Room',
    kitchen: 'Kitchen',
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
    wineCellar: 'Wine Cellar',
    genkan: 'Genkan (Entrance)',
    teaRoom: 'Tea Room',
    zenGarden: 'Zen Garden',
    tatamiRoom: 'Tatami Room'
  };

  // Image validation function
  const validateImages = async () => {
    const issues = [];
    const validationResults = {};
    
    for (const [sceneKey, imageUrl] of Object.entries(resolvedPanoramicData)) {
      if (!imageUrl || typeof imageUrl !== 'string') {
        issues.push(`${sceneKey}: Invalid image URL`);
        validationResults[sceneKey] = { valid: false, error: 'Invalid URL' };
      } else if (!imageUrl.match(/\.(jpg|jpeg|png|webp)$/i)) {
        issues.push(`${sceneKey}: Unsupported image format`);
        validationResults[sceneKey] = { valid: false, error: 'Unsupported format' };
      } else {
        // Check if image exists and get size info
        try {
          const response = await fetch(imageUrl, { method: 'HEAD' });
          if (response.ok) {
            const contentLength = response.headers.get('content-length');
            const sizeInMB = contentLength ? parseInt(contentLength) / (1024 * 1024) : 0;
            validationResults[sceneKey] = { 
              valid: true, 
              sizeInMB: sizeInMB,
              isLarge: sizeInMB > 5,
              isHuge: sizeInMB > 10
            };
            
            if (sizeInMB > 10) {
              console.warn(`⚠️ Very large image detected for ${sceneKey}: ${sizeInMB.toFixed(2)}MB`);
            }
          } else {
            issues.push(`${sceneKey}: Image not accessible (${response.status})`);
            validationResults[sceneKey] = { valid: false, error: `HTTP ${response.status}` };
          }
        } catch (error) {
          console.warn(`Cannot validate ${sceneKey}:`, error.message);
          validationResults[sceneKey] = { valid: true, sizeInMB: 0 }; // Assume valid for offline development
        }
      }
    }
    
    imageValidationResults = validationResults;
    
    if (issues.length > 0) {
      console.error('Image validation issues:', issues);
      throw new Error(`Image validation failed: ${issues.slice(0, 3).join(', ')}${issues.length > 3 ? '...' : ''}`);
    }
    
    return validationResults;
  };

  // Load Pannellum library from CDN
  const loadPannellum = () => {
    return new Promise((resolve, reject) => {
      if (window.pannellum) {
        resolve();
        return;
      }

      // Load CSS
      const cssLink = document.createElement('link');
      cssLink.rel = 'stylesheet';
      cssLink.href = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css';
      document.head.appendChild(cssLink);

      // Load JavaScript
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js';
      script.onload = () => {
        pannellumLoaded = true;
        console.log('✓ Pannellum loaded from CDN');
        resolve();
      };
      script.onerror = (error) => {
        console.error('✗ Failed to load Pannellum from CDN:', error);
        reject(error);
      };
      document.head.appendChild(script);
    });
  };

  // Enhanced hotspot creation function
  function createCustomHotspot(hotSpotDiv, args) {
    const { label, type, targetSceneKey } = typeof args === 'object' ? args : { label: args, type: 'info', targetSceneKey: '' };
    
    hotSpotDiv.classList.add('custom-tooltip');
    
    const iconContainer = document.createElement('div');
    iconContainer.style.cssText = `
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    `;
    
    if (type === 'nav') {
      iconContainer.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="m18 15-6-6-6 6"/>
        </svg>
      `;
      // Glass morphism for navigation
      hotSpotDiv.style.background = `
        linear-gradient(135deg, rgba(86, 170, 183, 0.3), rgba(74, 154, 166, 0.2)),
        rgba(255, 255, 255, 0.1)
      `;
      hotSpotDiv.style.backdropFilter = 'blur(10px)';
      hotSpotDiv.style.webkitBackdropFilter = 'blur(10px)';
      hotSpotDiv.style.border = '1px solid rgba(255, 255, 255, 0.2)';
      hotSpotDiv.style.borderRadius = '12px';
      hotSpotDiv.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
      hotSpotDiv.style.cursor = 'pointer';
    } else {
      iconContainer.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="16" x2="12" y2="12"/>
          <line x1="12" y1="8" x2="12.01" y2="8"/>
        </svg>
      `;
      // Glass morphism for info
      hotSpotDiv.style.background = `
        linear-gradient(135deg, rgba(86, 170, 183, 0.3), rgba(74, 154, 166, 0.2)),
        rgba(255, 255, 255, 0.1)
      `;
      hotSpotDiv.style.backdropFilter = 'blur(10px)';
      hotSpotDiv.style.webkitBackdropFilter = 'blur(10px)';
      hotSpotDiv.style.border = '1px solid rgba(255, 255, 255, 0.2)';
      hotSpotDiv.style.borderRadius = '12px';
      hotSpotDiv.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
    }
    
    hotSpotDiv.appendChild(iconContainer);
    
    var span = document.createElement('span');
    span.innerHTML = label;
    hotSpotDiv.appendChild(span);
    span.style.width = span.scrollWidth - 20 + 'px';
    span.style.marginLeft = -(span.scrollWidth - hotSpotDiv.offsetWidth) / 2 + 20 + 'px';
    span.style.marginTop = -span.scrollHeight - 62 + 'px';
    
    if (type === 'nav' && targetSceneKey) {
      hotSpotDiv.onclick = (e) => {
        e.stopPropagation();
        navigateToScene(targetSceneKey);
      };
    }
  }

  // Get hotspots for current scene
  const getHotspotsForScene = (sceneKey) => {
    return hotspots.filter(hotspot => hotspot.scene === sceneKey);
  };

  // Progressive image loading
  const createProgressiveLoader = (imageUrl, sceneKey) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      // Timeout for individual images based on expected size
      const validation = imageValidationResults[sceneKey];
      const timeoutDuration = validation?.isHuge ? 15000 : validation?.isLarge ? 10000 : 8000;
      
      const timeout = setTimeout(() => {
        console.warn(`⏱️ Timeout loading ${sceneKey} (${timeoutDuration}ms)`);
        reject(new Error(`Timeout loading ${sceneKey}`));
      }, timeoutDuration);
      
      img.onload = () => {
        clearTimeout(timeout);
        console.log(`✓ Loaded ${sceneKey}: ${img.naturalWidth}x${img.naturalHeight}`);
        resolve(img);
      };
      
      img.onerror = (error) => {
        clearTimeout(timeout);
        console.error(`✗ Failed to load ${sceneKey}:`, error);
        reject(error);
      };
      
      // Start loading
      img.src = imageUrl;
    });
  };

  // Enhanced Pannellum initialization with comprehensive optimization
  const initPannellum = async () => {
    try {
      isLoading = true;
      error = null;
      loadingProgress = 0;
      loadingText = 'Initializing...';

      // Step 1: Load Pannellum library
      console.log('🔄 Loading Pannellum library...');
      loadingText = 'Loading Pannellum library...';
      loadingProgress = 5;
      await loadPannellum();
      console.log('✓ Pannellum library loaded');

      // Step 2: Validate images
      console.log('🔄 Validating images...');
      loadingText = 'Validating images...';
      loadingProgress = 15;
      await validateImages();
      console.log('✓ Images validated');

      // Step 3: Load current scene with priority
      console.log(`🔄 Priority loading current scene: ${currentScene}`);
      loadingText = `Loading ${sceneNames[currentScene] || currentScene}...`;
      loadingProgress = 25;
      
      const currentSceneUrl = resolvedPanoramicData[currentScene];
      if (currentSceneUrl) {
        await createProgressiveLoader(currentSceneUrl, currentScene);
        console.log(`✓ Current scene loaded: ${currentScene}`);
      }
      loadingProgress = 50;

      // Step 4: Build optimized scene configuration
      console.log('🔄 Building scene configuration...');
      loadingText = 'Configuring scenes...';
      const scenes = {};
      const sceneKeys = Object.keys(resolvedPanoramicData);

      for (const sceneKey of sceneKeys) {
        const imageUrl = resolvedPanoramicData[sceneKey]; // FIX: Direct access to URL
        const sceneHotspots = showHotspots ? getHotspotsForScene(sceneKey) : []; // FIX: Use existing function

        const pannellumHotspots = sceneHotspots.map((hotspot, index) => {
          const yaw = (hotspot.x / 100) * 360 - 180;
          const pitch = 90 - (hotspot.y / 100) * 180;
          
          return {
            id: `hotspot_${sceneKey}_${index}`,
            pitch: pitch,
            yaw: yaw,
            cssClass: "custom-hotspot",
            createTooltipFunc: createCustomHotspot,
            createTooltipArgs: {
              label: hotspot.label || 'Unnamed Hotspot',
              type: hotspot.type || 'info',
              targetSceneKey: hotspot.targetScene || ''
            }
          };
        });

        // Optimized scene configuration
        scenes[sceneKey] = {
          type: 'equirectangular',
          panorama: imageUrl,
          autoLoad: sceneKey === currentScene, // Only auto-load current scene
          hotSpots: pannellumHotspots,
          title: sceneNames[sceneKey] || sceneKey,
          author: '2WATUJU Architecture',
          
          // Performance optimized settings
          hfov: 85,              // Optimized field of view
          pitch: 0,
          yaw: 0,
          hotSpotDebug: false,
          
          // FIX: Safe preview image handling
          ...(imageUrl && typeof imageUrl === 'string' && imageUrl.includes('.') ? {
            preview: imageUrl.replace(/\.(jpg|jpeg|png|webp)$/i, '_preview.$1')
          } : {}),
          
          // Disable auto-rotate for non-current scenes
          autoRotate: false,
          
          // Optimized rendering settings
          backgroundColor: [0, 0, 0],
          crossOrigin: "anonymous",
          
          // Mobile optimizations
          orientationOnByDefault: false,
          touchPanSpeedCoeffFactor: 0.8,
        };
      }

      loadingProgress = 70;
      loadingText = 'Initializing viewer...';

      // Ensure currentScene exists
      if (!scenes[currentScene]) {
        currentScene = sceneKeys[0];
      }

      // Step 5: Enhanced Pannellum configuration
      const config = {
        default: {
          firstScene: currentScene,
          author: '2WATUJU Architecture',
          
          // Optimized transitions
          sceneFadeDuration: 600,    
          autoLoad: true,
          
          // Control settings
          showZoomCtrl: false,
          showFullscreenCtrl: false,
          showControls: false,
          mouseZoom: true,
          doubleClickZoom: true,
          draggable: true,
          keyboardZoom: true,
          
          // Performance optimizations
          friction: 0.12,           
          hfov: 85,                 
          maxHfov: 100,            // Reduced max zoom for better performance
          minHfov: 65,             // Increased min zoom
          pitch: 0,
          yaw: 0,
          hotSpotDebug: false,
          backgroundColor: [0, 0, 0],
          
          // Loading optimizations
          crossOrigin: "anonymous",
          
          // Mobile optimizations
          orientationOnByDefault: false,
          touchPanSpeedCoeffFactor: 0.8,
          
          // Disable auto features for better performance
          autoRotateInactivityDelay: -1,
          autoRotateStopDelay: -1
        },
        scenes: scenes
      };

      // Step 6: Clear and prepare container
      if (pannellumContainer) {
        pannellumContainer.innerHTML = '';
        pannellumContainer.style.transform = '';
        pannellumContainer.style.transition = '';
      }

      loadingProgress = 85;
      loadingText = 'Starting panoramic viewer...';

      // Step 7: Initialize with timeout management
      console.log('🔄 Initializing Pannellum viewer...');
      
      const initTimeout = setTimeout(() => {
        if (isLoading) {
          console.warn('⚠️ Pannellum initialization timeout');
          error = 'Viewer initialization timeout. The images may be too large. Try refreshing the page.';
          isLoading = false;
        }
      }, 10000); // 10 second timeout for initialization

      // Initialize viewer
      viewer = window.pannellum.viewer(pannellumContainer, config);

      // Enhanced event listeners
      viewer.on('load', () => {
        console.log('✓ Pannellum viewer loaded successfully');
        clearTimeout(initTimeout);
        loadingProgress = 100;
        loadingText = 'Ready!';
        setTimeout(() => {
          isLoading = false;
        }, 300);
      });

      viewer.on('error', (err) => {
        console.error('✗ Pannellum error:', err);
        clearTimeout(initTimeout);
        
        let errorMsg = 'Failed to load panorama';
        if (typeof err === 'string') {
          errorMsg = err;
        } else if (err && err.message) {
          errorMsg = err.message;
        }
        
        // Enhanced error messages
        if (errorMsg.includes('404') || errorMsg.includes('Not Found')) {
          errorMsg = 'Panorama image not found. Please check the file path.';
        } else if (errorMsg.includes('CORS')) {
          errorMsg = 'Cross-origin error. Image may not be accessible from this domain.';
        } else if (errorMsg.includes('network') || errorMsg.includes('NetworkError')) {
          errorMsg = 'Network error. Please check your internet connection.';
        } else if (errorMsg.includes('timeout') || errorMsg.includes('Timeout')) {
          errorMsg = 'Loading timeout. The image may be too large.';
        }
        
        error = `${errorMsg} Try refreshing or using smaller images.`;
        isLoading = false;
      });

      viewer.on('scenechange', (sceneId) => {
        console.log(`🔄 Scene changed to: ${sceneId}`);
        currentScene = sceneId;
      });

      // Performance monitoring
      if (viewer) {
        const startTime = Date.now();
        viewer.on('animatefinished', () => {
          const loadTime = Date.now() - startTime;
          console.log(`✓ Scene ready in ${loadTime}ms`);
          
          if (loadTime > 5000) {
            console.warn(`⚠️ Slow scene load detected: ${loadTime}ms`);
          }
        });
      }

      // Auto-rotate if enabled
      if (autoRotate) {
        viewer.setAutoRotate(1.5); 
      }

    } catch (err) {
      console.error('✗ Failed to initialize panoramic viewer:', err);
      error = `Initialization failed: ${err.message || 'Unknown error'}. Please refresh the page.`;
      isLoading = false;
    }
  };

  // Navigation functions
  const navigateToScene = (sceneName) => {
    if (viewer && resolvedPanoramicData[sceneName]) {
      console.log(`🧭 Navigating to scene: ${sceneName}`);
      viewer.loadScene(sceneName);
      currentScene = sceneName;
    }
  };

  const resetView = () => {
    if (viewer) {
      viewer.setPitch(0);
      viewer.setYaw(0);
      viewer.setHfov(85);
    }
  };

  const toggleAutoRotate = () => {
    autoRotate = !autoRotate;
    if (viewer) {
      if (autoRotate) {
        viewer.setAutoRotate(1.5);
      } else {
        viewer.setAutoRotate(false);
      }
    }
  };

  const zoomIn = () => {
    if (viewer) {
      const currentHfov = viewer.getHfov();
      viewer.setHfov(Math.max(65, currentHfov - 10));
    }
  };

  const zoomOut = () => {
    if (viewer) {
      const currentHfov = viewer.getHfov();
      viewer.setHfov(Math.min(100, currentHfov + 10));
    }
  };

  const toggleHotspots = () => {
    showHotspots = !showHotspots;
    if (viewer && isPanoramicMode) {
      setTimeout(() => initPannellum(), 100);
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

  const toggleAllControls = () => {
    showAllControls = !showAllControls;
  };

  const togglePanoramic = async () => {
    if (!isPanoramicMode) {
      try {
        isPanoramicMode = true;
        setTimeout(() => initPannellum(), 100);
      } catch (err) {
        error = err.message;
        console.error('Failed to start panoramic mode:', err);
      }
    } else {
      isPanoramicMode = false;
      cleanup();
    }
  };

  const cleanup = () => {
    if (viewer) {
      try {
        viewer.destroy();
      } catch (err) {
        console.warn('Error destroying viewer:', err);
      }
      viewer = null;
    }
    isLoading = false;
    loadingProgress = 0;
    loadingText = 'Initializing...';
    error = null;
    currentScene = 'outside';
    autoRotate = false;
    pannellumLoaded = false;
  };

  onMount(() => {
    const handleFullscreenChange = () => {
      isFullscreen = !!(document.fullscreenElement || document.webkitFullscreenElement);
      
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

  // Reactive statements
  $: availableScenes = Object.keys(resolvedPanoramicData).filter(scene => scene !== currentScene);
  $: currentSceneHotspots = getHotspotsForScene(currentScene);
</script>

<svelte:head>
  {#if isPanoramicMode}
    <style>
      .custom-hotspot {
        height: 50px;
        width: 50px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .custom-hotspot:hover {
        transform: scale(1.2);
        box-shadow: 0 8px 25px rgba(0,0,0,0.5);
      }
      
      div.custom-tooltip span {
        visibility: hidden;
        position: absolute;
        border-radius: 3px;
        background-color: #fff;
        color: #000;
        text-align: center;
        max-width: 200px;
        padding: 5px 10px;
        margin-left: -100px;
        cursor: default;
        font-size: 12px;
        white-space: nowrap;
        z-index: 1000;
      }
      
      div.custom-tooltip:hover span {
        visibility: visible;
      }
      
      div.custom-tooltip:hover span:after {
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        border-width: 10px;
        border-style: solid;
        border-color: #fff transparent transparent transparent;
        bottom: -20px;
        left: 50%;
        margin-left: -10px;
      }
    </style>
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
    </div>
  {:else}
    <!-- Pannellum Panoramic View -->
    <div class="relative w-full h-full bg-black">
      <!-- Pannellum Container -->
      <div bind:this={pannellumContainer} class="w-full h-full" id="pannellum-viewer">
        <!-- Pannellum will render here -->
      </div>
      
      <!-- Enhanced Loading Overlay -->
      {#if isLoading}
        <div class="absolute inset-0 flex items-center justify-center z-50" style="background: rgba(0,0,0,0.95);">
          <div class="text-center max-w-md mx-auto px-6">
            <div class="relative w-20 h-20 mx-auto mb-8">
              <div class="loader-container">
                <div class="loader-orbit-1"></div>
                <div class="loader-orbit-2"></div>
                <div class="loader-core"></div>
              </div>
            </div>
            
            <div class="w-full bg-gray-800 rounded-full h-3 mb-6 overflow-hidden">
              <div 
                class="h-full rounded-full transition-all duration-500 ease-out"
                style="width: {loadingProgress}%; background: linear-gradient(to right, #56AAB7, #4a9aa6);"
              ></div>
            </div>
            
            <h3 class="text-xl font-bold text-white font-roboto-condensed mb-2">
              Initializing Professional 360° Viewer
            </h3>
            <p class="text-gray-300 text-sm font-roboto mb-2">
              {loadingText}
            </p>
            <p class="text-lg font-bold font-chivo-mono" style="color: #56AAB7;">
              {Math.round(loadingProgress)}%
            </p>
            
            <!-- Show image size warnings during loading -->
            {#if Object.values(imageValidationResults).some(r => r.isHuge)}
              <p class="text-yellow-400 text-xs mt-3 opacity-75">
                ⚠️ Large images detected - this may take longer
              </p>
            {/if}
            
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
      
      <!-- Enhanced Error State -->
      {#if error}
        <div class="absolute inset-0 flex items-center justify-center z-50" style="background: rgba(0,0,0,0.95);">
          <div class="text-center max-w-lg mx-auto px-6">
            <div class="text-red-400 mb-6">
              <AlertTriangle size={56} class="mx-auto" />
            </div>
            <h3 class="text-xl font-bold text-red-400 font-roboto-condensed mb-3">
              Panorama Loading Failed
            </h3>
            <p class="text-red-300 font-roboto mb-4 text-sm leading-relaxed">
              {error}
            </p>
            
            <!-- Show troubleshooting info -->
            {#if Object.keys(imageValidationResults).length > 0}
              <details class="text-left text-xs text-gray-400 mb-4 max-w-sm mx-auto">
                <summary class="cursor-pointer hover:text-gray-300 mb-2">🔍 Troubleshooting Info</summary>
                <div class="space-y-1">
                  {#each Object.entries(imageValidationResults) as [sceneKey, result]}
                    <div class="flex justify-between">
                      <span>{sceneKey}:</span>
                      <span class={result.valid ? 'text-green-400' : 'text-red-400'}>
                        {result.valid ? `${result.sizeInMB?.toFixed(1)}MB` : result.error}
                      </span>
                    </div>
                  {/each}
                </div>
              </details>
            {/if}
            
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
                  loadingText = 'Retrying...';
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
      
      <!-- Enhanced Controls -->
      {#if !isLoading && !error && showControls}
        <!-- Master Control Toggle Button -->
        <div class="absolute top-4 right-1/2 transform translate-x-1/2 z-50">
          <button 
            on:click={toggleAllControls}
            class="control-btn control-toggle"
            class:active={showAllControls}
            title={showAllControls ? "Hide controls" : "Show controls"}
          >
            <svelte:component 
              this={showAllControls ? ToggleRight : ToggleLeft} 
              size={18} 
            />
          </button>
        </div>

        {#if showAllControls}
          <!-- Top Control Bar -->
          <div class="absolute top-4 left-4 flex gap-2 z-50 control-group">
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
              on:click={toggleHotspots}
              class="control-btn"
              class:active={showHotspots}
              title={showHotspots ? "Hide hotspots" : "Show hotspots"}
            >
              <Eye size={18} class={showHotspots ? "" : "opacity-50"} />
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
          <div class="absolute top-4 right-4 flex flex-col gap-2 z-50 control-group">
            <button on:click={zoomIn} class="control-btn" title="Zoom in">
              <ZoomIn size={18} />
            </button>
            <button on:click={zoomOut} class="control-btn" title="Zoom out">
              <ZoomOut size={18} />
            </button>
          </div>
          
          <!-- Combined Scene Navigation & Current Scene Info -->
          <div class="absolute bottom-4 right-4 z-50 control-group">
            <div class="glass-panel p-4 max-w-md">
              <!-- Current Scene Info -->
              <div class="flex items-center gap-3 text-white text-sm mb-2">
                <div class="text-start">
                  <div class="text-xs opacity-75 font-chivo-mono">CURRENT SCENE</div>
                  <div class="font-roboto-condensed font-bold">{sceneNames[currentScene] || currentScene}</div>
                </div>
              </div>

              <!-- Scene Navigation -->
              {#if availableScenes.length > 0}
                <div class="border-t border-gray-600 pt-2">
                  <h4 class="text-sm font-roboto-condensed font-bold text-white mb-3 flex items-center gap-2">
                    <Compass size={16} />
                    Navigate Scenes
                  </h4>
                  <div class="space-y-1">
                    {#each availableScenes as sceneName}
                      <button
                        on:click={() => navigateToScene(sceneName)}
                        class="w-full text-xs px-3 py-2 rounded-lg transition-all duration-300 text-left scene-btn flex items-center justify-between"
                      >
                        <span>{sceneNames[sceneName] || sceneName}</span>

                      </button>
                    {/each}
                  </div>
                </div>
              {/if}
            </div>
          </div>
        {/if}
        
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

  .control-toggle {
    background: rgba(0, 0, 0, 0.8) !important;
    border: 2px solid rgba(86, 170, 183, 0.5) !important;
  }

  .control-toggle:hover {
    border-color: rgba(86, 170, 183, 0.8) !important;
    background: rgba(0, 0, 0, 0.9) !important;
  }

  .control-toggle.active {
    background: linear-gradient(to right, #56AAB7, #4a9aa6) !important;
    border-color: #56AAB7 !important;
  }

  .control-group {
    opacity: 1;
    transform: translateY(0);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
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