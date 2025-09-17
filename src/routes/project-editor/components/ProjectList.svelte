<!-- src/routes/project-editor/components/ProjectList.svelte -->
<script >
  import { createEventDispatcher } from 'svelte';
  import { Edit3, Trash2, Copy, Eye, Calendar, MapPin, Tag } from 'lucide-svelte';
  
  export let projects = [];
  
  const dispatch = createEventDispatcher();

  const editProject = (project) => {
    dispatch('edit', project);
  };

  const deleteProject = (projectId) => {
    dispatch('delete', projectId);
  };

  const duplicateProject = (project) => {
    dispatch('duplicate', project);
  };

  const getFormattedTitle = (title) => {
    return title.replace(/\n/g, ' ').trim();
  };

  const getCategoryDisplayName = (categoryId) => {
    const categoryMap = {
      'japandi': 'Japandi Style',
      'kontemporer': 'Contemporary Style',
      'luxury': 'Luxury Style',
      'modern': 'Modern Style',
      'classic': 'Classic Style'
    };
    return categoryMap[categoryId] || categoryId.charAt(0).toUpperCase() + categoryId.slice(1);
  };

  const getTotalHotspots = (project) => {
    if (project.hotspots) {
      return project.hotspots.length;
    }
    return 0;
  };

  const getTotalSections = (project) => {
    if (project.contentSections) {
      return project.contentSections.length;
    }
    return 0;
  };
</script>

<div class="bg-white rounded-lg shadow-sm border">
  {#if projects.length === 0}
    <div class="p-12 text-center">
      <div class="text-gray-400 mb-4">
        <Eye class="w-16 h-16 mx-auto" />
      </div>
      <h3 class="text-lg font-medium text-gray-900 mb-2">No Projects Found</h3>
      <p class="text-gray-500">No projects match your current filters. Try adjusting your search criteria.</p>
    </div>
  {:else}
    <div class="overflow-hidden">
      <!-- Header -->
      <div class="bg-gray-50 border-b px-6 py-3">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-gray-900">Projects ({projects.length})</h2>
          <div class="text-sm text-gray-500">
            Click any project to edit • Right-click for more options
          </div>
        </div>
      </div>

      <!-- Project Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {#each projects as project (project.id)}
          <div class="group relative bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200">
            <!-- Project Image -->
            <div class="relative h-48 overflow-hidden rounded-t-lg bg-gray-200">
              {#if project.images?.thumbnail}
                <img 
                  src={project.images.thumbnail} 
                  alt={getFormattedTitle(project.title)}
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  on:error={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop';
                  }}
                />
              {:else}
                <div class="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                  <Eye class="w-12 h-12 text-gray-500" />
                </div>
              {/if}
              
              <!-- Quick Actions Overlay -->
              <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div class="flex space-x-2">
                  <button
                    on:click|stopPropagation={() => editProject(project)}
                    class="p-2 bg-white rounded-full hover:bg-blue-50 transition-colors"
                    title="Edit Project"
                  >
                    <Edit3 class="w-4 h-4 text-blue-600" />
                  </button>
                  <button
                    on:click|stopPropagation={() => duplicateProject(project)}
                    class="p-2 bg-white rounded-full hover:bg-green-50 transition-colors"
                    title="Duplicate Project"
                  >
                    <Copy class="w-4 h-4 text-green-600" />
                  </button>
                  <button
                    on:click|stopPropagation={() => deleteProject(project.id)}
                    class="p-2 bg-white rounded-full hover:bg-red-50 transition-colors"
                    title="Delete Project"
                  >
                    <Trash2 class="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
            </div>

            <!-- Project Info -->
            <div class="p-4">
              <!-- Title and Category -->
              <div class="mb-3">
                <h3 class="font-semibold text-gray-900 mb-1 line-clamp-1">
                  {getFormattedTitle(project.title)}
                </h3>
                <div class="flex items-center text-sm text-gray-500">
                  <Tag class="w-3 h-3 mr-1" />
                  {getCategoryDisplayName(project.categoryId)}
                </div>
              </div>

              <!-- Description -->
              <p class="text-sm text-gray-600 mb-3 line-clamp-2">
                {project.description}
              </p>

              <!-- Metadata -->
              <div class="space-y-2 mb-4">
                <div class="flex items-center text-xs text-gray-500">
                  <Calendar class="w-3 h-3 mr-2" />
                  {project.year} {project.month || ''}
                </div>
                
                {#if project.projectDetails?.LOKASI || project.projectDetails?.['LOKASI']?.value}
                  <div class="flex items-center text-xs text-gray-500">
                    <MapPin class="w-3 h-3 mr-2" />
                    {project.projectDetails.LOKASI?.value || project.projectDetails.LOKASI || 'Location not specified'}
                  </div>
                {/if}
              </div>

              <!-- Stats -->
              <div class="grid grid-cols-2 gap-2 mb-4">
                {#if project.stats?.room}
                  <div class="text-xs">
                    <span class="text-gray-500">Rooms:</span>
                    <span class="font-medium ml-1">{project.stats.room}</span>
                  </div>
                {/if}
                {#if project.stats?.floor}
                  <div class="text-xs">
                    <span class="text-gray-500">Floor:</span>
                    <span class="font-medium ml-1">{project.stats.floor}</span>
                  </div>
                {/if}
                <div class="text-xs">
                  <span class="text-gray-500">Sections:</span>
                  <span class="font-medium ml-1">{getTotalSections(project)}</span>
                </div>
                <div class="text-xs">
                  <span class="text-gray-500">Hotspots:</span>
                  <span class="font-medium ml-1">{getTotalHotspots(project)}</span>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex space-x-2">
                <button
                  on:click={() => editProject(project)}
                  class="flex-1 flex items-center justify-center px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Edit3 class="w-3 h-3 mr-2" />
                  Edit
                </button>
                
                <button
                  on:click={() => duplicateProject(project)}
                  class="px-3 py-2 bg-gray-200 text-gray-700 text-sm rounded-md hover:bg-gray-300 transition-colors"
                  title="Duplicate"
                >
                  <Copy class="w-3 h-3" />
                </button>
                
                <button
                  on:click={() => deleteProject(project.id)}
                  class="px-3 py-2 bg-red-100 text-red-600 text-sm rounded-md hover:bg-red-200 transition-colors"
                  title="Delete"
                >
                  <Trash2 class="w-3 h-3" />
                </button>
              </div>
            </div>

            <!-- Project ID Badge -->
            <div class="absolute top-2 right-2 px-2 py-1 bg-black bg-opacity-60 text-white text-xs rounded">
              ID: {project.id}
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/if}
</div>

<style>
  .line-clamp-1 {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>