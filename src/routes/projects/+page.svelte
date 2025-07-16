<script lang="ts">
  import { base } from '$app/paths';
  import SeeMoreButton from "$lib/components/SeeMoreButton.svelte";

</script>

<section class="h-40 md:h-60  flex w-full bg-[#56AAB7] font-roboto-consended text-center items-center justify-center text-4xl md:text-5xl lg:text-6xl uppercase text-white font-bold tracking-widest">
        PROYEK Pilihan KAMI
</section>
<section class="py-20 xl:px-32 2xl:px-64 px-4 sm:px-8 flex flex-col">

    <!-- PROJECTS CARDS -->

    <div class="flex w-full pb-16  flex-col lg:justify-around lg:flex-row gap-12 h-fit border-b-2 border-gray-200">
        <div class="flex max-w-xl self-center">
                    <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop" class="aspect-4/3 w-full  object-cover rounded-lg" alt="project 1"/>
        </div>
        <div class="flex w-full items-stretch  flex-col gap-6 self-center max-w-2xl">
            <div class="flex w-full justify-between font-bold h-fit">

                    <div class="flex flex-col w-full xl:w-4/7">
                        <h2 class="text-3xl md:text-5xl leading-none group-hover:text-[#56AAB7] group-active:text-[#56AAB7] transition-colors duration-300">
                            CLASSIC JAVANESE
                        </h2>
                    </div>
                        <SeeMoreButton
                        text="SELENGKAPNYA"
                        ariaLabel="Lihat selengkapnya title"
                        variant="default"
                        size="lg"
                        class="h-fit text-sm sm:text-base md:text-lg px-4 py-2 font-semibold"
                        />
            </div>
            <p class="">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed interdum efficitur ante, eu tincidunt lacus ullamcorper quis. Aliquam dignissim orci odio, eget feugiat ex rutrum a. Proin neque ligula, bibendum non ullamcorper sit amet, pretium eget ipsum. Ut a lectus ac nulla rhoncus pellentesque et nec eros. Mauris in magna risus. Sed sit amet volutpat dolor, id pellentesque dolor. Nulla auctor mi sit amet mi volutpat elementum. Etiam convallis sapien et fringilla pellentesque. In a risus porttitor, cursus risus vitae, finibus augue. Sed malesuada est enim, in porttitor nulla ornare quis.
            </p>
        </div>
    </div>

</section>