<script lang="ts">
  import { onMount } from 'svelte';

  export let src: string;
  export let placeholder: string;
  export let alt = '';
  export let className = '';

  let loaded = false;
  let imgEl: HTMLImageElement;

  onMount(() => {
    if (imgEl && imgEl.complete) {
      loaded = true;
    }
  });
</script>

<div class="relative w-full overflow-hidden">
  <!-- Blur Placeholder -->
  <img
    src={placeholder}
    alt=""
    width="1920"
    height="1080"
    class="w-full h-auto object-cover blur-xl scale-105 transition-opacity duration-700 absolute inset-0 z-0"
    class:opacity-0={loaded}
  />

  <!-- Real Image -->
  <img
    bind:this={imgEl}
    src={src}
    alt={alt}
    width="1920"
    height="1080"
    class="w-full h-auto object-cover transition-opacity duration-700 ease-in-out relative z-10 {className}"
    on:load={() => (loaded = true)}
    loading="eager"
    decoding="async"
    fetchpriority="high"
  />
</div>
