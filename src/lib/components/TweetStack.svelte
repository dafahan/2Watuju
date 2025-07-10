<!-- src/lib/components/TweetStack.svelte -->
<script lang="ts">
  import { Twitter } from 'lucide-svelte';

  const testimonials = [
    {
      id: 1,
      author: "Cassie Evans",
      username: "@cassiecods",
      text: "Not exaggerating when I say Flowfest was my web event of the year. I go to a lot of conferences but the vibes at this little web-nerd fest were immaculate.",
      timestamp: "1:21 PM · Jul 12, 2024",
      avatar: "CE"
    },
    {
      id: 2,
      author: "Kieran Wallworth",
      username: "@kieranwallworth",
      text: "FlowFest was a 'business event' like no other. A day packed with Webflow, talks, coffee, fun and festival vibes. Let's make this an annual thing!",
      timestamp: "2:15 PM · Jul 12, 2024",
      avatar: "KW"
    },
    {
      id: 3,
      author: "Eugene Soch",
      username: "@eugenesoch",
      text: "I am so happy I secured my space early - I would've ended up biting up my nails if I didn't attend! Can I reserve my seat for next year already?",
      timestamp: "3:45 PM · Jul 12, 2024",
      avatar: "ES"
    },
    {
      id: 4,
      author: "Isabelle Cuisset",
      username: "@IsaWabi_London",
      text: "Thank you for this truly AMAZING event! It was so nice meeting with everyone and hearing such inspiring talks!!! Can't wait for the next one already!",
      timestamp: "4:21 PM · Jul 12, 2024",
      avatar: "IC"
    },
    {
      id: 5,
      author: "Rahul Sharma",
      username: "@rahulsharma_dev",
      text: "Just wrapped up at FlowFest! The perfect blend of technical deep-dives and creative inspiration. Already counting down to next year's event!",
      timestamp: "5:00 PM · Jul 12, 2024",
      avatar: "RS"
    }
  ];
</script>

<section class="bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 min-h-screen py-20 relative">
  <!-- Animated background elements -->
  <div class="fixed inset-0 overflow-hidden pointer-events-none">
    <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
    <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
  </div>

  <div class="container mx-auto flex justify-between h-full py-[200px] relative z-10">
    <!-- Left side title -->
    <div class="text-[30px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 h-[300px] sticky top-[300px] flex items-center">
      <div>
        <h2 class="text-6xl md:text-8xl font-black leading-tight">
          <span class="block">Flowfest</span>
          <span class="inline-block bg-gradient-to-r from-blue-500 to-emerald-500 text-white px-6 py-3 md:px-8 md:py-4 rounded-2xl rotate-[-3deg] ml-4 shadow-2xl hover:rotate-[-5deg] transition-transform duration-300 border-2 border-zinc-700">
            Love
          </span>
        </h2>
      </div>
    </div>

    <!-- Right side cards -->
    <div class="flex flex-col gap-[100px]">
      {#each testimonials as testimonial, index}
        <div 
          class="bg-zinc-900/80 backdrop-blur-sm rounded-2xl shadow-2xl border-2 border-zinc-700 p-6 md:p-8 mb-10 sticky top-[300px] w-[400px] min-h-[300px] flex flex-col justify-between text-white transition-all duration-300 hover:shadow-2xl hover:border-zinc-600 hover:bg-zinc-800/80"
          style="transform: rotate({index * 2 - 4}deg); z-index: {testimonials.length - index + 10};"
        >
          <!-- Tweet Header -->
          <div class="flex items-start justify-between mb-4">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm border-2 border-zinc-600">
                {testimonial.avatar}
              </div>
              <div>
                <h3 class="font-bold text-zinc-100 text-lg">{testimonial.author}</h3>
                <p class="text-zinc-400 text-sm">{testimonial.username}</p>
              </div>
            </div>
            <Twitter class="w-5 h-5 text-blue-400 flex-shrink-0" />
          </div>

          <!-- Tweet Content -->
          <p class="text-zinc-300 text-base md:text-lg leading-relaxed flex-grow">
            {testimonial.text}
          </p>

          <!-- Tweet Footer -->
          <p class="text-zinc-500 text-sm mt-4">
            {testimonial.timestamp} · <span class="text-blue-400 hover:text-blue-300 hover:underline cursor-pointer transition-colors duration-300">FlowFest Love</span>
          </p>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  /* Ensure proper stacking context */
  .container {
    position: relative;
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .container {
      flex-direction: column;
      gap: 2rem;
    }
    
    .sticky {
      position: static !important;
    }
    
    /* Reset card width on mobile */
    :global(.container > div:last-child > div) {
      width: 100% !important;
      max-width: 400px;
      margin: 0 auto;
    }
  }
</style>