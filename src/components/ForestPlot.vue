<script setup>
import { computed } from "vue";
const props = defineProps({ contrasts: { type: Array, required: true } });
const W = 460, rowH = 30, padL = 118, padR = 40, padT = 8, xmin = -2, xmax = 9;
const H = computed(() => padT + props.contrasts.length * rowH + 34);
const x = (v) => padL + (W - padL - padR) * ((v - xmin) / (xmax - xmin));
const sig = (c) => c.lo > 0;
</script>

<template>
  <svg :viewBox="`0 0 ${W} ${H}`" class="w-full h-auto">
    <line :x1="x(0)" :y1="padT" :x2="x(0)" :y2="H - 26" class="stroke-slate-400" stroke-dasharray="4 4" />
    <text class="fill-slate-500 text-[10px]" :x="x(0)" :y="H - 12" text-anchor="middle">0 pp</text>
    <g v-for="(c, i) in contrasts" :key="c.name">
      <text class="fill-slate-700 dark:fill-slate-200 text-[10.5px]" :x="padL - 10" :y="padT + rowH * i + rowH / 2 + 4" text-anchor="end">{{ c.name }}</text>
      <line :x1="x(c.lo)" :y1="padT + rowH * i + rowH / 2" :x2="x(c.hi)" :y2="padT + rowH * i + rowH / 2"
        :class="sig(c) ? 'stroke-emerald-600 dark:stroke-emerald-400' : 'stroke-slate-400'" stroke-width="1.6" />
      <line :x1="x(c.lo)" :y1="padT + rowH * i + rowH / 2 - 5" :x2="x(c.lo)" :y2="padT + rowH * i + rowH / 2 + 5" :class="sig(c) ? 'stroke-emerald-600 dark:stroke-emerald-400' : 'stroke-slate-400'" />
      <line :x1="x(c.hi)" :y1="padT + rowH * i + rowH / 2 - 5" :x2="x(c.hi)" :y2="padT + rowH * i + rowH / 2 + 5" :class="sig(c) ? 'stroke-emerald-600 dark:stroke-emerald-400' : 'stroke-slate-400'" />
      <circle :cx="x(c.t1)" :cy="padT + rowH * i + rowH / 2" r="4.5"
        :class="sig(c) ? 'fill-emerald-600 dark:fill-emerald-400' : 'fill-slate-400'">
        <title>{{ c.name }}: +{{ c.t1 }} pp [{{ c.lo }}, {{ c.hi }}]</title>
      </circle>
      <text class="text-[10px]" :class="sig(c) ? 'fill-emerald-700 dark:fill-emerald-400' : 'fill-slate-500'" :x="W - padR + 8" :y="padT + rowH * i + rowH / 2 + 4">+{{ c.t1.toFixed(2) }}</text>
    </g>
  </svg>
</template>
