<script setup>
import { onMounted, ref } from "vue";
import ArmChart from "../components/ArmChart.vue";
import ForestPlot from "../components/ForestPlot.vue";
import VerdictBadge from "../components/VerdictBadge.vue";
import { loadData } from "../api";

const R = ref(null); const err = ref("");
onMounted(async () => { try { R.value = await loadData("results"); } catch (e) { err.value = String(e); } });
</script>

<template>
  <section class="max-w-5xl mx-auto px-5 pt-24 pb-16">
    <h1 class="font-serif text-3xl" v-reveal>Does the teacher's field of view matter?</h1>
    <p class="text-slate-500 dark:text-slate-400 mt-2" v-reveal>
      A pre-registered three-arm answer — <span class="num">2026-11-07</span></p>

    <div class="glass rounded-2xl p-6 mt-6 bg-white/70 dark:bg-slate-900/60 backdrop-blur border border-slate-200 dark:border-slate-700" v-reveal>
      <p class="text-sm">{{ R?.meta?.design || "…" }}</p>
    </div>

    <div v-if="err" class="text-rose-600 mt-4">data load failed: {{ err }}</div>

    <div class="grid md:grid-cols-2 gap-5 mt-6" v-if="R">
      <div class="glass rounded-2xl p-6 bg-white/70 dark:bg-slate-900/60 backdrop-blur border border-slate-200 dark:border-slate-700" v-reveal>
        <h2 class="font-semibold mb-3">Accuracy by arm <span class="text-slate-400 text-xs">(bAcc)</span></h2>
        <ArmChart :arms="R.arms" />
        <p class="text-xs text-slate-500 mt-2">T1 = PanNuke fine-grained · T2 = MoNuSAC cross-domain · T3 = tile→organ. Hover for values.</p>
      </div>
      <div class="glass rounded-2xl p-6 bg-white/70 dark:bg-slate-900/60 backdrop-blur border border-slate-200 dark:border-slate-700" v-reveal>
        <h2 class="font-semibold mb-3">Paired contrasts <span class="text-slate-400 text-xs">(Δ pp, 95% CI, T1)</span></h2>
        <ForestPlot :contrasts="R.contrasts" />
        <p class="text-xs text-slate-500 mt-2">Green = CI excludes 0. Full-context teacher beats co-visible restriction after confound exclusion.</p>
      </div>
    </div>

    <div class="glass rounded-2xl p-6 mt-5 bg-white/70 dark:bg-slate-900/60 backdrop-blur border border-slate-200 dark:border-slate-700" v-if="R" v-reveal>
      <h2 class="font-semibold mb-3">Gate execution</h2>
      <ol class="space-y-3 list-decimal ml-5">
        <li v-for="g in R.gates" :key="g.name">
          <span class="font-medium">{{ g.name }}</span>
          <VerdictBadge :verdict="g.verdict" class="ml-2" />
          <p class="text-sm text-slate-600 dark:text-slate-300">{{ g.detail }}</p>
        </li>
      </ol>
    </div>

    <div class="grid md:grid-cols-2 gap-5 mt-5" v-if="R">
      <div class="glass rounded-2xl p-6 bg-white/70 dark:bg-slate-900/60 backdrop-blur border border-slate-200 dark:border-slate-700" v-reveal>
        <h2 class="font-semibold mb-3"><span class="inline-block w-2.5 h-2.5 rounded-full bg-emerald-600 mr-2"></span>Where the gain comes from</h2>
        <ul class="list-disc ml-5 space-y-2 text-sm text-slate-600 dark:text-slate-300">
          <li v-for="m in R.mechanism.gain" :key="m">{{ m }}</li>
        </ul>
      </div>
      <div class="glass rounded-2xl p-6 bg-white/70 dark:bg-slate-900/60 backdrop-blur border border-slate-200 dark:border-slate-700" v-reveal>
        <h2 class="font-semibold mb-3"><span class="inline-block w-2.5 h-2.5 rounded-full bg-rose-600 mr-2"></span>Where the cost hides</h2>
        <ul class="list-disc ml-5 space-y-2 text-sm text-slate-600 dark:text-slate-300">
          <li v-for="m in R.mechanism.cost" :key="m">{{ m }}</li>
        </ul>
      </div>
    </div>

    <p class="text-xs text-slate-500 mt-6" v-reveal>Honest terms: continued-training adaptation (not from scratch); single-domain pool; TCGA-overlap in-domain
    tendencies on absolute numbers. Full contracts, audit trail and gate logic in an upcoming preprint.</p>
  </section>
</template>
