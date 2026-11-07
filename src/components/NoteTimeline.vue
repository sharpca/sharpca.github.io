<script setup>
defineProps({ notes: { type: Array, required: true } });
</script>
<template>
  <div class="relative ml-3 pl-8 border-l-2 border-slate-200 dark:border-slate-700 space-y-7">
    <div v-for="n in notes" :key="n.date + n.title" class="relative">
      <span class="absolute -left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-accent ring-4 ring-accent/20"></span>
      <time class="font-mono text-xs text-accent tracking-wider">{{ n.date }}</time>
      <h3 class="font-semibold mt-0.5 text-slate-900 dark:text-slate-100">{{ n.title }}</h3>
      <p class="text-sm text-slate-600 dark:text-slate-300 mt-1">{{ n.summary }}</p>
    </div>
  </div>
</template>
