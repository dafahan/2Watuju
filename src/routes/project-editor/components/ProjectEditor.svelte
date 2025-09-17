<!-- src/routes/project-editor/components/ProjectEditor.svelte -->
<script>
  import { createEventDispatcher } from 'svelte';
  import { Save, X, Plus, Trash2, ArrowUp, ArrowDown, Eye, Image } from 'lucide-svelte';
  
  export let project;
  export let isCreating = false;
  export let categories = [];

  const dispatch = createEventDispatcher();

  // Create working copy
  let editingProject = JSON.parse(JSON.stringify(project));

  // Form sections visibility
  let showBasicInfo = true;
  let showImages = false;
  let showContentSections = false;
  let showPanoramicHotspots = false;
  let showStats = false;
  let showProjectDetails = false;

  const saveProject = () => {
    // Basic validation
    if (!editingProject.title?.trim()) {
      alert('Project title is required');
      return;
    }
    if (!editingProject.slug?.trim()) {
      alert('Project slug is required');
      return;
    }
    if (!editingProject.description?.trim()) {
      alert('Project description is required');
      return;
    }

    // Auto-generate slug if needed
    if (!editingProject.slug || editingProject.slug === project.slug) {
      editingProject.slug = editingProject.title
        .toLowerCase()
        .replace(/\n/g, '-')
        .replace(/[^a-z0-9-]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
    }

    dispatch('save', editingProject);
  };

  const cancelEdit = () => {
    dispatch('cancel');
  };

  // Content Sections Management
  const addContentSection = () => {
    if (!editingProject.contentSections) {
      editingProject.contentSections = [];
    }
    
    editingProject.contentSections = [
      ...editingProject.contentSections,
      {
        title: 'New Section',
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
        imageDescription: 'Description for the new section',
        content: 'Content description for this section.'
      }
    ];
  };

  const removeContentSection = (index) => {
    editingProject.contentSections = editingProject.contentSections.filter((_, i) => i !== index);
  };

  const moveContentSection = (index, direction) => {
    const sections = [...editingProject.contentSections];
    if (direction === 'up' && index > 0) {
      [sections[index], sections[index - 1]] = [sections[index - 1], sections[index]];
    } else if (direction === 'down' && index < sections.length - 1) {
      [sections[index], sections[index + 1]] = [sections[index + 1], sections[index]];
    }
    editingProject.contentSections = sections;
  };

  // Hotspots Management
  const addHotspot = () => {
    if (!editingProject.hotspots) {
      editingProject.hotspots = [];
    }
    
    editingProject.hotspots = [
      ...editingProject.hotspots,
      {
        x: 50.0,
        y: 50.0,
        scene: 'main',
        label: 'New Hotspot',
        type: 'info',
        targetScene: '',
        icon: 'info'
      }
    ];
  };

  const removeHotspot = (index) => {
    editingProject.hotspots = editingProject.hotspots.filter((_, i) => i !== index);
  };

  // Stats Management
  const ensureStatsConfig = () => {
    if (!editingProject.statsConfig) {
      editingProject.statsConfig = {
        "LAND AREA": { "icon": "land.svg", "key": "land", "order": 1 },
        "FLOOR AREA": { "icon": "floor.svg", "key": "floor", "order": 2 },
        "ROOM": { "icon": "room.svg", "key": "room", "order": 3 },
        "BATHROOM": { "icon": "bathroom.svg", "key": "bathroom", "order": 4 },
        "CARPORT": { "icon": "garage.svg", "key": "carport", "order": 5 },
        "POOL": { "icon": "pool.svg", "key": "pool", "order": 6 }
      };
    }
    if (!editingProject.stats) {
      editingProject.stats = {
        land: '',
        floor: '',
        room: '',
        bathroom: '',
        carport: 'no',
        pool: 'no'
      };
    }
  };

  const addStatField = () => {
    const newKey = `custom_${Date.now()}`;
    const newLabel = `NEW STAT`;
    const nextOrder = Math.max(...Object.values(editingProject.statsConfig).map(config => config.order || 0)) + 1;
    
    editingProject.statsConfig[newLabel] = {
      icon: "info.svg",
      key: newKey,
      order: nextOrder
    };
    
    editingProject.stats[newKey] = '';
    
    // Trigger reactivity
    editingProject.statsConfig = { ...editingProject.statsConfig };
    editingProject.stats = { ...editingProject.stats };
  };

  const removeStatField = (label) => {
    const config = editingProject.statsConfig[label];
    if (config) {
      delete editingProject.stats[config.key];
      delete editingProject.statsConfig[label];
      
      // Trigger reactivity
      editingProject.statsConfig = { ...editingProject.statsConfig };
      editingProject.stats = { ...editingProject.stats };
    }
  };

  const updateStatLabel = (oldLabel, newLabel) => {
    if (oldLabel !== newLabel && editingProject.statsConfig[oldLabel]) {
      editingProject.statsConfig[newLabel] = { ...editingProject.statsConfig[oldLabel] };
      delete editingProject.statsConfig[oldLabel];
      editingProject.statsConfig = { ...editingProject.statsConfig };
    }
  };

  // Project Details Management
  const ensureProjectDetails = () => {
    if (!editingProject.projectDetails) {
      editingProject.projectDetails = {
        "TIPE PROYEK": { "value": "", "order": 1 },
        "PRINCIPLE DESIGNER": { "value": "Kurnia Firmanda Ageng, S.Ars", "order": 2 },
        "LOKASI": { "value": "", "order": 3 },
        "INTERIOR DESIGNER": { "value": "Kurnia Firmanda Ageng, S.Ars", "order": 4 }
      };
    }
  };

  const addProjectDetail = () => {
    const newLabel = `NEW DETAIL`;
    const nextOrder = Math.max(...Object.values(editingProject.projectDetails).map(detail => detail.order || 0)) + 1;
    
    editingProject.projectDetails[newLabel] = {
      value: '',
      order: nextOrder
    };
    
    // Trigger reactivity
    editingProject.projectDetails = { ...editingProject.projectDetails };
  };

  const removeProjectDetail = (label) => {
    delete editingProject.projectDetails[label];
    editingProject.projectDetails = { ...editingProject.projectDetails };
  };

  const updateProjectDetailLabel = (oldLabel, newLabel) => {
    if (oldLabel !== newLabel && editingProject.projectDetails[oldLabel]) {
      editingProject.projectDetails[newLabel] = { ...editingProject.projectDetails[oldLabel] };
      delete editingProject.projectDetails[oldLabel];
      editingProject.projectDetails = { ...editingProject.projectDetails };
    }
  };

  // Initialize missing sections
  $: {
    if (!editingProject.images) {
      editingProject.images = {
        thumbnail: '',
        mobile: '',
        tablet: '',
        desktop: ''
      };
    }
    if (!editingProject.contentSections) {
      editingProject.contentSections = [];
    }
    ensureStatsConfig();
    ensureProjectDetails();
  }
</script>

<div class="bg-white rounded-lg shadow-sm border">
  <!-- Header -->
  <div class="border-b bg-gray-50 px-6 py-4">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-semibold text-gray-900">
          {isCreating ? 'Create New Project' : 'Edit Project'}
        </h2>
        <p class="text-sm text-gray-600 mt-1">
          {isCreating ? 'Fill in the project details below' : `Editing: ${project.title?.replace(/\n/g, ' ')}`}
        </p>
      </div>
      
      <div class="flex items-center space-x-3">
        <button
          on:click={cancelEdit}
          class="flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
        >
          <X class="w-4 h-4 mr-2" />
          Cancel
        </button>
        <button
          on:click={saveProject}
          class="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Save class="w-4 h-4 mr-2" />
          {isCreating ? 'Create Project' : 'Save Changes'}
        </button>
      </div>
    </div>
  </div>

  <!-- Form Content -->
  <div class="p-6">
    <!-- Section Navigation -->
    <div class="mb-6">
      <nav class="flex flex-wrap gap-2">
        <button
          class="px-3 py-2 text-sm rounded-md transition-colors"
          class:bg-blue-100={showBasicInfo}
          class:text-blue-700={showBasicInfo}
          class:bg-gray-100={!showBasicInfo}
          class:text-gray-600={!showBasicInfo}
          on:click={() => {
            showBasicInfo = true;
            showImages = showContentSections = showPanoramicHotspots = showStats = showProjectDetails = false;
          }}
        >
          Basic Information
        </button>
        <button
          class="px-3 py-2 text-sm rounded-md transition-colors"
          class:bg-blue-100={showImages}
          class:text-blue-700={showImages}
          class:bg-gray-100={!showImages}
          class:text-gray-600={!showImages}
          on:click={() => {
            showImages = true;
            showBasicInfo = showContentSections = showPanoramicHotspots = showStats = showProjectDetails = false;
          }}
        >
          Project Images
        </button>
        <button
          class="px-3 py-2 text-sm rounded-md transition-colors"
          class:bg-blue-100={showContentSections}
          class:text-blue-700={showContentSections}
          class:bg-gray-100={!showContentSections}
          class:text-gray-600={!showContentSections}
          on:click={() => {
            showContentSections = true;
            showBasicInfo = showImages = showPanoramicHotspots = showStats = showProjectDetails = false;
          }}
        >
          Content Sections ({editingProject.contentSections?.length || 0})
        </button>
        <button
          class="px-3 py-2 text-sm rounded-md transition-colors"
          class:bg-blue-100={showPanoramicHotspots}
          class:text-blue-700={showPanoramicHotspots}
          class:bg-gray-100={!showPanoramicHotspots}
          class:text-gray-600={!showPanoramicHotspots}
          on:click={() => {
            showPanoramicHotspots = true;
            showBasicInfo = showImages = showContentSections = showStats = showProjectDetails = false;
          }}
        >
          Panoramic & Hotspots ({editingProject.hotspots?.length || 0})
        </button>
        <button
          class="px-3 py-2 text-sm rounded-md transition-colors"
          class:bg-blue-100={showStats}
          class:text-blue-700={showStats}
          class:bg-gray-100={!showStats}
          class:text-gray-600={!showStats}
          on:click={() => {
            showStats = true;
            showBasicInfo = showImages = showContentSections = showPanoramicHotspots = showProjectDetails = false;
          }}
        >
          Project Stats
        </button>
        <button
          class="px-3 py-2 text-sm rounded-md transition-colors"
          class:bg-blue-100={showProjectDetails}
          class:text-blue-700={showProjectDetails}
          class:bg-gray-100={!showProjectDetails}
          class:text-gray-600={!showProjectDetails}
          on:click={() => {
            showProjectDetails = true;
            showBasicInfo = showImages = showContentSections = showPanoramicHotspots = showStats = false;
          }}
        >
          Project Details
        </button>
      </nav>
    </div>

    <!-- Basic Information -->
    {#if showBasicInfo}
      <div class="space-y-6">
        <h3 class="text-lg font-medium text-gray-900 border-b pb-2">Basic Information</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Project Title *</label>
            <textarea
              bind:value={editingProject.title}
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="PROJECT\nTITLE\nFORMAT"
              required
            ></textarea>
            <p class="text-xs text-gray-500 mt-1">Use line breaks for multi-line titles</p>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">URL Slug *</label>
            <input
              bind:value={editingProject.slug}
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="project-url-slug"
              required
            />
            <p class="text-xs text-gray-500 mt-1">URL-friendly version of the title</p>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Category *</label>
            <select
              bind:value={editingProject.categoryId}
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="japandi">Japandi Style</option>
              <option value="kontemporer">Contemporary Style</option>
              <option value="luxury">Luxury Style</option>
              <option value="modern">Modern Style</option>
              <option value="classic">Classic Style</option>
            </select>
          </div>
          
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Year *</label>
              <input
                bind:value={editingProject.year}
                type="number"
                min="2020"
                max="2030"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Month</label>
              <select
                bind:value={editingProject.month}
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="JAN">January</option>
                <option value="FEB">February</option>
                <option value="MAR">March</option>
                <option value="APR">April</option>
                <option value="MAY">May</option>
                <option value="JUN">June</option>
                <option value="JUL">July</option>
                <option value="AUG">August</option>
                <option value="SEP">September</option>
                <option value="OCT">October</option>
                <option value="NOV">November</option>
                <option value="DEC">December</option>
              </select>
            </div>
          </div>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Project Description *</label>
          <textarea
            bind:value={editingProject.description}
            rows="4"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Detailed description of the project..."
            required
          ></textarea>
        </div>
      </div>
    {/if}

    <!-- Project Images -->
    {#if showImages}
      <div class="space-y-6">
        <h3 class="text-lg font-medium text-gray-900 border-b pb-2">Project Images</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Thumbnail Image URL</label>
            <input
              bind:value={editingProject.images.thumbnail}
              type="url"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/image.jpg"
            />
            {#if editingProject.images.thumbnail}
              <div class="mt-2">
                <img src={editingProject.images.thumbnail} alt="Thumbnail preview" class="w-20 h-15 object-cover rounded border" />
              </div>
            {/if}
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Desktop Image URL</label>
            <input
              bind:value={editingProject.images.desktop}
              type="url"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Mobile Image URL</label>
            <input
              bind:value={editingProject.images.mobile}
              type="url"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Tablet Image URL</label>
            <input
              bind:value={editingProject.images.tablet}
              type="url"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>
      </div>
    {/if}

    <!-- Content Sections -->
    {#if showContentSections}
      <div class="space-y-6">
        <div class="flex items-center justify-between border-b pb-2">
          <h3 class="text-lg font-medium text-gray-900">Content Sections</h3>
          <button
            on:click={addContentSection}
            class="flex items-center px-3 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
          >
            <Plus class="w-4 h-4 mr-2" />
            Add Section
          </button>
        </div>
        
        {#if editingProject.contentSections && editingProject.contentSections.length > 0}
          <div class="space-y-6">
            {#each editingProject.contentSections as section, index (index)}
              <div class="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div class="flex items-center justify-between mb-4">
                  <h4 class="font-medium text-gray-900">Section {index + 1}</h4>
                  <div class="flex items-center space-x-2">
                    <button
                      on:click={() => moveContentSection(index, 'up')}
                      class="p-1 text-gray-600 hover:text-gray-800"
                      disabled={index === 0}
                    >
                      <ArrowUp class="w-4 h-4" />
                    </button>
                    <button
                      on:click={() => moveContentSection(index, 'down')}
                      class="p-1 text-gray-600 hover:text-gray-800"
                      disabled={index === editingProject.contentSections.length - 1}
                    >
                      <ArrowDown class="w-4 h-4" />
                    </button>
                    <button
                      on:click={() => removeContentSection(index)}
                      class="p-1 text-red-600 hover:text-red-800"
                    >
                      <Trash2 class="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
                    <input
                      bind:value={section.title}
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                    <input
                      bind:value={section.image}
                      type="url"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div class="mt-4">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Image Description</label>
                  <input
                    bind:value={section.imageDescription}
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div class="mt-4">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Content (HTML supported)</label>
                  <textarea
                    bind:value={section.content}
                    rows="4"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Content for this section. Use <br/> for line breaks..."
                  ></textarea>
                </div>
              </div>
            {/each}
          </div>
        {:else}
          <div class="text-center py-8 text-gray-500">
            <Image class="w-12 h-12 mx-auto mb-4" />
            <p>No content sections yet. Add your first section above.</p>
          </div>
        {/if}
      </div>
    {/if}

    <!-- Panoramic & Hotspots -->
    {#if showPanoramicHotspots}
      <div class="space-y-6">
        <div class="flex items-center justify-between border-b pb-2">
          <h3 class="text-lg font-medium text-gray-900">Panoramic & Hotspots</h3>
          <button
            on:click={addHotspot}
            class="flex items-center px-3 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
          >
            <Plus class="w-4 h-4 mr-2" />
            Add Hotspot
          </button>
        </div>
        
        <!-- Panoramic Data -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Panoramic Images (JSON)</label>
          <textarea
            bind:value={editingProject.panoramic}
            rows="4"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
            placeholder={`{"outside": "assets/panorama/1.webp", "inside": "assets/panorama/2.webp"}`}
            on:input={(e) => {
              try {
                editingProject.panoramic = JSON.parse(e.target.value);
              } catch (error) {
                // Keep as string if invalid JSON
              }
            }}
          ></textarea>
          <p class="text-xs text-gray-500 mt-1">JSON object mapping scene keys to image paths</p>
        </div>
        
        <!-- Hotspots -->
        {#if editingProject.hotspots && editingProject.hotspots.length > 0}
          <div class="space-y-4">
            <h4 class="font-medium text-gray-900">Hotspots ({editingProject.hotspots.length})</h4>
            {#each editingProject.hotspots as hotspot, index (index)}
              <div class="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div class="flex items-center justify-between mb-3">
                  <h5 class="font-medium text-gray-900">Hotspot {index + 1}</h5>
                  <button
                    on:click={() => removeHotspot(index)}
                    class="p-1 text-red-600 hover:text-red-800"
                  >
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
                
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">X Position</label>
                    <input
                      bind:value={hotspot.x}
                      type="number"
                      step="0.1"
                      min="0"
                      max="100"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Y Position</label>
                    <input
                      bind:value={hotspot.y}
                      type="number"
                      step="0.1"
                      min="0"
                      max="100"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Scene</label>
                    <input
                      bind:value={hotspot.scene}
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select
                      bind:value={hotspot.type}
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="info">Info</option>
                      <option value="nav">Navigation</option>
                    </select>
                  </div>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Label</label>
                    <input
                      bind:value={hotspot.label}
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Target Scene</label>
                    <input
                      bind:value={hotspot.targetScene}
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            {/each}
          </div>
        {:else}
          <div class="text-center py-8 text-gray-500">
            <Eye class="w-12 h-12 mx-auto mb-4" />
            <p>No hotspots yet. Add your first hotspot above.</p>
          </div>
        {/if}
      </div>
    {/if}

    <!-- Project Stats -->
    {#if showStats}
      <div class="space-y-6">
        <div class="flex items-center justify-between border-b pb-2">
          <h3 class="text-lg font-medium text-gray-900">Project Stats</h3>
          <button
            on:click={addStatField}
            class="flex items-center px-3 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
          >
            <Plus class="w-4 h-4 mr-2" />
            Add Stat Field
          </button>
        </div>
        
        {#if editingProject.statsConfig && Object.keys(editingProject.statsConfig).length > 0}
          <div class="space-y-4">
            {#each Object.entries(editingProject.statsConfig).sort(([,a], [,b]) => (a.order || 999) - (b.order || 999)) as [label, config], index ([label, config.key])}
              <div class="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div class="flex items-center justify-between mb-3">
                  <h4 class="font-medium text-gray-900">Stat Field {index + 1}</h4>
                  <button
                    on:click={() => removeStatField(label)}
                    class="p-1 text-red-600 hover:text-red-800"
                    title="Remove stat field"
                  >
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Label</label>
                    <input
                      value={label}
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      on:blur={(e) => updateStatLabel(label, e.target.value)}
                      placeholder="STAT LABEL"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                    <input
                      bind:value={config.icon}
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="icon.svg"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Data Key</label>
                    <input
                      bind:value={config.key}
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="datakey"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Order</label>
                    <input
                      bind:value={config.order}
                      type="number"
                      min="1"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Value</label>
                    {#if config.key === 'carport' || config.key === 'pool'}
                      <select
                        bind:value={editingProject.stats[config.key]}
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    {:else}
                      <input
                        bind:value={editingProject.stats[config.key]}
                        type="text"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="150m² / 3 / etc"
                      />
                    {/if}
                  </div>
                </div>
              </div>
            {/each}
          </div>
        {:else}
          <div class="text-center py-8 text-gray-500">
            <div class="w-12 h-12 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
              <span class="text-gray-500 text-xl">#</span>
            </div>
            <p>No stat fields yet. Add your first stat field above.</p>
          </div>
        {/if}
      </div>
    {/if}

    <!-- Project Details -->
    {#if showProjectDetails}
      <div class="space-y-6">
        <div class="flex items-center justify-between border-b pb-2">
          <h3 class="text-lg font-medium text-gray-900">Project Details</h3>
          <button
            on:click={addProjectDetail}
            class="flex items-center px-3 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
          >
            <Plus class="w-4 h-4 mr-2" />
            Add Detail Field
          </button>
        </div>
        
        {#if editingProject.projectDetails && Object.keys(editingProject.projectDetails).length > 0}
          <div class="space-y-4">
            {#each Object.entries(editingProject.projectDetails).sort(([,a], [,b]) => (a.order || 999) - (b.order || 999)) as [label, detail], index (label)}
              <div class="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div class="flex items-center justify-between mb-3">
                  <h4 class="font-medium text-gray-900">Detail Field {index + 1}</h4>
                  <button
                    on:click={() => removeProjectDetail(label)}
                    class="p-1 text-red-600 hover:text-red-800"
                    title="Remove detail field"
                  >
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Label</label>
                    <input
                      value={label}
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      on:blur={(e) => updateProjectDetailLabel(label, e.target.value)}
                      placeholder="DETAIL LABEL"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Order</label>
                    <input
                      bind:value={detail.order}
                      type="number"
                      min="1"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Value</label>
                    <input
                      bind:value={detail.value}
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Detail value"
                    />
                  </div>
                </div>
              </div>
            {/each}
          </div>
        {:else}
          <div class="text-center py-8 text-gray-500">
            <div class="w-12 h-12 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
              <span class="text-gray-500 text-xl">i</span>
            </div>
            <p>No detail fields yet. Add your first detail field above.</p>
          </div>
        {/if}
      </div>
    {/if}
  </div>

  <!-- Footer Actions -->
  <div class="border-t bg-gray-50 px-6 py-4">
    <div class="flex items-center justify-between">
      <div class="text-sm text-gray-600">
        Project ID: {editingProject.id}
      </div>
      <div class="flex items-center space-x-3">
        <button
          on:click={cancelEdit}
          class="flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
        >
          <X class="w-4 h-4 mr-2" />
          Cancel
        </button>
        <button
          on:click={saveProject}
          class="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Save class="w-4 h-4 mr-2" />
          {isCreating ? 'Create Project' : 'Save Changes'}
        </button>
      </div>
    </div>
  </div>
</div>