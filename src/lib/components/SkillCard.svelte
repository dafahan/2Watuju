<!-- src/lib/components/SkillCard.svelte -->
<script>
  export let skill;
</script>

<div
  class="skill-card flex items-center space-x-4 p-6 bg-white/90 rounded-2xl border-2 border-gray-200 hover:border-blue-400 transition-all duration-300 backdrop-blur-sm hover:bg-gradient-to-r hover:from-blue-50/80 hover:to-purple-50/80 cursor-pointer shadow-lg hover:shadow-xl hover:shadow-blue-500/10"
>
  <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center transform hover:rotate-12 transition-transform duration-300 border-2 border-gray-200 shadow-lg">
    <svelte:component this={skill.Icon} class="w-6 h-6 text-white" />
  </div>
  <div>
    <h4 class="font-semibold text-gray-900">{skill.name}</h4>
    <p class="text-gray-600 text-sm">{skill.desc}</p>
  </div>
</div>