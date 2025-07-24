// src/routes/projects/[slug]/+page.js
import { getProjectBySlug, getAllProjects } from '$lib/data/projects.js';
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
  
  // Get related projects (same category, excluding current project)
  const allProjects = getAllProjects();
  const relatedProjects = allProjects
    .filter(p => p.category === project.category && p.id !== project.id)
    .slice(0, 3); // Limit to 3 related projects
  
  return {
    project,
    relatedProjects
  };
}

// Optional: Generate static paths for prerendering (if you want static generation)
/** @type {import('./$types').EntryGenerator} */
export function entries() {
  const projects = getAllProjects();
  return projects.map(project => ({
    slug: project.slug
  }));
}