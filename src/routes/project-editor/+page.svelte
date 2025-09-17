<!-- src/routes/project-editor/+page.svelte -->
<script>
  import { onMount } from 'svelte';
  import { Plus, Search, Filter, Download, Upload, Copy, Save } from 'lucide-svelte';
  import ProjectList from './components/ProjectList.svelte';
  import ProjectEditor from './components/ProjectEditor.svelte';
  import { projects as initialProjects } from '$lib/data/projects.js';
  import { projectCategories } from '$lib/data/category-projects.js';

  // State management
  let projects = [...initialProjects];
  let originalProjects = [...initialProjects];
  let currentProject = null;
  let isEditing = false;
  let isCreating = false;
  let hasUnsavedChanges = false;

  // Filter and search state
  let searchQuery = '';
  let selectedCategory = '';
  let selectedYear = '';
  let sortBy = 'year';
  let sortOrder = 'desc';

  // UI state
  let showJsonOutput = false;
  let copySuccess = false;
  let exportSuccess = false;

  // Computed values
  $: availableYears = [...new Set(projects.map(p => p.year))].sort((a, b) => b - a);
  $: availableCategories = [...new Set(projects.map(p => p.categoryId))];
  
  $: filteredProjects = projects
    .filter(project => {
      if (searchQuery && !project.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !project.description.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      if (selectedCategory && project.categoryId !== selectedCategory) {
        return false;
      }
      if (selectedYear && project.year.toString() !== selectedYear) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      let aVal, bVal;
      switch (sortBy) {
        case 'title':
          aVal = a.title.toLowerCase();
          bVal = b.title.toLowerCase();
          break;
        case 'year':
          aVal = a.year;
          bVal = b.year;
          break;
        case 'category':
          aVal = a.categoryId;
          bVal = b.categoryId;
          break;
        default:
          aVal = a.id;
          bVal = b.id;
      }
      
      if (sortOrder === 'desc') {
        return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
      } else {
        return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      }
    });

  // Check for unsaved changes
  $: {
    hasUnsavedChanges = JSON.stringify(projects) !== JSON.stringify(originalProjects);
  }

  // Functions
  const createNewProject = () => {
    const newProject = {
      id: Date.now(),
      title: "NEW\nPROJECT\nNAME",
      slug: "new-project-name",
      categoryId: "modern",
      year: new Date().getFullYear(),
      month: "JAN",
      description: "Add your project description here.",
      images: {
        thumbnail: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop",
        mobile: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop",
        tablet: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=450&fit=crop",
        desktop: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop"
      },
      contentSections: [
        {
          title: "Main Feature",
          image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
          imageDescription: "Description of the main feature",
          content: "Content description for this section."
        }
      ],
      stats: {
        land: "150m²",
        floor: "120m²",
        carport: "yes",
        pool: "no",
        bathroom: "2",
        room: "3"
      },
      statsConfig: {
        "LAND AREA": { "icon": "land.svg", "key": "land", "order": 1 },
        "FLOOR AREA": { "icon": "floor.svg", "key": "floor", "order": 2 },
        "ROOM": { "icon": "room.svg", "key": "room", "order": 3 },
        "BATHROOM": { "icon": "bathroom.svg", "key": "bathroom", "order": 4 },
        "CARPORT": { "icon": "garage.svg", "key": "carport", "order": 5 },
        "POOL": { "icon": "pool.svg", "key": "pool", "order": 6 }
      },
      projectDetails: {
        "TIPE PROYEK": { "value": "Modern Style", "order": 1 },
        "PRINCIPLE DESIGNER": { "value": "Kurnia Firmanda Ageng, S.Ars", "order": 2 },
        "LOKASI": { "value": "Bandar Lampung", "order": 3 },
        "INTERIOR DESIGNER": { "value": "Kurnia Firmanda Ageng, S.Ars", "order": 4 }
      }
    };

    projects = [...projects, newProject];
    currentProject = newProject;
    isCreating = true;
    isEditing = true;
  };

  const editProject = (project) => {
    currentProject = { ...project };
    isEditing = true;
    isCreating = false;
  };

  const saveProject = (updatedProject) => {
    if (isCreating) {
      // Project already added in createNewProject, just update it
      projects = projects.map(p => p.id === updatedProject.id ? updatedProject : p);
    } else {
      projects = projects.map(p => p.id === updatedProject.id ? updatedProject : p);
    }
    
    currentProject = null;
    isEditing = false;
    isCreating = false;
  };

  const deleteProject = (projectId) => {
    if (confirm('Are you sure you want to delete this project?')) {
      projects = projects.filter(p => p.id !== projectId);
      if (currentProject && currentProject.id === projectId) {
        currentProject = null;
        isEditing = false;
        isCreating = false;
      }
    }
  };

  const cancelEdit = () => {
    if (isCreating) {
      // Remove the newly created project if canceling
      projects = projects.filter(p => p.id !== currentProject.id);
    }
    currentProject = null;
    isEditing = false;
    isCreating = false;
  };

  const duplicateProject = (project) => {
    const duplicatedProject = {
      ...project,
      id: Date.now(),
      title: project.title.replace(/\n/g, ' ') + ' Copy',
      slug: project.slug + '-copy',
      contentSections: [...project.contentSections],
      stats: { ...project.stats },
      statsConfig: { ...project.statsConfig },
      projectDetails: { ...project.projectDetails }
    };

    projects = [...projects, duplicatedProject];
  };

  // Export functions
  const downloadProjects = () => {
    const dataStr = `// src/lib/data/projects.js

const BASE_URL = 'https://dafahan.github.io/2Watuju';

export const projects = ${JSON.stringify(projects, null, 2)};

export const projectStatuses = {
  planning: 'Perencanaan',
  'in-progress': 'Dalam Proses',
  completed: 'Selesai'
};

// Helper functions
export const getAllProjects = () => projects;
export const getFeaturedProjects = () => projects.filter(project => project.featured);
export const getProjectBySlug = (slug) => projects.find(project => project.slug === slug);
export const getProjectsByCategoryId = (categoryId) => projects.filter(project => project.categoryId === categoryId);
export const getProjectsByStatus = (status) => projects.filter(project => project.status === status);

// UPDATED: Efficient helper function for stats
export const getOrderedStats = (project) => {
  if (!project.stats || !project.statsConfig) return [];
  
  return Object.entries(project.statsConfig)
    .map(([label, config]) => ({
      label,
      value: project.stats[config.key],
      icon: config.icon,
      order: config.order
    }))
    .filter(stat => stat.value !== undefined) // Only include stats that have values
    .sort((a, b) => (a.order || 999) - (b.order || 999));
};

// UPDATED: Efficient helper function for project details
export const getOrderedProjectDetails = (project) => {
  if (!project.projectDetails) return [];
  
  return Object.entries(project.projectDetails)
    .map(([label, detail]) => {
      // Support both old format (string) and new format (object)
      if (typeof detail === 'string') {
        return { label, value: detail, order: 999 };
      }
      return { label, value: detail.value, order: detail.order };
    })
    .sort((a, b) => (a.order || 999) - (b.order || 999));
};`;

    const blob = new Blob([dataStr], { type: 'application/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'projects.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    exportSuccess = true;
    setTimeout(() => exportSuccess = false, 2000);
  };

  const copyProjectsCode = async () => {
    const dataStr = `// src/lib/data/projects.js

const BASE_URL = 'https://dafahan.github.io/2Watuju';

export const projects = ${JSON.stringify(projects, null, 2)};

// ... rest of the helper functions`;

    try {
      await navigator.clipboard.writeText(dataStr);
      copySuccess = true;
      setTimeout(() => copySuccess = false, 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  const resetToOriginal = () => {
    if (confirm('Are you sure you want to reset all changes? This will lose all unsaved modifications.')) {
      projects = [...originalProjects];
      currentProject = null;
      isEditing = false;
      isCreating = false;
    }
  };

  const saveAsOriginal = () => {
    originalProjects = [...projects];
    hasUnsavedChanges = false;
  };

  // Import JSON file
  const handleFileImport = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/json') {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedProjects = JSON.parse(e.target.result);
          if (Array.isArray(importedProjects)) {
            if (confirm('This will replace all current projects. Continue?')) {
              projects = importedProjects;
              originalProjects = [...importedProjects];
            }
          } else {
            alert('Invalid JSON format. Please upload a valid projects array.');
          }
        } catch (error) {
          alert('Error parsing JSON file: ' + error.message);
        }
      };
      reader.readAsText(file);
    }
  };

  // Auto-save to localStorage
  $: {
    if (typeof window !== 'undefined' && hasUnsavedChanges) {
      localStorage.setItem('unsaved-projects', JSON.stringify(projects));
    }
  }

  onMount(() => {
    // Load unsaved changes if they exist
    if (typeof window !== 'undefined') {
      const unsavedProjects = localStorage.getItem('unsaved-projects');
      if (unsavedProjects) {
        const parsed = JSON.parse(unsavedProjects);
        if (confirm('Found unsaved changes. Do you want to restore them?')) {
          projects = parsed;
        } else {
          localStorage.removeItem('unsaved-projects');
        }
      }
    }
  });
</script>

<svelte:head>
  <title>Project Data Manager | 2WATUJU</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 py-8">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Project Data Manager</h1>
          <p class="text-gray-600">Manage your architecture project data with full CRUD operations</p>
        </div>
        
        <div class="flex items-center space-x-3">
          {#if hasUnsavedChanges}
            <div class="flex items-center space-x-2">
              <div class="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
              <span class="text-sm text-yellow-600 font-medium">Unsaved changes</span>
            </div>
          {/if}
          
          <button
            on:click={saveAsOriginal}
            class="flex items-center px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            disabled={!hasUnsavedChanges}
          >
            <Save class="w-4 h-4 mr-2" />
            Save Changes
          </button>
          
          <button
            on:click={createNewProject}
            class="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus class="w-4 h-4 mr-2" />
            New Project
          </button>
        </div>
      </div>
    </div>

    {#if isEditing}
      <!-- Project Editor View -->
      <ProjectEditor
        project={currentProject}
        {isCreating}
        categories={availableCategories}
        on:save={(event) => saveProject(event.detail)}
        on:cancel={cancelEdit}
      />
    {:else}
      <!-- Project List View -->
      <div class="space-y-6">
        <!-- Filters and Search -->
        <div class="bg-white rounded-lg shadow-sm border p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <!-- Search -->
            <div class="lg:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">Search Projects</label>
              <div class="relative">
                <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  bind:value={searchQuery}
                  type="text"
                  placeholder="Search by title or description..."
                  class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <!-- Category Filter -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                bind:value={selectedCategory}
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Categories</option>
                {#each availableCategories as category}
                  <option value={category}>{category}</option>
                {/each}
              </select>
            </div>

            <!-- Year Filter -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Year</label>
              <select
                bind:value={selectedYear}
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Years</option>
                {#each availableYears as year}
                  <option value={year.toString()}>{year}</option>
                {/each}
              </select>
            </div>

            <!-- Sort -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <div class="flex space-x-2">
                <select
                  bind:value={sortBy}
                  class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="year">Year</option>
                  <option value="title">Title</option>
                  <option value="category">Category</option>
                </select>
                <button
                  on:click={() => sortOrder = sortOrder === 'asc' ? 'desc' : 'asc'}
                  class="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  title={sortOrder === 'asc' ? 'Sort Descending' : 'Sort Ascending'}
                >
                  {sortOrder === 'asc' ? '↑' : '↓'}
                </button>
              </div>
            </div>
          </div>

          <!-- Results Summary -->
          <div class="mt-4 pt-4 border-t">
            <div class="flex items-center justify-between text-sm text-gray-600">
              <span>
                Showing {filteredProjects.length} of {projects.length} projects
                {#if hasUnsavedChanges}
                  <span class="text-yellow-600 font-medium ml-2">(Unsaved changes)</span>
                {/if}
              </span>
              <div class="flex space-x-2">
                <button
                  on:click={() => showJsonOutput = !showJsonOutput}
                  class="text-blue-600 hover:text-blue-700"
                >
                  {showJsonOutput ? 'Hide' : 'Show'} Data Export
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Data Export Panel -->
        {#if showJsonOutput}
          <div class="bg-white rounded-lg shadow-sm border p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Export Project Data</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <button
                on:click={downloadProjects}
                class="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Download class="w-4 h-4 mr-2" />
                {exportSuccess ? 'Downloaded!' : 'Download projects.js'}
              </button>

              <button
                on:click={copyProjectsCode}
                class="flex items-center justify-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                <Copy class="w-4 h-4 mr-2" />
                {copySuccess ? 'Copied!' : 'Copy to Clipboard'}
              </button>

              <label class="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors cursor-pointer">
                <Upload class="w-4 h-4 mr-2" />
                Import JSON
                <input
                  type="file"
                  accept=".json"
                  on:change={handleFileImport}
                  class="hidden"
                />
              </label>

              <button
                on:click={resetToOriginal}
                class="flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                disabled={!hasUnsavedChanges}
              >
                Reset Changes
              </button>
            </div>

            <div class="text-sm text-gray-600 space-y-2">
              <p><strong>Download:</strong> Get the complete projects.js file with all current data</p>
              <p><strong>Copy:</strong> Copy the data structure to clipboard for manual editing</p>
              <p><strong>Import:</strong> Upload a JSON file to replace current projects</p>
              <p><strong>Reset:</strong> Discard all changes and restore original data</p>
            </div>
          </div>
        {/if}

        <!-- Project List -->
        <ProjectList
          projects={filteredProjects}
          on:edit={(event) => editProject(event.detail)}
          on:delete={(event) => deleteProject(event.detail)}
          on:duplicate={(event) => duplicateProject(event.detail)}
        />
      </div>
    {/if}
  </div>
</div>