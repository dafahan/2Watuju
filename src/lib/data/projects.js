// src/lib/data/projects.js

export const featuredProjects = [
{
  "id": 1753464374772,
  "title": "MODERN\nMINIMALIST\nHOUSE",
  "slug": "modern-minimalist-house",
  "category": "Japandi Style",
  "location": "Bandar Lampung",
  "year": 2025,
  "description": "Interactive 360° panoramic experience with multi-scene navigation",
  "images": {
    "thumbnail": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
    "mobile": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
    "tablet": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
    "desktop": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop"
  },
  "panoramic": {
    outside: 'assets/panorama/2.png',
      courtyard: 'assets/panorama/5.png',
      bedroom: 'assets/panorama/3.png',
      terrace: 'assets/panorama/4.png'
  },
  "hotspots": [
    {
      "x": 79.02,
      "y": 51.94,
      "scene": "outside",
      "label": "Enter House",
      "type": "nav",
      "targetScene": "courtyard",
      "icon": "door"
    },
    {
      "x": 53.86,
      "y": 49.99,
      "scene": "courtyard",
      "label": "Leave House",
      "type": "nav",
      "targetScene": "outside",
      "icon": "door"
    },
    {
      "x": 72.43,
      "y": 46.25,
      "scene": "courtyard",
      "label": "Terrace",
      "type": "nav",
      "targetScene": "terrace",
      "icon": "door"
    },
    {
      "x": 80.46,
      "y": 48.1,
      "scene": "courtyard",
      "label": "Bedroom",
      "type": "nav",
      "targetScene": "bedroom",
      "icon": "door"
    },
    {
      "x": 62.42,
      "y": 50,
      "scene": "bedroom",
      "label": "Terrace",
      "type": "nav",
      "targetScene": "terrace",
      "icon": "door"
    },
    {
      "x": 12.92,
      "y": 48.23,
      "scene": "bedroom",
      "label": "Courtyard",
      "type": "nav",
      "targetScene": "courtyard",
      "icon": "door"
    },
    {
      "x": 73.8,
      "y": 51.95,
      "scene": "terrace",
      "label": "Bedroom",
      "type": "nav",
      "targetScene": "bedroom",
      "icon": "door"
    },
    {
      "x": 3.31,
      "y": 47.37,
      "scene": "terrace",
      "label": "Courtyard",
      "type": "nav",
      "targetScene": "courtyard",
      "icon": "door"
    }
  ],
  "features": [
    "3 Kamar Tidur",
    "2 Kamar Mandi",
    "Taman Dalam",
    "Carport",
    "Smart Home",
    "Open Kitchen"
  ],
  "status": "completed",
  "client": "Keluarga Raharjo",
  "stats": {
    "land": "150m²",
    "floor": "120m²",
    "lantai": "2",
    "garage":"yes",
    "pool":"yes",
    "bathroom":"6",
    "room":"5",
    "durasi": "8 bulan",
    "total scenes": "4",
    "total hotspots": "8",
    "navigation points": "8",
    "info points": "0"
  },
  "projectDetails": {
    "TIPE PROYEK": "Japandi (Japanese Scandinavian) Style",
    "ARCHITECT": "Kurnia Firmanda Ageng, S.Ars",
    "LOKASI": "Sukarame, Bandar Lampung",
    "INTERIOR DESIGNER": "Kurnia Firmanda Ageng, S.Ars"
  }
},
  {
    id: 2,
    title: 'TROPICAL\nCONTEMPORARY',
    slug: 'tropical-contemporary',
    category: 'Residential',
    location: 'Metro, Lampung',
    year: 2024,
    description: 'Desain rumah kontemporer tropis yang memadukan elemen tradisional dengan teknologi modern, menciptakan harmoni antara alam dan arsitektur. Penggunaan material lokal dan sistem ventilasi alami menjadi fokus utama dalam desain ini.',
    images: {
      thumbnail: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop',
      mobile: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop',
      tablet: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=450&fit=crop',
      desktop: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop'
    },
    panoramic: {
      exterior: 'assets/panorama/2.png',
      livingRoom: 'assets/panorama/1.png',
      poolArea: 'assets/panorama/3.png',
      diningRoom: 'assets/panorama/4.png'
    },
    hotspots: [
      { x: 50, y: 55, scene: 'livingRoom', label: 'Main Entrance', icon: 'door' },
      { x: 70, y: 65, scene: 'poolArea', label: 'Pool Area', icon: 'waves' },
      { x: 30, y: 45, scene: 'diningRoom', label: 'Dining Room', icon: 'utensils' }
    ],
    features: ['4 Kamar Tidur', '3 Kamar Mandi', 'Kolam Renang', 'Gazebo', 'Taman Tropis', 'Void'],
    status: 'completed',
    client: 'Keluarga Sutanto',
    stats: {
      'luas tanah': '300m²',
      'luas bangunan': '250m²',
      'lantai': '2',
      'durasi': '12 bulan'
    },
    projectDetails: {
      'TIPE PROYEK': 'Tropical Contemporary',
      'ARCHITECT': 'Kurnia Firmanda Ageng, S.Ars',
      'LOKASI': 'Metro Raya, Metro Lampung',
      'INTERIOR DESIGNER': 'Kurnia Firmanda Ageng, S.Ars'
    }
  },
  {
    id: 3,
    title: 'SCANDINAVIAN\nSTYLE',
    slug: 'scandinavian-style',
    category: 'Residential',
    location: 'Lampung Selatan',
    year: 2023,
    description: 'Rumah bergaya Skandinavia dengan palet warna natural, furniture kayu, dan desain fungsional yang menghadirkan kehangatan dan kenyamanan. Konsep hygge diterapkan dalam setiap detail interior untuk menciptakan suasana yang cozy.',
    images: {
      thumbnail: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      mobile: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop',
      tablet: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=450&fit=crop',
      desktop: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop'
    },
    panoramic: {
      exterior: 'assets/panorama/3.png',
      livingRoom: 'assets/panorama/4.png',
      kitchen: 'assets/panorama/1.png',
      studyRoom: 'assets/panorama/2.png'
    },
    hotspots: [
      { x: 50, y: 50, scene: 'livingRoom', label: 'Living Area', icon: 'door' },
      { x: 75, y: 40, scene: 'kitchen', label: 'Nordic Kitchen', icon: 'utensils' },
      { x: 25, y: 45, scene: 'studyRoom', label: 'Study Nook', icon: 'book' }
    ],
    features: ['2 Kamar Tidur', '2 Kamar Mandi', 'Study Room', 'Balkon', 'Walk-in Closet', 'Fireplace'],
    status: 'completed',
    client: 'Keluarga Andersen',
    stats: {
      'luas tanah': '200m²',
      'luas bangunan': '180m²',
      'lantai': '2',
      'durasi': '10 bulan'
    },
    projectDetails: {
      'TIPE PROYEK': 'Scandinavian Modern',
      'ARCHITECT': 'Kurnia Firmanda Ageng, S.Ars',
      'LOKASI': 'Kalianda, Lampung Selatan',
      'INTERIOR DESIGNER': 'Kurnia Firmanda Ageng, S.Ars'
    }
  },
  {
    id: 4,
    title: 'INDUSTRIAL\nLOFT',
    slug: 'industrial-loft',
    category: 'Residential',
    location: 'Bandar Lampung',
    year: 2023,
    description: 'Konsep loft industrial dengan exposed brick, high ceiling, dan material mentah yang dikombinasikan dengan furniture modern untuk tampilan yang bold. Desain ini perfect untuk profesional muda yang menyukai gaya hidup urban.',
    images: {
      thumbnail: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&h=600&fit=crop',
      mobile: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=400&h=300&fit=crop',
      tablet: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=600&h=450&fit=crop',
      desktop: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&h=600&fit=crop'
    },
    panoramic: {
      exterior: 'assets/panorama/4.png',
      mainArea: 'assets/panorama/2.png',
      mezzanine: 'assets/panorama/3.png',
      kitchen: 'assets/panorama/1.png'
    },
    hotspots: [
      { x: 50, y: 60, scene: 'mainArea', label: 'Main Loft Space', icon: 'door' },
      { x: 30, y: 25, scene: 'mezzanine', label: 'Mezzanine Level', icon: 'stairs' },
      { x: 70, y: 45, scene: 'kitchen', label: 'Industrial Kitchen', icon: 'utensils' }
    ],
    features: ['Open Space', '1 Kamar Tidur', '1 Kamar Mandi', 'Mezzanine', 'Exposed Ceiling', 'Industrial Kitchen'],
    status: 'completed',
    client: 'Studio Creative',
    stats: {
      'luas tanah': '80m²',
      'luas bangunan': '120m²',
      'lantai': '2.5',
      'durasi': '6 bulan'
    },
    projectDetails: {
      'TIPE PROYEK': 'Industrial Loft',
      'ARCHITECT': 'Kurnia Firmanda Ageng, S.Ars',
      'LOKASI': 'Tanjung Karang, Bandar Lampung',
      'INTERIOR DESIGNER': 'Kurnia Firmanda Ageng, S.Ars'
    }
  },
  {
    id: 5,
    title: 'CLASSIC\nELEGANT',
    slug: 'classic-elegant',
    category: 'Residential',
    location: 'Pringsewu, Lampung',
    year: 2024,
    description: 'Rumah klasik elegan dengan detail ornamen tradisional, kolom-kolom megah, dan taman yang tertata rapi menciptakan suasana mewah dan timeless. Desain ini menggabungkan kemewahan klasik dengan kenyamanan modern.',
    images: {
      thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      mobile: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop',
      tablet: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=450&fit=crop',
      desktop: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop'
    },
    panoramic: {
      exterior: 'assets/panorama/1.png',
      grandHall: 'assets/panorama/3.png',
      ballroom: 'assets/panorama/4.png',
      library: 'assets/panorama/2.png'
    },
    hotspots: [
      { x: 50, y: 55, scene: 'grandHall', label: 'Grand Entrance', icon: 'door' },
      { x: 25, y: 40, scene: 'ballroom', label: 'Ballroom', icon: 'music' },
      { x: 75, y: 35, scene: 'library', label: 'Private Library', icon: 'book' }
    ],
    features: ['5 Kamar Tidur', '4 Kamar Mandi', 'Ballroom', 'Taman Luas', 'Guest House', 'Home Theater'],
    status: 'completed',
    client: 'Keluarga Prasetyo',
    stats: {
      'luas tanah': '500m²',
      'luas bangunan': '400m²',
      'lantai': '2',
      'durasi': '15 bulan'
    },
    projectDetails: {
      'TIPE PROYEK': 'Classic European',
      'ARCHITECT': 'Kurnia Firmanda Ageng, S.Ars',
      'LOKASI': 'Pringsewu Timur, Pringsewu',
      'INTERIOR DESIGNER': 'Kurnia Firmanda Ageng, S.Ars'
    }
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
    panoramic: {
      exterior: 'assets/panorama/2.png',
      livingRoom: 'assets/panorama/4.png',
      solarDeck: 'assets/panorama/1.png',
      verticalGarden: 'assets/panorama/3.png'
    },
    hotspots: [
      { x: 50, y: 50, scene: 'livingRoom', label: 'Eco Living Space', icon: 'door' },
      { x: 75, y: 30, scene: 'solarDeck', label: 'Solar Deck', icon: 'sun' },
      { x: 25, y: 60, scene: 'verticalGarden', label: 'Green Wall', icon: 'flower' }
    ],
    features: ['3 Kamar Tidur', '2 Kamar Mandi', 'Solar Panel', 'Vertical Garden'],
    status: 'in-progress',
    client: 'Keluarga Gunawan',
    stats: {
      'luas tanah': '180m²',
      'luas bangunan': '140m²',
      'lantai': '2',
      'durasi': '9 bulan'
    },
    projectDetails: {
      'TIPE PROYEK': 'Sustainable Living',
      'ARCHITECT': 'Kurnia Firmanda Ageng, S.Ars',
      'LOKASI': 'Way Jepara, Lampung Timur',
      'INTERIOR DESIGNER': 'Kurnia Firmanda Ageng, S.Ars'
    }
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
    panoramic: {
      exterior: 'assets/panorama/3.png',
      courtyard: 'assets/panorama/1.png',
      livingRoom: 'assets/panorama/2.png',
      wineCellar: 'assets/panorama/4.png'
    },
    hotspots: [
      { x: 50, y: 50, scene: 'courtyard', label: 'Central Courtyard', icon: 'door' },
      { x: 25, y: 45, scene: 'livingRoom', label: 'Mediterranean Lounge', icon: 'home' },
      { x: 75, y: 65, scene: 'wineCellar', label: 'Wine Cellar', icon: 'wine' }
    ],
    features: ['4 Kamar Tidur', '3 Kamar Mandi', 'Courtyard', 'Wine Cellar'],
    status: 'planning',
    client: 'Keluarga Wijaya',
    stats: {
      'luas tanah': '350m²',
      'luas bangunan': '280m²',
      'lantai': '2',
      'durasi': '14 bulan'
    },
    projectDetails: {
      'TIPE PROYEK': 'Mediterranean Style',
      'ARCHITECT': 'Kurnia Firmanda Ageng, S.Ars',
      'LOKASI': 'Kemiling, Bandar Lampung',
      'INTERIOR DESIGNER': 'Kurnia Firmanda Ageng, S.Ars'
    }
  },
  {
    id: 8,
    title: "JAPANESE\nZEN HOUSE",
    slug: "japanese-zen-house",
    category: "Residential",
    location: "Metro, Lampung",
    year: 2024,
    description: "Rumah bergaya Jepang dengan konsep zen, material kayu natural, tatami, dan taman kering yang menciptakan ketenangan dan kedamaian. Desain ini menerapkan filosofi wabi-sabi dan prinsip minimalis Jepang untuk menciptakan ruang meditatif yang harmonis.",
    images: {
      thumbnail: "https://plus.unsplash.com/premium_photo-1723669629708-0de9b27820b5?w=800&h=600&fit=crop",
      mobile: "https://plus.unsplash.com/premium_photo-1723669629708-0de9b27820b5?w=400&h=300&fit=crop",
      tablet: "https://plus.unsplash.com/premium_photo-1723669629708-0de9b27820b5?w=600&h=450&fit=crop",
      desktop: "https://plus.unsplash.com/premium_photo-1723669629708-0de9b27820b5?w=800&h=600&fit=crop"
    },
    panoramic: {
      exterior: 'assets/panorama/4.png',
      genkan: 'assets/panorama/1.png',
      teaRoom: 'assets/panorama/3.png',
      zenGarden: 'assets/panorama/2.png'
    },
    hotspots: [
      { x: 50, y: 60, scene: 'genkan', label: 'Entrance (Genkan)', icon: 'door' },
      { x: 25, y: 40, scene: 'teaRoom', label: 'Tea Ceremony Room', icon: 'coffee' },
      { x: 75, y: 35, scene: 'zenGarden', label: 'Zen Garden', icon: 'flower' }
    ],
    features: ["3 Kamar Tidur", "2 Kamar Mandi", "Tea Room", "Zen Garden", "Tatami Room", "Meditation Space"],
    status: "completed",
    client: "Keluarga Tanaka",
    stats: {
      "luas tanah": "250m²",
      "luas bangunan": "180m²",
      "lantai": "1",
      "durasi": "11 bulan"
    },
    projectDetails: {
      'TIPE PROYEK': 'Japanese Zen',
      'ARCHITECT': 'Kurnia Firmanda Ageng, S.Ars',
      'LOKASI': 'Metro Pusat, Metro Lampung',
      'INTERIOR DESIGNER': 'Kurnia Firmanda Ageng, S.Ars'
    }
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


  // Add custom hotspot behavior for enhanced tooltips
  const addCustomHotspotBehavior = () => {
    const hotspotElements = document.querySelectorAll('#pannellum-viewer .pnlm-hotspot');
    
    hotspotElements.forEach((hotspotEl, index) => {
      const hotspotData = hotspots[index];
      if (!hotspotData) return;
      
      let tooltip = null;
      
      // Create hover behavior
      hotspotEl.addEventListener('mouseenter', () => {
        // Remove existing tooltip
        if (tooltip) {
          tooltip.remove();
        }
        
        // Create new tooltip
        tooltip = document.createElement('div');
        tooltip.className = 'custom-hotspot-tooltip';
        tooltip.innerHTML = `
          <div class="tooltip-content">
            <span class="tooltip-icon">${iconMap[hotspotData.icon] || '📍'}</span>
            <span class="tooltip-text">${hotspotData.label}</span>
          </div>
        `;
        
        // Position tooltip relative to hotspot
        hotspotEl.appendChild(tooltip);
        
        // Enhanced hover animation
        hotspotEl.style.transform = 'scale(1.2)';
        hotspotEl.style.boxShadow = '0 8px 25px rgba(86, 170, 183, 0.6)';
        hotspotEl.style.background = 'linear-gradient(135deg, #4a9aa6, #56AAB7)';
      });
      
      hotspotEl.addEventListener('mouseleave', () => {
        // Remove tooltip
        if (tooltip) {
          tooltip.remove();
          tooltip = null;
        }
        
        // Reset hover animation
        hotspotEl.style.transform = 'scale(1)';
        hotspotEl.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
        hotspotEl.style.background = 'linear-gradient(135deg, #56AAB7, #4a9aa6)';
      });
      
      // Add click animation
      hotspotEl.addEventListener('click', () => {
        hotspotEl.style.transform = 'scale(0.9)';
        setTimeout(() => {
          hotspotEl.style.transform = 'scale(1)';
        }, 150);
      });
    });
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