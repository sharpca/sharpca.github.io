<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import StatCounter from "../components/StatCounter.vue";
import { loadData } from "../api";

const phrases = ["预注册的对照实验。", "经过对抗审计的主张。", "teacher 设计的取证分析。", "如实报告的阴性结果。"];
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
  ["3", "监督合同"], ["62,263", "训练细胞"],
  ["16", "混淆审计模型"], ["4", "预注册门"],
];
const highlights = [
  { t: "共同可见限制 teacher 并非必要", d: "完整上下文 teacher 以 +2.96 pp bAcc [95% CI 1.92–3.99] 胜出——排除混淆后是纯内容效应。", cls: "border-rose-500/40" },
  { t: "唯一跑赢冻结锚点的合同", d: "细分类 +3.42 pp [2.40–4.42]；96.3% 的增益落在锚点的低 margin 细胞上。", cls: "border-emerald-500/40" },
  { t: "代价有结构，不是随机噪声", d: "content 型概率漂移集中砸在先存的可混淆家族上；不是上下文渗漏，16 模型审计无新模式。", cls: "border-amber-500/40" },
];
</script>

<template>
  <header class="min-h-[92vh] flex flex-col justify-center items-center text-center px-5 pt-24 pb-10">
    <p class="font-mono tracking-[0.34em] text-[11px] text-accent mb-2" v-reveal>研究笔记 · 2026</p>
    <h1 class="font-serif text-6xl md:text-8xl leading-none" v-reveal>Celine<span class="grad-text">.</span></h1>
    <p class="text-slate-500 dark:text-slate-400 mt-4 max-w-xl" v-reveal>
      计算病理学 · 细胞级自监督学习（SSL） · 可信模型主张的评测方法学。
    </p>
    <p class="font-mono text-teal-700 dark:text-teal-400 min-h-6 mt-3" v-reveal>{{ typed }}<span class="animate-pulse">▌</span></p>
    <div class="flex gap-8 md:gap-14 flex-wrap justify-center mt-8" v-reveal>
      <StatCounter v-for="([n, l]) in stats" :key="l" :value="n" :label="l" />
    </div>
    <div class="flex gap-4 mt-10" v-reveal>
      <router-link to="/study" class="px-6 py-2.5 rounded-full bg-accent text-white text-sm hover:opacity-90 transition">阅读这项研究</router-link>
      <router-link to="/forensics" class="px-6 py-2.5 rounded-full border border-slate-300 dark:border-slate-600 text-sm hover:border-accent transition">repo 取证</router-link>
    </div>
  </header>

  <section class="max-w-5xl mx-auto px-5 pb-16">
    <h2 class="font-serif text-2xl border-b border-slate-200 dark:border-slate-700 pb-2 mb-6" v-reveal>三条判定，一条门控链</h2>
    <div class="grid md:grid-cols-3 gap-5">
      <div v-for="h in highlights" :key="h.t" v-reveal
        class="glass rounded-2xl p-6 border-l-4 hover:-translate-y-1 transition-transform" :class="h.cls">
        <h3 class="font-semibold mb-2">{{ h.t }}</h3>
        <p class="text-sm text-slate-600 dark:text-slate-300">{{ h.d }}</p>
      </div>
    </div>
    <div v-if="notes.length" class="mt-10 glass rounded-2xl p-6" v-reveal>
      <p class="font-mono text-xs text-accent">{{ notes[0].date }}</p>
      <h3 class="font-semibold mt-1">{{ notes[0].title }}</h3>
      <p class="text-sm text-slate-600 dark:text-slate-300 mt-1">{{ notes[0].summary }}</p>
      <router-link to="/notes" class="text-accent text-sm hover:underline">全部笔记 →</router-link>
    </div>
  </section>
</template>
