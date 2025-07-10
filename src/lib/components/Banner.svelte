<script>
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment'; // SvelteKit's browser check

  export let navHeight = 0;
  
  $: minHeight = `calc(100vh - ${navHeight}px)`;

  let line1Ref;
  let line2Ref;
  let boxed1Ref;
  let boxed2Ref;

  let line2Height = 0;
  let backgroundSize = "32px 32px";
  let line1FontStyle = { fontSize: "16px", letterSpacing: "normal" };
  let line2FontStyle = { fontSize: "16px", letterSpacing: "normal" };
  let gradientStyle = ""; // Initialize as empty string

  const line1Text = "RUMAH ADALAH KITA, YANG BERHIMPUN,";
  const line2Text = "BERCERITA DAN DIKENANG";

  // Sync height for line1
  function syncHeights() {
    if (line2Ref) {
      line2Height = line2Ref.offsetHeight;
    }
  }

  // Update gradient size based on element size
  function updateBgSize() {
    if (!browser) return; // Guard against SSR
    
    const baseSize = 32;
    const scaleRef = boxed1Ref || boxed2Ref;
    const isSmallScreen = window.innerWidth < 640;
    const tune = isSmallScreen ? 190 : 150;
    
    if (scaleRef) {
      const width = scaleRef.offsetWidth;
      const scale = width / tune;
      const size = Math.max(8, Math.min(64, baseSize * scale));
      backgroundSize = `${size}px ${size}px`;
    }
  }

  // Font fitting based on container content box
  function updateFontSizes() {
    if (!line1Ref || !line2Ref) return;

    const computeFont = (containerWidth, text) => {
      const charCount = text.length;
      const avgCharWidth = 0.5079;
      const estimatedLetterSpacing = 1;
      const totalLetterSpacing = (charCount - 1) * estimatedLetterSpacing;
      const fontSize = (containerWidth - totalLetterSpacing) / (charCount * avgCharWidth);
      const clamped = Math.max(12, Math.min(160, fontSize));

      return {
        fontSize: `${clamped}px`,
        letterSpacing: `${estimatedLetterSpacing}px`,
      };
    };

    const line1Width = line1Ref.clientWidth;
    const line2Width = line2Ref.clientWidth;

    line1FontStyle = computeFont(line1Width, line1Text);
    line2FontStyle = computeFont(line2Width, line2Text);
  }

  function updateGradientStyle() {
    if (!browser) return;
    
    gradientStyle = `
      background-image: 
        radial-gradient(farthest-side at bottom right, transparent 98%, #56AAB7 100%),
        radial-gradient(farthest-side at top right, transparent 98%, #56AAB7 100%);
      background-size: ${backgroundSize};
      background-repeat: no-repeat;
      background-position: top left, bottom left;
      background-color: transparent;
    `;
    console.log('Gradient style updated:', gradientStyle);
  }

  function handleResize() {
    if (!browser) return; // Guard against SSR
    syncHeights();
    updateBgSize();
    updateFontSizes();
    updateGradientStyle();
  }

  onMount(() => {
    // Initial calculations - onMount ensures we're in browser
    syncHeights();
    updateBgSize();
    updateFontSizes();
    updateGradientStyle();

    // Add resize listener
    window.addEventListener("resize", handleResize);
  });

  onDestroy(() => {
    // Clean up resize listener
    if (browser) {
      window.removeEventListener("resize", handleResize);
    }
  });
</script>

<div class="flex w-full flex-col font-roboto-condensed text-white font-normal leading-tight">
  <div
    bind:this={line1Ref}
    style="height: {line2Height}px"
    class="flex w-full items-center justify-between"
    id="line1"
  >
    <span class="w-full text-left" style="font-size: {line1FontStyle.fontSize}; letter-spacing: {line1FontStyle.letterSpacing}">
      {line1Text}
    </span>
  </div>

  <div class="flex w-full aspect-video rounded-[32px] bg-[url('/images/bg-hero.webp')] bg-cover bg-center relative bg-bottom">
          <img
        src="/images/logo-white.webp"
        alt="logo"
        class="object-contain absolute right-12  w-12 top-[30px]"
      />
    <div class="flex w-[60%] h-full flex-col">
      <div
        bind:this={line2Ref}
        class="relative flex w-full h-1/6 rounded-br-[32px] overflow-visible bg-[#56AAB7] items-center justify-between"
        id="line2"
      >
        <span class="w-full text-left" style="font-size: {line2FontStyle.fontSize}; letter-spacing: {line2FontStyle.letterSpacing}">
          {line2Text}
        </span>
      </div>

      <div
        id="boxed2"
        bind:this={boxed2Ref}
        class="flex w-full h-full rounded-bl-[65px]"
        style={gradientStyle}
      ></div>
    </div>

    <div
      id="boxed1"
      bind:this={boxed1Ref}
      class="flex w-[12%] h-full rounded-bl-[65px] relative"
      style={gradientStyle}
    >

    </div>
  </div>
</div>

<style>
  /* Add any component-specific styles here if needed */
</style>