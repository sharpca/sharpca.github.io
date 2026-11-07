<script setup>
import { onMounted, ref } from "vue";
import { loadData } from "../api";
const rows = ref([]); const err = ref("");
onMounted(async () => { try { rows.value = await loadData("forensics"); } catch (e) { err.value = String(e); } });
</script>

<template>
  <section class="max-w-5xl mx-auto px-5 pt-24 pb-16">
    <h1 class="font-serif text-3xl" v-reveal>repo 取证</h1>
    <p class="text-slate-500 dark:text-slate-400 mt-2" v-reveal>
      审读最近邻代码库时发现的 paper ↔ code 不一致与机制先例（全文缓存核验，SHA-256 台账在案）。</p>

    <div v-if="err" class="text-rose-600 mt-4">数据加载失败：{{ err }}</div>

    <div v-for="r in rows" :key="r.repo" v-reveal class="glass rounded-2xl p-6 mt-5">
      <div class="flex items-baseline gap-3 flex-wrap">
        <h2 class="font-semibold text-lg">{{ r.repo }}</h2>
        <span class="font-mono text-xs text-slate-500">{{ r.id }}</span>
        <span class="text-xs px-2 py-0.5 rounded-full border"
          :class="r.kind === 'discrepancy' ? 'text-rose-700 border-rose-400 dark:text-rose-400' : 'text-sky-700 border-sky-400 dark:text-sky-400'">
          {{ r.kind === "discrepancy" ? "论文↔代码不一致" : "机制先例" }}</span>
      </div>
      <dl class="grid md:grid-cols-3 gap-4 mt-3 text-sm">
        <div><dt class="text-xs uppercase tracking-wider text-slate-400 mb-1">论文表述</dt><dd>{{ r.paper }}</dd></div>
        <div><dt class="text-xs uppercase tracking-wider text-slate-400 mb-1">代码实现</dt><dd>{{ r.code }}</dd></div>
        <div><dt class="text-xs uppercase tracking-wider text-slate-400 mb-1">对我们的意义</dt><dd>{{ r.matters }}</dd></div>
      </dl>
    </div>

    <p class="text-xs text-slate-500 mt-6" v-reveal>
      全部结论基于本地全文/代码缓存核验；原文引用与行号保存在工作笔记中，将出现在 preprint 的方法审计附录。</p>
  </section>
</template>
