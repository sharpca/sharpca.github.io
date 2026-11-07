<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import StatCounter from "../components/StatCounter.vue";
import { loadData } from "../api";

const phrases = ["pre-registered experiments.", "adversarially audited claims.", "teacher-design forensics.", "negative results, reported honestly."];
const typed = ref(""); let pi = 0, ci = 0, del = false, timer = null;
function type() {
  const t = phrases[pi];
  typed.value = t.slice(0, ci);
  if (!del && ci < t.length) ci++;
  else if (!del) { del = true; timer = setTimeout(type, 1700); return; }
  else if (ci > 0) ci--;
  else { del = false; pi = (pi + 1) % phrases.length; }
  timer = setTimeout(type, del ? 26 : 52);
}
onMounted(() => { if (!matchMedia("(prefers-reduced-motion: reduce)").matches) type(); else typed.value = phrases[0]; });
onUnmounted(() => clearTimeout(timer));

const results = ref(null); const notes = ref([]);
onMounted(async () => {
  try { [results.value, notes.value] = await Promise.all([loadData("results"), loadData("notes")]); } catch {}
});
const stats = [
  ["3", "supervision contracts"], ["62,263", "training cells"],
  ["16", "models in confusion audit"], ["4", "pre-registered gates"],
];
const highlights = [
  { t: "Co-visible restriction is not necessary", d: "Full-context teacher beats the region-restricted one by +2.96 pp bAcc [1.92–3.99] — a clean content effect after confound exclusion.", cls: "border-rose-500/40" },
  { t: "Full-context teacher is the only arm beating the anchor", d: "+3.42 pp [2.40–4.42] on fine-grained typing; 96.3% of the gain sits in the anchor's low-margin cells.", cls: "border-emerald-500/40" },
  { t: "The cost is structured, not random", d: "A broad content-level shift concentrated on a pre-existing confusable family; not context leakage, no new confusion modes (16-model audit).", cls: "border-amber-500/40" },
];
</script>

<template>
  <header class="min-h-[92vh] flex flex-col justify-center items-center text-center px-5 pt-24 pb-10">
    <p class="font-mono tracking-[0.34em] text-[11px] text-accent mb-2" v-reveal>RESEARCH NOTES · 2026</p>
    <h1 class="font-serif text-6xl md:text-8xl leading-none" v-reveal>Celine<span class="grad-text">.</span></h1>
    <p class="text-slate-500 dark:text-slate-400 mt-4 max-w-xl" v-reveal>
      Computational pathology · cell-level self-supervised learning · evaluation methodology for trustworthy model claims.
    </p>
    <p class="font-mono text-teal-700 dark:text-teal-400 min-h-6 mt-3" v-reveal>{{ typed }}<span class="animate-pulse">▌</span></p>
    <div class="flex gap-8 md:gap-14 flex-wrap justify-center mt-8" v-reveal>
      <StatCounter v-for="([n, l]) in stats" :key="l" :value="n" :label="l" />
    </div>
    <div class="flex gap-4 mt-10" v-reveal>
      <router-link to="/study" class="px-6 py-2.5 rounded-full bg-accent text-white text-sm hover:opacity-90 transition">Read the study</router-link>
      <router-link to="/forensics" class="px-6 py-2.5 rounded-full border border-slate-300 dark:border-slate-600 text-sm hover:border-accent transition">Repo forensics</router-link>
    </div>
  </header>

  <section class="max-w-5xl mx-auto px-5 pb-16">
    <h2 class="font-serif text-2xl border-b border-slate-200 dark:border-slate-700 pb-2 mb-6" v-reveal>Three verdicts, one gate chain</h2>
    <div class="grid md:grid-cols-3 gap-5">
      <div v-for="h in highlights" :key="h.t" v-reveal
        class="glass rounded-2xl p-6 border-l-4 bg-white/70 dark:bg-slate-900/60 backdrop-blur shadow-lg hover:-translate-y-1 transition-transform" :class="h.cls">
        <h3 class="font-semibold mb-2">{{ h.t }}</h3>
        <p class="text-sm text-slate-600 dark:text-slate-300">{{ h.d }}</p>
      </div>
    </div>
    <div v-if="notes.length" class="mt-10 glass rounded-2xl p-6 bg-white/70 dark:bg-slate-900/60 backdrop-blur border border-slate-200 dark:border-slate-700" v-reveal>
      <p class="font-mono text-xs text-accent">{{ notes[0].date }}</p>
      <h3 class="font-semibold mt-1">{{ notes[0].title }}</h3>
      <p class="text-sm text-slate-600 dark:text-slate-300 mt-1">{{ notes[0].summary }}</p>
      <router-link to="/notes" class="text-accent text-sm hover:underline">all notes →</router-link>
    </div>
  </section>
</template>
