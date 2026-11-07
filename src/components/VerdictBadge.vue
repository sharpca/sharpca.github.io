<script setup>
defineProps({ verdict: String });
const cls = {
  PASS: "text-emerald-700 border-emerald-600 dark:text-emerald-400",
  FAIL: "text-rose-700 border-rose-600 dark:text-rose-400",
  MIXED: "text-amber-700 border-amber-600 dark:text-amber-400",
};
</script>
<template>
  <span class="font-mono text-[11px] px-2.5 py-0.5 rounded-full border align-middle" :class="cls[verdict]">{{ verdict }}</span>
</template>
