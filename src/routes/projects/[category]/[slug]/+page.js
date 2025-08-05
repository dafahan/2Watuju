// src/routes/projects/[category]/[slug]/+page.js
import { getProjectBySlug, getProjectsByCategoryId, getAllProjects } from '$lib/data/projects.js';
import { getCategoryById } from '$lib/data/category-projects.js';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  const project = getProjectBySlug(params.slug);
  
  if (!project) {
    throw error(404, {
      message: 'Project not found',
      hint: 'Check the project URL or return to the projects page'
    });
  }
  
  // Verify that the project belongs to the specified category
  if (project.categoryId !== params.category) {
    throw error(404, {
      message: 'Project not found in this category',
      hint: 'The project may exist in a different category'
    });
  }
  
  // Get category information using project's categoryId
  const category = getCategoryById(project.categoryId);
  
  if (!category) {
    throw error(404, {
      message: 'Category not found for this project',
      hint: 'There may be an issue with the project data'
    });
  }
  
  // Get related projects (same category, excluding current project)
  const categoryProjects = getProjectsByCategoryId(project.categoryId);
  const relatedProjects = categoryProjects
    .filter(p => p.id !== project.id)
    .slice(0, 3); // Limit to 3 related projects
  
  return {
    project,
    category,
    relatedProjects
  };
}

// Generate static paths for prerendering
/** @type {import('./$types').EntryGenerator} */
export function entries() {
  const projects = getAllProjects();
  
  return projects.map(project => ({
    category: project.categoryId,  // Use categoryId
    slug: project.slug
  }));
}