// src/routes/projects/[category]/+page.js
import { getProjectsByCategoryId, getAllProjects } from '$lib/data/projects.js';
import { getCategoryById, getAllCategories } from '$lib/data/category-projects.js';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  // Use getCategoryById since the URL param should match the category ID, not slug
  const category = getCategoryById(params.category);
  
  if (!category) {
    throw error(404, {
      message: 'Category not found',
      hint: 'Check the category URL or return to the projects page'
    });
  }
  
  // Get projects in this category using the category ID
  const categoryProjects = getProjectsByCategoryId(category.id);
  
  return {
    category,
    projects: categoryProjects
  };
}

// Generate static paths for prerendering using category IDs (not slugs)
/** @type {import('./$types').EntryGenerator} */
export function entries() {
  const categories = getAllCategories();
  return categories.map(category => ({
    category: category.id  // Use ID, not slug
  }));
}