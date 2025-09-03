// src/lib/data/category-projects.js

export const projectCategories = [
  {
    id: 'japandi',
    name: 'JAPANDI STYLE',
    description: 'Tenang seperti pagi di pegunungan, hangat seperti dalam pelukan. Japandi adalah pertemuan dua dunia: kesederhanaan Jepang dan kenyamanan Skandinavia. Gaya ini menenangkan pikiran, menghangatkan suasana — cocok bagi kamu, jiwa-jiwa yang mencintai kehangatan dalam kesunyian, harmoni, dan cerita di balik hal-hal tak sempurna namun bermakna.',
    images: {
      thumbnail: '/assets/category/japandi-thumbnail.webp',
      mobile: '/assets/category/japandi-mobile.webp',
      tablet: '/assets/category/japandi-tablet.webp',
      desktop: '/assets/category/japandi-desktop.webp'
    }
  },
  {
    id: 'kontemporer',
    name: 'KONTEMPORER STYLE',
    description: 'Perumpamaan kalau millenials jadi rumah, gaya kontemporer adalah cerminan hidup modern yang dinamis. Bersih, terbuka, dan penuh cahaya, ia membawa napas segar ke dalam rumah, memberi ruang untuk bergerak dan tumbuh. Sebuah hunian Ideal untuk kamu yang menghargai kebaruan namun tetap ingin keintiman dalam keseharian.',
    images: {
      thumbnail: '/assets/category/kontemporer-thumbnail.webp',
      mobile: '/assets/category/kontemporer-mobile.webp',
      tablet: '/assets/category/kontemporer-tablet.webp',
      desktop: '/assets/category/kontemporer-desktop.webp'
    }
  },
  {
    id: 'luxury',
    name: 'LUXURY STYLE',
    description: 'Kemewahan yang jadi cermin kesuksesan, kemilau yang tak kehilangan kehangatan. Gaya ini menghadirkan harmoni antara material terbaik, pencahayaan dramatis, dan tata ruang yang memanjakan. Diciptakan untuk kamu yang menjadikan rumah sebagai simbol pencapaian — sekaligus tempat ternyaman untuk pulang.',
    images: {
      thumbnail: '/assets/category/luxury-thumbnail.webp',
      mobile: '/assets/category/luxury-mobile.webp',
      tablet: '/assets/category/luxury-tablet.webp',
      desktop: '/assets/category/luxury-desktop.webp'
    }
  },
  {
    id: 'modern',
    name: 'MODERN STYLE',
    description: 'Ringkas, tegas, dan berani — ketika bentuk bertemu dengan fungsi. Tata ruang efisien, tampilan lugas namun tetap estetik. Namun di balik tampilannya yang lugas, ia menyimpan kehangatan dalam kepraktisan. Cocok untuk kamu yang percaya bahwa keindahan sejati lahir dari kesederhanaan yang dirancang dengan cermat.',
    images: {
      thumbnail: '/assets/category/modern-thumbnail.webp',
      mobile: '/assets/category/modern-mobile.webp',
      tablet: '/assets/category/modern-tablet.webp',
      desktop: '/assets/category/modern-desktop.webp'
    }
  },
  {
    id: 'classic',
    name: 'CLASSIC STYLE',
    description: 'Anggun penuh wibawa, desain satu ini tidak akan lekang oleh zaman, gaya klasik memancarkan kemegahan tanpa kehilangan kehangatan. Detail yang kaya, interior eksklusif, dan material  alami menciptakan suasana yang tenang namun berkelas — cocok untuk kamu yang mencintai keabadian dalam bentuk dan karya. Sebuah penghormatan pada masa lalu yang terus hidup dalam elegansi hari ini.',
    images: {
      thumbnail: '/assets/category/classic-thumbnail.webp',
      mobile: '/assets/category/classic-mobile.webp',
      tablet: '/assets/category/classic-tablet.webp',
      desktop: '/assets/category/classic-desktop.webp'
    }
  }

];

// Helper functions for category data
export const getAllCategories = () => projectCategories;
export const getCategoryBySlug = (slug) => projectCategories.find(category => category.slug === slug);
export const getCategoryById = (id) => projectCategories.find(category => category.id === id);
export const getFeaturedCategories = (limit = 5) => projectCategories.slice(0, limit);