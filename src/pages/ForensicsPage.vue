<script setup>
import { onMounted, ref } from "vue";
import { loadData } from "../api";
const rows = ref([]); const err = ref("");
onMounted(async () => { try { rows.value = await loadData("forensics"); } catch (e) { err.value = String(e); } });
</script>

<template>
  <section class="max-w-5xl mx-auto px-5 pt-24 pb-16">
    <h1 class="font-serif text-3xl" v-reveal>Repo forensics</h1>
    <p class="text-slate-500 dark:text-slate-400 mt-2" v-reveal>
      Paper ↔ code discrepancies and mechanism precedents found while auditing the closest codebases (full texts cached, SHA-256 in the local ledger).</p>

    <div v-if="err" class="text-rose-600 mt-4">data load failed: {{ err }}</div>

    <div v-for="r in rows" :key="r.repo" v-reveal
      class="glass rounded-2xl p-6 mt-5 bg-white/70 dark:bg-slate-900/60 backdrop-blur border border-slate-200 dark:border-slate-700">
      <div class="flex items-baseline gap-3 flex-wrap">
        <h2 class="font-semibold text-lg">{{ r.repo }}</h2>
        <span class="font-mono text-xs text-slate-500">{{ r.id }}</span>
        <span class="text-xs px-2 py-0.5 rounded-full border"
          :class="r.kind === 'discrepancy' ? 'text-rose-700 border-rose-400 dark:text-rose-400' : 'text-sky-700 border-sky-400 dark:text-sky-400'">
          {{ r.kind }}</span>
      </div>
      <dl class="grid md:grid-cols-3 gap-4 mt-3 text-sm">
        <div><dt class="text-xs uppercase tracking-wider text-slate-400 mb-1">Paper says</dt><dd>{{ r.paper }}</dd></div>
        <div><dt class="text-xs uppercase tracking-wider text-slate-400 mb-1">Code says</dt><dd>{{ r.code }}</dd></div>
        <div><dt class="text-xs uppercase tracking-wider text-slate-400 mb-1">Why it matters</dt><dd>{{ r.matters }}</dd></div>
      </dl>
    </div>

    <p class="text-xs text-slate-500 mt-6" v-reveal>
      All findings verified against local full-text/code caches; quotes and line numbers are kept in the working
      notes and will appear in the preprint's methods-audit appendix.</p>
  </section>
</template>
