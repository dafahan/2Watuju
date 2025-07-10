<!-- src/lib/components/Testimonials.svelte -->
<script lang="ts">
  import { Twitter } from 'lucide-svelte';

  const testimonials = [
    {
      id: 1,
      author: "Sarah Chen",
      username: "@sarahtech",
      text: "Dafahan delivered our e-commerce platform ahead of schedule with pixel-perfect design implementation. His attention to detail and communication throughout the project was exceptional.",
      timestamp: "3:42 PM · Dec 15, 2024",
      avatar: "SC"
    },
    {
      id: 2,
      author: "Marcus Rodriguez",
      username: "@marcusdev",
      text: "Working with Dafahan was a game-changer for our startup. He built a scalable web app that handles thousands of users seamlessly. Professional and highly skilled developer.",
      timestamp: "1:28 PM · Nov 22, 2024",
      avatar: "MR"
    },
    {
      id: 3,
      author: "Emily Watson",
      username: "@emilywatson",
      text: "Dafahan transformed our outdated website into a modern, fast, and user-friendly platform. The results exceeded our expectations and boosted our conversions by 40%.",
      timestamp: "4:15 PM · Oct 8, 2024",
      avatar: "EW"
    },
    {
      id: 4,
      author: "David Park",
      username: "@davidpark_co",
      text: "As a designer, I appreciated how Dafahan brought my designs to life with such precision. He understood the vision and delivered exactly what we needed.",
      timestamp: "2:33 PM · Sep 18, 2024",
      avatar: "DP"
    },
    {
      id: 5,
      author: "Lisa Thompson",
      username: "@lisathompson",
      text: "Dafahan's full-stack expertise saved us time and money. From database design to frontend polish, he handled everything with professionalism. Highly recommended!",
      timestamp: "11:45 AM · Aug 30, 2024",
      avatar: "LT"
    }
  ];
</script>

<section class="bg-gradient-to-b from-gray-50 via-white to-gray-100 min-h-screen py-20 relative">
  <!-- Elegant animated background elements -->
  <div class="absolute inset-0 overflow-hidden pointer-events-none">
    <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl animate-pulse"></div>
    <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-100/30 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto px-4 pt-48 pb-16 relative z-10">
    <!-- Left Side Sticky Title -->
    <div class="sticky self-start h-fit lg:pb-52 px-2 md:px-[0]" style="top: 18rem;">
      <div class="mb-4">
        <div class="text-blue-600 text-sm mb-2 uppercase tracking-wide font-semibold">Testimonials</div>
        <h2 class="text-4xl md:text-6xl font-black leading-tight">
          <span class="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">To Convince</span>
          <span class="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-2xl rotate-[-3deg] ml-4 shadow-2xl hover:rotate-[-5deg] transition-transform duration-300 border-2 border-gray-200">
            You
          </span>
        </h2>
      </div>
      <p class="text-gray-600 mt-6 leading-relaxed">I have an eye for detail and a love for quality work. I reached out to clients from my previous development projects to share their feedback about working with dafahan.dev</p>
    </div>

    <!-- Right Side Sticky Cards -->
    <div class="flex flex-col lg:pb-52 " style="gap: 25rem;">
      {#each testimonials as testimonial, index}
        <div
          class="bg-white/90 backdrop-blur border-2 border-gray-200 p-6 md:p-8 rounded-2xl sticky min-w-96 h-80 flex flex-col justify-between text-gray-900 transition-all duration-300 hover:shadow-2xl hover:border-blue-300 hover:bg-white shadow-xl"
          style="transform: rotate({index * 2 - 4}deg); z-index: {index + 10}; top: 18rem;"
        >
          <!-- Tweet Header -->
          <div class="flex items-start justify-between mb-4">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm border-2 border-gray-200">
                {testimonial.avatar}
              </div>
              <div>
                <h3 class="font-bold text-gray-900 text-lg">{testimonial.author}</h3>
                <p class="text-gray-500 text-sm">{testimonial.username}</p>
              </div>
            </div>
            <Twitter class="w-5 h-5 text-blue-500 flex-shrink-0" />
          </div>

          <!-- Tweet Content -->
          <p class="text-gray-700 text-base leading-relaxed flex-grow my-4">
            {testimonial.text}
          </p>

          <!-- Tweet Footer -->
          <p class="text-gray-500 text-sm mt-4">
            {testimonial.timestamp} · <span class="text-blue-500 hover:text-blue-600 hover:underline cursor-pointer transition-colors duration-300">Client Feedback</span>
          </p>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  /* Only custom CSS needed for gap spacing that Tailwind doesn't support */
  @media (max-width: 1024px) {
    .grid {
      grid-template-columns: 1fr !important;
      gap: 2rem !important;
      padding: 6rem 1rem 4rem !important;
    }
    
    .sticky {
      position: static !important;
    }
    
    .w-96 {
      width: 100% !important;
      max-width: 24rem !important;
      margin: 0 auto !important;
    }

    div[style*="transform: rotate"] {
      transform: none !important;
    }

    div[style*="gap: 25rem"] {
      gap: 3rem !important;
    }

    .text-6xl.md\:text-8xl {
      font-size: 3rem !important;
    }
  }
</style>