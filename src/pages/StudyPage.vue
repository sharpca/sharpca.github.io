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
    <h1 class="font-serif text-3xl" v-reveal>teacher 的视野重要吗？</h1>
    <p class="text-slate-500 dark:text-slate-400 mt-2" v-reveal>
      一个预注册的三臂对照回答 — <span class="num">2026-11-07</span></p>

    <div class="glass rounded-2xl p-6 mt-6" v-reveal>
      <p class="text-sm">{{ R?.meta?.design || "…" }}</p>
    </div>

    <div v-if="err" class="text-rose-600 mt-4">数据加载失败：{{ err }}</div>

    <div class="grid md:grid-cols-2 gap-5 mt-6" v-if="R">
      <div class="glass rounded-2xl p-6" v-reveal>
        <h2 class="font-semibold mb-3">各臂准确率 <span class="text-slate-400 text-xs">(bAcc)</span></h2>
        <ArmChart :arms="R.arms" />
        <p class="text-xs text-slate-500 mt-2">T1 = PanNuke 细分类型 · T2 = MoNuSAC 跨域 · T3 = tile→organ。悬停查看数值。</p>
      </div>
      <div class="glass rounded-2xl p-6" v-reveal>
        <h2 class="font-semibold mb-3">配对对比 <span class="text-slate-400 text-xs">(Δ pp，95% CI，T1)</span></h2>
        <ForestPlot :contrasts="R.contrasts" />
        <p class="text-xs text-slate-500 mt-2">绿色 = 置信区间不含 0。排除混淆后，完整上下文 teacher 胜过共同可见限制 teacher。</p>
      </div>
    </div>

    <div class="glass rounded-2xl p-6 mt-5" v-if="R" v-reveal>
      <h2 class="font-semibold mb-3">门控执行</h2>
      <ol class="space-y-3 list-decimal ml-5">
        <li v-for="g in R.gates" :key="g.name">
          <span class="font-medium">{{ g.name }}</span>
          <VerdictBadge :verdict="g.verdict" class="ml-2" />
          <p class="text-sm text-slate-600 dark:text-slate-300">{{ g.detail }}</p>
        </li>
      </ol>
    </div>

    <div class="grid md:grid-cols-2 gap-5 mt-5" v-if="R">
      <div class="glass rounded-2xl p-6" v-reveal>
        <h2 class="font-semibold mb-3"><span class="inline-block w-2.5 h-2.5 rounded-full bg-emerald-600 mr-2"></span>增益从哪来</h2>
        <ul class="list-disc ml-5 space-y-2 text-sm text-slate-600 dark:text-slate-300">
          <li v-for="m in R.mechanism.gain" :key="m">{{ m }}</li>
        </ul>
      </div>
      <div class="glass rounded-2xl p-6" v-reveal>
        <h2 class="font-semibold mb-3"><span class="inline-block w-2.5 h-2.5 rounded-full bg-rose-600 mr-2"></span>代价藏在哪</h2>
        <ul class="list-disc ml-5 space-y-2 text-sm text-slate-600 dark:text-slate-300">
          <li v-for="m in R.mechanism.cost" :key="m">{{ m }}</li>
        </ul>
      </div>
    </div>

    <p class="text-xs text-slate-500 mt-6" v-reveal>诚实条款：LEMON 权重续训（adaptation，非 from-scratch）；单域 SSL 池；MoNuSAC/PanNuke 与 LEMON 预训练同源（TCGA），
    绝对数字带 in-domain 倾向。完整合同、对抗审计与门控逻辑见即将发布的 preprint。</p>
  </section>
</template>
