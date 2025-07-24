// src/lib/data/projects.js

export const featuredProjects = [
  {
    id: 1,
    title: 'MODERN\nMINIMALIST',
    slug: 'modern-minimalist',
    category: 'Japandi Style',
    location: 'Bandar Lampung',
    year: 2024,
    description: 'Rumah bergaya minimalis modern dengan konsep open space yang mengutamakan pencahayaan alami dan ventilasi udara optimal untuk keluarga muda. Desain ini menggabungkan fungsionalitas dengan estetika kontemporer, menciptakan ruang hidup yang nyaman dan efisien.',
    images: {
      thumbnail: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
      mobile: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop',
      tablet: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=450&fit=crop',
      desktop: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop'
    },
    panoramic: {
      exterior: 'assets/panorama/1.png',
      livingRoom: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/360_Pano_of_NOIRLab_Headquarters_Entrance_%28360Pano_Entrance-CC2%29.jpg/4096px-360_Pano_of_NOIRLab_Headquarters_Entrance_%28360Pano_Entrance-CC2%29.jpg',
      kitchen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/360_Panorama_of_NOIRLab_Machine_Shop_%28360Pano_Machine_room_3-CC%29.jpg/4096px-360_Panorama_of_NOIRLab_Machine_Shop_%28360Pano_Machine_room_3-CC%29.jpg',
      bedroom: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/360_Panorama_of_AURA_Recinto_in_Chile_%282022_04_11_Pano360_Recinto_Reception-CC%29.jpg/4096px-360_Panorama_of_AURA_Recinto_in_Chile_%282022_04_11_Pano360_Recinto_Reception-CC%29.jpg',
      bathroom: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/360-degree_Panorama_of_Machine_Shop_at_NOIRLab_%28360Pano_Machine_room_2-CC%29.jpg/4096px-360-degree_Panorama_of_Machine_Shop_at_NOIRLab_%28360Pano_Machine_room_2-CC%29.jpg'
    },
    hotspots: [
      { x: 45, y: 50, scene: 'livingRoom', label: 'Enter Living Room', icon: 'door' },
      { x: 75, y: 45, scene: 'kitchen', label: 'View Kitchen', icon: 'utensils' },
      { x: 25, y: 40, scene: 'bedroom', label: 'Master Bedroom', icon: 'bed' }
    ],
    features: ['3 Kamar Tidur', '2 Kamar Mandi', 'Taman Dalam', 'Carport', 'Smart Home', 'Open Kitchen'],
    status: 'completed',
    client: 'Keluarga Raharjo',
    stats: {
      'luas tanah': '150m²',
      'luas bangunan': '120m²',
      'lantai': '2',
      'durasi': '8 bulan'
    },
    projectDetails: {
      'TIPE PROYEK': 'Japandi (Japanese Scandinavian) Style',
      'ARCHITECT': 'Kurnia Firmanda Ageng, S.Ars',
      'LOKASI': 'Sukarame, Bandar Lampung',
      'INTERIOR DESIGNER': 'Kurnia Firmanda Ageng, S.Ars'
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
      exterior: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/%27Imiloa_grounds_%286V7A0973-Panorama-CC%29.jpg/4096px-%27Imiloa_grounds_%286V7A0973-Panorama-CC%29.jpg',
      livingRoom: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/%27Imiloa_grounds_360_Degree_View_%2820220329_Hilo_Planetarium_HQ-CC2%29.jpg/4096px-%27Imiloa_grounds_360_Degree_View_%2820220329_Hilo_Planetarium_HQ-CC2%29.jpg',
      poolArea: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/360-Degree_Panorama_of_the_Calypso_Telescope_%282022_03_24_360Pano_Calypso_1-CC%29.jpg/4096px-360-Degree_Panorama_of_the_Calypso_Telescope_%282022_03_24_360Pano_Calypso_1-CC%29.jpg',
      diningRoom: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/%22Mushroom_Farm%22_-_North_East_side_of_Cerro_Tololo_%28noirlab-ctio-small-telescopes-dmunizaga%29.jpg/4096px-%22Mushroom_Farm%22_-_North_East_side_of_Cerro_Tololo_%28noirlab-ctio-small-telescopes-dmunizaga%29.jpg',
      masterBedroom: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/360-degree_Panorama_View_of_November_2022_Total_Lunar_Eclipse_%28iotw2245g%29.jpg/4096px-360-degree_Panorama_View_of_November_2022_Total_Lunar_Eclipse_%28iotw2245g%29.jpg'
    },
    hotspots: [
      { x: 50, y: 55, scene: 'livingRoom', label: 'Main Entrance', icon: 'door' },
      { x: 70, y: 65, scene: 'poolArea', label: 'Pool Area', icon: 'waves' },
      { x: 30, y: 45, scene: 'diningRoom', label: 'Dining Room', icon: 'utensils' },
      { x: 15, y: 35, scene: 'masterBedroom', label: 'Master Suite', icon: 'bed' }
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
      exterior: 'assets/panorama/1.png',
      livingRoom: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/360_Pano_of_NOIRLab_Headquarters_Entrance_%28360Pano_Entrance-CC2%29.jpg/4096px-360_Pano_of_NOIRLab_Headquarters_Entrance_%28360Pano_Entrance-CC2%29.jpg',
      kitchen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/360_Panorama_of_NOIRLab_Machine_Shop_%28360Pano_Machine_room_3-CC%29.jpg/4096px-360_Panorama_of_NOIRLab_Machine_Shop_%28360Pano_Machine_room_3-CC%29.jpg',
      studyRoom: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/360_Panorama_of_AURA_Recinto_in_Chile_%282022_04_11_Pano360_Recinto_Reception-CC%29.jpg/4096px-360_Panorama_of_AURA_Recinto_in_Chile_%282022_04_11_Pano360_Recinto_Reception-CC%29.jpg',
      bedroom: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/360-degree_Panorama_of_Machine_Shop_at_NOIRLab_%28360Pano_Machine_room_2-CC%29.jpg/4096px-360-degree_Panorama_of_Machine_Shop_at_NOIRLab_%28360Pano_Machine_room_2-CC%29.jpg'
    },
    hotspots: [
      { x: 50, y: 50, scene: 'livingRoom', label: 'Living Area', icon: 'door' },
      { x: 75, y: 40, scene: 'kitchen', label: 'Nordic Kitchen', icon: 'utensils' },
      { x: 25, y: 45, scene: 'studyRoom', label: 'Study Nook', icon: 'book' },
      { x: 85, y: 30, scene: 'bedroom', label: 'Cozy Bedroom', icon: 'bed' }
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
      exterior: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/%27Imiloa_grounds_%286V7A0973-Panorama-CC%29.jpg/4096px-%27Imiloa_grounds_%286V7A0973-Panorama-CC%29.jpg',
      mainArea: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/%27Imiloa_grounds_360_Degree_View_%2820220329_Hilo_Planetarium_HQ-CC2%29.jpg/4096px-%27Imiloa_grounds_360_Degree_View_%2820220329_Hilo_Planetarium_HQ-CC2%29.jpg',
      mezzanine: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/360-Degree_Panorama_of_the_Calypso_Telescope_%282022_03_24_360Pano_Calypso_1-CC%29.jpg/4096px-360-Degree_Panorama_of_the_Calypso_Telescope_%282022_03_24_360Pano_Calypso_1-CC%29.jpg',
      kitchen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/%22Mushroom_Farm%22_-_North_East_side_of_Cerro_Tololo_%28noirlab-ctio-small-telescopes-dmunizaga%29.jpg/4096px-%22Mushroom_Farm%22_-_North_East_side_of_Cerro_Tololo_%28noirlab-ctio-small-telescopes-dmunizaga%29.jpg',
      bathroom: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/360-degree_Panorama_View_of_November_2022_Total_Lunar_Eclipse_%28iotw2245g%29.jpg/4096px-360-degree_Panorama_View_of_November_2022_Total_Lunar_Eclipse_%28iotw2245g%29.jpg'
    },
    hotspots: [
      { x: 50, y: 60, scene: 'mainArea', label: 'Main Loft Space', icon: 'door' },
      { x: 30, y: 25, scene: 'mezzanine', label: 'Mezzanine Level', icon: 'stairs' },
      { x: 70, y: 45, scene: 'kitchen', label: 'Industrial Kitchen', icon: 'utensils' },
      { x: 85, y: 55, scene: 'bathroom', label: 'Modern Bath', icon: 'droplets' }
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
      grandHall: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/360_Pano_of_NOIRLab_Headquarters_Entrance_%28360Pano_Entrance-CC2%29.jpg/4096px-360_Pano_of_NOIRLab_Headquarters_Entrance_%28360Pano_Entrance-CC2%29.jpg',
      ballroom: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/360_Panorama_of_NOIRLab_Machine_Shop_%28360Pano_Machine_room_3-CC%29.jpg/4096px-360_Panorama_of_NOIRLab_Machine_Shop_%28360Pano_Machine_room_3-CC%29.jpg',
      library: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/360_Panorama_of_AURA_Recinto_in_Chile_%282022_04_11_Pano360_Recinto_Reception-CC%29.jpg/4096px-360_Panorama_of_AURA_Recinto_in_Chile_%282022_04_11_Pano360_Recinto_Reception-CC%29.jpg',
      masterSuite: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/360-degree_Panorama_of_Machine_Shop_at_NOIRLab_%28360Pano_Machine_room_2-CC%29.jpg/4096px-360-degree_Panorama_of_Machine_Shop_at_NOIRLab_%28360Pano_Machine_room_2-CC%29.jpg',
      garden: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/%27Imiloa_grounds_%286V7A0973-Panorama-CC%29.jpg/4096px-%27Imiloa_grounds_%286V7A0973-Panorama-CC%29.jpg'
    },
    hotspots: [
      { x: 50, y: 55, scene: 'grandHall', label: 'Grand Entrance', icon: 'door' },
      { x: 25, y: 40, scene: 'ballroom', label: 'Ballroom', icon: 'music' },
      { x: 75, y: 35, scene: 'library', label: 'Private Library', icon: 'book' },
      { x: 85, y: 25, scene: 'masterSuite', label: 'Master Suite', icon: 'bed' },
      { x: 15, y: 70, scene: 'garden', label: 'Garden View', icon: 'flower' }
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
      exterior: '/assets/panorama/1.png',
      livingRoom: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/360_Pano_of_NOIRLab_Headquarters_Entrance_%28360Pano_Entrance-CC2%29.jpg/4096px-360_Pano_of_NOIRLab_Headquarters_Entrance_%28360Pano_Entrance-CC2%29.jpg',
      solarDeck: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/360-Degree_Panorama_of_the_Calypso_Telescope_%282022_03_24_360Pano_Calypso_1-CC%29.jpg/4096px-360-Degree_Panorama_of_the_Calypso_Telescope_%282022_03_24_360Pano_Calypso_1-CC%29.jpg',
      verticalGarden: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/%27Imiloa_grounds_%286V7A0973-Panorama-CC%29.jpg/4096px-%27Imiloa_grounds_%286V7A0973-Panorama-CC%29.jpg'
    },
    hotspots: [
      { x: 50, y: 50, scene: 'livingRoom', label: 'Eco Living Space', icon: 'door' },
      { x: 75, y: 30, scene: 'solarDeck', label: 'Solar Deck', icon: 'sun' },
      { x: 25, y: 60, scene: 'verticalGarden', label: 'Green Wall', icon: 'flower' }
    ],
    features: ['3 Kamar Tidur', '2 Kamar Mandi', 'Solar Panel', 'Vertical Garden'],
    status: 'in-progress',
    client: 'Keluarga Gunawan',
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
      exterior: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/%22Mushroom_Farm%22_-_North_East_side_of_Cerro_Tololo_%28noirlab-ctio-small-telescopes-dmunizaga%29.jpg/4096px-%22Mushroom_Farm%22_-_North_East_side_of_Cerro_Tololo_%28noirlab-ctio-small-telescopes-dmunizaga%29.jpg',
      courtyard: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/%27Imiloa_grounds_360_Degree_View_%2820220329_Hilo_Planetarium_HQ-CC2%29.jpg/4096px-%27Imiloa_grounds_360_Degree_View_%2820220329_Hilo_Planetarium_HQ-CC2%29.jpg',
      livingRoom: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/360_Panorama_of_AURA_Recinto_in_Chile_%282022_04_11_Pano360_Recinto_Reception-CC%29.jpg/4096px-360_Panorama_of_AURA_Recinto_in_Chile_%282022_04_11_Pano360_Recinto_Reception-CC%29.jpg',
      wineCellar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/360_Panorama_of_NOIRLab_Machine_Shop_%28360Pano_Machine_room_3-CC%29.jpg/4096px-360_Panorama_of_NOIRLab_Machine_Shop_%28360Pano_Machine_room_3-CC%29.jpg'
    },
    hotspots: [
      { x: 50, y: 50, scene: 'courtyard', label: 'Central Courtyard', icon: 'door' },
      { x: 25, y: 45, scene: 'livingRoom', label: 'Mediterranean Lounge', icon: 'home' },
      { x: 75, y: 65, scene: 'wineCellar', label: 'Wine Cellar', icon: 'wine' }
    ],
    features: ['4 Kamar Tidur', '3 Kamar Mandi', 'Courtyard', 'Wine Cellar'],
    status: 'planning',
    client: 'Keluarga Wijaya',
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
      exterior: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/360-degree_Panorama_View_of_November_2022_Total_Lunar_Eclipse_%28iotw2245g%29.jpg/4096px-360-degree_Panorama_View_of_November_2022_Total_Lunar_Eclipse_%28iotw2245g%29.jpg',
      genkan: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/360_Pano_of_NOIRLab_Headquarters_Entrance_%28360Pano_Entrance-CC2%29.jpg/4096px-360_Pano_of_NOIRLab_Headquarters_Entrance_%28360Pano_Entrance-CC2%29.jpg',
      teaRoom: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/360-degree_Panorama_of_Machine_Shop_at_NOIRLab_%28360Pano_Machine_room_2-CC%29.jpg/4096px-360-degree_Panorama_of_Machine_Shop_at_NOIRLab_%28360Pano_Machine_room_2-CC%29.jpg',
      zenGarden: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/%27Imiloa_grounds_%286V7A0973-Panorama-CC%29.jpg/4096px-%27Imiloa_grounds_%286V7A0973-Panorama-CC%29.jpg',
      tatamiRoom: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/360-Degree_Panorama_of_the_Calypso_Telescope_%282022_03_24_360Pano_Calypso_1-CC%29.jpg/4096px-360-Degree_Panorama_of_the_Calypso_Telescope_%282022_03_24_360Pano_Calypso_1-CC%29.jpg'
    },
    hotspots: [
      { x: 50, y: 60, scene: 'genkan', label: 'Entrance (Genkan)', icon: 'door' },
      { x: 25, y: 40, scene: 'teaRoom', label: 'Tea Ceremony Room', icon: 'coffee' },
      { x: 75, y: 35, scene: 'zenGarden', label: 'Zen Garden', icon: 'flower' },
      { x: 85, y: 50, scene: 'tatamiRoom', label: 'Tatami Room', icon: 'bed' }
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

// Helper functions
export const getFeaturedProjects = () => featuredProjects;
export const getAllProjects = () => allProjects;
export const getProjectBySlug = (slug) => allProjects.find(project => project.slug === slug);
export const getProjectsByCategory = (category) => {
  if (category === 'All') return allProjects;
  return allProjects.filter(project => project.category === category);
};
export const getProjectsByStatus = (status) => allProjects.filter(project => project.status === status);