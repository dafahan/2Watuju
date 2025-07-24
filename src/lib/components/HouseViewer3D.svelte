<!-- HouseViewer3D.svelte -->
<script>
  import { onMount, onDestroy } from 'svelte';
  import { Play, Maximize, RotateCcw, Home, Minimize } from 'lucide-svelte';
  import * as THREE from 'three';
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

  // Props
  export let title = "FIN HOUSE";
  export let subtitle = "JAPANDI STYLE | 2025";
  export let modelPath = "/static/assets/projects/Apartment building.glb";
  export let thumbnailUrl = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop&auto=format";

  // State
  let is3DMode = false;
  let isLoading = false;
  let loadingProgress = 0;
  let loadingStage = '';
  let error = null;
  let containerRef;
  let scene, camera, renderer, mixer, controls;
  let animationId;
  let isFullscreen = false;

  const init3D = async () => {
    if (!containerRef) {
      error = 'Failed to initialize 3D container';
      return;
    }

    try {
      isLoading = true;
      loadingProgress = 0;
      loadingStage = 'Initializing...';
      error = null;

      // Clear container
      containerRef.innerHTML = '';

      // Setup Three.js (fast, no artificial delays)
      loadingStage = 'Setting up 3D scene...';
      loadingProgress = 20;
      
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0xf5f5f5);

      camera = new THREE.PerspectiveCamera(
        60,
        containerRef.clientWidth / containerRef.clientHeight,
        0.01,
        10000
      );
      camera.position.set(15, 12, 15);
      camera.lookAt(0, 0, 0);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(containerRef.clientWidth, containerRef.clientHeight);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      containerRef.appendChild(renderer.domElement);

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(50, 50, 50);
      directionalLight.castShadow = true;
      directionalLight.shadow.mapSize.width = 2048;
      directionalLight.shadow.mapSize.height = 2048;
      scene.add(directionalLight);

      // Controls
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.screenSpacePanning = false;
      controls.minDistance = 1;
      controls.maxDistance = 200;
      controls.maxPolarAngle = Math.PI;

      // Load model
      loadingStage = 'Loading 3D model...';
      loadingProgress = 40;
      
      const loader = new GLTFLoader();
      
      const gltf = await new Promise((resolve, reject) => {
        loader.load(
          modelPath,
          resolve,
          (progress) => {
            if (progress.total > 0) {
              const fileProgress = (progress.loaded / progress.total) * 40;
              loadingProgress = 40 + fileProgress;
              loadingStage = `Loading model... ${Math.round((progress.loaded / progress.total) * 100)}%`;
            }
          },
          reject
        );
      });

      // Process model
      loadingStage = 'Processing geometry...';
      loadingProgress = 85;
      
      const model = gltf.scene;
      
      // Scale and position
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      
      model.position.sub(center);
      
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 20 / maxDim;
      model.scale.setScalar(scale);

      // Adjust camera based on model size
      const scaledSize = maxDim * scale;
      const optimalDistance = scaledSize * 1.5;
      camera.position.set(optimalDistance, optimalDistance * 0.8, optimalDistance);
      camera.lookAt(0, 0, 0);
      
      controls.minDistance = scaledSize * 0.1;
      controls.maxDistance = scaledSize * 5;

      // Enable shadows
      model.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      scene.add(model);

      // Animations
      if (gltf.animations && gltf.animations.length > 0) {
        mixer = new THREE.AnimationMixer(model);
        gltf.animations.forEach((clip) => {
          mixer.clipAction(clip).play();
        });
      }

      // Complete
      loadingProgress = 100;
      isLoading = false;
      animate();

      // Handle resize
      const handleResize = () => {
        if (!containerRef || !camera || !renderer) return;
        camera.aspect = containerRef.clientWidth / containerRef.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(containerRef.clientWidth, containerRef.clientHeight);
      };
      window.addEventListener('resize', handleResize);

    } catch (err) {
      console.error('3D initialization error:', err);
      error = `Failed to load 3D model: ${err.message || 'Unknown error'}`;
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

  const animate = () => {
    if (!renderer || !scene || !camera) return;
    animationId = requestAnimationFrame(animate);

    if (controls) controls.update();
    if (mixer) mixer.update(0.01);

    renderer.render(scene, camera);
  };

  const toggle3D = () => {
    if (!is3DMode) {
      is3DMode = true;
      setTimeout(() => init3D(), 50);
    } else {
      is3DMode = false;
      cleanup3D();
    }
  };

  const resetView = () => {
    if (controls && camera) {
      camera.position.set(15, 12, 15);
      camera.lookAt(0, 0, 0);
      controls.target.set(0, 0, 0);
      controls.update();
    }
  };

  const cleanup3D = () => {
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
    if (controls) {
      controls.dispose();
      controls = null;
    }
    if (renderer) {
      renderer.dispose();
      renderer = null;
    }
    if (scene) {
      scene.clear();
      scene = null;
    }
    
    camera = null;
    mixer = null;
    isLoading = false;
    loadingProgress = 0;
    loadingStage = '';
    
    if (containerRef) {
      containerRef.innerHTML = '';
    }
  };

  onDestroy(() => {
    cleanup3D();
  });
</script>

<div class="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden shadow-lg" class:fullscreen={isFullscreen}>
  <!-- Thumbnail View -->
  {#if !is3DMode}
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
              on:click={toggle3D}
              class="flex items-center gap-2 bg-[#56AAB7] hover:bg-[#4a9aa6] text-white px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
              disabled={isLoading}
            >
              <Play size={16} />
              <span class="text-sm font-medium">
                {isLoading ? 'Loading...' : 'Play 3D'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  {:else}
    <!-- 3D View -->
    <div class="relative w-full h-full">
      <!-- 3D Container -->
      <div bind:this={containerRef} class="w-full h-full"></div>
      
      <!-- Loading Overlay -->
      {#if isLoading}
        <div class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50/95 to-gray-100/95 backdrop-blur-sm z-50">
          <div class="text-center max-w-sm mx-auto px-6">
            <!-- Animated 3D Cube Loader -->
            <div class="relative w-16 h-16 mx-auto mb-6">
              <div class="cube-loader">
                <div class="cube-face cube-front"></div>
                <div class="cube-face cube-back"></div>
                <div class="cube-face cube-right"></div>
                <div class="cube-face cube-left"></div>
                <div class="cube-face cube-top"></div>
                <div class="cube-face cube-bottom"></div>
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
              {loadingStage || 'Initializing...'}
            </p>
            <p class="text-gray-500 text-sm font-roboto">
              {Math.round(loadingProgress)}% Complete
            </p>
            
            <!-- Cancel Button -->
            <button 
              on:click={() => {
                cleanup3D();
                is3DMode = false;
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
              Loading Failed
            </h3>
            <p class="text-red-600 font-roboto mb-6 text-sm leading-relaxed">
              {error}
            </p>
            <div class="flex gap-2 justify-center">
              <button 
                on:click={() => {
                  cleanup3D();
                  is3DMode = false;
                }}
                class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-full transition-all duration-300 text-sm"
              >
                Back to Thumbnail
              </button>
              <button 
                on:click={() => { 
                  error = null; 
                  loadingProgress = 0;
                  loadingStage = '';
                  init3D();
                }}
                class="bg-[#56AAB7] hover:bg-[#4a9aa6] text-white px-4 py-2 rounded-full transition-all duration-300 text-sm"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      {/if}
      
      <!-- 3D Controls -->
      {#if !isLoading && !error}
        <div class="absolute top-4 left-4 flex gap-2 z-40">
          <button 
            on:click={() => {
              cleanup3D();
              is3DMode = false;
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
        
        <!-- Project info overlay -->
        <div class="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg z-40">
          <h3 class="text-lg font-bold font-roboto-condensed tracking-wider text-gray-800">
            {title}
          </h3>
          <p class="text-sm font-chivo-mono text-gray-600">
            {subtitle}
          </p>
          <p class="text-xs text-gray-500 mt-2">
            Drag to rotate • Scroll to zoom • Right-click to pan {isFullscreen ? '• ESC to exit fullscreen' : ''}
          </p>
        </div>
        
        <!-- Fullscreen indicator -->
        {#if isFullscreen}
          <div class="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-roboto-condensed z-40">
            FULLSCREEN MODE
          </div>
        {/if}
      {/if}
    </div>
  {/if}
</div>

<style>
  :global(canvas) {
    display: block !important;
    width: 100% !important;
    height: 100% !important;
  }

  .fullscreen {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    z-index: 9999 !important;
    border-radius: 0 !important;
  }

  .cube-loader {
    position: relative;
    width: 64px;
    height: 64px;
    transform-style: preserve-3d;
    animation: cube-rotate 2s infinite linear;
  }

  .cube-face {
    position: absolute;
    width: 64px;
    height: 64px;
    background: linear-gradient(45deg, #56AAB7, #4a9aa6);
    border: 1px solid rgba(255, 255, 255, 0.3);
    opacity: 0.8;
  }

  .cube-front { transform: rotateY(0deg) translateZ(32px); }
  .cube-back { transform: rotateY(180deg) translateZ(32px); }
  .cube-right { transform: rotateY(90deg) translateZ(32px); }
  .cube-left { transform: rotateY(-90deg) translateZ(32px); }
  .cube-top { transform: rotateX(90deg) translateZ(32px); }
  .cube-bottom { transform: rotateX(-90deg) translateZ(32px); }

  @keyframes cube-rotate {
    0% { transform: rotateX(0deg) rotateY(0deg); }
    100% { transform: rotateX(360deg) rotateY(360deg); }
  }

  button:hover { transform: translateY(-1px); }
  button:active { transform: translateY(0); }
  button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none !important;
  }

  @media (max-width: 768px) {
    .cube-loader, .cube-face { width: 48px; height: 48px; }
    .cube-front { transform: rotateY(0deg) translateZ(24px); }
    .cube-back { transform: rotateY(180deg) translateZ(24px); }
    .cube-right { transform: rotateY(90deg) translateZ(24px); }
    .cube-left { transform: rotateY(-90deg) translateZ(24px); }
    .cube-top { transform: rotateX(90deg) translateZ(24px); }
    .cube-bottom { transform: rotateX(-90deg) translateZ(24px); }
  }

  @media (prefers-reduced-motion: reduce) {
    .cube-loader { animation: none; }
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
</style>