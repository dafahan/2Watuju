<!-- src/lib/components/SeeMoreButton.svelte -->
<script lang="ts">
  import { ArrowRight } from 'lucide-svelte';
  
  // Props
  export let text: string = 'SELENGKAPNYA';
  export let onClick: () => void = () => {};
  export let onTouchStart: (event: TouchEvent) => void = () => {};
  export let onTouchEnd: (event: TouchEvent) => void = () => {};
  export let ariaLabel: string = '';
  export let disabled: boolean = false;
  export let variant: 'default' | 'primary' | 'outline' = 'default';
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let fullWidth: boolean = false;
  
  // Custom class support
  let className: string = '';
  export { className as class };
  
  // Dynamic classes based on variant
  $: baseClasses = 'flex items-center transition-all duration-300 justify-between gap-2 group/btn cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#56AAB7] focus:ring-opacity-50 touch-interactive whitespace-nowrap';
  
  $: variantClasses = {
    default: 'border-2 border-gray-200 rounded-full text-black bg-white hover:bg-[#56AAB7] hover:text-white hover:border-[#56AAB7] active:bg-[#56AAB7] active:text-white active:border-[#56AAB7] hover:shadow-lg hover:scale-105 active:shadow-lg active:scale-105',
    primary: 'border-2 border-[#56AAB7] rounded-full text-white bg-[#56AAB7] hover:bg-white hover:text-[#56AAB7] hover:border-[#56AAB7] active:bg-white active:text-[#56AAB7] active:border-[#56AAB7] hover:shadow-lg hover:scale-105 active:shadow-lg active:scale-105',
    outline: 'border-2 border-[#56AAB7] rounded-full text-[#56AAB7] bg-transparent hover:bg-[#56AAB7] hover:text-white active:bg-[#56AAB7] active:text-white hover:shadow-lg hover:scale-105 active:shadow-lg active:scale-105'
  };
  

  $: widthClasses = fullWidth ? 'w-full flex-grow' : 'flex-shrink-0';
  
  $: disabledClasses = disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '';
  
  // Combine all classes including custom class
  $: buttonClasses = `${baseClasses} ${variantClasses[variant]}  ${widthClasses} ${disabledClasses} ${className}`;
  
  function handleClick() {
    if (!disabled) {
      onClick();
    }
  }
  
  function handleTouchStart(event: TouchEvent) {
    if (!disabled) {
      onTouchStart(event);
    }
  }
  
  function handleTouchEnd(event: TouchEvent) {
    if (!disabled) {
      onTouchEnd(event);
    }
  }
</script>

<button 
  class={buttonClasses}
  on:click={handleClick}
  on:touchstart={handleTouchStart}
  on:touchend={handleTouchEnd}
  on:touchcancel={handleTouchEnd}
  aria-label={ariaLabel || text}
  {disabled}
>
  <span class="group-hover/btn:tracking-wider group-active/btn:tracking-wider transition-all duration-300">
    {text}
  </span>
  <ArrowRight 
    class="rotate-45 group-hover/btn:rotate-0 group-active/btn:rotate-0 transition-transform duration-300" 
    size={size === 'sm' ? 16 : size === 'md' ? 20 : 24}
  />
</button>

<style>
  /* Touch states for mobile */
  .touch-interactive.touch-active {
    transform: scale(0.98) !important;
    opacity: 0.9;
  }
</style>