<script setup>
import { onMounted, ref } from "vue";
const props = defineProps({ value: [String, Number], label: String });
const shown = ref("0");
onMounted(() => {
  const t = Number(props.value);
  if (isNaN(t)) { shown.value = props.value; return; }
  let v = 0; const step = Math.max(1, Math.round(t / 40));
  const timer = setInterval(() => {
    v = Math.min(t, v + step); shown.value = String(v);
    if (v >= t) clearInterval(timer);
  }, 34);
});
</script>

<template>
  <div class="text-center">
    <b class="block font-serif text-3xl md:text-4xl grad-text">{{ shown }}</b>
    <span class="text-[11px] uppercase tracking-widest text-slate-500 dark:text-slate-400">{{ label }}</span>
  </div>
</template>
