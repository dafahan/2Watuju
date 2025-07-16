// src/lib/data/projects.js

export const featuredProjects = [
  {
    id: 1,
    title: 'MODERN\nMINIMALIST',
    slug: 'modern-minimalist',
    category: 'Residential',
    location: 'Bandar Lampung',
    year: 2024,
    description: 'Rumah bergaya minimalis modern dengan konsep open space yang mengutamakan pencahayaan alami dan ventilasi udara optimal untuk keluarga muda.',
    images: {
      thumbnail: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
      mobile: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop',
      tablet: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=450&fit=crop',
      desktop: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop'
    },
    features: ['3 Kamar Tidur', '2 Kamar Mandi', 'Taman Dalam', 'Carport'],
    status: 'completed',
    client: 'Keluarga Raharjo'
  },
  {
    id: 2,
    title: 'TROPICAL\nCONTEMPORARY',
    slug: 'tropical-contemporary',
    category: 'Residential',
    location: 'Metro, Lampung',
    year: 2024,
    description: 'Desain rumah kontemporer tropis yang memadukan elemen tradisional dengan teknologi modern, menciptakan harmoni antara alam dan arsitektur.',
    images: {
      thumbnail: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop',
      mobile: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop',
      tablet: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=450&fit=crop',
      desktop: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop'
    },
    features: ['4 Kamar Tidur', '3 Kamar Mandi', 'Kolam Renang', 'Gazebo'],
    status: 'completed',
    client: 'Keluarga Sutanto'
  },
  {
    id: 3,
    title: 'SCANDINAVIAN\nSTYLE',
    slug: 'scandinavian-style',
    category: 'Residential',
    location: 'Lampung Selatan',
    year: 2023,
    description: 'Rumah bergaya Skandinavia dengan palet warna natural, furniture kayu, dan desain fungsional yang menghadirkan kehangatan dan kenyamanan.',
    images: {
      thumbnail: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      mobile: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop',
      tablet: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=450&fit=crop',
      desktop: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop'
    },
    features: ['2 Kamar Tidur', '2 Kamar Mandi', 'Study Room', 'Balkon'],
    status: 'completed',
    client: 'Keluarga Andersen'
  },
  {
    id: 4,
    title: 'INDUSTRIAL\nLOFT',
    slug: 'industrial-loft',
    category: 'Residential',
    location: 'Bandar Lampung',
    year: 2023,
    description: 'Konsep loft industrial dengan exposed brick, high ceiling, dan material mentah yang dikombinasikan dengan furniture modern untuk tampilan yang bold.',
    images: {
      thumbnail: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&h=600&fit=crop',
      mobile: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=400&h=300&fit=crop',
      tablet: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=600&h=450&fit=crop',
      desktop: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&h=600&fit=crop'
    },
    features: ['Open Space', '1 Kamar Tidur', '1 Kamar Mandi', 'Mezzanine'],
    status: 'completed',
    client: 'Studio Creative'
  },
  {
    id: 5,
    title: 'CLASSIC\nELEGANT',
    slug: 'classic-elegant',
    category: 'Residential',
    location: 'Pringsewu, Lampung',
    year: 2024,
    description: 'Rumah klasik elegan dengan detail ornamen tradisional, kolom-kolom megah, dan taman yang tertata rapi menciptakan suasana mewah dan timeless.',
    images: {
      thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      mobile: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop',
      tablet: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=450&fit=crop',
      desktop: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop'
    },
    features: ['5 Kamar Tidur', '4 Kamar Mandi', 'Ballroom', 'Taman Luas'],
    status: 'completed',
    client: 'Keluarga Prasetyo'
  }
];

export const allProjects = [
  ...featuredProjects,
  {
    id: 6,
    title: 'ECO HOUSE\nCONCEPT',
    slug: 'eco-house-concept',
    category: 'Residential',
    location: 'Lampung Timur',
    year: 2023,
    description: 'Rumah ramah lingkungan dengan panel surya, rainwater harvesting, dan material berkelanjutan untuk gaya hidup yang eco-friendly.',
    images: {
      thumbnail: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
      mobile: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop',
      tablet: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=450&fit=crop',
      desktop: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop'
    },
    features: ['3 Kamar Tidur', '2 Kamar Mandi', 'Solar Panel', 'Vertical Garden'],
    status: 'in-progress',
    client: 'Keluarga Gunawan'
  },
  {
    id: 7,
    title: 'MEDITERRANEAN\nVILLA',
    slug: 'mediterranean-villa',
    category: 'Residential',
    location: 'Bandar Lampung',
    year: 2024,
    description: 'Villa bergaya Mediterania dengan stucco walls, clay roof tiles, dan courtyard yang menciptakan atmosfer hangat seperti di pantai selatan Eropa.',
    images: {
      thumbnail: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop',
      mobile: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400&h=300&fit=crop',
      tablet: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&h=450&fit=crop',
      desktop: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop'
    },
    features: ['4 Kamar Tidur', '3 Kamar Mandi', 'Courtyard', 'Wine Cellar'],
    status: 'planning',
    client: 'Keluarga Wijaya'
  },
  {
    id: 8,
    title: 'JAPANESE\nZEN HOUSE',
    slug: 'japanese-zen-house',
    category: 'Residential',
    location: 'Metro, Lampung',
    year: 2024,
    description: 'Rumah bergaya Jepang dengan konsep zen, material kayu natural, tatami, dan taman kering yang menciptakan ketenangan dan kedamaian.',
    images: {
      thumbnail: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb3?w=800&h=600&fit=crop',
      mobile: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb3?w=400&h=300&fit=crop',
      tablet: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb3?w=600&h=450&fit=crop',
      desktop: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb3?w=800&h=600&fit=crop'
    },
    features: ['3 Kamar Tidur', '2 Kamar Mandi', 'Tea Room', 'Zen Garden'],
    status: 'completed',
    client: 'Keluarga Tanaka'
  }
];

export const projectCategories = [
  'All',
  'Residential',
  'Commercial',
  'Interior',
  'Landscape'
];

export const projectStatuses = {
  planning: 'Perencanaan',
  'in-progress': 'Dalam Proses',
  completed: 'Selesai'
};

// Helper functions
export const getFeaturedProjects = () => featuredProjects;
export const getAllProjects = () => allProjects;
export const getProjectBySlug = (slug) => allProjects.find(project => project.slug === slug);
export const getProjectsByCategory = (category) => {
  if (category === 'All') return allProjects;
  return allProjects.filter(project => project.category === category);
};
export const getProjectsByStatus = (status) => allProjects.filter(project => project.status === status);