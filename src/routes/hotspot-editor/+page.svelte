<!-- src/routes/hotspot-editor/+page.svelte -->
<script>
  import { onMount, onDestroy } from 'svelte';
  import { Upload, Download, Copy, Trash2, Edit3, Eye, EyeOff, Save, X, Plus, ChevronUp, Navigation, Info, AlertTriangle } from 'lucide-svelte';
  import { base } from '$app/paths';

  // Multi-scene state
  let scenes = [];
  let currentSceneIndex = 0;
  let hotspots = [];
  let isAddingHotspot = false;
  let editingHotspot = null;
  let showHotspots = true;
  let newHotspotName = '';
  let newHotspotType = 'info';
  let newHotspotTargetScene = '';
  let imageContainer;
  let fileInput;
  let pannellumViewer;
  let viewer = null;
  let pannellumLoaded = false;
  let isViewerMode = false;
  let showJsonOutput = false;
  let copySuccess = false;
  let viewerLoading = false;

  // Scene management
  let newSceneName = '';
  let editingSceneName = null;

  // Project settings - Enhanced with all fields
  let projectName = 'Modern Minimalist House';
  let projectDescription = 'Interactive 360° panoramic experience with multi-scene navigation';
  let projectCategory = 'Japandi Style';
  let projectLocation = 'Bandar Lampung';
  let projectClient = 'Keluarga Raharjo';
  let projectYear = new Date().getFullYear();
  let projectStatus = 'completed';
  let projectSlug = '';
  
  // Image URLs (optional)
  let thumbnailUrl = '';
  let mobileUrl = '';
  let tabletUrl = '';
  let desktopUrl = '';
  
  // Features array (optional)
  let projectFeatures = '';
  
  // Stats (optional)
  let luasTanah = '';
  let luasBangunan = '';
  let lantai = '';
  let durasi = '';
  
  // Project Details (optional)
  let tipeProyek = '';
  let architect = 'Kurnia Firmanda Ageng, S.Ars';
  let lokasi = '';
  let interiorDesigner = 'Kurnia Firmanda Ageng, S.Ars';

  // File size warning
  let showFileSizeWarning = false;
  let currentFileSize = 0;

  // ENHANCED: Hot spot creation function with navigation support and icons
  function createCustomHotspot(hotSpotDiv, args) {
    const { label, type, targetSceneKey } = typeof args === 'object' ? args : { label: args, type: 'info', targetSceneKey: '' };
    
    hotSpotDiv.classList.add('custom-tooltip');
    
    // Add icon based on type
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
      // Navigation icon (chevron up)
      iconContainer.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="m18 15-6-6-6 6"/>
        </svg>
      `;
      hotSpotDiv.style.background = 'linear-gradient(135deg, #10B981, #059669)';
      hotSpotDiv.style.cursor = 'pointer';
    } else {
      // Info icon
      iconContainer.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="16" x2="12" y2="12"/>
          <line x1="12" y1="8" x2="12.01" y2="8"/>
        </svg>
      `;
      hotSpotDiv.style.background = 'linear-gradient(135deg, #56AAB7, #4a9aa6)';
    }
    
    hotSpotDiv.appendChild(iconContainer);
    
    var span = document.createElement('span');
    span.innerHTML = label;
    hotSpotDiv.appendChild(span);
    span.style.width = span.scrollWidth - 20 + 'px';
    span.style.marginLeft = -(span.scrollWidth - hotSpotDiv.offsetWidth) / 2 + 'px';
    span.style.marginTop = -span.scrollHeight - 12 + 'px';
    
    // Navigation functionality for nav type hotspots
    if (type === 'nav' && targetSceneKey) {
      hotSpotDiv.onclick = (e) => {
        e.stopPropagation();
        const targetIndex = scenes.findIndex(s =>
          s.name.toLowerCase().replace(/\s+/g, '') === targetSceneKey
        );
        if (targetIndex !== -1 && targetIndex !== currentSceneIndex) {
          console.log(`Navigating from scene ${currentSceneIndex} to scene ${targetIndex}`);
          switchToScene(targetIndex);
        }
      };
    }
  }

  // Computed values
  $: currentScene = scenes[currentSceneIndex];  
  $: imageUrl = currentScene?.imageUrl || null;
  $: editingHotspotData = editingHotspot ? hotspots.find(h => h.id === editingHotspot) : null;
  $: availableTargetScenes = scenes.filter((_, index) => index !== currentSceneIndex);

  // Update cursor when hotspot adding mode changes
  $: if (isViewerMode && pannellumViewer) {
    pannellumViewer.style.cursor = isAddingHotspot ? 'crosshair' : '';
  }

  // Image compression function
  const compressImage = (file, maxSizeMB = 5, quality = 0.8) => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        // Calculate new dimensions to keep image reasonable size
        const MAX_WIDTH = 4096;
        const MAX_HEIGHT = 2048;
        
        let { width, height } = img;
        
        if (width > MAX_WIDTH) {
          height = (height * MAX_WIDTH) / width;
          width = MAX_WIDTH;
        }
        
        if (height > MAX_HEIGHT) {
          width = (width * MAX_HEIGHT) / height;
          height = MAX_HEIGHT;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);
        
        // Convert to blob with compression
        canvas.toBlob((blob) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target.result);
          reader.readAsDataURL(blob);
        }, 'image/jpeg', quality);
      };
      
      img.src = URL.createObjectURL(file);
    });
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
        console.log('Pannellum loaded from CDN');
        resolve();
      };
      script.onerror = (error) => {
        console.error('Failed to load Pannellum from CDN:', error);
        reject(error);
      };
      document.head.appendChild(script);
    });
  };

  // Handle file upload with compression
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const fileSizeMB = file.size / (1024 * 1024);
      currentFileSize = fileSizeMB;
      
      // Show warning for large files
      if (fileSizeMB > 10) {
        showFileSizeWarning = true;
        setTimeout(() => showFileSizeWarning = false, 5000);
      }
      
      try {
        // Save current scene hotspots before adding new scene
        if (currentScene && scenes[currentSceneIndex]) {
          scenes[currentSceneIndex].hotspots = [...hotspots];
        }
        
        // Compress image if it's too large
        let imageDataUrl;
        if (fileSizeMB > 5) {
          console.log(`Compressing large image: ${fileSizeMB.toFixed(1)}MB`);
          imageDataUrl = await compressImage(file, 5, 0.8);
        } else {
          const reader = new FileReader();
          imageDataUrl = await new Promise((resolve) => {
            reader.onload = (e) => resolve(e.target.result);
            reader.readAsDataURL(file);
          });
        }
        
        const newScene = {
          id: Date.now(),
          name: `Scene ${scenes.length + 1}`,
          imageUrl: imageDataUrl,
          file: file,
          hotspots: []
        };
        
        scenes = [...scenes, newScene];
        currentSceneIndex = scenes.length - 1;
        hotspots = [];
        console.log(`Created new scene ${currentSceneIndex} with compressed image`);
      } catch (error) {
        console.error('Error processing image:', error);
        alert('Error processing image. Please try a different file.');
      }
    }
  };

  // Scene management functions
  const addNewScene = () => {
    if (fileInput) {
      fileInput.click();
    }
  };

  const deleteScene = (index) => {
    if (scenes.length <= 1) return;
    
    if (currentScene && scenes[currentSceneIndex]) {
      scenes[currentSceneIndex].hotspots = [...hotspots];
    }
    
    scenes = scenes.filter((_, i) => i !== index);
    if (currentSceneIndex >= scenes.length) {
      currentSceneIndex = scenes.length - 1;
    } else if (currentSceneIndex > index) {
      currentSceneIndex--;
    }
    
    const newCurrentScene = scenes[currentSceneIndex];
    hotspots = newCurrentScene && newCurrentScene.hotspots ? [...newCurrentScene.hotspots] : [];
    console.log(`After scene deletion, loaded ${hotspots.length} hotspots for scene ${currentSceneIndex}`);
  };

  const switchToScene = (index) => {
    if (currentScene && scenes[currentSceneIndex]) {
      scenes[currentSceneIndex].hotspots = [...hotspots];
      console.log(`Saved ${hotspots.length} hotspots to scene ${currentSceneIndex}`);
    }
    
    currentSceneIndex = index;
    
    const newScene = scenes[currentSceneIndex];
    hotspots = newScene && newScene.hotspots ? [...newScene.hotspots] : [];
    console.log(`Loaded ${hotspots.length} hotspots for scene ${index}`);
    
    isAddingHotspot = false;
    editingHotspot = null;
    newHotspotName = '';
    newHotspotType = 'info';
    newHotspotTargetScene = '';
    
    if (isViewerMode && viewer) {
      setTimeout(() => initPannellumViewer(), 100);
    }
  };

  const startEditingSceneName = (index) => {
    editingSceneName = index;
    newSceneName = scenes[index].name;
  };

  const saveSceneName = () => {
    if (editingSceneName !== null && newSceneName.trim()) {
      scenes[editingSceneName].name = newSceneName.trim();
      scenes = [...scenes];
      editingSceneName = null;
      newSceneName = '';
    }
  };

  const cancelSceneEdit = () => {
    editingSceneName = null;
    newSceneName = '';
  };

  // Hotspot functions
  const getPositionFromClick = (event, container) => {
    const rect = container.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    return { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 };
  };

  const handleImageClick = (event) => {
    if (!isAddingHotspot) return;
    event.preventDefault();
    const position = getPositionFromClick(event, imageContainer);
    
    const newHotspot = {
      id: Date.now(),
      x: position.x,
      y: position.y,
      label: '',
      scene: '',
      type: 'info',
      targetScene: '',
      targetSceneKey: '',
      icon: 'info'
    };
    
    hotspots = [...hotspots, newHotspot];
    editingHotspot = newHotspot.id;
    newHotspotName = '';
    newHotspotType = 'info';
    newHotspotTargetScene = '';
    isAddingHotspot = false;
  };

  const saveHotspotEdit = () => {
    if (editingHotspot && newHotspotName.trim()) {
      let targetSceneKey = '';
      if (newHotspotType === 'nav' && newHotspotTargetScene) {
        const targetScene = scenes.find(s => s.id.toString() === newHotspotTargetScene);
        if (targetScene) {
          targetSceneKey = targetScene.name.toLowerCase().replace(/\s+/g, '');
        }
      }
      
      const updatedHotspots = hotspots.map(h => 
        h.id === editingHotspot 
          ? { 
              ...h, 
              label: newHotspotName.trim(), 
              scene: currentScene.name.toLowerCase().replace(/\s+/g, ''), // Use current scene key
              type: newHotspotType,
              targetScene: newHotspotTargetScene,
              targetSceneKey: targetSceneKey,
              icon: newHotspotType === 'nav' ? 'door' : 'info'
            }
          : h
      );
      
      hotspots = updatedHotspots;
      
      if (currentScene) {
        currentScene.hotspots = [...hotspots];
      }
      
      if (isViewerMode && viewer) {
        setTimeout(() => initPannellumViewer(true), 100);
      }
      
      editingHotspot = null;
      newHotspotName = '';
      newHotspotType = 'info';
      newHotspotTargetScene = '';
    }
  };

  const deleteHotspot = (id) => {
    hotspots = hotspots.filter(h => h.id !== id);
    if (editingHotspot === id) {
      editingHotspot = null;
      newHotspotName = '';
      newHotspotType = 'info';
      newHotspotTargetScene = '';
    }
    
    if (currentScene) {
      currentScene.hotspots = [...hotspots];
    }
    
    if (isViewerMode && viewer) {
      setTimeout(() => initPannellumViewer(true), 100);
    }
  };

  const startEditingHotspot = (hotspot) => {
    editingHotspot = hotspot.id;
    newHotspotName = hotspot.label;
    newHotspotType = hotspot.type || 'info';
    newHotspotTargetScene = hotspot.targetScene || '';
  };

  const cancelEdit = () => {
    if (editingHotspot) {
      const hotspot = hotspots.find(h => h.id === editingHotspot);
      if (hotspot && !hotspot.label) {
        deleteHotspot(editingHotspot);
      }
    }
    editingHotspot = null;
    newHotspotName = '';
    newHotspotType = 'info';
    newHotspotTargetScene = '';
    isAddingHotspot = false;
  };

  // FIXED: Generate JSON output matching the working structure completely
  const generateJSON = () => {
    if (currentScene) {
      currentScene.hotspots = [...hotspots];
    }

    const panoramicData = {};
    const allHotspots = [];
    
    scenes.forEach((scene, index) => {
      const sceneKey = scene.name.toLowerCase().replace(/\s+/g, '');
      const fileName = scene.file?.name || `${index + 1}.png`;
      panoramicData[sceneKey] = `assets/panorama/${fileName}`;
      
      scene.hotspots.forEach(hotspot => {
        allHotspots.push({
          x: hotspot.x,
          y: hotspot.y,
          scene: sceneKey, // Use the scene key where the hotspot is placed
          label: hotspot.label,
          type: hotspot.type || 'info',
          targetScene: hotspot.targetSceneKey || '', // Where it navigates to
          icon: hotspot.icon || (hotspot.type === 'nav' ? 'door' : 'info')
        });
      });
    });

    const projectId = Date.now();
    const generatedSlug = projectSlug || projectName.toLowerCase().replace(/\s+/g, '-');
    
    // Build features array from comma-separated string
    const featuresArray = projectFeatures ? 
      projectFeatures.split(',').map(f => f.trim()).filter(f => f) : 
      ['360° Virtual Tour', 'Interactive Hotspots', 'Multi-Scene Navigation'];
    
    // Build stats object
    const statsObj = {};
    if (luasTanah) statsObj['luas tanah'] = luasTanah;
    if (luasBangunan) statsObj['luas bangunan'] = luasBangunan;
    if (lantai) statsObj['lantai'] = lantai;
    if (durasi) statsObj['durasi'] = durasi;
    
    // Add default stats
    statsObj['total scenes'] = scenes.length.toString();
    statsObj['total hotspots'] = allHotspots.length.toString();
    statsObj['navigation points'] = allHotspots.filter(h => h.type === 'nav').length.toString();
    statsObj['info points'] = allHotspots.filter(h => h.type !== 'nav').length.toString();
    
    // Build project details
    const projectDetailsObj = {};
    if (tipeProyek) projectDetailsObj['TIPE PROYEK'] = tipeProyek;
    if (architect) projectDetailsObj['ARCHITECT'] = architect;
    if (lokasi || projectLocation) projectDetailsObj['LOKASI'] = lokasi || projectLocation;
    if (interiorDesigner) projectDetailsObj['INTERIOR DESIGNER'] = interiorDesigner;
    
    // Build images object
    const imagesObj = {};
    if (thumbnailUrl) imagesObj.thumbnail = thumbnailUrl;
    if (mobileUrl) imagesObj.mobile = mobileUrl;
    if (tabletUrl) imagesObj.tablet = tabletUrl;
    if (desktopUrl) imagesObj.desktop = desktopUrl;
    
    // If no images provided, use default placeholder
    if (!thumbnailUrl && !mobileUrl && !tabletUrl && !desktopUrl) {
      imagesObj.thumbnail = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop';
      imagesObj.mobile = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop';
      imagesObj.tablet = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=450&fit=crop';
      imagesObj.desktop = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop';
    }
    
    return {
      id: projectId,
      title: projectName.toUpperCase().replace(/\s/g, '\n'), // Format like working example
      slug: generatedSlug,
      category: projectCategory,
      location: projectLocation,
      year: projectYear,
      description: projectDescription,
      images: imagesObj,
      panoramic: panoramicData,
      hotspots: allHotspots,
      features: featuresArray,
      status: projectStatus,
      client: projectClient,
      stats: statsObj,
      projectDetails: projectDetailsObj
    };
  };

  // Copy to clipboard
  const copyToClipboard = async () => {
    try {
      const jsonOutput = JSON.stringify(generateJSON(), null, 2);
      await navigator.clipboard.writeText(jsonOutput);
      copySuccess = true;
      setTimeout(() => copySuccess = false, 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  // Initialize Pannellum viewer with better error handling
  const initPannellumViewer = async (preserveView = false) => {
    if (!currentScene || !pannellumViewer) {
      console.log('Missing requirements for viewer:', { currentScene: !!currentScene, pannellumViewer: !!pannellumViewer });
      return;
    }
    
    try {
      console.log('Loading Pannellum...');
      await loadPannellum();
      
      let currentPitch = 0, currentYaw = 0, currentHfov = 90;
      if (preserveView && viewer) {
        try {
          currentPitch = viewer.getPitch();
          currentYaw = viewer.getYaw();
          currentHfov = viewer.getHfov();
        } catch (e) {
          console.log('Could not preserve view position');
          currentHfov = 90;
        }
      }
      
      if (viewer) {
        console.log('Destroying existing viewer');
        viewer.destroy();
        viewer = null;
      }

      if (currentScene) {
        currentScene.hotspots = [...hotspots];
      }

      const pannellumScenes = {};
      
      scenes.forEach((scene) => {
        const sceneKey = scene.name.toLowerCase().replace(/\s+/g, '');
        const sceneHotspots = (scene.hotspots || []).map(hotspot => {
          const yaw = (hotspot.x / 100) * 360 - 180;
          const pitch = 90 - (hotspot.y / 100) * 180;
          
          return {
            id: `hotspot_${hotspot.id}`,
            pitch: pitch,
            yaw: yaw,
            cssClass: "custom-hotspot",
            createTooltipFunc: createCustomHotspot,
            createTooltipArgs: {
              label: hotspot.label || 'Unnamed Hotspot',
              type: hotspot.type || 'info',
              targetSceneKey: hotspot.targetSceneKey || ''
            }
          };
        });

        pannellumScenes[sceneKey] = {
          type: 'equirectangular',
          panorama: scene.imageUrl,
          hotSpots: sceneHotspots,
          title: scene.name,
          author: '2WATUJU Architecture',
          hfov: preserveView ? currentHfov : 90,
          pitch: preserveView ? currentPitch : 0,
          yaw: preserveView ? currentYaw : 0,
          hotSpotDebug: true,
          autoLoad: true
        };
        
        console.log(`Added scene: ${sceneKey} with ${sceneHotspots.length} hotspots for scene ${scene.name}`);
      });

      const currentSceneKey = currentScene.name.toLowerCase().replace(/\s+/g, '');
      console.log('Initializing viewer with scene:', currentSceneKey);

      pannellumViewer.innerHTML = '';
      pannellumViewer._hotspotSetupComplete = false;

      const config = {
        default: {
          firstScene: currentSceneKey,
          author: '2WATUJU Architecture',
          sceneFadeDuration: 1000,
          autoLoad: true,
          showZoomCtrl: true,
          showFullscreenCtrl: true,
          showControls: true,
          mouseZoom: true,
          doubleClickZoom: true,
          draggable: true,
          keyboardZoom: true,
          friction: 0.15,
          hfov: preserveView ? currentHfov : 90,
          maxHfov: 120,
          minHfov: 50,
          pitch: preserveView ? currentPitch : 0,
          yaw: preserveView ? currentYaw : 0,
          hotSpotDebug: true,
          backgroundColor: [0, 0, 0]
        },
        scenes: pannellumScenes
      };

      console.log('Pannellum config:', config);

      viewer = window.pannellum.viewer(pannellumViewer, config);

      viewer.on('load', () => {
        console.log('Pannellum viewer loaded successfully');
        setTimeout(() => {
          setupViewerHotspotAdding();
        }, 500);
      });

      viewer.on('scenechange', () => {
        setTimeout(() => {
          setupViewerHotspotAdding();
        }, 500);
      });

      viewer.on('error', (err) => {
        console.error('Pannellum viewer error:', err);
      });

    } catch (err) {
      console.error('Failed to initialize Pannellum viewer:', err);
    }
  };

  // Setup hotspot adding functionality
  const setupViewerHotspotAdding = () => {
    if (!viewer || !pannellumViewer) {
      console.log('Viewer or container not ready');
      return;
    }

    if (pannellumViewer._hotspotSetupComplete) {
      console.log('Hotspot adding already setup');
      return;
    }

    let viewerContainer = pannellumViewer.querySelector('.pnlm-container') || 
                         pannellumViewer.querySelector('.pnlm-render-container') ||
                         pannellumViewer.querySelector('canvas') ||
                         pannellumViewer.querySelector('div') ||
                         pannellumViewer;

    if (!viewerContainer) {
      console.log('Viewer container not found, retrying...');
      setTimeout(() => setupViewerHotspotAdding(), 1000);
      return;
    }

    console.log('Found viewer container:', viewerContainer.className || viewerContainer.tagName);

    if (pannellumViewer._hotspotClickHandler) {
      pannellumViewer.removeEventListener('click', pannellumViewer._hotspotClickHandler, true);
    }

    const handleViewerClick = (event) => {
      if (!isAddingHotspot) return;

      if (event.target.closest('.pnlm-hotspot')) {
        console.log('Clicked on existing hotspot, ignoring');
        return;
      }

      console.log('Click detected for hotspot adding');

      setTimeout(() => {
        if (!viewer) return;

        try {
          const pitch = viewer.getPitch();
          const yaw = viewer.getYaw();

          console.log('Current view - Pitch:', pitch, 'Yaw:', yaw);

          const x = ((yaw + 180) / 360) * 100;
          const y = ((90 - pitch) / 180) * 100;

          const clampedX = Math.max(0, Math.min(100, Math.round(x * 100) / 100));
          const clampedY = Math.max(0, Math.min(100, Math.round(y * 100) / 100));

          const newHotspot = {
            id: Date.now(),
            x: clampedX,
            y: clampedY,
            label: '',
            scene: '',
            type: 'info',
            targetScene: '',
            targetSceneKey: '',
            icon: 'info'
          };
          
          hotspots = [...hotspots, newHotspot];
          editingHotspot = newHotspot.id;
          newHotspotName = '';
          newHotspotType = 'info';
          newHotspotTargetScene = '';
          isAddingHotspot = false;

          console.log('Added hotspot - Pitch:', pitch, 'Yaw:', yaw, 'X:', clampedX, 'Y:', clampedY);

          if (currentScene) {
            currentScene.hotspots = [...hotspots];
          }

          setTimeout(() => {
            initPannellumViewer(true);
          }, 100);
        } catch (error) {
          console.error('Error adding hotspot:', error);
        }
      }, 50);
    };

    pannellumViewer._hotspotClickHandler = handleViewerClick;
    pannellumViewer.addEventListener('click', handleViewerClick, true);

    pannellumViewer.style.cursor = isAddingHotspot ? 'crosshair' : '';

    pannellumViewer._hotspotSetupComplete = true;

    console.log('Viewer hotspot adding setup complete, isAddingHotspot:', isAddingHotspot);
  };

  // Toggle viewer mode
  const toggleViewerMode = async () => {
    isViewerMode = !isViewerMode;
    if (isViewerMode) {
      viewerLoading = true;
      try {
        await new Promise(resolve => setTimeout(resolve, 100));
        await initPannellumViewer();
      } catch (error) {
        console.error('Error initializing viewer:', error);
      } finally {
        viewerLoading = false;
      }
    } else if (viewer) {
      viewer.destroy();
      viewer = null;
      viewerLoading = false;
    }
  };

  const clearAll = () => {
    scenes = [];
    hotspots = [];
    currentSceneIndex = 0;
    isViewerMode = false;
    if (viewer) {
      viewer.destroy();
      viewer = null;
    }
  };

  // Download JSON file
  const downloadJSON = () => {
    const jsonOutput = JSON.stringify(generateJSON(), null, 2);
    const blob = new Blob([jsonOutput], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectName.toLowerCase().replace(/\s+/g, '_')}_project.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  onDestroy(() => {
    if (viewer) {
      viewer.destroy();
    }
  });
</script>

<svelte:head>
  <title>Enhanced Panoramic Hotspot Editor | 2WATUJU</title>
  <style>
    /* Enhanced custom hotspot styles */
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
      margin-left: -220px;
      cursor: default;
    }
    
    div.custom-tooltip:hover span{
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
      left: -10px;
      margin: 0 50%;
    }
  </style>
</svelte:head>

<div class="min-h-screen bg-gray-50 py-8">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Enhanced Panoramic Hotspot Editor</h1>
      <p class="text-gray-600">Create optimized multi-scene 360° experiences with automatic image compression</p>
    </div>

    <!-- File Size Warning -->
    {#if showFileSizeWarning}
      <div class="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div class="flex items-start">
          <AlertTriangle class="w-5 h-5 text-yellow-600 mt-0.5 mr-3" />
          <div>
            <h3 class="text-yellow-800 font-medium">Large File Detected</h3>
            <p class="text-yellow-700 text-sm mt-1">
              File size: {currentFileSize.toFixed(1)}MB. Large images may cause slow loading. 
              The image has been automatically compressed for better performance.
            </p>
          </div>
        </div>
      </div>
    {/if}

    <div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
      <!-- Main Editor Area -->
      <div class="xl:col-span-2 space-y-6">
        <!-- Enhanced Project Settings with All Fields -->
        <div class="bg-white rounded-lg shadow-sm border p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Project Settings</h2>
          
          <!-- Basic Information -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Project Name *</label>
              <input 
                bind:value={projectName}
                type="text" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Modern Minimalist House"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Slug (URL)</label>
              <input 
                bind:value={projectSlug}
                type="text" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="modern-minimalist (auto-generated if empty)"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Category *</label>
              <input 
                bind:value={projectCategory}
                type="text" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Japandi Style"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Location *</label>
              <input 
                bind:value={projectLocation}
                type="text" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Bandar Lampung"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Client *</label>
              <input 
                bind:value={projectClient}
                type="text" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Keluarga Raharjo"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Year</label>
              <input 
                bind:value={projectYear}
                type="number" 
                min="2020"
                max="2030"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="2024"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select 
                bind:value={projectStatus}
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="completed">Completed</option>
                <option value="in-progress">In Progress</option>
                <option value="planning">Planning</option>
                <option value="on-hold">On Hold</option>
              </select>
            </div>
          </div>

          <!-- Description -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">Description *</label>
            <textarea 
              bind:value={projectDescription}
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Rumah bergaya minimalis modern dengan konsep open space yang mengutamakan pencahayaan alami..."
              required
            ></textarea>
          </div>

          <!-- Project Images (Optional) -->
          <div class="mb-6">
            <h3 class="text-md font-medium text-gray-700 mb-3">Project Images (Optional)</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Thumbnail URL</label>
                <input 
                  bind:value={thumbnailUrl}
                  type="url" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Desktop URL</label>
                <input 
                  bind:value={desktopUrl}
                  type="url" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Mobile URL</label>
                <input 
                  bind:value={mobileUrl}
                  type="url" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Tablet URL</label>
                <input 
                  bind:value={tabletUrl}
                  type="url" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>
            </div>
            <p class="text-xs text-gray-500 mt-2">If empty, default placeholder images will be used</p>
          </div>

          <!-- Project Features (Optional) -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">Features (Optional)</label>
            <input 
              bind:value={projectFeatures}
              type="text" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="3 Kamar Tidur, 2 Kamar Mandi, Taman Dalam, Carport, Smart Home, Open Kitchen"
            />
            <p class="text-xs text-gray-500 mt-1">Separate features with commas</p>
          </div>

          <!-- Project Stats (Optional) -->
          <div class="mb-6">
            <h3 class="text-md font-medium text-gray-700 mb-3">Project Stats (Optional)</h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Luas Tanah</label>
                <input 
                  bind:value={luasTanah}
                  type="text" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="150m²"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Luas Bangunan</label>
                <input 
                  bind:value={luasBangunan}
                  type="text" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="120m²"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Lantai</label>
                <input 
                  bind:value={lantai}
                  type="text" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="2"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Durasi</label>
                <input 
                  bind:value={durasi}
                  type="text" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="8 bulan"
                />
              </div>
            </div>
          </div>

          <!-- Project Details (Optional) -->
          <div>
            <h3 class="text-md font-medium text-gray-700 mb-3">Project Details (Optional)</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Tipe Proyek</label>
                <input 
                  bind:value={tipeProyek}
                  type="text" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Japandi (Japanese Scandinavian) Style"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Architect</label>
                <input 
                  bind:value={architect}
                  type="text" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Kurnia Firmanda Ageng, S.Ars"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Lokasi Detail</label>
                <input 
                  bind:value={lokasi}
                  type="text" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Sukarame, Bandar Lampung"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Interior Designer</label>
                <input 
                  bind:value={interiorDesigner}
                  type="text" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Kurnia Firmanda Ageng, S.Ars"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Upload Area or Scene Management -->
        {#if scenes.length === 0}
          <div class="bg-white rounded-lg shadow-sm border p-6">
            <div class="text-center">
              <div class="border-2 border-dashed border-gray-300 rounded-lg p-12 hover:border-gray-400 transition-colors">
                <Upload class="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <div class="space-y-2">
                  <p class="text-lg font-medium text-gray-900">Upload First 360° Panoramic Image</p>
                  <p class="text-gray-500">Start by uploading your first panoramic scene</p>
                  <p class="text-sm text-gray-400">Supports: JPG, PNG, WebP • Auto-compression for large files</p>
                </div>
                <input 
                  bind:this={fileInput}
                  type="file" 
                  accept="image/*" 
                  on:change={handleFileUpload}
                  class="hidden"
                />
                <button 
                  on:click={() => fileInput.click()}
                  class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Choose File
                </button>
              </div>
            </div>
          </div>
        {:else}
          <!-- Scene Management -->
          <div class="bg-white rounded-lg shadow-sm border p-6">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-lg font-semibold text-gray-900">Scenes ({scenes.length})</h2>
              <button
                on:click={addNewScene}
                class="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Plus class="w-4 h-4 mr-2" />
                Add Scene
              </button>
            </div>
            
            <!-- Scene Tabs -->
            <div class="flex flex-wrap gap-2 mb-4">
              {#each scenes as scene, index (scene.id)}
                <div class="flex items-center">
                  {#if editingSceneName === index}
                    <div class="flex items-center bg-blue-100 rounded-md p-2">
                      <input
                        bind:value={newSceneName}
                        type="text"
                        class="text-sm bg-transparent border-none outline-none w-24"
                        on:keydown={(e) => {
                          if (e.key === 'Enter') saveSceneName();
                          if (e.key === 'Escape') cancelSceneEdit();
                        }}
                        autofocus
                      />
                      <button on:click={saveSceneName} class="ml-1 text-green-600 hover:text-green-700">
                        <Save class="w-3 h-3" />
                      </button>
                      <button on:click={cancelSceneEdit} class="ml-1 text-red-600 hover:text-red-700">
                        <X class="w-3 h-3" />
                      </button>
                    </div>
                  {:else}
                    <button
                      on:click={() => switchToScene(index)}
                      class="flex items-center px-3 py-2 rounded-md text-sm transition-colors"
                      class:bg-blue-600={currentSceneIndex === index}
                      class:text-white={currentSceneIndex === index}
                      class:bg-gray-200={currentSceneIndex !== index}
                      class:text-gray-700={currentSceneIndex !== index}
                      class:hover:bg-gray-300={currentSceneIndex !== index}
                    >
                      {scene.name}
                      <span class="ml-2 text-xs opacity-75">({scene.hotspots?.length || 0})</span>
                    </button>
                    <button
                      on:click={() => startEditingSceneName(index)}
                      class="ml-1 p-1 text-gray-400 hover:text-gray-600"
                      title="Edit name"
                    >
                      <Edit3 class="w-3 h-3" />
                    </button>
                    {#if scenes.length > 1}
                      <button
                        on:click={() => deleteScene(index)}
                        class="ml-1 p-1 text-red-400 hover:text-red-600"
                        title="Delete scene"
                      >
                        <Trash2 class="w-3 h-3" />
                      </button>
                    {/if}
                  {/if}
                </div>
              {/each}
            </div>
            
            <input 
              bind:this={fileInput}
              type="file" 
              accept="image/*" 
              on:change={handleFileUpload}
              class="hidden"
            />
          </div>

          <!-- Image Editor -->
          {#if currentScene}
            <div class="bg-white rounded-lg shadow-sm border overflow-hidden">
              <!-- Toolbar -->
              <div class="border-b bg-gray-50 p-4">
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-3">
                    <div class="text-sm font-medium text-gray-700">
                      Editing: <span class="text-blue-600">{currentScene.name}</span>
                    </div>
                  </div>
                  <div class="flex items-center space-x-3">
                    <button
                      on:click={() => isAddingHotspot = !isAddingHotspot}
                      class="flex items-center px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      class:bg-green-700={isAddingHotspot}
                      disabled={editingHotspot !== null}
                    >
                      <Plus class="w-4 h-4 mr-2" />
                      {isAddingHotspot ? 'Click to Add Hotspot' : 'Add Hotspot'}
                    </button>
                    
                    <button
                      on:click={() => showHotspots = !showHotspots}
                      class="flex items-center px-3 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                    >
                      {#if showHotspots}
                        <Eye class="w-4 h-4 mr-2" />
                        Hide Hotspots
                      {:else}
                        <EyeOff class="w-4 h-4 mr-2" />
                        Show Hotspots
                      {/if}
                    </button>

                    <button
                      on:click={toggleViewerMode}
                      class="flex items-center px-3 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                    >
                      <Eye class="w-4 h-4 mr-2" />
                      {isViewerMode ? 'Exit 360° View' : '360° Preview'}
                    </button>

                    <button
                      on:click={clearAll}
                      class="flex items-center px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                    >
                      <Trash2 class="w-4 h-4 mr-2" />
                      Clear All
                    </button>
                  </div>
                </div>
              </div>

              <!-- Image Container -->
              <div class="relative">
                {#if isViewerMode}
                  <!-- Pannellum 360° Viewer -->
                  <div class="relative w-full h-96 bg-black rounded-lg overflow-hidden">
                    {#if viewerLoading}
                      <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 z-10">
                        <div class="text-center text-white">
                          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                          <p>Loading Optimized 360° Viewer...</p>
                        </div>
                      </div>
                    {/if}
                    
                    {#if isAddingHotspot}
                      <div class="absolute top-4 left-4 bg-green-600 text-white px-3 py-2 rounded-md text-sm z-20 flex items-center gap-2">
                        <div class="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        Click anywhere in the 360° view to add hotspot
                      </div>
                    {/if}
                    
                    <div bind:this={pannellumViewer} class="w-full h-full" id="pannellum-viewer"
                         class:cursor-crosshair={isAddingHotspot}>
                      <!-- Pannellum will render here -->
                    </div>
                  </div>
                {:else}
                  <!-- Regular Image Editor -->
                  <div 
                    bind:this={imageContainer}
                    class="relative cursor-crosshair"
                    class:cursor-crosshair={isAddingHotspot}
                    class:cursor-default={!isAddingHotspot}
                    on:click={handleImageClick}
                    role="button"
                    tabindex="0"
                  >
                    <img 
                      src={imageUrl} 
                      alt="Panoramic view" 
                      class="w-full h-auto max-h-96 object-contain bg-black"
                      draggable="false"
                    />
                    
                    <!-- Enhanced Hotspots with Type Indicators -->
                    {#if showHotspots}
                      {#each hotspots as hotspot (hotspot.id)}
                        <div 
                          class="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
                          style="left: {hotspot.x}%; top: {hotspot.y}%;"
                        >
                          <div class="relative">
                            <button
                              class="w-8 h-8 text-white rounded-full flex items-center justify-center border-2 border-white shadow-lg hover:scale-110 transition-transform"
                              class:bg-gradient-to-br={true}
                              class:from-blue-500={hotspot.type !== 'nav'}
                              class:to-blue-600={hotspot.type !== 'nav'}
                              class:from-green-500={hotspot.type === 'nav'}
                              class:to-green-600={hotspot.type === 'nav'}
                              on:click|stopPropagation={() => startEditingHotspot(hotspot)}
                            >
                              {#if hotspot.type === 'nav'}
                                <ChevronUp class="w-4 h-4" />
                              {:else}
                                <Info class="w-4 h-4" />
                              {/if}
                            </button>
                            
                            {#if hotspot.label}
                              <div class="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-black bg-opacity-75 text-white text-xs rounded whitespace-nowrap">
                                {hotspot.label}
                                {#if hotspot.type === 'nav'}
                                  <span class="text-green-300"> → {scenes.find(s => s.id.toString() === hotspot.targetScene)?.name || 'Unknown'}</span>
                                {/if}
                              </div>
                            {/if}
                          </div>
                        </div>
                      {/each}
                    {/if}
                  </div>
                {/if}
              </div>

              <!-- Enhanced Status Bar -->
              <div class="border-t bg-gray-50 px-4 py-2">
                <div class="flex items-center justify-between text-sm text-gray-600">
                  <div>
                    {#if currentScene?.file}
                      <span class="font-medium">{currentScene.file.name}</span>
                      <span class="ml-2">({Math.round(currentScene.file.size / 1024)} KB)</span>
                      {#if currentScene.file.size > 5 * 1024 * 1024}
                        <span class="ml-2 text-green-600">Compressed ✓</span>
                      {/if}
                    {/if}
                  </div>
                  <div>
                    Hotspots: <span class="font-medium">{hotspots.length}</span>
                    <span class="ml-2 text-blue-600">Info: {hotspots.filter(h => h.type !== 'nav').length}</span>
                    <span class="ml-2 text-green-600">Nav: {hotspots.filter(h => h.type === 'nav').length}</span>
                  </div>
                </div>
              </div>
            </div>
          {/if}
        {/if}
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- Enhanced Hotspot Editor -->
        {#if editingHotspot}
          <div class="bg-white rounded-lg shadow-sm border p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Edit Hotspot</h3>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Hotspot Name</label>
                <input 
                  bind:value={newHotspotName}
                  type="text" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Living Room, Kitchen"
                  on:keydown={(e) => {
                    if (e.key === 'Enter') saveHotspotEdit();
                    if (e.key === 'Escape') cancelEdit();
                  }}
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Hotspot Type</label>
                <select 
                  bind:value={newHotspotType}
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="info">ℹ️ Information</option>
                  <option value="nav">🔺 Navigation</option>
                </select>
              </div>

              {#if newHotspotType === 'nav'}
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Target Scene</label>
                  <select 
                    bind:value={newHotspotTargetScene}
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select target scene...</option>
                    {#each availableTargetScenes as scene, index}
                      <option value={scene.id.toString()}>{scene.name}</option>
                    {/each}
                  </select>
                  {#if availableTargetScenes.length === 0}
                    <p class="text-sm text-gray-500 mt-1">Add more scenes to enable navigation</p>
                  {/if}
                </div>
              {/if}
              
              <div class="flex space-x-2">
                <button 
                  on:click={saveHotspotEdit}
                  class="flex-1 flex items-center justify-center px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
                  disabled={!newHotspotName.trim() || (newHotspotType === 'nav' && !newHotspotTargetScene)}
                >
                  <Save class="w-4 h-4 mr-2" />
                  Save
                </button>
                <button 
                  on:click={cancelEdit}
                  class="flex-1 flex items-center justify-center px-3 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                >
                  <X class="w-4 h-4 mr-2" />
                  Cancel
                </button>
              </div>
            </div>
          </div>
        {/if}

        <!-- Enhanced Hotspot List -->
        {#if hotspots.length > 0}
          <div class="bg-white rounded-lg shadow-sm border p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Hotspots ({hotspots.length})</h3>
            <div class="space-y-2 max-h-64 overflow-y-auto">
              {#each hotspots as hotspot (hotspot.id)}
                <div class="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                  <div class="flex-1">
                    <div class="flex items-center gap-2">
                      <div class="text-sm font-medium text-gray-900">
                        {#if hotspot.type === 'nav'}
                          <span class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                            <ChevronUp class="w-3 h-3 mr-1" />
                            NAV
                          </span>
                        {:else}
                          <span class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                            <Info class="w-3 h-3 mr-1" />
                            INFO
                          </span>
                        {/if}
                        <span class="ml-2">{hotspot.label || 'Unnamed Hotspot'}</span>
                      </div>
                    </div>
                    <div class="text-xs text-gray-500 mt-1">
                      Position: {hotspot.x}%, {hotspot.y}%
                      {#if hotspot.type === 'nav' && hotspot.targetScene}
                        <br/>Target: {scenes.find(s => s.id.toString() === hotspot.targetScene)?.name || 'Unknown Scene'}
                      {/if}
                    </div>
                  </div>
                  <div class="flex items-center space-x-2">
                    <button
                      on:click={() => startEditingHotspot(hotspot)}
                      class="p-1 text-blue-600 hover:text-blue-700"
                      title="Edit hotspot"
                    >
                      <Edit3 class="w-4 h-4" />
                    </button>
                    <button
                      on:click={() => deleteHotspot(hotspot.id)}
                      class="p-1 text-red-600 hover:text-red-700"
                      title="Delete hotspot"
                    >
                      <Trash2 class="w-4 h-4" />
                    </button>
                  </div>
                </div>
              {/each}
            </div>
          </div>
        {/if}

        <!-- JSON Output Section -->
        <div class="bg-white rounded-lg shadow-sm border p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900">Export Project</h3>
            <button
              on:click={() => showJsonOutput = !showJsonOutput}
              class="text-sm text-blue-600 hover:text-blue-700"
            >
              {showJsonOutput ? 'Hide' : 'Show'} JSON
            </button>
          </div>
          
          <div class="space-y-3">
            <button
              on:click={downloadJSON}
              class="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              disabled={scenes.length === 0}
            >
              <Download class="w-4 h-4 mr-2" />
              Download Project JSON
            </button>
            
            <button
              on:click={copyToClipboard}
              class="w-full flex items-center justify-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              disabled={scenes.length === 0}
            >
              <Copy class="w-4 h-4 mr-2" />
              {copySuccess ? 'Copied!' : 'Copy to Clipboard'}
            </button>

            {#if showJsonOutput && scenes.length > 0}
              <div class="mt-4">
                <pre class="bg-gray-900 text-green-400 p-4 rounded-md text-xs overflow-auto max-h-64 font-mono">
{JSON.stringify(generateJSON(), null, 2)}
                </pre>
              </div>
            {/if}
          </div>
        </div>

        <!-- Enhanced Project Summary -->
        {#if scenes.length > 0}
          <div class="bg-white rounded-lg shadow-sm border p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Project Summary</h3>
            <div class="space-y-3">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Project:</span>
                <span class="font-medium">{projectName}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Category:</span>
                <span class="font-medium">{projectCategory}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Client:</span>
                <span class="font-medium">{projectClient}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Status:</span>
                <span class="font-medium capitalize">{projectStatus}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Year:</span>
                <span class="font-medium">{projectYear}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Total Scenes:</span>
                <span class="font-medium">{scenes.length}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Total Hotspots:</span>
                <span class="font-medium">{scenes.reduce((total, scene) => total + (scene.hotspots?.length || 0), 0)}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Info Hotspots:</span>
                <span class="font-medium text-blue-600">{scenes.reduce((total, scene) => total + (scene.hotspots?.filter(h => h.type !== 'nav').length || 0), 0)}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Nav Hotspots:</span>
                <span class="font-medium text-green-600">{scenes.reduce((total, scene) => total + (scene.hotspots?.filter(h => h.type === 'nav').length || 0), 0)}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Current Scene:</span>
                <span class="font-medium">{currentScene?.name || 'None'}</span>
              </div>
              
              <!-- Show optional stats if provided -->
              {#if luasTanah || luasBangunan || lantai || durasi}
                <div class="border-t pt-3 mt-3">
                  <p class="text-sm font-medium text-gray-700 mb-2">Project Stats:</p>
                  {#if luasTanah}
                    <div class="flex justify-between text-sm">
                      <span class="text-gray-600">Luas Tanah:</span>
                      <span class="font-medium">{luasTanah}</span>
                    </div>
                  {/if}
                  {#if luasBangunan}
                    <div class="flex justify-between text-sm">
                      <span class="text-gray-600">Luas Bangunan:</span>
                      <span class="font-medium">{luasBangunan}</span>
                    </div>
                  {/if}
                  {#if lantai}
                    <div class="flex justify-between text-sm">
                      <span class="text-gray-600">Lantai:</span>
                      <span class="font-medium">{lantai}</span>
                    </div>
                  {/if}
                  {#if durasi}
                    <div class="flex justify-between text-sm">
                      <span class="text-gray-600">Durasi:</span>
                      <span class="font-medium">{durasi}</span>
                    </div>
                  {/if}
                </div>
              {/if}
              
              <!-- Show features if provided -->
              {#if projectFeatures}
                <div class="border-t pt-3 mt-3">
                  <p class="text-sm font-medium text-gray-700 mb-2">Features:</p>
                  <div class="flex flex-wrap gap-1">
                    {#each projectFeatures.split(',').map(f => f.trim()).filter(f => f) as feature}
                      <span class="inline-block text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{feature}</span>
                    {/each}
                  </div>
                </div>
              {/if}
            </div>
          </div>
        {/if}

        <!-- Enhanced Instructions -->
        <div class="bg-blue-50 rounded-lg border border-blue-200 p-6">
          <h3 class="text-lg font-semibold text-blue-900 mb-3">How to Use</h3>
          <div class="space-y-2 text-sm text-blue-800">
            <p><strong>1.</strong> Fill in project settings (required fields marked with *)</p>
            <p><strong>2.</strong> Upload 360° panoramic images (auto-compression for large files)</p>
            <p><strong>3.</strong> Click "Add Hotspot" then click on the image to place hotspots</p>
            <p><strong>4.</strong> Choose hotspot type: Info (ℹ️) or Navigation (🔺)</p>
            <p><strong>5.</strong> For navigation hotspots, select target scene</p>
            <p><strong>6.</strong> Use "360° Preview" to test navigation and interactions</p>
            <p><strong>7.</strong> Export your complete project as JSON when ready</p>
          </div>
        </div>

        <!-- Enhanced Performance Tips -->
        <div class="bg-green-50 rounded-lg border border-green-200 p-6">
          <h3 class="text-lg font-semibold text-green-900 mb-3">Performance & Data Tips</h3>
          <div class="space-y-2 text-sm text-green-800">
            <p>• <strong>Required fields</strong>: Name, Category, Location, Client, Description</p>
            <p>• <strong>Optional fields</strong>: All image URLs, features, stats, and project details</p>
            <p>• <strong>Images</strong>: Use full URLs for thumbnail, mobile, tablet, desktop versions</p>
            <p>• <strong>Features</strong>: Separate multiple features with commas</p>
            <p>• <strong>Large files</strong>: Automatically compressed to improve loading</p>
            <p>• <strong>Format</strong>: JPEG provides best balance of quality/size</p>
            <p>• <strong>Navigation flow</strong>: Test in 360° mode before export</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>